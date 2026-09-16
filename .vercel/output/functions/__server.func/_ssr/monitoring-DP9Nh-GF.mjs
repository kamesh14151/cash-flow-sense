import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useApp, o as inr, s as recalibrateForecast } from "./store-BdGbiYXL.mjs";
import { B as ArrowDown, o as TrendingUp, p as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./AppShell-sdeg094X.mjs";
import { a as YAxis, d as Bar, g as Legend, h as Tooltip, l as CartesianGrid, m as ResponsiveContainer, o as XAxis, r as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monitoring-DP9Nh-GF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OUTCOME_COLORS = {
	Recovered: "text-success",
	Recovering: "text-info",
	"Still stressed": "text-warning",
	"Re-entered stress": "text-warning",
	"Default risk": "text-danger"
};
function MonitoringPage() {
	const { state, dispatch } = useApp();
	const latestCycleOutcomes = (0, import_react.useMemo)(() => {
		const maxCycle = Math.max(0, ...state.outcomes.map((o) => o.cycle));
		return state.outcomes.filter((o) => o.cycle === maxCycle);
	}, [state.outcomes]);
	const calib = (0, import_react.useMemo)(() => recalibrateForecast(latestCycleOutcomes), [latestCycleOutcomes]);
	const chartData = latestCycleOutcomes.slice(0, 10).map((o) => ({
		name: o.borrowerName.split(" ")[0],
		forecast: o.forecast,
		actual: o.actual,
		error: Math.abs(o.actual - o.forecast)
	}));
	const pipelineSteps = [
		{
			label: "FORECAST",
			sub: `${Object.keys(state.analyses).length} borrowers`,
			active: true
		},
		{
			label: "ACTUAL",
			sub: latestCycleOutcomes.length > 0 ? `${latestCycleOutcomes.length} outcomes` : "Awaiting cycle",
			active: latestCycleOutcomes.length > 0
		},
		{
			label: "ERROR",
			sub: latestCycleOutcomes.length > 0 ? `MAPE ${calib.mape}%` : "—",
			active: latestCycleOutcomes.length > 0
		},
		{
			label: "RECALIBRATION",
			sub: latestCycleOutcomes.length > 0 ? `Drift ${(calib.drift * 100).toFixed(2)}%` : "—",
			active: latestCycleOutcomes.length > 0
		},
		{
			label: "NEXT CYCLE",
			sub: `Cycle ${state.monitoringCycle + 1}`,
			active: false
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Monitoring"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[13px] text-muted-foreground mt-0.5",
				children: ["Forecast vs actual outcome tracking · Cycle ", state.monitoringCycle]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gap-2",
				onClick: () => dispatch({ type: "RUN_NEXT_CYCLE" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Run next cycle"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg p-5 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[13px] font-semibold text-foreground mb-4",
				children: "Monitoring pipeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 flex-wrap",
				children: pipelineSteps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `text-center px-4 py-3 rounded border ${s.active ? "border-cfc-amber/40 bg-cfc-amber/8" : "border-border bg-muted/30"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-[12px] font-bold ${s.active ? "text-cfc-amber" : "text-muted-foreground"}`,
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mt-0.5",
							children: s.sub
						})]
					}), i < pipelineSteps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-4 w-4 text-muted-foreground rotate-[-90deg]" })]
				}, s.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-4 mb-5",
			children: [
				{
					label: "Forecast accuracy",
					value: latestCycleOutcomes.length > 0 ? `${calib.accuracy}%` : "—"
				},
				{
					label: "MAPE",
					value: latestCycleOutcomes.length > 0 ? `${calib.mape}%` : "—"
				},
				{
					label: "MAE",
					value: latestCycleOutcomes.length > 0 ? inr(calib.mae) : "—"
				},
				{
					label: "Coverage",
					value: latestCycleOutcomes.length > 0 ? `${calib.coverage}%` : "—"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground uppercase tracking-wide",
					children: s.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[22px] font-bold text-foreground mt-1",
					children: s.value
				})]
			}, s.label))
		}),
		latestCycleOutcomes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg p-5 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[14px] font-semibold text-foreground mb-4",
				children: "Forecast vs Actual"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 220,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: chartData,
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
							dataKey: "name",
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
							dataKey: "forecast",
							name: "Forecast",
							fill: "var(--color-cfc-amber)",
							fillOpacity: .7,
							radius: [
								2,
								2,
								0,
								0
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "actual",
							name: "Actual",
							fill: "var(--color-foreground)",
							fillOpacity: .8,
							radius: [
								2,
								2,
								0,
								0
							]
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-3 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[14px] font-semibold text-foreground",
					children: "Outcome tracking"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-border bg-muted/30",
					children: [
						"Borrower",
						"State",
						"Forecast",
						"Actual",
						"Error %",
						"Outcome"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-2.5 px-4",
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children: latestCycleOutcomes.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 px-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: o.borrowerName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: o.borrowerId
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4 text-muted-foreground",
								children: o.state
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: inr(o.forecast)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: inr(o.actual)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 px-4",
								style: { color: Math.abs(o.errorPct) > 10 ? "var(--color-danger)" : "var(--color-muted-foreground)" },
								children: [
									o.errorPct > 0 ? "+" : "",
									o.errorPct,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: OUTCOME_COLORS[o.outcome],
									children: o.outcome
								})
							})
						]
					}, o.borrowerId))
				})]
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-16 bg-card border border-border rounded-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[15px] font-medium text-foreground",
					children: "No outcomes recorded yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] text-muted-foreground mt-1",
					children: "Click \"Run next cycle\" to simulate outcomes and recalibrate forecasts."
				})
			]
		})
	] });
}
//#endregion
export { MonitoringPage as component };
