import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  analyzeBorrower,
  DEFAULT_CONFIG,
  simulateOutcome,
  recalibrateForecast,
} from "./engine";
import { generateBorrowers, DEMO_BORROWERS } from "./data";
import type {
  Analysis,
  AuditEvent,
  ActivityEvent,
  Borrower,
  ModelConfiguration,
  MonitoringOutcome,
  OfficerDecision,
  RepaymentPlanOption,
  StressState,
} from "./types";

/* ------------------------------------------------------------------ */
/*  State shape                                                         */
/* ------------------------------------------------------------------ */

export interface AppState {
  borrowers: Borrower[];
  analyses: Record<string, Analysis>;          // borrowerId → Analysis
  selectedBorrowerId: string | null;
  decisions: OfficerDecision[];
  auditLog: AuditEvent[];
  outcomes: MonitoringOutcome[];
  activityFeed: ActivityEvent[];
  modelConfig: ModelConfiguration;
  monitoringCycle: number;
  isLoggedIn: boolean;
  currentUser: { name: string; role: string; branch: string };
  reviewingPlanId: string | null;                // plan being reviewed in drawer
  pendingDecisionBorrowerId: string | null;
}

/* ------------------------------------------------------------------ */
/*  Actions                                                             */
/* ------------------------------------------------------------------ */

type Action =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "SELECT_BORROWER"; borrowerId: string }
  | { type: "DESELECT_BORROWER" }
  | { type: "REVIEW_PLAN"; planId: string; borrowerId: string }
  | { type: "CLOSE_REVIEW" }
  | { type: "APPROVE_PLAN"; decision: OfficerDecision }
  | { type: "REJECT_PLAN"; decision: OfficerDecision }
  | { type: "MODIFY_PLAN"; decision: OfficerDecision; modifiedPlan: RepaymentPlanOption }
  | { type: "RUN_NEXT_CYCLE" }
  | { type: "RESET_DEMO" }
  | { type: "UPDATE_CONFIG"; config: ModelConfiguration }
  | { type: "GENERATE_BORROWERS"; count: number }
  | { type: "ADD_ACTIVITY"; event: ActivityEvent };

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function now() {
  return new Date().toISOString();
}

const INITIAL_BORROWERS = generateBorrowers(200);

/** Pre-compute analyses for the three hero demo borrowers so the app is
 *  immediately interactive on load. All other borrowers are analyzed lazily. */
function buildInitialAnalyses(config: ModelConfiguration): Record<string, Analysis> {
  const map: Record<string, Analysis> = {};
  for (const b of DEMO_BORROWERS) {
    map[b.id] = analyzeBorrower(b, config);
  }
  return map;
}

const INITIAL_CONFIG = DEFAULT_CONFIG;

const INITIAL_STATE: AppState = {
  borrowers: INITIAL_BORROWERS,
  analyses: buildInitialAnalyses(INITIAL_CONFIG),
  selectedBorrowerId: null,
  decisions: [],
  auditLog: [],
  outcomes: [],
  activityFeed: [
    {
      id: uid(),
      time: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
      title: "Forecast recalibrated",
      detail: "STL + Prophet cycle complete — 200 borrowers updated.",
      kind: "forecast",
    },
    {
      id: uid(),
      time: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      title: "Structural decline detected",
      detail: "Suresh Kumar — RSI elevated to 76, Structural Decline.",
      kind: "detection",
      borrowerId: "BR-10921",
    },
    {
      id: uid(),
      time: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      title: "Seasonal dip detected",
      detail: "Meena Krishnan — RSI 34, pattern consistent with seasonal profile.",
      kind: "detection",
      borrowerId: "BR-10482",
    },
    {
      id: uid(),
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      title: "Data ingestion complete",
      detail: "Sep 2026 transaction batch — 200 borrowers, 1,847 records.",
      kind: "ingest",
    },
  ],
  modelConfig: INITIAL_CONFIG,
  monitoringCycle: 6,
  isLoggedIn: true,
  currentUser: {
    name: "Priya Sharma",
    role: "Loan Officer",
    branch: "Salem Central Branch",
  },
  reviewingPlanId: null,
  pendingDecisionBorrowerId: null,
};

/* ------------------------------------------------------------------ */
/*  Reducer                                                             */
/* ------------------------------------------------------------------ */

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };

    case "LOGOUT":
      return { ...state, isLoggedIn: false };

    case "SELECT_BORROWER": {
      const { borrowerId } = action;
      // Run analysis if not cached
      if (!state.analyses[borrowerId]) {
        const b = state.borrowers.find((x) => x.id === borrowerId);
        if (b) {
          return {
            ...state,
            selectedBorrowerId: borrowerId,
            analyses: {
              ...state.analyses,
              [borrowerId]: analyzeBorrower(b, state.modelConfig),
            },
          };
        }
      }
      return { ...state, selectedBorrowerId: borrowerId };
    }

    case "DESELECT_BORROWER":
      return { ...state, selectedBorrowerId: null };

    case "REVIEW_PLAN":
      return {
        ...state,
        reviewingPlanId: action.planId,
        pendingDecisionBorrowerId: action.borrowerId,
      };

    case "CLOSE_REVIEW":
      return { ...state, reviewingPlanId: null, pendingDecisionBorrowerId: null };

    case "APPROVE_PLAN": {
      const decision = action.decision;
      const auditEvent: AuditEvent = { ...decision, modelVersion: state.modelConfig.version };
      const activity: ActivityEvent = {
        id: uid(),
        time: now(),
        title: "Plan approved",
        detail: `${decision.borrowerName} — ${decision.planType} approved by ${decision.officerName}.`,
        kind: "decision",
        borrowerId: decision.borrowerId,
      };
      return {
        ...state,
        decisions: [...state.decisions, decision],
        auditLog: [...state.auditLog, auditEvent],
        activityFeed: [activity, ...state.activityFeed],
        reviewingPlanId: null,
        pendingDecisionBorrowerId: null,
      };
    }

    case "REJECT_PLAN": {
      const decision = action.decision;
      const auditEvent: AuditEvent = { ...decision, modelVersion: state.modelConfig.version };
      const activity: ActivityEvent = {
        id: uid(),
        time: now(),
        title: "Recommendation rejected",
        detail: `${decision.borrowerName} — recommendation rejected. Reason: ${decision.reason}.`,
        kind: "decision",
        borrowerId: decision.borrowerId,
      };
      return {
        ...state,
        decisions: [...state.decisions, decision],
        auditLog: [...state.auditLog, auditEvent],
        activityFeed: [activity, ...state.activityFeed],
        reviewingPlanId: null,
        pendingDecisionBorrowerId: null,
      };
    }

    case "MODIFY_PLAN": {
      const { decision, modifiedPlan } = action;
      // Update the analysis cache with the modified plan marked as the chosen one
      const existingAnalysis = state.analyses[decision.borrowerId];
      const updatedAnalyses = existingAnalysis
        ? {
            ...state.analyses,
            [decision.borrowerId]: {
              ...existingAnalysis,
              plans: existingAnalysis.plans.map((p) =>
                p.id === modifiedPlan.id ? modifiedPlan : p,
              ),
            },
          }
        : state.analyses;

      const auditEvent: AuditEvent = { ...decision, modelVersion: state.modelConfig.version };
      const activity: ActivityEvent = {
        id: uid(),
        time: now(),
        title: "Plan modified and saved",
        detail: `${decision.borrowerName} — plan modified by ${decision.officerName}.`,
        kind: "decision",
        borrowerId: decision.borrowerId,
      };
      return {
        ...state,
        decisions: [...state.decisions, decision],
        auditLog: [...state.auditLog, auditEvent],
        activityFeed: [activity, ...state.activityFeed],
        analyses: updatedAnalyses,
        reviewingPlanId: null,
        pendingDecisionBorrowerId: null,
      };
    }

    case "RUN_NEXT_CYCLE": {
      const nextCycle = state.monitoringCycle + 1;
      // Simulate outcomes for all borrowers that have been analysed
      const newOutcomes: MonitoringOutcome[] = Object.values(state.analyses).map((a) => {
        const prevDecision = state.decisions.find((d) => d.borrowerId === a.borrower.id);
        return simulateOutcome(a, nextCycle, prevDecision?.planId);
      });
      const calib = recalibrateForecast(newOutcomes);
      const activity: ActivityEvent = {
        id: uid(),
        time: now(),
        title: "Monitoring cycle complete",
        detail: `Cycle ${nextCycle} — MAE ₹${calib.mae.toLocaleString("en-IN")}, MAPE ${calib.mape}%, forecast drift ${(calib.drift * 100).toFixed(1)}%.`,
        kind: "monitor",
      };
      return {
        ...state,
        monitoringCycle: nextCycle,
        outcomes: [...state.outcomes, ...newOutcomes],
        activityFeed: [activity, ...state.activityFeed],
      };
    }

    case "RESET_DEMO": {
      const freshConfig = DEFAULT_CONFIG;
      return {
        ...INITIAL_STATE,
        analyses: buildInitialAnalyses(freshConfig),
        isLoggedIn: state.isLoggedIn,
        activityFeed: [
          {
            id: uid(),
            time: now(),
            title: "Demo reset",
            detail: "Application state restored to initial baseline.",
            kind: "ingest",
          },
          ...INITIAL_STATE.activityFeed,
        ],
      };
    }

    case "UPDATE_CONFIG": {
      // Re-analyze all cached borrowers with the new config
      const newAnalyses: Record<string, Analysis> = {};
      for (const [id, _] of Object.entries(state.analyses)) {
        const b = state.borrowers.find((x) => x.id === id);
        if (b) newAnalyses[id] = analyzeBorrower(b, action.config);
      }
      return { ...state, modelConfig: action.config, analyses: newAnalyses };
    }

    case "GENERATE_BORROWERS": {
      const newBorrowers = generateBorrowers(action.count);
      const newAnalyses: Record<string, Analysis> = {};
      for (const b of DEMO_BORROWERS) {
        newAnalyses[b.id] = analyzeBorrower(b, state.modelConfig);
      }
      const activity: ActivityEvent = {
        id: uid(),
        time: now(),
        title: "Synthetic data generated",
        detail: `${action.count} borrowers generated across all archetypes.`,
        kind: "ingest",
      };
      return {
        ...state,
        borrowers: newBorrowers,
        analyses: newAnalyses,
        activityFeed: [activity, ...state.activityFeed],
      };
    }

    case "ADD_ACTIVITY":
      return { ...state, activityFeed: [action.event, ...state.activityFeed] };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  /** Convenience: get or compute analysis for a borrower */
  getAnalysis: (borrowerId: string) => Analysis | null;
  /** Convenience: get the selected borrower's analysis */
  selectedAnalysis: Analysis | null;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const getAnalysis = useCallback(
    (borrowerId: string): Analysis | null => {
      if (state.analyses[borrowerId]) return state.analyses[borrowerId];
      const b = state.borrowers.find((x) => x.id === borrowerId);
      if (!b) return null;
      return analyzeBorrower(b, state.modelConfig);
    },
    [state.analyses, state.borrowers, state.modelConfig],
  );

  const selectedAnalysis = useMemo(
    () =>
      state.selectedBorrowerId ? (state.analyses[state.selectedBorrowerId] ?? null) : null,
    [state.selectedBorrowerId, state.analyses],
  );

  const value = useMemo(
    () => ({ state, dispatch, getAnalysis, selectedAnalysis }),
    [state, dispatch, getAnalysis, selectedAnalysis],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Selector helpers (pure, memoization-friendly)                       */
/* ------------------------------------------------------------------ */

export function selectBorrowersByState(borrowers: Borrower[], analyses: Record<string, Analysis>) {
  const counts: Record<StressState, number> = {
    Stable: 0,
    "Seasonal Dip": 0,
    "Emerging Stress": 0,
    "Structural Decline": 0,
  };
  for (const a of Object.values(analyses)) {
    counts[a.state]++;
  }
  return counts;
}
