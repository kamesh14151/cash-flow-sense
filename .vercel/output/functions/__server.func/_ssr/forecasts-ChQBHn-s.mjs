import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as forecastCashFlow, i as decomposeCashFlow, l as useApp, n as DEMO_BORROWERS, o as inr } from "./store-BdGbiYXL.mjs";
import { t as AppShell } from "./AppShell-sdeg094X.mjs";
import { a as YAxis, c as Line, g as Legend, h as Tooltip, l as CartesianGrid, m as ResponsiveContainer, o as XAxis, s as Area, t as ComposedChart } from "../_libs/recharts+[...].mjs";
import { t as DecompositionChart } from "./DecompositionChart-Dkuw0vec.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CuIia4UB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forecasts-ChQBHn-s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForecastsPage() {
	const { state } = useApp();
	const demoForecasts = (0, import_react.useMemo)(() => {
		return DEMO_BORROWERS.map((b) => {
			const a = state.analyses[b.id];
			const forecast = a ? a.forecast : forecastCashFlow(b, 6);
			const decomp = a ? a.decomposition : decomposeCashFlow(b);
			const history = b.history.slice(-6).map((p) => ({
				period: p.label,
				actual: p.income,
				lower: void 0,
				upper: void 0,
				forecast: void 0
			}));
			const forecastData = forecast.map((f) => ({
				period: f.period,
				actual: void 0,
				forecast: f.pointEstimate,
				lower: f.lowerBound,
				upper: f.upperBound
			}));
			return {
				borrower: b,
				data: [...history, ...forecastData],
				decomp,
				analysis: a
			};
		});
	}, [state.analyses]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Forecasts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[13px] text-muted-foreground mt-0.5",
				children: [
					"STL + Prophet · 3-period forward horizon · ",
					state.borrowers.length,
					" borrowers"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-4 mb-6",
			children: [
				{
					label: "Forecast coverage",
					value: `${Object.keys(state.analyses).length}/${state.borrowers.length}`
				},
				{
					label: "Model",
					value: "STL + Prophet"
				},
				{
					label: "Horizon",
					value: "3 months"
				},
				{
					label: "Avg confidence",
					value: `${Math.round(Object.values(state.analyses).reduce((s, a) => s + a.forecastConfidence, 0) / Math.max(1, Object.values(state.analyses).length))}%`
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground uppercase tracking-wide",
					children: s.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[20px] font-bold text-foreground mt-1",
					children: s.value
				})]
			}, s.label))
		}),
		demoForecasts.map(({ borrower, data, decomp, analysis }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-4 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[15px] font-semibold text-foreground",
						children: borrower.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12px] text-muted-foreground",
						children: [
							borrower.occupation,
							" · ",
							borrower.id
						]
					})] }), analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right text-[12px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: ["Confidence: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [analysis.forecastConfidence, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: ["Expected inflow: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: inr(analysis.expectedInflow)
							})]
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "forecast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "m-4 mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "forecast",
						children: "Forecast"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "decomposition",
						children: "Decomposition"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "forecast",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 220,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
								data,
								margin: {
									top: 4,
									right: 8,
									bottom: 0,
									left: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "period",
										tick: {
											fontSize: 10,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 10,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false,
										tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`,
										width: 44
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
										if (!active || !payload?.length) return null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-card border border-border rounded shadow p-2 text-[12px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium mb-1",
												children: label
											}), payload.filter((p) => p.value !== void 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground capitalize",
													children: p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: { color: p.color },
													children: inr(Number(p.value))
												})]
											}, p.name))]
										});
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										dataKey: "upper",
										stroke: "none",
										fill: "var(--color-cfc-amber)",
										fillOpacity: .1,
										name: "upper band",
										legendType: "none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										dataKey: "lower",
										stroke: "none",
										fill: "var(--color-background)",
										fillOpacity: 1,
										name: "lower band",
										legendType: "none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										dataKey: "actual",
										stroke: "var(--color-foreground)",
										strokeWidth: 2,
										dot: false,
										name: "Actual"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										dataKey: "forecast",
										stroke: "var(--color-cfc-amber)",
										strokeWidth: 2,
										strokeDasharray: "5 3",
										dot: false,
										name: "Forecast"
									})
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "decomposition",
						className: "mt-0",
						children: analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecompositionChart, {
							decomposition: decomp,
							seasonalMatch: analysis.seasonalMatch
						})
					})]
				})]
			})]
		}, borrower.id))
	] });
}
//#endregion
export { ForecastsPage as component };
