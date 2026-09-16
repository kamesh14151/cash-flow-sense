import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp, o as inr, r as analyzeBorrower } from "./store-BdGbiYXL.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Search, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-sdeg094X.mjs";
import { t as StressStateBadge } from "./StressStateBadge-D-rlpoag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/borrowers-DQUO93Mn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BorrowersPage() {
	const { state } = useApp();
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.toLowerCase();
		return state.borrowers.filter((b) => b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.occupation.toLowerCase().includes(q));
	}, [state.borrowers, search]);
	function getAnalysis(borrowerId) {
		if (state.analyses[borrowerId]) return state.analyses[borrowerId];
		const b = state.borrowers.find((x) => x.id === borrowerId);
		if (b) return analyzeBorrower(b, state.modelConfig);
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Borrowers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[13px] text-muted-foreground mt-0.5",
				children: [state.borrowers.length, " borrowers · Salem Central Branch"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-4 max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Search by name, ID, or occupation…",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				className: "w-full pl-9 pr-4 py-2 border border-border rounded text-[13px] bg-card focus:outline-none focus:ring-1 focus:ring-ring"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-lg overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-[13px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-border bg-muted/30",
					children: [
						"Name",
						"Occupation",
						"ID",
						"Loan balance",
						"RSI",
						"State",
						"Seasonal match",
						""
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap",
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children: filtered.slice(0, 100).map((b) => {
						const a = getAnalysis(b.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/30 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 px-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground",
										children: ["Since ", b.since]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-muted-foreground",
									children: b.occupation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-mono text-[12px] text-muted-foreground",
									children: b.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-medium",
									children: inr(b.loan.balance)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 font-semibold",
									children: a?.rsi.value ?? "—"
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
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => navigate({ to: `/borrowers/${slugFor(b)}` }),
										className: "flex items-center gap-1 text-[12px] font-medium text-foreground hover:text-cfc-amber transition-colors",
										children: ["Open analysis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})
								})
							]
						}, b.id);
					})
				})]
			}), filtered.length > 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3 text-[12px] text-muted-foreground border-t border-border",
				children: [
					"Showing 100 of ",
					filtered.length,
					" results. Refine search to narrow results."
				]
			})]
		})
	] });
}
//#endregion
export { BorrowersPage as component };
