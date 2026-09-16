# Cash-Flow Copilot

> **AI-powered cash-flow decision intelligence for lender operations.**

Cash-Flow Copilot is a lender operations prototype that helps loan officers understand borrower cash-flow stress before making repayment decisions.

Instead of treating every income decline as the same event, the system combines cash-flow forecasting, seasonal decomposition, stress scoring, evidence, and repayment-plan generation to distinguish different patterns of financial pressure.

The system then places the recommendation in a **human-in-the-loop officer workflow**:

```text
Analyze
  ↓
Explain
  ↓
Recommend
  ↓
Officer Review
  ↓
Approve / Modify / Reject
  ↓
Audit
  ↓
Monitor
  ↓
Recalibrate
  ↺
```

> **The system recommends. The officer decides.**

---

## Product Story

The central product idea is simple:

> **Two income drops can have two different underlying stories.**

A borrower may experience a temporary decline that closely matches their historical seasonal pattern.

Another borrower may experience a persistent decline that is poorly explained by seasonality.

Cash-Flow Copilot is designed to make that distinction visible and actionable.

### Hero scenarios

| Borrower | RSI | Seasonal Match | Classification | Demonstrates |
|---|---:|---:|---|---|
| Meena Krishnan | 34 | 87% | Seasonal Dip | Strong historical seasonal explanation |
| Suresh Kumar | 76 | 18% | Structural Decline | Persistent decline with weak seasonal explanation |

These are synthetic demonstration scenarios.

---

# What We Built

The project is implemented as a complete lender operations prototype rather than a single analytics screen.

## 1. Data Ingestion

The application supports a simulated ingestion workflow for borrower financial data such as:

- Income
- Expenses
- Repayment history
- Cash-flow history

The prototype also includes synthetic borrower generation for portfolio-scale demonstrations.

---

## 2. Cash-Flow Forecasting

Historical borrower cash flow is analyzed to produce a forward-looking cash-flow outlook.

The forecasting layer includes:

- STL-style decomposition
- Trend
- Seasonality
- Residual variation
- Forecast values
- Confidence information
- Historical vs forecast visualization

The UI presents the forecast as a decision-support view rather than as a standalone chart.

The core question is:

> **“What happens to the borrower's cash flow if nothing changes?”**

---

## 3. Stress Detection — Repayment Stress Index

The prototype uses a **Repayment Stress Index (RSI)** to summarize repayment stress on a 0–100 scale.

The RSI analysis considers multiple components, including:

- Cash Buffer Ratio
- Residual Volatility
- Trend Momentum
- Repayment Track Record
- Unexplained Seasonal Deviation
- Expense Shock Index

The model-insights screen exposes the RSI configuration and component weights.

The borrower analysis page explains the component-level contribution instead of displaying only a single score.

---

## 4. Stress Classification

The system classifies borrower cash-flow pressure into meaningful operational states.

The main demonstration states are:

### Stable

Cash-flow conditions are comparatively stable.

### Seasonal Dip

The borrower is experiencing pressure, but the decline has strong historical seasonal alignment.

### Emerging Stress

The borrower shows developing signs of repayment pressure.

### Structural Decline

The decline has a persistent non-seasonal component and weak historical seasonal explanation.

---

# 5. Explainability / Evidence

Cash-Flow Copilot does not stop at a classification.

It presents the evidence behind the classification.

The evidence layer communicates:

- Signal
- Value
- Weight impact
- Interpretation
- Supporting factors
- Countering factors

The goal is to answer:

> **“Why did the system reach this conclusion?”**

The UI intentionally presents concise evidence rather than exposing hidden model reasoning or chain-of-thought.

---

# 6. Repayment Plan Generation

After analyzing the borrower, the engine generates repayment alternatives based on the borrower's projected affordability and stress state.

Plans can expose:

- Current installment
- Proposed installment
- Projected cash buffer
- Tenure impact
- Recovery impact
- Rationale

The interface distinguishes:

**SYSTEM RECOMMENDATION**

from:

**ALTERNATIVE REPAYMENT OPTIONS**

The system recommendation is not an automatic action.

---

# 7. Human-in-the-Loop Decision Workflow

This is a core architectural and product requirement.

The system does **not** automatically approve, reject, or execute a loan-system change.

The workflow is:

```text
System Recommendation
        ↓
Officer Review
        ↓
Understand
        ↓
Compare
        ↓
Decide
        ↓
Record
```

The officer has three decision paths:

### Approve recommendation

The officer accepts the system recommendation.

### Modify recommendation

The officer changes supported repayment parameters and records the decision as an officer modification.

### Reject recommendation

The officer rejects the recommendation and provides a reason, with optional notes.

The UI explicitly communicates:

> **Cash-Flow Copilot provides analytical recommendations. The loan officer makes the final decision.**

And:

> **This records the officer's decision. The prototype does not automatically execute a loan-system change.**

---

# 8. Auditability

Every officer decision generates an audit event.

The audit record preserves decision-time context such as:

- Borrower
- Borrower ID
- Officer
- Officer role
- Timestamp
- Decision action
- Selected plan
- RSI at decision time
- Stress state at decision time
- Previous repayment schedule
- New repayment schedule
- Evidence snapshot
- Officer notes
- Model version
- Configuration version

This creates a traceable chain:

```text
Evidence
   ↓
Recommendation
   ↓
Officer Decision
   ↓
Audit Event
```

The evidence snapshot is preserved as part of the decision record.

---

# 9. Monitoring & Closed-Loop Recalibration

The product includes a simulated monitoring cycle.

After a decision, the system can run another cycle and compare:

```text
Forecast
   vs
Observed Outcome
```

The monitoring layer calculates forecast-performance metrics such as:

- Forecast error
- MAPE
- MAE
- Accuracy/recalibration indicators

The conceptual loop is:

```text
Decision
   ↓
Observed Outcome
   ↓
Forecast Error
   ↓
Recalibration
   ↓
Next Forecast Cycle
   ↺
```

This makes the prototype a **closed-loop decision-support system**, rather than a one-time prediction dashboard.

---

# Application Routes

The prototype contains the following operational routes.

| Route | Purpose |
|---|---|
| `/` | Login / entry |
| `/dashboard` | Portfolio overview and attention queue |
| `/borrowers` | Borrower directory |
| `/borrowers/meena` | Meena hero analysis |
| `/borrowers/suresh` | Suresh hero analysis |
| `/portfolio` | Portfolio filtering and risk matrix |
| `/alerts` | Early-warning stress alerts |
| `/plans` | Repayment plan review queue and history |
| `/forecasts` | Portfolio / borrower forecasting views |
| `/monitoring` | Monitoring and recalibration cycle |
| `/data-ingestion` | Data ingestion workflow |
| `/model-insights` | RSI configuration and model insights |
| `/audit-log` | Immutable decision history |
| `/settings` | Profile and system configuration |
| `/help` | Product and methodology guidance |

---

# Hero Borrower Analysis Workspace

The `/borrowers/:id` page is the centerpiece of the application.

Its information architecture is:

```text
Borrower
   ↓
Analysis Summary
   ↓
Cash-Flow Outlook
   ↓
Decomposition
   ↓
RSI Analysis
   ↓
Evidence
   ↓
System Recommendation
   ↓
Decision Context
   ↓
Officer Review
   ↓
Audit / Monitoring
```

## Borrower Header

Displays:

- Borrower name
- Occupation
- Borrower ID
- Loan ID
- Stress state
- RSI
- Seasonal match

---

## Analysis Summary

The analysis summary uses three concise layers:

### Signal

What is happening?

Example:

> Income is declining.

### Interpretation

What does the analysis suggest?

Example:

> The decline strongly matches historical seasonality.

### Implication

What does this mean operationally?

Example:

> Current evidence supports a temporary repayment adjustment rather than treating the decline as structural.

---

## Cash-Flow Outlook

The chart includes:

- Actual cash flow
- Forecast
- Confidence band
- Expenses
- Repayment
- Today marker
- 6M / 12M / 18M horizon controls

The visualization is designed to answer the operational question:

> **What happens if nothing changes?**

---

## Decomposition

The decomposition view separates the cash-flow signal into:

```text
Trend
Seasonal
Residual
```

This helps distinguish:

- underlying trajectory
- recurring seasonal patterns
- unexplained variation

The UI can identify the dominant driver for the hero scenarios.

---

## RSI Analysis

The RSI section explains the score through component-level views.

Each component can show:

- Score
- Weight / maximum contribution
- Progress
- Explanation

This turns a single risk score into an interpretable analysis.

---

## Evidence

Evidence cards provide a structured explanation of the model output.

The officer can review evidence before making a decision.

---

## System Recommendation

The recommendation section provides:

- Recommended repayment option
- Alternative options
- Current vs proposed installment
- Projected buffer
- Tenure impact
- Recovery impact
- Concise rationale

The recommendation is generated by the existing analysis engine.

---

# Demo Scenarios

## Meena Krishnan

**Borrower ID:** `BR-10482`

**Occupation:** Farmer

**RSI:** `34 / 100`

**Seasonal Match:** `87%`

**Classification:** `Seasonal Dip`

### Story

Meena is experiencing income pressure, but the observed decline closely matches her historical seasonal pattern.

The demonstration therefore shows how the system can support a temporary repayment adjustment rather than treating the decline as structural.

---

## Suresh Kumar

**Borrower ID:** `BR-10921`

**Occupation:** Gig Worker

**RSI:** `76 / 100`

**Seasonal Match:** `18%`

**Classification:** `Structural Decline`

### Story

Suresh's decline has a much weaker seasonal explanation and a stronger persistent negative trend.

The demonstration therefore produces a materially different interpretation and repayment-plan direction.

---

# Technology Stack

The prototype is built around a modern TypeScript/React application architecture.

### Frontend

- React
- TypeScript
- TanStack Router
- shadcn/ui
- Recharts
- cmdk
- CSS design tokens

### Application Architecture

```text
React UI
   ↓
App State / Context
   ↓
Analysis Engine
   ↓
Synthetic Borrower Data
```

The engine remains separated from presentation components.

---

# Core Architecture

The foundation layer is organized around three major files:

```text
src/lib/
├── engine.ts
├── data.ts
└── types.ts
```

## `engine.ts`

Contains the analysis pipeline, including:

- decomposition
- forecasting
- RSI calculation
- classification
- evidence generation
- repayment-plan generation
- outcome simulation
- recalibration

The UI calls the engine and renders the returned analysis.

Business logic is intentionally kept out of UI components.

---

## `data.ts`

Contains:

- Hero borrowers
- Synthetic portfolio data
- Borrower generation
- Demonstration financial histories

The prototype contains a 200-borrower synthetic portfolio.

---

## `types.ts`

Defines the application's core domain interfaces, including concepts such as:

- Borrower
- Loan
- Analysis
- RSI score
- Evidence
- Repayment plan
- Officer decision
- Audit event
- Monitoring outcome
- Model configuration

---

# State Management

The application uses React Context + `useReducer` for centralized prototype state.

The state layer handles:

- Selected borrower
- Analyses
- Officer decisions
- Audit events
- Monitoring outcomes
- Activity
- Model configuration
- Demo reset

This keeps the UI reactive while avoiding unnecessary external state dependencies.

---

# Design System

The product uses a restrained institutional fintech aesthetic.

### Visual direction

- Warm ivory backgrounds
- White surfaces
- Charcoal typography
- Muted slate secondary text
- Restrained amber accent
- Semantic green / red states
- Thin borders
- Subtle shadows
- Compact information density

### Typography

The UI uses a modern sans-serif hierarchy based around Inter / Geist-style typography.

### Product personality

The visual language aims for:

> **Institutional fintech + AI decision intelligence + modern operations software**

Avoided design patterns include:

- excessive gradients
- neon AI colors
- oversized illustrations
- excessive glassmorphism
- chatbot-centric layouts

---

# Product Principles

## 1. Explain before recommending

The system should show what is happening and why before presenting an intervention.

## 2. Recommendation is not execution

The AI provides decision support.

It does not independently execute lending actions.

## 3. Human approval is explicit

The officer is always part of the decision path.

## 4. Decisions are auditable

Officer actions and decision-time evidence are recorded.

## 5. Outcomes close the loop

Observed outcomes are compared with forecasts for future recalibration.

---

# End-to-End Working Flow

```text
┌──────────────────────┐
│     Data Ingestion   │
│ Income / Expenses /  │
│ Repayment History    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Cash-Flow Forecast   │
│ STL + Forecast Model │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Stress Detection     │
│ RSI 0–100             │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Stress Classification │
│ Seasonal / Structural │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Explainability       │
│ Evidence + Drivers   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Repayment Plans      │
│ Recommended + Alt.   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Officer Review       │
│ Understand / Compare │
│ Decide / Record      │
└──────────┬───────────┘
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
 Approve  Modify Reject
    └──────┼──────┘
           ↓
┌──────────────────────┐
│ Audit Event          │
│ Evidence Snapshot    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Monitoring Cycle     │
│ Actual vs Forecast   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Error + Recalibrate  │
└──────────┬───────────┘
           │
           └──────────→ Next Cycle
```

---

# Why the Human-in-the-Loop Design Matters

The prototype deliberately separates:

### Model output

> “Based on the available evidence, this repayment option is recommended.”

from:

### Human decision

> “The loan officer reviewed the evidence and chose this action.”

This separation makes the workflow transparent and auditable.

The prototype does not represent the AI as having independent authority over the loan.

---

# What Is Simulated

This is a prototype / demonstration system.

The following are simulated:

- Borrower portfolio
- Financial histories
- Forecasts
- RSI analysis
- Stress classifications
- Repayment plans
- Monitoring outcomes
- Recalibration
- Officer profile
- Decision records

No real lending-system transaction is executed.

No real borrower decision is made.

---

# Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The expected build result is a successful TypeScript/application build with no build errors.

---

# Deploying to Vercel

This project is fully compatible with **Vercel** out-of-the-box (using Vite + Nitro + TanStack Start).

### Quick Deployment Steps:

1. Push your repository to GitHub.
2. Import the repository into [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects the configuration via `vercel.json`:
   - **Build Command**: `NITRO_PRESET=vercel npm run build`
4. Click **Deploy**.

Alternatively, deploy via Vercel CLI:
```bash
npx vercel
```


---

# Demo Reset

The topbar contains:

**Reset Demo**

This restores the initial demonstration state, including:

- initial decisions
- monitoring cycle
- activity state
- portfolio baseline

Use this before a presentation to ensure a predictable demo.

---

# Presentation Flow

For a short product demonstration:

```text
Dashboard
   ↓
Meena
   ↓
RSI 34 / 87% seasonal
   ↓
Forecast
   ↓
Evidence
   ↓
Recommendation
   ↓
Officer Review
   ↓
Approve / Modify / Reject
   ↓
Audit
   ↓
Suresh
   ↓
RSI 76 / 18% seasonal
   ↓
Structural Decline
   ↓
Monitoring
   ↓
Recalibration
```

### Closing line

> **“Cash-Flow Copilot doesn't just predict stress. It explains the stress, proposes an intervention, keeps the officer in control, records the decision, and learns from the outcome.”**

# TWO INCOME DROPS.  
# TWO DIFFERENT STORIES.  
# ONE HUMAN DECISION.

---

# Project Status

The prototype currently includes:

- Complete analysis engine
- Synthetic 200-borrower portfolio
- 14+ operational routes
- Borrower analysis workspace
- Forecast visualizations
- Decomposition analysis
- RSI analysis
- Evidence layer
- Repayment recommendations
- Alternative repayment options
- Human-in-the-loop review workflow
- Approve / Modify / Reject paths
- Audit trail
- Monitoring cycle
- Recalibration simulation
- Model insights
- Data ingestion UI
- Command palette
- Responsive layouts
- Presentation-oriented hero scenarios

The application has been built and verified through the prototype workflow, with `npm run build` completing successfully.

---

# Disclaimer

**Cash-Flow Copilot is a prototype for demonstrating AI-assisted lender operations and decision intelligence.**

It uses synthetic data and simulated analysis.

It is not a production credit decisioning system and does not execute real lending, repayment, restructuring, or loan-system changes.

All final decisions in the prototype remain with the human loan officer.

---

## License

This project is proprietary and closed-source software. All rights reserved. Unauthorized copying, distribution, or modification of this codebase is strictly prohibited.

