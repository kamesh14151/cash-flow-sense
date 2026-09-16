import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp, r as analyzeBorrower } from "./store-BdGbiYXL.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TriangleAlert, h as Minus, s as TrendingDown, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-sdeg094X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-05fIVxkZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		state: "Structural Decline",
		label: "Structural Decline",
		icon: TrendingDown,
		color: "text-danger"
	},
	{
		state: "Emerging Stress",
		label: "Emerging Stress",
		icon: TriangleAlert,
		color: "text-warning"
	},
	{
		state: "Seasonal Dip",
		label: "Seasonal Dip",
		icon: Minus,
		color: "text-info"
	}
];
function AlertsPage() {
	const { state } = useApp();
	const navigate = useNavigate();
	const byState = (0, import_react.useMemo)(() => {
		const analyses = { ...state.analyses };
		for (const b of state.borrowers.slice(0, 60)) if (!analyses[b.id]) analyses[b.id] = analyzeBorrower(b, state.modelConfig);
		const map = {};
		for (const a of Object.values(analyses)) if (a.state !== "Stable") {
			if (!map[a.state]) map[a.state] = [];
			map[a.state].push(a);
		}
		return map;
	}, [
		state.analyses,
		state.borrowers,
		state.modelConfig
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: "Alerts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] text-muted-foreground mt-0.5",
			children: "Borrowers requiring immediate attention"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [CATEGORIES.map(({ state: s, label, icon: Icon, color }) => {
			const items = byState[s] ?? [];
			if (items.length === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${color}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[12px] text-muted-foreground",
						children: [
							"(",
							items.length,
							")"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-card border border-border rounded-lg overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border bg-muted/30",
						children: [
							"Borrower",
							"Occupation",
							"RSI",
							"Seasonal match",
							"Trend",
							"Action"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-2.5 px-4",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: items.sort((a, b) => b.rsi.value - a.rsi.value).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 px-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: a.borrower.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: a.borrower.id
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: a.borrower.occupation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-bold",
									style: { color: s === "Structural Decline" ? "var(--color-danger)" : "var(--color-warning)" },
									children: a.rsi.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: [a.seasonalMatch, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: a.trendDirection
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => navigate({ to: `/borrowers/${slugFor(a.borrower)}` }),
										className: "flex items-center gap-1 text-[12px] font-medium hover:text-cfc-amber",
										children: ["Analyse ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})
								})
							]
						}, a.borrower.id))
					})]
				})
			})] }, s);
		}), Object.values(byState).flat().length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-16 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-8 w-8 mx-auto mb-3 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No active alerts" })]
		})]
	})] });
}
//#endregion
export { AlertsPage as component };
