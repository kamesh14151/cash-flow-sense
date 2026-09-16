import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp, o as inr } from "./store-BdGbiYXL.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as CircleCheck, m as PenLine, w as CircleX, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-sdeg094X.mjs";
import { t as StressStateBadge } from "./StressStateBadge-D-rlpoag.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CuIia4UB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans-DmqlVwK-.js
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		value: "pending",
		label: "Pending review"
	},
	{
		value: "Approved",
		label: "Approved"
	},
	{
		value: "Modified",
		label: "Modified"
	},
	{
		value: "Rejected",
		label: "Rejected"
	}
];
function PlansPage() {
	const { state } = useApp();
	const navigate = useNavigate();
	const pendingAnalyses = Object.values(state.analyses).filter((a) => {
		const hasRecommended = a.plans.some((p) => p.recommended);
		const hasDecision = state.decisions.some((d) => d.borrowerId === a.borrower.id);
		return hasRecommended && !hasDecision;
	});
	function decisionsByAction(action) {
		return state.decisions.filter((d) => d.action === action);
	}
	function DecisionRow({ d }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between border-b border-border py-4 px-4 hover:bg-muted/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-start gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground text-[13px]",
						children: d.borrowerName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: [
							d.borrowerId,
							" · ",
							d.planType
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
							state: d.stateAtDecision,
							size: "sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] text-muted-foreground",
							children: ["RSI ", d.rsiAtDecision]
						})]
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right text-[12px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: d.officerName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: new Date(d.timestamp).toLocaleDateString()
					}),
					d.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground/60 italic mt-1",
						children: [
							"\"",
							d.notes,
							"\""
						]
					}),
					d.reason && d.action === "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-danger mt-1 text-[11px]",
						children: d.reason
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: `/audit-log` }),
						className: "mt-1 text-[12px] hover:text-cfc-amber flex items-center gap-1 ml-auto",
						children: ["View audit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
					})
				]
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: "Plans"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] text-muted-foreground mt-0.5",
			children: "System-generated repayment restructuring recommendations"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "pending",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
				className: "mb-4",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: t.value,
					className: "text-[13px]",
					children: [t.label, t.value === "pending" && pendingAnalyses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 h-4 w-4 rounded-full bg-warning text-white text-[10px] flex items-center justify-center",
						children: pendingAnalyses.length
					})]
				}, t.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pending",
				children: pendingAnalyses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 mx-auto mb-3 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No plans pending review" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-card border border-border rounded-lg overflow-hidden",
					children: pendingAnalyses.map((a) => {
						const recommended = a.plans.find((p) => p.recommended) ?? a.plans[0];
						if (!recommended) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-border py-4 px-4 hover:bg-muted/30 last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: a.borrower.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[12px] text-muted-foreground",
									children: [
										a.borrower.id,
										" · ",
										a.borrower.occupation
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
										state: a.state,
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[12px] text-muted-foreground",
										children: ["RSI ", a.rsi.value]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[12px] text-cfc-amber mt-1.5 font-medium",
									children: [
										"Recommended: ",
										recommended.type,
										" · ",
										inr(recommended.installment),
										"/m"
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => navigate({ to: `/borrowers/${slugFor(a.borrower)}` }),
								className: "flex items-center gap-1.5 text-[13px] font-medium bg-foreground text-background px-3 py-1.5 rounded hover:bg-foreground/90",
								children: ["Review ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})]
						}, a.borrower.id);
					})
				})
			}),
			[
				"Approved",
				"Modified",
				"Rejected"
			].map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: action,
				children: decisionsByAction(action).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12 text-muted-foreground",
					children: [
						action === "Approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 mx-auto mb-3 opacity-30" }),
						action === "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-8 w-8 mx-auto mb-3 opacity-30" }),
						action === "Modified" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-8 w-8 mx-auto mb-3 opacity-30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"No ",
							action.toLowerCase(),
							" plans"
						] })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-card border border-border rounded-lg overflow-hidden",
					children: decisionsByAction(action).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionRow, { d }, d.id))
				})
			}, action))
		]
	})] });
}
//#endregion
export { PlansPage as component };
