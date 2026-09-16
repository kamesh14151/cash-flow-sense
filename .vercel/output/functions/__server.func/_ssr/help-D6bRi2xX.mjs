import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as ChevronDown, D as ChevronUp } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-sdeg094X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-D6bRi2xX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FAQ = [
	{
		q: "What is the Repayment Stress Index (RSI)?",
		a: "The RSI is a composite score from 0–100 that measures a borrower's repayment stress level. It combines six weighted components: Cash Buffer Ratio (25%), Trend Momentum (20%), Residual Volatility (15%), Repayment Track Record (15%), Unexplained Seasonal Deviation (15%), and Expense Shock Index (10%). Higher RSI means higher stress."
	},
	{
		q: "What is Seasonal Match?",
		a: "Seasonal Match (%) measures how closely the current income decline resembles the borrower's historical seasonal pattern. A high match (>70%) means the drop is consistent with expected seasonal behavior — e.g., a farmer's lean season. A low match (<45%) suggests the decline is not explained by season and may indicate a structural problem."
	},
	{
		q: "What is Forecast Confidence?",
		a: "Forecast confidence is the system's estimated reliability of the 3-period forward income forecast. It is derived from the width of the prediction interval relative to average income. Narrower bands = higher confidence. STL + Prophet model produces this output."
	},
	{
		q: "What is Structural Decline?",
		a: "Structural Decline (RSI 71–100) means the borrower's income reduction is persistent, not explained by seasonal factors, and accompanied by worsening trend momentum and expense pressure. It is the most severe stress classification. Example: a gig worker losing platform income with RSI 76 and only 18% seasonal match."
	},
	{
		q: "Why must the officer approve every plan?",
		a: "Cash-Flow Copilot is built on a human-in-the-loop principle. The system can detect, forecast, classify, explain, and recommend — but it cannot and will not automatically execute a loan restructuring. Every repayment plan must be explicitly reviewed, and either approved, modified, or rejected by a qualified loan officer. This ensures accountability and prevents algorithmic errors from causing harm."
	},
	{
		q: "What happens when I approve a plan?",
		a: "When you confirm approval: (1) An OfficerDecision record is created with your name, timestamp, selected plan, and notes. (2) An AuditEvent is created capturing the evidence that was shown at the time of your decision. (3) A system activity event is logged. No automatic loan-system change occurs — the decision is recorded for branch operations to act on."
	},
	{
		q: "What does repayment restructuring actually do?",
		a: "In this prototype, approving a plan records your decision. It does not automatically modify the loan in any core banking system. The audit record demonstrates the officer's informed decision, which branch operations would then use to implement the change manually through the appropriate channels."
	},
	{
		q: "How does the decomposition work?",
		a: "The cash-flow decomposition uses a simplified STL (Seasonal and Trend decomposition using Loess) approach. Each period's income is split into: Trend (moving average), Seasonal (recurring monthly pattern learned from the first 12+ periods), and Residual (unexplained remainder). The seasonal match score measures how well the recent deviation is explained by the learned seasonal profile."
	},
	{
		q: "What is the difference between Meena and Suresh?",
		a: "Meena Krishnan (Farmer, RSI 34) shows a Seasonal Dip — her income decline closely matches her historical monsoon-season pattern (87% seasonal match). The system recommends a Step-Down plan. Suresh Kumar (Gig Worker, RSI 76) shows Structural Decline — his income has been falling persistently with no seasonal explanation (18% match). The system recommends a Moratorium or Tenure Extension. This is the core demonstration: NOT EVERY INCOME DROP MEANS THE SAME THING."
	},
	{
		q: "What are the RSI stress thresholds?",
		a: "Stable: 0–30. Seasonal Dip: 31–50 (with high seasonal match). Emerging Stress: 51–70. Structural Decline: 71–100. These thresholds are configurable in Model Insights (prototype configuration, not production-ready)."
	}
];
function HelpPage() {
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Help & Documentation"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-muted-foreground mt-0.5",
				children: "Understanding Cash-Flow Copilot concepts and workflows"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-foreground text-background rounded-lg p-6 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold mb-2",
					children: "NOT EVERY INCOME DROP MEANS THE SAME THING."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-background/70 text-[13px] leading-relaxed max-w-xl",
					children: "Cash-Flow Copilot distinguishes between Seasonal Dips — temporary, pattern-matched income drops — and Structural Decline — persistent, unexplained deterioration. The system recommends different interventions for each, and requires officer approval before any action is taken."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-background/20 rounded px-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] font-semibold text-background/60",
							children: "SEASONAL DIP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] text-background",
							children: "Pattern-matched · Temporary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-background/20 rounded px-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] font-semibold text-background/60",
							children: "STRUCTURAL DECLINE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] text-background",
							children: "Persistent · Unexplained"
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-card border border-border rounded-lg overflow-hidden max-w-3xl",
			children: FAQ.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border last:border-b-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpen(open === i ? null : i),
					className: "w-full flex items-center justify-between text-left px-5 py-4 hover:bg-muted/30 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[13px] font-medium text-foreground pr-4",
						children: item.q
					}), open === i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" })]
				}), open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-muted-foreground leading-relaxed",
						children: item.a
					})
				})]
			}, i))
		})
	] });
}
//#endregion
export { HelpPage as component };
