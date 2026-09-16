import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp, n as DEMO_BORROWERS, o as inr, r as analyzeBorrower } from "./_ssr/store-BdGbiYXL.mjs";
import { _ as useNavigate, v as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_id-M3_Av4cB.mjs";
import { B as ArrowDown, E as CircleCheck, L as ArrowUp, N as Calendar, O as ChevronRight, S as Clock, b as Eye, c as Star, k as ChevronLeft, p as RefreshCw, u as Shield, v as Layers, x as DollarSign, z as ArrowRight } from "./_libs/lucide-react.mjs";
import { a as DialogHeader, c as SheetContent, d as buttonVariants, f as cn, i as DialogContent, l as SheetHeader, n as Button, o as DialogTitle, r as Dialog, s as Sheet, t as AppShell, u as SheetTitle } from "./_ssr/AppShell-sdeg094X.mjs";
import { t as StressStateBadge } from "./_ssr/StressStateBadge-D-rlpoag.mjs";
import { a as YAxis, c as Line, h as Tooltip, i as LineChart, l as CartesianGrid, m as ResponsiveContainer, o as XAxis, s as Area, t as ComposedChart, u as ReferenceLine } from "./_libs/recharts+[...].mjs";
import { t as DecompositionChart } from "./_ssr/DecompositionChart-Dkuw0vec.mjs";
import { t as Label } from "./_ssr/label-sDalcsGp.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-CuIia4UB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DKkBjGq6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CashFlowChart({ analysis }) {
	const [horizon, setHorizon] = (0, import_react.useState)("12M");
	const data = (0, import_react.useMemo)(() => {
		const historyCount = horizon === "6M" ? 6 : horizon === "12M" ? 12 : 18;
		const history = analysis.borrower.history.slice(-historyCount).map((p) => ({
			period: p.label,
			income: p.income,
			expense: p.expense,
			repayment: p.repayment,
			net: p.income - p.expense - p.repayment,
			type: "actual",
			lower: void 0,
			upper: void 0
		}));
		const forecast = analysis.forecast.map((f) => ({
			period: f.period,
			income: f.pointEstimate,
			expense: analysis.expectedExpense,
			repayment: analysis.borrower.loan.installment,
			net: f.pointEstimate - analysis.expectedExpense - analysis.borrower.loan.installment,
			type: "forecast",
			lower: f.lowerBound,
			upper: f.upperBound
		}));
		return [...history, ...forecast];
	}, [analysis, horizon]);
	const splitPeriod = data[data.filter((d) => d.type === "actual").length - 1]?.period;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold text-cfc-amber uppercase tracking-wider",
					children: "Baseline Outlook"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] font-medium text-foreground",
					children: "What happens to the borrower's cash flow if nothing changes?"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						"6M",
						"12M",
						"18M"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setHorizon(h),
						className: `px-3 py-1 text-[12px] font-medium rounded border transition-colors ${horizon === h ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted-foreground border-border hover:border-foreground/30"}`,
						children: h
					}, h))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 text-[11px] text-muted-foreground bg-muted/40 px-3 py-2 rounded border border-border flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-5 h-0.5 bg-foreground" }), "Actual"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-5 h-0.5 border-t-2 border-dashed border-cfc-amber" }), "Forecast"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-5 h-2 bg-cfc-amber/20 rounded" }), "Confidence band"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-5 h-0.5 bg-danger opacity-70" }), "Expenses"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-5 h-0.5 bg-warning opacity-70" }), "Repayment"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 290,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
					data,
					margin: {
						top: 18,
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
								fontSize: 11,
								fill: "var(--color-muted-foreground)"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fontSize: 11,
								fill: "var(--color-muted-foreground)"
							},
							axisLine: false,
							tickLine: false,
							tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`,
							width: 48
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
							if (!active || !payload?.length) return null;
							const entry = data.find((d) => d.period === label);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded shadow-md p-3 text-[12px] min-w-[160px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground mb-2",
										children: label
									}),
									payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground capitalize",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											style: { color: p.color },
											children: inr(Number(p.value))
										})]
									}, p.name)),
									entry?.type === "forecast" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-[11px] text-muted-foreground border-t border-border pt-2",
										children: [
											"Band: ",
											inr(entry.lower ?? 0),
											" – ",
											inr(entry.upper ?? 0)
										]
									})
								]
							});
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							dataKey: "upper",
							stroke: "none",
							fill: "var(--color-cfc-amber)",
							fillOpacity: .08,
							name: "upper",
							legendType: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							dataKey: "lower",
							stroke: "none",
							fill: "var(--color-background)",
							fillOpacity: 1,
							name: "lower",
							legendType: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							dataKey: "income",
							name: "income",
							stroke: "var(--color-foreground)",
							strokeWidth: 2,
							dot: false,
							strokeDasharray: (d) => d.type === "forecast" ? "5 3" : void 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							dataKey: "expense",
							name: "expense",
							stroke: "var(--color-danger)",
							strokeWidth: 1.5,
							strokeOpacity: .7,
							dot: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							dataKey: "repayment",
							name: "repayment",
							stroke: "var(--color-warning)",
							strokeWidth: 1.5,
							strokeOpacity: .7,
							dot: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							dataKey: "net",
							name: "net cash",
							stroke: "var(--color-success)",
							strokeWidth: 1.5,
							strokeOpacity: .8,
							dot: false,
							strokeDasharray: "4 2"
						}),
						splitPeriod && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
							x: splitPeriod,
							stroke: "var(--color-foreground)",
							strokeDasharray: "3 3",
							label: {
								value: "TODAY",
								position: "top",
								fontSize: 10,
								fontWeight: "bold",
								fill: "var(--color-foreground)"
							}
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border rounded-lg p-4 bg-muted/20 space-y-3 mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-cfc-amber uppercase tracking-wider",
						children: "WHAT THE FORECAST SAYS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-medium text-foreground mt-0.5",
						children: analysis.state === "Seasonal Dip" ? "Projected cash flow remains pressured, but the decline is consistent with the borrower's historical seasonal pattern." : analysis.state === "Structural Decline" ? "Projected cash flow is negative under current installment obligations due to structural decline in earnings." : analysis.state === "Emerging Stress" ? "Projected cash flow buffer is narrowing due to recent expense growth and income variance." : "Projected cash flow provides adequate buffer for current loan obligations."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Expected inflow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[15px] font-semibold text-foreground mt-0.5",
									children: inr(analysis.expectedInflow)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Expected expenses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[15px] font-semibold text-danger mt-0.5",
									children: inr(analysis.expectedExpense)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Repayment obligation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[15px] font-semibold text-warning mt-0.5",
									children: inr(analysis.borrower.loan.installment)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Projected buffer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[15px] font-semibold mt-0.5 ${analysis.cashBuffer >= 0 ? "text-success" : "text-danger"}`,
									children: inr(analysis.cashBuffer)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[12px] text-muted-foreground pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Forecast confidence:" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [analysis.forecastConfidence, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 h-1.5 bg-border rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-cfc-amber rounded-full",
									style: { width: `${analysis.forecastConfidence}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-mono",
								children: "STL + Prophet Engine"
							})
						]
					})
				]
			})
		]
	});
}
var STATE_COLORS = {
	Stable: "#3F7957",
	"Seasonal Dip": "#536B87",
	"Emerging Stress": "#B47720",
	"Structural Decline": "#B64C3D"
};
/** SVG arc gauge for the RSI score. Pure SVG — no third-party gauge library needed. */
function RSIGauge({ value, state, size = 180 }) {
	const R = size / 2 - 16;
	const cx = size / 2;
	const cy = size / 2 + 10;
	const startAngle = -210;
	const endAngle = 30;
	const totalArc = 240;
	function polar(angleDeg, r) {
		const rad = (angleDeg - 90) * Math.PI / 180;
		return {
			x: cx + r * Math.cos(rad),
			y: cy + r * Math.sin(rad)
		};
	}
	function arcPath(fromDeg, toDeg, r) {
		const s = polar(fromDeg, r);
		const e = polar(toDeg, r);
		const large = toDeg - fromDeg > 180 ? 1 : 0;
		return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
	}
	const fillAngle = startAngle + value / 100 * totalArc;
	const color = STATE_COLORS[state];
	const zones = [
		{
			from: startAngle,
			to: -138,
			color: "#3F7957"
		},
		{
			from: -138,
			to: -90,
			color: "#536B87"
		},
		{
			from: -90,
			to: -42,
			color: "#B47720"
		},
		{
			from: -42,
			to: endAngle,
			color: "#B64C3D"
		}
	];
	const tickAngles = [
		startAngle,
		-138,
		-90,
		-42,
		endAngle
	];
	const tickLabels = [
		"0",
		"30",
		"50",
		"70",
		"100"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size * .75,
			viewBox: `0 0 ${size} ${size * .75}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: arcPath(startAngle, endAngle, R),
					fill: "none",
					stroke: "var(--color-border)",
					strokeWidth: 12,
					strokeLinecap: "round"
				}),
				zones.map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: arcPath(z.from, z.to, R),
					fill: "none",
					stroke: z.color,
					strokeWidth: 4,
					strokeLinecap: "butt",
					opacity: .25
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: arcPath(startAngle, fillAngle, R),
					fill: "none",
					stroke: color,
					strokeWidth: 12,
					strokeLinecap: "round",
					style: { transition: "all 0.6s ease" }
				}),
				tickAngles.map((a, i) => {
					const outer = polar(a, R + 18);
					const inner = polar(a, R + 10);
					const label = polar(a, R + 26);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: inner.x,
						y1: inner.y,
						x2: outer.x,
						y2: outer.y,
						stroke: "var(--color-muted-foreground)",
						strokeWidth: 1,
						opacity: .5
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: label.x,
						y: label.y,
						textAnchor: "middle",
						dominantBaseline: "central",
						fontSize: 8,
						fill: "var(--color-muted-foreground)",
						opacity: .7,
						children: tickLabels[i]
					})] }, i);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx,
					y: cy - 8,
					textAnchor: "middle",
					dominantBaseline: "middle",
					fontSize: 36,
					fontWeight: 700,
					fill: color,
					fontFamily: "Inter, system-ui, sans-serif",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx,
					y: cy + 18,
					textAnchor: "middle",
					dominantBaseline: "middle",
					fontSize: 10,
					fill: "var(--color-muted-foreground)",
					fontFamily: "Inter, system-ui, sans-serif",
					children: "/ 100"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] font-semibold",
				style: { color },
				children: state
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground mt-0.5",
				children: "Repayment Stress Index"
			})]
		})]
	});
}
var COMPONENT_META = {
	CBR: {
		label: "Cash Buffer Ratio",
		description: "Projected inflow minus expenses and repayment obligation, relative to installment.",
		maxWeight: 25
	},
	RV: {
		label: "Residual Volatility",
		description: "Unexplained income variance after removing trend and seasonal components.",
		maxWeight: 15
	},
	TM: {
		label: "Trend Momentum",
		description: "Direction and strength of the six-period income trend slope.",
		maxWeight: 20
	},
	RTR: {
		label: "Repayment Track Record",
		description: "Proportion of scheduled repayments made on time in the last 12 periods.",
		maxWeight: 15
	},
	USD: {
		label: "Unexplained Seasonal Deviation",
		description: "Degree to which income decline is not explained by the learned seasonal profile.",
		maxWeight: 15
	},
	ESI: {
		label: "Expense Shock Index",
		description: "Recent increase in expense-to-income ratio versus 6-period baseline.",
		maxWeight: 10
	}
};
function RSIComponents({ rsi }) {
	const components = rsi.components;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-[12px] font-bold text-cfc-amber uppercase tracking-wider",
				children: "WHY THIS SCORE?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[12px] text-muted-foreground mt-0.5",
				children: [
					"Six model feature components contributing to the Repayment Stress Index score of ",
					rsi.value,
					"."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: Object.entries(components).map(([key, value]) => {
				const meta = COMPONENT_META[key];
				if (!meta) return null;
				const pct = value / meta.maxWeight * 100;
				const severity = pct > 75 ? "bg-danger text-white" : pct > 40 ? "bg-warning text-white" : "bg-success text-white";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-lg p-3 space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] font-semibold text-foreground",
								children: meta.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-[11px] font-mono text-muted-foreground",
								children: [
									"(",
									key,
									")"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-muted-foreground font-mono",
									children: [
										"Weight: ",
										meta.maxWeight,
										" pts"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[12px] font-bold font-mono px-2 py-0.5 rounded bg-muted/80 text-foreground",
									children: [
										"+",
										value.toFixed(1),
										" pts"
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 bg-border rounded-full overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-full rounded-full transition-all", severity.split(" ")[0]),
								style: { width: `${Math.min(100, pct)}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground leading-relaxed pt-0.5",
							children: meta.description
						})
					]
				}, key);
			})
		})]
	});
}
function RSIHistory({ history }) {
	const maxVal = Math.max(...history.map((h) => h.value), 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 160,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data: history,
			margin: {
				top: 4,
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
					dataKey: "cycle",
					tick: {
						fontSize: 10,
						fill: "var(--color-muted-foreground)"
					},
					axisLine: false,
					tickLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					domain: [0, Math.max(maxVal, 100)],
					tick: {
						fontSize: 10,
						fill: "var(--color-muted-foreground)"
					},
					axisLine: false,
					tickLine: false,
					width: 28
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
					if (!active || !payload?.length) return null;
					const v = Number(payload[0]?.value ?? 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded shadow p-2 text-[12px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mb-1",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold",
							style: { color: v <= 30 ? "var(--color-success)" : v <= 50 ? "var(--color-info)" : v <= 70 ? "var(--color-warning)" : "var(--color-danger)" },
							children: [
								"RSI ",
								v,
								" — ",
								v <= 30 ? "Stable" : v <= 50 ? "Seasonal Dip" : v <= 70 ? "Emerging Stress" : "Structural Decline"
							]
						})]
					});
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 30,
					stroke: "var(--color-success)",
					strokeDasharray: "3 3",
					strokeOpacity: .4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 50,
					stroke: "var(--color-info)",
					strokeDasharray: "3 3",
					strokeOpacity: .4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 70,
					stroke: "var(--color-warning)",
					strokeDasharray: "3 3",
					strokeOpacity: .4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					dataKey: "value",
					stroke: "var(--color-cfc-amber)",
					strokeWidth: 2,
					dot: {
						fill: "var(--color-cfc-amber)",
						r: 4,
						strokeWidth: 0
					},
					activeDot: {
						r: 6,
						fill: "var(--color-cfc-amber)"
					},
					name: "RSI"
				})
			]
		})
	});
}
var COMPONENT_LABELS = {
	CBR: "Cash Buffer Ratio",
	RV: "Residual Volatility",
	TM: "Trend Momentum",
	RTR: "Repayment Track Record",
	USD: "Unexplained Seasonal Deviation",
	ESI: "Expense Shock Index"
};
function EvidenceCards({ evidence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-[14px] font-bold text-foreground",
				children: "Why the system reached this conclusion"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground mt-0.5",
				children: "Review the evidence before making a decision."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: evidence.map((e, i) => {
				const isSupports = e.direction === "supports";
				const Icon = isSupports ? ArrowUp : ArrowDown;
				const dirColor = isSupports ? "text-danger" : "text-success";
				const dirBg = isSupports ? "bg-danger/8" : "bg-success/8";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("border rounded-lg p-4 space-y-2 bg-card", isSupports ? "border-danger/20 bg-danger/2" : "border-success/20 bg-success/2"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5", dirBg),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: cn("h-3.5 w-3.5", dirColor),
								"aria-hidden": true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider block",
										children: "SIGNAL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] font-bold text-foreground",
										children: e.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-[11px] font-semibold px-2 py-0.5 rounded", isSupports ? "bg-danger/10 text-danger border border-danger/20" : "bg-success/10 text-success border border-success/20"),
										children: isSupports ? "↑ Raises Stress" : "↓ Counters Stress"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 bg-muted/40 rounded p-2 text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground block",
										children: "VALUE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-foreground",
										children: e.value
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground block",
										children: "WEIGHT IMPACT"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono font-semibold text-foreground",
										children: [
											"+",
											e.contribution.toFixed(1),
											" pts (",
											COMPONENT_LABELS[e.component] ?? e.component,
											")"
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5",
									children: "INTERPRETATION"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-foreground/90 leading-relaxed",
									children: e.statement
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground/70 border-t border-border pt-1.5 mt-1",
									children: ["Telemetry Source: ", e.source]
								})
							]
						})]
					})
				}, i);
			})
		})]
	});
}
function RepaymentPlans({ plans, onReview, decidedPlanId }) {
	const recoveryColor = {
		Strong: "text-success",
		Moderate: "text-warning",
		Limited: "text-muted-foreground"
	};
	const recommendedPlan = plans.find((p) => p.recommended) ?? plans[0];
	const alternativePlans = plans.filter((p) => p.id !== recommendedPlan?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold text-cfc-amber uppercase tracking-widest block",
					children: "SYSTEM RECOMMENDATION"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted-foreground mt-0.5",
					children: "Based on the forecast, stress classification, repayment history and supporting evidence."
				})]
			}),
			recommendedPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("border-2 rounded-xl p-5 relative transition-all bg-card shadow-xs", decidedPlanId === recommendedPlan.id ? "border-success ring-2 ring-success/30" : "border-cfc-amber/50 bg-cfc-amber/5"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-[11px] font-bold text-cfc-amber bg-cfc-amber/15 border border-cfc-amber/30 px-2.5 py-1 rounded-full uppercase tracking-wider",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-cfc-amber text-cfc-amber" }), "RECOMMENDED OPTION"]
						}), decidedPlanId === recommendedPlan.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold text-success bg-success/15 border border-success/30 px-2.5 py-1 rounded-full",
							children: "✓ APPROVED DECISION"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pr-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[16px] font-bold text-foreground",
							children: recommendedPlan.type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mt-0.5",
							children: recommendedPlan.summary
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background/80 border border-border rounded-lg p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground uppercase tracking-wide",
										children: "Proposed Installment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[16px] font-bold text-cfc-amber mt-0.5",
										children: inr(recommendedPlan.installment)
									}),
									recommendedPlan.recoveryInstallment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: ["Step-up: ", inr(recommendedPlan.recoveryInstallment)]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background/80 border border-border rounded-lg p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase tracking-wide",
									children: "Projected Buffer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: cn("text-[16px] font-bold mt-0.5", recommendedPlan.projectedBuffer >= 0 ? "text-success" : "text-danger"),
									children: [inr(recommendedPlan.projectedBuffer), "/m"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background/80 border border-border rounded-lg p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase tracking-wide",
									children: "Tenure Impact"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[16px] font-bold text-foreground mt-0.5",
									children: [
										recommendedPlan.revisedTenure,
										"m",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-normal text-muted-foreground ml-1",
											children: [
												"(",
												recommendedPlan.tenureDelta >= 0 ? "+" : "",
												recommendedPlan.tenureDelta,
												"m)"
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background/80 border border-border rounded-lg p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase tracking-wide",
									children: "Recovery Impact"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-[16px] font-bold mt-0.5", recoveryColor[recommendedPlan.recoveryImpact]),
									children: recommendedPlan.recoveryImpact
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 bg-muted/40 border border-border rounded-lg px-3.5 py-2 text-[12px] flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground font-medium",
							children: "Proposed Schedule:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono font-bold text-foreground",
							children: recommendedPlan.schedule
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border/80 pt-3 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-cfc-amber uppercase tracking-wider block",
							children: "WHY THIS OPTION?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] text-foreground/90 italic leading-relaxed",
							children: [
								"“",
								recommendedPlan.reason,
								"”"
							]
						})]
					}),
					recommendedPlan.requiresEscalation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-warning font-medium mt-2",
						children: "⚠ Requires branch manager escalation prior to execution."
					}),
					decidedPlanId !== recommendedPlan.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onReview(recommendedPlan.id),
						className: "mt-4 w-full flex items-center justify-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-xs",
						children: ["Review recommendation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					})
				]
			}, recommendedPlan.id),
			alternativePlans.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest block",
					children: "ALTERNATIVE REPAYMENT OPTIONS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-3",
					children: alternativePlans.map((plan) => {
						const isDecided = decidedPlanId === plan.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("border border-border rounded-lg p-4 bg-card space-y-3 relative transition-all", isDecided && "ring-2 ring-success/40 border-success"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border",
										children: "ALTERNATIVE"
									}), isDecided && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded",
										children: "✓ APPROVED"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									className: "text-[14px] font-bold text-foreground",
									children: plan.type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground mt-0.5 line-clamp-2",
									children: plan.summary
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 text-[11px] bg-muted/30 border border-border rounded p-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block",
											children: "Installment"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground font-mono",
											children: inr(plan.installment)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block",
											children: "Projected Buffer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("font-bold font-mono", plan.projectedBuffer >= 0 ? "text-success" : "text-danger"),
											children: inr(plan.projectedBuffer)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block",
											children: "Tenure Impact"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [
												plan.revisedTenure,
												"m (",
												plan.tenureDelta >= 0 ? "+" : "",
												plan.tenureDelta,
												"m)"
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block",
											children: "Recovery Impact"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("font-semibold", recoveryColor[plan.recoveryImpact]),
											children: plan.recoveryImpact
										})] })
									]
								}),
								!isDecided && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onReview(plan.id),
									className: "w-full text-[12px] font-medium py-1.5 px-3 rounded border border-border bg-transparent text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1",
									children: ["Review alternative ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
								})
							]
						}, plan.id);
					})
				})]
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function ApprovalDialog({ open, onClose, analysis, plan, notes, onConfirm }) {
	const borrower = analysis.borrower;
	const loan = borrower.loan;
	const now = /* @__PURE__ */ new Date();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "text-[16px]",
					children: "Confirm plan approval"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 text-[12px]",
							children: [
								{
									label: "Borrower",
									value: borrower.name
								},
								{
									label: "Borrower ID",
									value: borrower.id
								},
								{
									label: "Selected plan",
									value: plan.type
								},
								{
									label: "RSI at decision",
									value: `${analysis.rsi.value} / 100`
								},
								{
									label: "State",
									value: analysis.state
								},
								{
									label: "Seasonal match",
									value: `${analysis.seasonalMatch}%`
								},
								{
									label: "Officer",
									value: "Priya Sharma"
								},
								{
									label: "Timestamp",
									value: now.toLocaleString()
								}
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/50 rounded px-2.5 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: r.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: r.value
								})]
							}, r.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 text-[12px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-border rounded px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mb-1",
										children: "Current schedule"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold",
										children: [
											inr(loan.installment),
											" × ",
											loan.remainingPeriods,
											"m"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-cfc-amber/40 bg-cfc-amber/5 rounded px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mb-1",
										children: "Proposed schedule"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-cfc-amber",
										children: plan.schedule
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-border rounded px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mb-1",
										children: "Projected buffer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-success",
										children: [inr(plan.projectedBuffer), "/m"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted/30 border border-border rounded px-3 py-2 text-[11px] space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground",
								children: [
									"Evidence summary (",
									analysis.evidence.length,
									" signals)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-tight",
								children: analysis.evidence.map((e) => `${e.title}: ${e.value}`).join(" · ")
							})]
						}),
						notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted/50 rounded px-3 py-2 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mb-1",
								children: "Officer notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-foreground italic",
								children: [
									"“",
									notes,
									"”"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-warning/30 bg-warning/8 rounded px-3 py-2.5 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-warning mb-1",
								children: "⚠ Important"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "This records the officer's decision. The prototype does not automatically execute a loan-system change. The decision and evidence snapshot will be saved to the audit log."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					className: "text-[13px]",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: onConfirm,
					className: "bg-success text-white hover:bg-success/90 text-[13px]",
					children: "Confirm approval"
				})] })
			]
		})
	});
}
var REJECTION_REASONS = [
	"Plan not affordable for the borrower",
	"Insufficient evidence for restructuring",
	"Borrower prefers current schedule",
	"Needs branch manager review",
	"Requires further verification",
	"Other"
];
function RejectionDialog({ open, onClose, analysis, plan, onConfirm }) {
	const [selectedReason, setSelectedReason] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const canConfirm = selectedReason !== "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "text-[16px]",
					children: "Reject recommendation"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[13px] font-medium text-foreground mb-1",
							children: [
								analysis.borrower.name,
								" · ",
								plan.type
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground",
							children: "Rejecting this recommendation will create an audit record. The current loan schedule will remain unchanged."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-[12px] font-medium",
								children: "Reason for rejection *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1.5",
								children: REJECTION_REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedReason(r),
									className: cn("w-full text-left text-[13px] px-3 py-2 rounded border transition-colors", selectedReason === r ? "border-danger/40 bg-danger/8 text-danger" : "border-border hover:border-border/80 hover:bg-muted/50"),
									children: r
								}, r))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "rejection-notes",
								className: "text-[12px]",
								children: "Additional notes (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "rejection-notes",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								placeholder: "Add context or instructions for follow-up…",
								rows: 3,
								className: "text-[13px]"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					className: "text-[13px]",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => canConfirm && onConfirm(selectedReason, notes),
					disabled: !canConfirm,
					className: "bg-danger text-white hover:bg-danger/90 text-[13px] disabled:opacity-50",
					children: "Confirm rejection"
				})] })
			]
		})
	});
}
function PlanReviewDrawer({ open, onClose, analysis, planId, onApprove, onReject, onModify }) {
	const [step, setStep] = (0, import_react.useState)(1);
	const [approvalOpen, setApprovalOpen] = (0, import_react.useState)(false);
	const [rejectionOpen, setRejectionOpen] = (0, import_react.useState)(false);
	const [officerNotes, setOfficerNotes] = (0, import_react.useState)("");
	const plan = analysis.plans.find((p) => p.id === planId);
	const [modInstallment, setModInstallment] = (0, import_react.useState)(plan?.installment ?? 0);
	const [modTenure, setModTenure] = (0, import_react.useState)(plan?.revisedTenure ?? 0);
	const [modRecovery, setModRecovery] = (0, import_react.useState)(plan?.recoveryInstallment ?? 0);
	const [modifying, setModifying] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	if (!plan) return null;
	const borrower = analysis.borrower;
	const loan = borrower.loan;
	const modBuffer = analysis.expectedInflow - analysis.expectedExpense - modInstallment;
	const STEPS = [
		{
			n: 1,
			label: "Understand"
		},
		{
			n: 2,
			label: "Compare"
		},
		{
			n: 3,
			label: "Decide"
		},
		{
			n: 4,
			label: "Record"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open,
			onOpenChange: (v) => {
				if (!v) {
					onClose();
					setStep(1);
					setModifying(false);
				}
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "right",
				className: "w-[520px] max-w-full flex flex-col p-0 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
						className: "px-5 py-4 border-b border-border shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "text-[15px] font-semibold",
								children: "Review Recommendation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[12px] text-muted-foreground mt-0.5",
								children: [
									borrower.name,
									" · ",
									borrower.id,
									" · ",
									plan.type
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
								state: analysis.state,
								size: "sm"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-5 mt-4 border border-warning/30 bg-warning/8 rounded px-4 py-3 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] font-semibold text-warning",
							children: "⚠ Human review required"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mt-0.5",
							children: "This system recommendation requires officer approval before any action is taken. No loan restructuring will occur automatically."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-0 px-5 pt-4 shrink-0",
						children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setStep(s.n),
								className: cn("flex items-center gap-1.5 text-[12px] font-medium transition-colors", step === s.n ? "text-foreground" : step > s.n ? "text-success" : "text-muted-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold border", step === s.n ? "bg-foreground text-background border-foreground" : step > s.n ? "bg-success/15 text-success border-success/30" : "bg-transparent text-muted-foreground border-border"),
									children: step > s.n ? "✓" : s.n
								}), s.label]
							}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-2 h-px w-6 bg-border" })]
						}, s.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4",
						children: [
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[13px] font-semibold text-foreground",
										children: "Borrower Summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [
											{
												label: "RSI",
												value: `${analysis.rsi.value} / 100`
											},
											{
												label: "State",
												value: analysis.state
											},
											{
												label: "Seasonal match",
												value: `${analysis.seasonalMatch}%`
											},
											{
												label: "Trend",
												value: analysis.trendDirection
											},
											{
												label: "Cash buffer",
												value: inr(analysis.cashBuffer)
											},
											{
												label: "Expected inflow",
												value: inr(analysis.expectedInflow)
											},
											{
												label: "Loan balance",
												value: inr(loan.balance)
											},
											{
												label: "Current installment",
												value: inr(loan.installment)
											}
										].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-muted/50 rounded p-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: m.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[13px] font-semibold text-foreground mt-0.5",
												children: m.value
											})]
										}, m.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[13px] font-semibold text-foreground",
										children: "Classification rationale"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: analysis.evidence.slice(0, 3).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border border-border rounded p-2.5 text-[12px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: e.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("text-[11px] px-1.5 py-0.5 rounded", e.direction === "supports" ? "bg-danger/10 text-danger" : "bg-success/10 text-success"),
													children: e.direction === "supports" ? "↑ Stress" : "↓ Counter"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground",
												children: e.statement
											})]
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										onClick: () => setStep(2),
										children: "Review plan details →"
									})
								]
							}),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[13px] font-semibold text-foreground",
										children: "Plan Comparison"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border border-border rounded p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground uppercase tracking-wide mb-2",
													children: "Current schedule"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[20px] font-bold text-foreground",
													children: inr(loan.installment)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[12px] text-muted-foreground",
													children: [
														"× ",
														loan.remainingPeriods,
														" remaining"
													]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border border-cfc-amber/40 bg-cfc-amber/5 rounded p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-muted-foreground uppercase tracking-wide mb-2",
													children: [
														"Proposed (",
														plan.type,
														")"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[20px] font-bold text-cfc-amber",
													children: inr(plan.installment)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[12px] text-muted-foreground",
													children: [
														"× ",
														plan.revisedTenure,
														" months"
													]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: [
											{
												label: "Projected buffer",
												current: inr(analysis.cashBuffer),
												proposed: inr(plan.projectedBuffer),
												good: plan.projectedBuffer > analysis.cashBuffer
											},
											{
												label: "Affordability",
												current: "—",
												proposed: `${plan.affordability}%`,
												good: plan.affordability > 70
											},
											{
												label: "Principal recovery",
												current: "100%",
												proposed: `${plan.principalRecovery}%`,
												good: plan.principalRecovery >= 96
											},
											{
												label: "Recovery impact",
												current: "—",
												proposed: plan.recoveryImpact,
												good: plan.recoveryImpact === "Strong"
											}
										].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center border border-border rounded px-3 py-2 text-[12px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground w-36 shrink-0",
													children: m.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-muted-foreground w-20",
													children: m.current
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("font-semibold ml-auto", m.good ? "text-success" : "text-warning"),
													children: m.proposed
												})
											]
										}, m.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/50 rounded px-3 py-2 text-[12px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Schedule: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-medium",
											children: plan.schedule
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										onClick: () => setStep(3),
										children: "Proceed to decision →"
									})
								]
							}),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[13px] font-semibold text-foreground",
										children: "Officer Decision"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-muted/50 rounded p-3 text-[12px] text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col gap-1",
											children: [
												"System recommendation",
												"Officer review (you are here)",
												"Officer decision",
												"Audit record",
												"Outcome monitoring"
											].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: cn("flex items-center gap-2", i === 1 && "font-semibold text-foreground"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("h-5 w-5 rounded-full flex items-center justify-center text-[10px]", i === 0 ? "bg-muted text-muted-foreground" : i === 1 ? "bg-cfc-amber text-white" : "bg-muted text-muted-foreground opacity-50"),
													children: i + 1
												}), s]
											}, i))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "officer-notes",
											className: "text-[12px]",
											children: "Officer notes (optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "officer-notes",
											value: officerNotes,
											onChange: (e) => setOfficerNotes(e.target.value),
											placeholder: "Add any observations or context for the audit record…",
											rows: 3,
											className: "text-[13px]"
										})]
									}),
									!modifying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setModifying(true),
										className: "text-[12px] text-muted-foreground underline hover:text-foreground",
										children: "I want to modify the plan values"
									}),
									modifying && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border border-border rounded p-3 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[12px] font-semibold text-foreground",
												children: "Modify plan values"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															className: "text-[11px]",
															children: "New installment (₹)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "number",
															value: modInstallment,
															onChange: (e) => setModInstallment(Number(e.target.value)),
															className: "text-[13px]"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															className: "text-[11px]",
															children: "Revised tenure (months)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "number",
															value: modTenure,
															onChange: (e) => setModTenure(Number(e.target.value)),
															className: "text-[13px]"
														})]
													}),
													plan.recoveryInstallment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															className: "text-[11px]",
															children: "Recovery installment (₹)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "number",
															value: modRecovery,
															onChange: (e) => setModRecovery(Number(e.target.value)),
															className: "text-[13px]"
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-muted/50 rounded p-2 text-[12px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Recalculated projected buffer: "
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("font-semibold", modBuffer >= 0 ? "text-success" : "text-danger"),
													children: inr(modBuffer)
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 pt-2",
										children: [modifying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "w-full bg-foreground text-background hover:bg-foreground/90",
											onClick: () => {
												onModify({
													...plan,
													installment: modInstallment,
													revisedTenure: modTenure,
													recoveryInstallment: modRecovery || void 0,
													projectedBuffer: modBuffer,
													tenureDelta: modTenure - loan.tenure
												}, officerNotes);
												setStep(4);
											},
											children: "Save modified recommendation"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "w-full bg-success text-white hover:bg-success/90",
											onClick: () => setApprovalOpen(true),
											children: "Approve plan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "w-full text-danger border-danger/30 hover:bg-danger/5",
											onClick: () => setRejectionOpen(true),
											children: "Reject recommendation"
										})]
									})
								]
							}),
							step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 text-center py-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-14 w-14 rounded-full bg-success/15 flex items-center justify-center mx-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl text-success",
											children: "✓"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[15px] font-bold text-foreground",
										children: "Decision recorded"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[12px] text-muted-foreground mt-1",
										children: "An officer decision and audit event have been recorded. No loan restructuring has been automatically executed by the prototype."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/50 rounded p-3 text-left text-[12px] space-y-1.5 border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Borrower: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: borrower.name
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Selected Plan: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: plan.type
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Officer: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: "Priya Sharma"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Timestamp: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-muted-foreground",
												children: (/* @__PURE__ */ new Date()).toLocaleString()
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "text-[12px] gap-1.5 border-border",
											onClick: () => {
												onClose();
												navigate({ to: "/audit-log" });
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), "View audit record →"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "text-[12px] gap-1.5 border-border",
											onClick: () => {
												onClose();
												navigate({ to: "/monitoring" });
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), "View monitoring →"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										className: "w-full text-[12px] text-muted-foreground",
										onClick: onClose,
										children: "Close review drawer"
									})
								]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalDialog, {
			open: approvalOpen,
			onClose: () => setApprovalOpen(false),
			analysis,
			plan,
			notes: officerNotes,
			onConfirm: () => {
				onApprove(plan, officerNotes);
				setApprovalOpen(false);
				setStep(4);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectionDialog, {
			open: rejectionOpen,
			onClose: () => setRejectionOpen(false),
			analysis,
			plan,
			onConfirm: (reason, notes) => {
				onReject(plan, reason, notes);
				setRejectionOpen(false);
				setStep(4);
			}
		})
	] });
}
function ScenarioSwitcher({ current, options }) {
	const router = useRouter();
	const [compareOpen, setCompareOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card border border-border rounded-lg p-3 space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground uppercase tracking-widest font-semibold",
					children: "DEMO SCENARIO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-cfc-amber bg-cfc-amber/10 px-1.5 py-0.5 rounded font-mono font-medium",
					children: "Hero Pair"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: options.map((opt) => {
					const isActive = opt.borrower.id === current.id;
					const slug = slugFor(opt.borrower);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => router.navigate({ to: `/borrowers/${slug}` }),
						className: cn("text-left rounded border px-3 py-2.5 transition-all", isActive ? "border-foreground bg-foreground/5 shadow-sm" : "border-border hover:border-foreground/30 hover:bg-muted/50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] font-semibold text-foreground leading-tight",
								children: opt.borrower.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: opt.borrower.occupation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 mt-1.5 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] font-mono font-bold text-foreground",
										children: ["RSI ", opt.rsi]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground",
										children: [opt.seasonalMatch, "% seasonal"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-semibold mt-1",
								style: { color: opt.state === "Structural Decline" ? "var(--color-danger)" : opt.state === "Seasonal Dip" ? "var(--color-info)" : "var(--color-success)" },
								children: opt.state
							})
						]
					}, opt.borrower.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setCompareOpen(true),
				className: "w-full text-center text-[11px] font-medium text-muted-foreground hover:text-foreground pt-1 flex items-center justify-center gap-1 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }), "Compare scenarios →"]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: compareOpen,
		onOpenChange: setCompareOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-[16px] font-bold",
				children: "Hero Scenario Comparison — Two income drops. Two different stories."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground",
				children: "Comparing temporary seasonal dip versus permanent structural revenue decline."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-info/30 bg-info/5 rounded-lg p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[14px] font-bold text-foreground",
								children: "Meena Krishnan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Farmer · BR-10482"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
								state: "Seasonal Dip",
								size: "sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card/80 border border-border rounded p-3 space-y-1 text-[12px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "RSI Score:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: "34 / 100"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Seasonal Match:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-info",
										children: "87%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Classification:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-info",
										children: "Seasonal Dip"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[12px] text-muted-foreground space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "Interpretation:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "italic",
								children: "\"Decline is strongly consistent with historical seasonality. Inflow is expected to recover after harvest lull.\""
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[12px] border-t border-info/20 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "System Recommendation:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-info font-medium mt-0.5",
								children: "Seasonal Step-Down Repayment"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setCompareOpen(false);
								router.navigate({ to: "/borrowers/meena" });
							},
							className: "w-full text-[12px] bg-info text-white font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-info/90 transition-colors",
							children: ["Analyse Meena ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-danger/30 bg-danger/5 rounded-lg p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[14px] font-bold text-foreground",
								children: "Suresh Kumar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Gig Worker · BR-10921"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
								state: "Structural Decline",
								size: "sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card/80 border border-border rounded p-3 space-y-1 text-[12px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "RSI Score:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: "76 / 100"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Seasonal Match:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-danger",
										children: "18%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Classification:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-danger",
										children: "Structural Decline"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[12px] text-muted-foreground space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "Interpretation:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "italic",
								children: "\"Current decline is poorly explained by historical seasonality and is accompanied by a persistent negative trend.\""
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[12px] border-t border-danger/20 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "System Recommendation:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-danger font-medium mt-0.5",
								children: "Temporary Moratorium & Restructure"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setCompareOpen(false);
								router.navigate({ to: "/borrowers/suresh" });
							},
							className: "w-full text-[12px] bg-danger text-white font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-danger/90 transition-colors",
							children: ["Analyse Suresh ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})
					]
				})]
			})]
		})
	})] });
}
function BorrowerAnalysisPage() {
	const { id } = Route.useParams();
	const { state, dispatch } = useApp();
	const navigate = useNavigate();
	const [reviewPlanId, setReviewPlanId] = (0, import_react.useState)(null);
	const [evidenceDrawerOpen, setEvidenceDrawerOpen] = (0, import_react.useState)(false);
	const borrower = (0, import_react.useMemo)(() => {
		return state.borrowers.find((b) => b.id.toLowerCase() === id || b.name.split(" ")[0]?.toLowerCase() === id.toLowerCase());
	}, [state.borrowers, id]);
	const analysis = (0, import_react.useMemo)(() => {
		if (!borrower) return null;
		if (state.analyses[borrower.id]) return state.analyses[borrower.id];
		return analyzeBorrower(borrower, state.modelConfig);
	}, [
		borrower,
		state.analyses,
		state.modelConfig
	]);
	if (!borrower || !analysis) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-semibold text-foreground",
				children: "Borrower not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: ["ID or slug: ", id]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-4",
				onClick: () => navigate({ to: "/borrowers" }),
				children: "Back to borrowers"
			})
		]
	}) });
	const loan = borrower.loan;
	const onTimeCount = borrower.history.slice(-12).filter((p) => p.paidOnTime).length;
	const approvedDecision = state.decisions.filter((d) => d.borrowerId === borrower.id && d.action === "Approved").slice(-1)[0];
	const scenarioOptions = DEMO_BORROWERS.slice(0, 2).map((b) => {
		const a = state.analyses[b.id] ?? analyzeBorrower(b, state.modelConfig);
		return {
			borrower: b,
			rsi: a.rsi.value,
			state: a.state,
			seasonalMatch: a.seasonalMatch
		};
	});
	const isDemoScenario = ["BR-10482", "BR-10921"].includes(borrower.id);
	function handleApprove(plan, notes) {
		const decision = {
			id: `DEC-${Date.now()}`,
			borrowerId: borrower.id,
			borrowerName: borrower.name,
			officerId: "OFF-001",
			officerName: state.currentUser.name,
			role: "Loan Officer",
			action: "Approved",
			planId: plan.id,
			planType: plan.type,
			previousSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
			newSchedule: plan.schedule,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			reason: "Officer approved after review",
			notes: notes || void 0,
			rsiAtDecision: analysis.rsi.value,
			stateAtDecision: analysis.state,
			evidenceSnapshot: analysis.evidence,
			configurationSnapshot: state.modelConfig,
			auditId: `AUD-${Date.now()}`,
			escalated: plan.requiresEscalation
		};
		dispatch({
			type: "APPROVE_PLAN",
			decision
		});
		setReviewPlanId(null);
	}
	function handleReject(plan, reason, notes) {
		const decision = {
			id: `DEC-${Date.now()}`,
			borrowerId: borrower.id,
			borrowerName: borrower.name,
			officerId: "OFF-001",
			officerName: state.currentUser.name,
			role: "Loan Officer",
			action: "Rejected",
			planId: plan.id,
			planType: plan.type,
			previousSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
			newSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			reason,
			notes: notes || void 0,
			rsiAtDecision: analysis.rsi.value,
			stateAtDecision: analysis.state,
			evidenceSnapshot: analysis.evidence,
			configurationSnapshot: state.modelConfig,
			auditId: `AUD-${Date.now()}`,
			escalated: false
		};
		dispatch({
			type: "REJECT_PLAN",
			decision
		});
		setReviewPlanId(null);
	}
	function handleModify(plan, notes) {
		const decision = {
			id: `DEC-${Date.now()}`,
			borrowerId: borrower.id,
			borrowerName: borrower.name,
			officerId: "OFF-001",
			officerName: state.currentUser.name,
			role: "Loan Officer",
			action: "Modified",
			planId: plan.id,
			planType: plan.type,
			previousSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
			newSchedule: plan.schedule,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			reason: "Officer modified plan values",
			notes: notes || void 0,
			rsiAtDecision: analysis.rsi.value,
			stateAtDecision: analysis.state,
			evidenceSnapshot: analysis.evidence,
			configurationSnapshot: state.modelConfig,
			auditId: `AUD-${Date.now()}`,
			escalated: plan.requiresEscalation
		};
		dispatch({
			type: "MODIFY_PLAN",
			decision,
			modifiedPlan: plan
		});
		setReviewPlanId(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => navigate({ to: "/borrowers" }),
			className: "flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground mb-4 transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), "All borrowers"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg p-5 mb-5 shadow-xs space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground tracking-tight",
					children: borrower.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[13px] text-muted-foreground mt-0.5",
					children: [
						borrower.occupation,
						" · ",
						borrower.id,
						" · Loan ",
						loan.id
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, { state: analysis.state }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted px-3 py-1 rounded text-[13px] font-mono font-bold text-foreground border border-border",
							children: [
								"RSI ",
								analysis.rsi.value,
								" / 100"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted px-3 py-1 rounded text-[13px] font-medium text-foreground border border-border",
							children: [
								"Seasonal match ",
								analysis.seasonalMatch,
								"%"
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[13px] text-foreground/90 italic",
					children: [
						"“",
						analysis.state === "Seasonal Dip" ? `Income pressure is present, but the current decline closely matches ${borrower.name.split(" ")[0]}'s historical seasonal pattern.` : analysis.state === "Structural Decline" ? `Current decline is poorly explained by historical seasonality and is accompanied by a persistent negative trend.` : analysis.state === "Emerging Stress" ? `Recent income fluctuations indicate emerging repayment stress requiring officer monitoring.` : `Cash flow remains stable and well within projected baseline parameters.`,
						"”"
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg p-5 mb-6 space-y-3 shadow-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold text-cfc-amber uppercase tracking-wider",
						children: "Analysis summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: [
							"Cycle ",
							analysis.rsi.cycle,
							" · Model v2026.09.1"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 bg-muted/30 border border-border rounded p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider block",
								children: "SIGNAL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground text-[13px]",
								children: analysis.state === "Stable" ? "Income is stable." : "Income is declining."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 bg-muted/30 border border-border rounded p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider block",
								children: "INTERPRETATION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground text-[13px]",
								children: analysis.state === "Seasonal Dip" ? "The decline strongly matches historical seasonality." : analysis.state === "Structural Decline" ? "The decline is poorly explained by historical seasonality." : analysis.state === "Emerging Stress" ? "The decline shows volatility exceeding normal seasonal variance." : "Income aligns with expected baseline trajectory."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 bg-muted/30 border border-border rounded p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider block",
								children: "IMPLICATION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground text-[13px]",
								children: analysis.state === "Seasonal Dip" ? "Current evidence supports a temporary repayment adjustment rather than treating the decline as structural." : analysis.state === "Structural Decline" ? "Current evidence supports temporary moratorium and structural loan restructuring." : analysis.state === "Emerging Stress" ? "Current evidence supports proactive tenure adjustment to mitigate default risk." : "No restructuring required; borrower qualifies for standard terms."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground italic text-right pt-1",
					children: "Based on current forecast and available repayment history."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-2 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-3",
					children: [
						{
							icon: DollarSign,
							label: "Cash buffer",
							value: inr(analysis.cashBuffer),
							color: analysis.cashBuffer >= 0 ? "text-success" : "text-danger"
						},
						{
							icon: Calendar,
							label: "Due date",
							value: loan.nextDue.split(",")[0],
							color: "text-foreground"
						},
						{
							icon: CircleCheck,
							label: "On-time payments",
							value: `${onTimeCount}/12`,
							color: onTimeCount >= 10 ? "text-success" : onTimeCount >= 8 ? "text-warning" : "text-danger"
						},
						{
							icon: Clock,
							label: "Last payment",
							value: loan.lastPayment.split(",")[0],
							color: "text-foreground"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-lg p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-muted-foreground mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px]",
								children: s.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-[16px] font-bold ${s.color}`,
							children: s.value
						})]
					}, s.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "cashflow",
					className: "bg-card border border-border rounded-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full border-b border-border rounded-t-lg rounded-b-none bg-muted/30 h-auto p-1 justify-start gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cashflow",
								className: "text-[12px] font-medium px-3 py-1.5 rounded",
								children: "Cash-Flow Outlook"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "decomposition",
								className: "text-[12px] font-medium px-3 py-1.5 rounded",
								children: "Decomposition"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "rsi",
								className: "text-[12px] font-medium px-3 py-1.5 rounded",
								children: "RSI Analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "evidence",
								className: "text-[12px] font-medium px-3 py-1.5 rounded",
								children: "Evidence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "plans",
								className: "text-[12px] font-medium px-3 py-1.5 rounded",
								children: "Repayment Plans"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "cashflow",
								className: "mt-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashFlowChart, { analysis })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "decomposition",
								className: "mt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-[14px] font-bold text-foreground",
										children: "What's driving the decline?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[12px] text-muted-foreground mt-0.5",
										children: "STL decomposition into Trend, Seasonal, and Residual components."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecompositionChart, {
									decomposition: analysis.decomposition,
									seasonalMatch: analysis.seasonalMatch
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "rsi",
								className: "mt-0 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-[14px] font-bold text-foreground",
											children: "Repayment Stress Index (RSI)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[12px] text-muted-foreground mt-0.5",
											children: "Composite risk score calculated from 6 weighted feature dimensions."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[20px] font-bold font-mono text-foreground",
												children: [analysis.rsi.value, " / 100"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: analysis.state
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-3 gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-1 flex flex-col items-center justify-center bg-muted/20 border border-border rounded-lg p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RSIGauge, {
												value: analysis.rsi.value,
												state: analysis.state,
												size: 180
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[12px] font-semibold text-foreground",
													children: analysis.state
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: [
														"Cycle ",
														analysis.rsi.cycle,
														" evaluation"
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RSIComponents, { rsi: analysis.rsi })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-4 border-t border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-2",
											children: "Historical RSI Trajectory"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RSIHistory, { history: analysis.rsiHistory })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "evidence",
								className: "mt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "text-[12px] gap-1.5 ml-auto",
										onClick: () => setEvidenceDrawerOpen(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), "Feature attribution"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCards, { evidence: analysis.evidence })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "plans",
								className: "mt-0 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-card border border-border rounded-lg p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest block",
											children: "DECISION CONTEXT"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-muted/40 border border-border rounded p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block",
														children: "Stress state"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground",
														children: analysis.state
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-muted/40 border border-border rounded p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block",
														children: "Seasonal match"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-foreground",
														children: [analysis.seasonalMatch, "%"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-muted/40 border border-border rounded p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block",
														children: "Forecast confidence"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-foreground",
														children: [analysis.forecastConfidence, "%"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-muted/40 border border-border rounded p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block",
														children: "Projected buffer"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `font-bold ${analysis.cashBuffer >= 0 ? "text-success" : "text-danger"}`,
														children: inr(analysis.cashBuffer)
													})]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-2 border-warning/50 bg-warning/8 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold text-warning uppercase tracking-widest block",
											children: "OFFICER REVIEW REQUIRED"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[13px] font-semibold text-foreground mt-0.5",
											children: "Cash-Flow Copilot provides analytical recommendations. The loan officer makes the final decision."
										})] }), analysis.plans.find((p) => p.recommended) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => {
												const rec = analysis.plans.find((p) => p.recommended);
												if (rec) setReviewPlanId(rec.id);
											},
											className: "bg-foreground text-background hover:bg-foreground/90 text-[13px] font-bold shadow-xs px-4",
											children: "Review recommendation →"
										})]
									}),
									approvedDecision && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-success/10 border border-success/30 rounded-lg p-4 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-success text-[14px]",
													children: ["✓ PLAN APPROVED — ", approvedDecision.planType]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-mono text-muted-foreground",
													children: approvedDecision.auditId
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[12px] text-muted-foreground",
												children: [
													"Approved by ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: approvedDecision.officerName
													}),
													" (",
													approvedDecision.role,
													") on",
													" ",
													new Date(approvedDecision.timestamp).toLocaleString()
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 pt-1 text-[12px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => navigate({ to: "/audit-log" }),
														className: "text-foreground font-semibold hover:text-cfc-amber flex items-center gap-1 transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), "View audit record →"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => navigate({ to: "/monitoring" }),
														className: "text-foreground font-semibold hover:text-cfc-amber flex items-center gap-1 transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), "View monitoring →"]
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepaymentPlans, {
										plans: analysis.plans,
										onReview: (planId) => setReviewPlanId(planId),
										decidedPlanId: approvedDecision?.planId
									})
								]
							})
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-1 space-y-4",
				children: [
					isDemoScenario && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSwitcher, {
						current: borrower,
						options: scenarioOptions
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-lg p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest block",
								children: "CURRENT STATE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, { state: analysis.state }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[16px] font-bold font-mono text-foreground",
									children: ["RSI ", analysis.rsi.value]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-[12px] border-t border-border pt-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Seasonal match"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [analysis.seasonalMatch, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Forecast confidence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [analysis.forecastConfidence, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Trend direction"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: analysis.trendDirection
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Cash buffer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-semibold ${analysis.cashBuffer >= 0 ? "text-success" : "text-danger"}`,
											children: inr(analysis.cashBuffer)
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-3",
							children: "Recent repayments"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5",
							children: borrower.history.slice(-6).reverse().map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[12px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: p.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [p.repayment > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-success font-medium",
										children: inr(p.repayment)
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-danger font-medium",
										children: "Missed"
									}), p.paidOnTime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-danger/20 border border-danger/40" })]
								})]
							}, i))
						})]
					})
				]
			})]
		}),
		reviewPlanId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanReviewDrawer, {
			open: !!reviewPlanId,
			onClose: () => setReviewPlanId(null),
			analysis,
			planId: reviewPlanId,
			onApprove: handleApprove,
			onReject: handleReject,
			onModify: handleModify
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: evidenceDrawerOpen,
			onOpenChange: setEvidenceDrawerOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "right",
				className: "w-80 p-0 flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					className: "px-4 py-3 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "text-[14px]",
						children: "Feature attribution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: ["RSI component contributions · Cycle ", analysis.rsi.cycle]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] text-muted-foreground bg-muted/50 rounded px-3 py-2",
							children: [
								"Feature-level contribution to RSI score of ",
								analysis.rsi.value,
								". Chain-of-thought reasoning is not exposed."
							]
						}),
						Object.entries(analysis.rsi.components).map(([key, value]) => {
							const names = {
								CBR: "Cash Buffer Ratio",
								RV: "Residual Volatility",
								TM: "Trend Momentum",
								RTR: "Repayment Track Record",
								USD: "Unexplained Seasonal Dev.",
								ESI: "Expense Shock Index"
							};
							const pct = value / ({
								CBR: 25,
								RV: 15,
								TM: 20,
								RTR: 15,
								USD: 15,
								ESI: 10
							}[key] ?? 25) * 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: names[key] ?? key
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-foreground",
										children: [
											"+",
											value.toFixed(1),
											" pts"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 bg-border rounded-full overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full rounded-full ${pct > 70 ? "bg-danger" : pct > 40 ? "bg-warning" : "bg-success"}`,
										style: { width: `${Math.min(100, pct)}%` }
									})
								})]
							}, key);
						}),
						analysis.evidence.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border rounded p-2.5 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between mb-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: e.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono",
									children: ["+", e.contribution.toFixed(1)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: e.value
							})]
						}, i))
					]
				})]
			})
		})
	] });
}
//#endregion
export { BorrowerAnalysisPage as component };
