import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useApp } from "./store-BdGbiYXL.mjs";
import { f as cn, n as Button, t as AppShell } from "./AppShell-sdeg094X.mjs";
import { a as YAxis, d as Bar, f as Pie, h as Tooltip, l as CartesianGrid, m as ResponsiveContainer, n as PieChart, o as XAxis, p as Cell, r as BarChart } from "../_libs/recharts+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-insights-BJ4MjQks.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var STATE_COLORS = {
	Stable: "#3F7957",
	"Seasonal Dip": "#536B87",
	"Emerging Stress": "#B47720",
	"Structural Decline": "#B64C3D"
};
var WEIGHT_KEYS = [
	"CBR",
	"RV",
	"TM",
	"RTR",
	"USD",
	"ESI"
];
var WEIGHT_LABELS = {
	CBR: "Cash Buffer Ratio",
	RV: "Residual Volatility",
	TM: "Trend Momentum",
	RTR: "Repayment Track Record",
	USD: "Unexplained Seasonal Deviation",
	ESI: "Expense Shock Index"
};
var WEIGHT_DEFAULTS = {
	CBR: 25,
	RV: 15,
	TM: 20,
	RTR: 15,
	USD: 15,
	ESI: 10
};
function ModelInsightsPage() {
	const { state, dispatch } = useApp();
	const [weights, setWeights] = (0, import_react.useState)({ ...state.modelConfig.weights });
	const [saved, setSaved] = (0, import_react.useState)(false);
	const total = Object.values(weights).reduce((s, v) => s + v, 0);
	const isValid = Math.abs(total - 100) < 1;
	function setWeight(key, val) {
		setWeights((prev) => ({
			...prev,
			[key]: val
		}));
		setSaved(false);
	}
	function saveConfig() {
		const newConfig = {
			...state.modelConfig,
			weights,
			version: `cfc-model-2026.09.${Date.now().toString(36)}`
		};
		dispatch({
			type: "UPDATE_CONFIG",
			config: newConfig
		});
		setSaved(true);
	}
	function resetWeights() {
		setWeights({ ...WEIGHT_DEFAULTS });
		setSaved(false);
	}
	const stateDistribution = (0, import_react.useMemo)(() => {
		const counts = {
			Stable: 0,
			"Seasonal Dip": 0,
			"Emerging Stress": 0,
			"Structural Decline": 0
		};
		for (const a of Object.values(state.analyses)) counts[a.state]++;
		return Object.entries(counts).map(([name, value]) => ({
			name,
			value
		}));
	}, [state.analyses]);
	const rsiDistData = (0, import_react.useMemo)(() => {
		const buckets = [
			{
				range: "0–20",
				min: 0,
				max: 20,
				count: 0
			},
			{
				range: "21–40",
				min: 21,
				max: 40,
				count: 0
			},
			{
				range: "41–60",
				min: 41,
				max: 60,
				count: 0
			},
			{
				range: "61–80",
				min: 61,
				max: 80,
				count: 0
			},
			{
				range: "81–100",
				min: 81,
				max: 100,
				count: 0
			}
		];
		for (const a of Object.values(state.analyses)) {
			const v = a.rsi.value;
			const b = buckets.find((bk) => v >= bk.min && v <= bk.max);
			if (b) b.count++;
		}
		return buckets;
	}, [state.analyses]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: "Model Insights"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] text-muted-foreground mt-0.5",
			children: "RSI model configuration, distribution, and feature importance"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-3 gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-1 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[14px] font-semibold text-foreground",
							children: "RSI weights"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `text-[12px] font-semibold ${isValid ? "text-success" : "text-danger"}`,
							children: [
								"Total: ",
								total,
								"%"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: WEIGHT_KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[12px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: WEIGHT_LABELS[key]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-muted-foreground",
									children: [weights[key], "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 0,
								max: 40,
								step: 1,
								value: [weights[key]],
								onValueChange: ([v]) => setWeight(key, v ?? 0),
								className: "w-full"
							})]
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1 text-[12px]",
							onClick: saveConfig,
							disabled: !isValid,
							children: saved ? "✓ Saved" : "Save configuration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "text-[12px]",
							onClick: resetWeights,
							children: "Reset"
						})]
					}),
					!isValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-danger mt-2",
						children: "Weights must sum to exactly 100%."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground/60 mt-3 border-t border-border pt-3",
						children: "⚠ Prototype configuration. Changes affect all future RSI calculations and are reflected in the model version."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground mb-3",
						children: "Stress thresholds"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 text-[12px]",
						children: [
							{
								label: "Stable",
								range: "0–30",
								color: "text-success"
							},
							{
								label: "Seasonal Dip",
								range: "31–50",
								color: "text-info"
							},
							{
								label: "Emerging Stress",
								range: "51–70",
								color: "text-warning"
							},
							{
								label: "Structural Decline",
								range: "71–100",
								color: "text-danger"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-medium ${s.color}`,
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-muted-foreground",
								children: s.range
							})]
						}, s.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground/60 mt-3 border-t border-border pt-3",
						children: "⚠ Prototype configuration. Not editable in this build."
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-2 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground mb-3",
						children: "Stress state distribution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 160,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: stateDistribution,
								cx: "50%",
								cy: "50%",
								outerRadius: 70,
								dataKey: "value",
								paddingAngle: 2,
								children: stateDistribution.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									fill: STATE_COLORS[entry.name],
									opacity: .85
								}, entry.name))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
								if (!active || !payload?.length) return null;
								const d = payload[0];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-card border border-border rounded shadow p-2 text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: d.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: [String(d.value), " borrowers"]
									})]
								});
							} })] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: stateDistribution.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[12px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-3 w-3 rounded-full",
										style: { background: STATE_COLORS[s.name] }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold ml-auto",
										children: s.value
									})
								]
							}, s.name))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground mb-3",
						children: "RSI distribution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 160,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: rsiDistData,
							margin: {
								top: 0,
								right: 8,
								bottom: 0,
								left: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "range",
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
									width: 30
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
									if (!active || !payload?.length) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-card border border-border rounded shadow p-2 text-[12px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-medium",
											children: ["RSI ", label]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: [String(payload[0]?.value), " borrowers"]
										})]
									});
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "count",
									name: "Borrowers",
									fill: "var(--color-cfc-amber)",
									fillOpacity: .75,
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground mb-3",
						children: "Structuring rules"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: Object.entries(state.modelConfig.rules).map(([state_, plans]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-36 font-medium text-foreground shrink-0",
								children: state_
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-muted border border-border px-2 py-0.5 rounded text-[11px] text-muted-foreground",
									children: p
								}, p))
							})]
						}, state_))
					})]
				})
			]
		})]
	})] });
}
//#endregion
export { ModelInsightsPage as component };
