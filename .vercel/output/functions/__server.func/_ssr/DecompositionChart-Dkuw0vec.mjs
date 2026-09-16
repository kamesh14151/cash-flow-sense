import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as inr } from "./store-BdGbiYXL.mjs";
import { a as YAxis, d as Bar, g as Legend, h as Tooltip, l as CartesianGrid, m as ResponsiveContainer, o as XAxis, r as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DecompositionChart-Dkuw0vec.js
var import_jsx_runtime = require_jsx_runtime();
function DecompositionChart({ decomposition, seasonalMatch }) {
	const data = decomposition.points.slice(-12);
	seasonalMatch >= 70 ? `${seasonalMatch}` : seasonalMatch >= 45 ? `${seasonalMatch}` : `${seasonalMatch}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `border rounded-lg p-3.5 ${decomposition.trendDirection === "Declining" && seasonalMatch < 50 ? "border-danger/40 bg-danger/5 shadow-sm" : "border-border bg-card"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "TREND"
								}), decomposition.trendDirection === "Declining" && seasonalMatch < 50 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-danger bg-danger/10 px-1.5 py-0.5 rounded",
									children: "DOMINANT DRIVER"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[14px] font-bold text-foreground",
								children: decomposition.trendDirection
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-1 leading-relaxed",
								children: "What is happening to the underlying income trajectory?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground font-mono mt-2 pt-2 border-t border-border",
								children: [
									"Baseline: ",
									decomposition.confidence,
									" confidence"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `border rounded-lg p-3.5 ${seasonalMatch >= 70 ? "border-info/40 bg-info/5 shadow-sm" : "border-border bg-card"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "SEASONAL"
								}), seasonalMatch >= 70 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-info bg-info/10 px-1.5 py-0.5 rounded",
									children: "DOMINANT DRIVER"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[14px] font-bold text-foreground",
								children: [seasonalMatch, "% Match"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-1 leading-relaxed",
								children: "How much of the change matches historical seasonality?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground font-mono mt-2 pt-2 border-t border-border",
								children: seasonalMatch >= 70 ? "Strong seasonal dip pattern" : "Low seasonal correlation"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border bg-card rounded-lg p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between mb-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "RESIDUAL"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[14px] font-bold text-foreground font-mono",
								children: decomposition.residualVolatility.toFixed(3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-1 leading-relaxed",
								children: "How much remains unexplained by trend & seasonality?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground font-mono mt-2 pt-2 border-t border-border",
								children: "Residual noise index"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] font-medium text-muted-foreground mb-2 uppercase tracking-wide",
				children: "Observed vs Trend"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 180,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					margin: {
						top: 0,
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
							dataKey: "label",
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
							width: 40
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
							if (!active || !payload?.length) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded shadow p-2 text-[12px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium mb-1",
									children: label
								}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "observed",
							name: "Observed",
							fill: "var(--color-foreground)",
							fillOpacity: .85,
							radius: [
								2,
								2,
								0,
								0
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "trend",
							name: "Trend",
							fill: "var(--color-cfc-amber)",
							fillOpacity: .7,
							radius: [
								2,
								2,
								0,
								0
							]
						})
					]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] font-medium text-muted-foreground mb-2 uppercase tracking-wide",
				children: "Seasonal Component & Residual"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 160,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					margin: {
						top: 0,
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
							dataKey: "label",
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
							width: 40
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
							if (!active || !payload?.length) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded shadow p-2 text-[12px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium mb-1",
									children: label
								}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "seasonal",
							name: "Seasonal",
							fill: "var(--color-info)",
							fillOpacity: .7,
							radius: [
								2,
								2,
								0,
								0
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "residual",
							name: "Residual",
							fill: "var(--color-muted-foreground)",
							fillOpacity: .5,
							radius: [
								2,
								2,
								0,
								0
							]
						})
					]
				})
			})] })
		]
	});
}
//#endregion
export { DecompositionChart as t };
