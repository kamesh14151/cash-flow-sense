import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp, o as inr, r as analyzeBorrower } from "./store-BdGbiYXL.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ChevronDown, D as ChevronUp, R as ArrowUpDown, f as Search, j as Check, l as SlidersHorizontal, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { f as cn, t as AppShell } from "./AppShell-sdeg094X.mjs";
import { t as StressStateBadge } from "./StressStateBadge-D-rlpoag.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-DSPPdIqo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function PortfolioPage() {
	const { state } = useApp();
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [filterState, setFilterState] = (0, import_react.useState)("all");
	const [filterOcc, setFilterOcc] = (0, import_react.useState)("all");
	const [sortField, setSortField] = (0, import_react.useState)("rsi");
	const [sortDesc, setSortDesc] = (0, import_react.useState)(true);
	const occupations = (0, import_react.useMemo)(() => ["all", ...Array.from(new Set(state.borrowers.map((b) => b.occupation)))], [state.borrowers]);
	function getAnalysis(borrowerId) {
		if (state.analyses[borrowerId]) return state.analyses[borrowerId];
		const b = state.borrowers.find((x) => x.id === borrowerId);
		if (b) return analyzeBorrower(b, state.modelConfig);
		return null;
	}
	const rows = (0, import_react.useMemo)(() => {
		const q = search.toLowerCase();
		return state.borrowers.filter((b) => {
			const matchSearch = b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.occupation.toLowerCase().includes(q);
			const a = getAnalysis(b.id);
			const matchState = filterState === "all" || a?.state === filterState;
			const matchOcc = filterOcc === "all" || b.occupation === filterOcc;
			return matchSearch && matchState && matchOcc;
		}).map((b) => ({
			borrower: b,
			analysis: getAnalysis(b.id)
		})).sort((x, y) => {
			const av = x.analysis, bv = y.analysis;
			let diff = 0;
			if (sortField === "rsi") diff = (av?.rsi.value ?? 0) - (bv?.rsi.value ?? 0);
			else if (sortField === "balance") diff = x.borrower.loan.balance - y.borrower.loan.balance;
			else if (sortField === "seasonalMatch") diff = (av?.seasonalMatch ?? 0) - (bv?.seasonalMatch ?? 0);
			else diff = x.borrower.name.localeCompare(y.borrower.name);
			return sortDesc ? -diff : diff;
		}).slice(0, 100);
	}, [
		state.borrowers,
		state.analyses,
		search,
		filterState,
		filterOcc,
		sortField,
		sortDesc
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Portfolio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[13px] text-muted-foreground mt-0.5",
				children: [state.borrowers.length, " active loans · Salem Central Branch"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-3 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search borrowers…",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-9 pr-4 py-2 border border-border rounded text-[13px] bg-card focus:outline-none focus:ring-1 focus:ring-ring"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filterState,
					onValueChange: (v) => setFilterState(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-44 text-[13px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All states" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All states"
					}), [
						"Stable",
						"Seasonal Dip",
						"Emerging Stress",
						"Structural Decline"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: s,
						children: s
					}, s))] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filterOcc,
					onValueChange: setFilterOcc,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-44 text-[13px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All occupations" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: occupations.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: o,
						children: o === "all" ? "All occupations" : o
					}, o)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: sortField,
					onValueChange: (v) => setSortField(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
						className: "w-40 text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5 mr-1.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sort by" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "rsi",
							children: "RSI (highest)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "balance",
							children: "Balance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "name",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "seasonalMatch",
							children: "Seasonal match"
						})
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border bg-muted/30",
						children: [
							{
								label: "Borrower",
								field: "name"
							},
							{
								label: "Occupation",
								field: null
							},
							{
								label: "Balance",
								field: "balance"
							},
							{
								label: "Next installment",
								field: null
							},
							{
								label: "RSI",
								field: "rsi"
							},
							{
								label: "State",
								field: null
							},
							{
								label: "Seasonal",
								field: "seasonalMatch"
							},
							{
								label: "Last updated",
								field: null
							},
							{
								label: "",
								field: null
							}
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap",
							onClick: () => h.field && (setSortField(h.field), setSortDesc((p) => !p)),
							style: { cursor: h.field ? "pointer" : "default" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [h.label, h.field && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3 opacity-50" })]
							})
						}, h.label))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: rows.map(({ borrower: b, analysis: a }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/30 transition-colors cursor-pointer",
							onClick: () => navigate({ to: `/borrowers/${slugFor(b)}` }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 px-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground font-mono",
										children: b.id
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: b.occupation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-medium",
									children: inr(b.loan.balance)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: inr(b.loan.installment)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-bold ${a && a.rsi.value > 70 ? "text-danger" : a && a.rsi.value > 50 ? "text-warning" : "text-foreground"}`,
										children: a?.rsi.value ?? "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
										state: a.state,
										size: "sm"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: a ? `${a.seasonalMatch}%` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: "Sep 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: (e) => {
											e.stopPropagation();
											navigate({ to: `/borrowers/${slugFor(b)}` });
										},
										className: "flex items-center gap-1 text-[12px] font-medium hover:text-cfc-amber transition-colors",
										children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})
								})
							]
						}, b.id))
					})]
				})
			}), rows.length === 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3 text-[12px] text-muted-foreground border-t border-border",
				children: "Showing top 100 results. Use filters to narrow."
			})]
		})
	] });
}
//#endregion
export { PortfolioPage as component };
