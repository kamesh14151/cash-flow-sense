import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp, n as DEMO_BORROWERS, r as analyzeBorrower } from "./store-BdGbiYXL.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Briefcase, S as Clock, a as TriangleAlert, n as Users, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { f as cn, t as AppShell } from "./AppShell-sdeg094X.mjs";
import { t as StressStateBadge } from "./StressStateBadge-D-rlpoag.mjs";
import { f as Pie, g as Legend, h as Tooltip, m as ResponsiveContainer, n as PieChart, p as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BApEaWPU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KPICard({ label, value, sub, icon, accent, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("bg-card border border-border rounded-lg p-4 flex flex-col gap-1", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted-foreground font-medium uppercase tracking-wide",
					children: label
				}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-3xl font-bold tracking-tight leading-none mt-1", accent ? "text-cfc-amber" : "text-foreground"),
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted-foreground",
				children: sub
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
function DashboardPage() {
	const { state } = useApp();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!state.isLoggedIn) navigate({ to: "/" });
	}, [state.isLoggedIn, navigate]);
	if (!state.isLoggedIn) return null;
	const allAnalyses = (0, import_react.useMemo)(() => {
		const analyses = { ...state.analyses };
		for (const b of state.borrowers.slice(0, 50)) if (!analyses[b.id]) analyses[b.id] = analyzeBorrower(b, state.modelConfig);
		return analyses;
	}, [
		state.analyses,
		state.borrowers,
		state.modelConfig
	]);
	const counts = (0, import_react.useMemo)(() => {
		const c = {
			Stable: 0,
			"Seasonal Dip": 0,
			"Emerging Stress": 0,
			"Structural Decline": 0
		};
		for (const a of Object.values(allAnalyses)) c[a.state]++;
		const computed = Object.values(allAnalyses).length;
		const remaining = state.borrowers.length - computed;
		c.Stable += Math.round(remaining * .68);
		c["Seasonal Dip"] += Math.round(remaining * .14);
		c["Emerging Stress"] += Math.round(remaining * .1);
		c["Structural Decline"] += Math.round(remaining * .08);
		return c;
	}, [allAnalyses, state.borrowers.length]);
	const total = state.borrowers.length;
	const needsAttention = counts["Seasonal Dip"] + counts["Emerging Stress"];
	const structuralDecline = counts["Structural Decline"];
	const attentionQueue = (0, import_react.useMemo)(() => {
		return Object.values(state.analyses).filter((a) => a.state !== "Stable").sort((a, b) => b.rsi.value - a.rsi.value).slice(0, 6);
	}, [state.analyses]);
	const pieData = [
		{
			name: "Stable",
			value: counts.Stable
		},
		{
			name: "Seasonal Dip",
			value: counts["Seasonal Dip"]
		},
		{
			name: "Emerging Stress",
			value: counts["Emerging Stress"]
		},
		{
			name: "Structural Decline",
			value: counts["Structural Decline"]
		}
	];
	const meenaAnalysis = state.analyses["BR-10482"] ?? analyzeBorrower(DEMO_BORROWERS[0], state.modelConfig);
	const sureshAnalysis = state.analyses["BR-10921"] ?? analyzeBorrower(DEMO_BORROWERS[1], state.modelConfig);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: [greeting, ", Priya."]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] text-muted-foreground mt-1",
				children: "Here's what needs your attention across the branch."
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg p-5 mb-6 bg-gradient-to-r from-card to-muted/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold text-cfc-amber uppercase tracking-widest bg-cfc-amber/10 px-2 py-0.5 rounded",
					children: "Presentation Mode · Core Hero Scenarios"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-foreground mt-1",
					children: "Two income drops. Two different stories."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted-foreground hidden sm:block max-w-xs text-right",
					children: "AI analysis differentiates temporary monsoon dips from permanent structural revenue decline."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => navigate({ to: `/borrowers/meena` }),
					className: "cursor-pointer border border-info/30 bg-info/5 hover:border-info/60 rounded-lg p-4 transition-all hover:shadow-sm flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] font-bold text-foreground",
								children: "Meena Krishnan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
								state: meenaAnalysis.state,
								size: "sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mb-3",
							children: "Farmer · Monsoon harvest gap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 text-[12px] bg-background/60 rounded p-2.5 mb-3 border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "RSI Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-foreground text-[14px]",
									children: meenaAnalysis.rsi.value
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Seasonal Match"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-foreground text-[14px]",
									children: [meenaAnalysis.seasonalMatch, "%"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Classification"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-info text-[12px]",
									children: meenaAnalysis.state
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: "Recommendation:"
							}), " Seasonal Step-Down during harvest lull."]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-end text-[12px] font-semibold text-info gap-1",
						children: ["Analyse Meena ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => navigate({ to: `/borrowers/suresh` }),
					className: "cursor-pointer border border-danger/30 bg-danger/5 hover:border-danger/60 rounded-lg p-4 transition-all hover:shadow-sm flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] font-bold text-foreground",
								children: "Suresh Kumar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
								state: sureshAnalysis.state,
								size: "sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mb-3",
							children: "Gig Worker · Platform earnings drop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 text-[12px] bg-background/60 rounded p-2.5 mb-3 border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "RSI Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-foreground text-[14px]",
									children: sureshAnalysis.rsi.value
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Seasonal Match"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-foreground text-[14px]",
									children: [sureshAnalysis.seasonalMatch, "%"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Classification"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-danger text-[12px]",
									children: sureshAnalysis.state
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: "Recommendation:"
							}), " Temporary Moratorium & Restructure."]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-end text-[12px] font-semibold text-danger gap-1",
						children: ["Analyse Suresh ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
					label: "Active loans",
					value: total,
					sub: "Across all archetypes",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
					label: "Stable",
					value: counts.Stable,
					sub: `${Math.round(counts.Stable / total * 100)}% of portfolio`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4" }),
					className: "border-success/20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
					label: "Needs attention",
					value: needsAttention,
					sub: `${Math.round(needsAttention / total * 100)}% of portfolio`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					className: "border-warning/20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
					label: "Structural decline",
					value: structuralDecline,
					sub: `${Math.round(structuralDecline / total * 100)}% of portfolio`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					className: "border-danger/20",
					accent: true
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-6 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-1 bg-card border border-border rounded-lg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground mb-1",
						children: "Portfolio health"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground mb-3",
						children: [total, " active loans"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 220,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: pieData,
								cx: "50%",
								cy: "50%",
								innerRadius: 55,
								outerRadius: 85,
								paddingAngle: 2,
								dataKey: "value",
								children: pieData.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									fill: STATE_COLORS[entry.name],
									opacity: .85
								}, entry.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
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
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								iconType: "circle",
								iconSize: 8,
								wrapperStyle: { fontSize: 11 }
							})
						] })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-2 bg-card border border-border rounded-lg p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground",
						children: "Attention queue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/borrowers" }),
						className: "text-[12px] text-muted-foreground hover:text-foreground flex items-center gap-1",
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-[12px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border",
							children: [
								"Borrower",
								"Occupation",
								"RSI",
								"State",
								"Seasonal",
								"Action"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left text-muted-foreground font-medium pb-2 pr-4 whitespace-nowrap",
								children: h
							}, h))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: attentionQueue.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 pr-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: a.borrower.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-[11px]",
											children: a.borrower.id
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-4 text-muted-foreground",
										children: a.borrower.occupation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-4 font-semibold text-foreground",
										children: a.rsi.value
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
											state: a.state,
											size: "sm"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 pr-4 text-muted-foreground",
										children: [a.seasonalMatch, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => navigate({ to: `/borrowers/${slugFor(a.borrower)}` }),
											className: "text-foreground font-medium hover:text-cfc-amber transition-colors text-[12px] flex items-center gap-1",
											children: ["Analyse ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
										})
									})
								]
							}, a.borrower.id))
						})]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[14px] font-semibold text-foreground mb-3",
				children: "System activity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-0 divide-y divide-border",
				children: state.activityFeed.slice(0, 6).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 py-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mt-0.5 h-2 w-2 rounded-full shrink-0 ${event.kind === "forecast" ? "bg-info" : event.kind === "detection" ? "bg-warning" : event.kind === "decision" ? "bg-success" : "bg-muted-foreground"}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] font-medium text-foreground",
								children: event.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] text-muted-foreground mt-0.5",
								children: event.detail
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-[11px] text-muted-foreground shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), formatDistanceToNow(new Date(event.time), { addSuffix: true })]
						})
					]
				}, event.id))
			})]
		})
	] });
}
//#endregion
export { DashboardPage as component };
