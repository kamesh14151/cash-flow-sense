import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useApp } from "./store-BdGbiYXL.mjs";
import { C as ClipboardList, O as ChevronRight, u as Shield } from "../_libs/lucide-react.mjs";
import { c as SheetContent, l as SheetHeader, s as Sheet, t as AppShell, u as SheetTitle } from "./AppShell-sdeg094X.mjs";
import { t as StressStateBadge } from "./StressStateBadge-D-rlpoag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-log-BtZv4W4g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuditLogPage() {
	const { state } = useApp();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const actionColor = {
		Approved: "text-success",
		Modified: "text-warning",
		Rejected: "text-danger"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-8 w-8 rounded bg-foreground/5 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-foreground" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Audit Log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-muted-foreground",
				children: "Immutable record of all officer decisions and evidence snapshots"
			})] })]
		}),
		state.auditLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-16 bg-card border border-border rounded-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[15px] font-medium text-foreground",
					children: "No audit events yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] text-muted-foreground mt-1",
					children: "Approve or reject a plan to create the first audit record."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-card border border-border rounded-lg overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-border bg-muted/30",
					children: [
						"Timestamp",
						"Officer",
						"Borrower",
						"Action",
						"Plan",
						"RSI",
						"State",
						"Audit ID",
						""
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap",
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children: state.auditLog.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/30 cursor-pointer",
						onClick: () => setSelected(event),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4 text-muted-foreground whitespace-nowrap",
								children: new Date(event.timestamp).toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: event.officerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 px-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: event.borrowerName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-[11px]",
									children: event.borrowerId
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-semibold ${actionColor[event.action]}`,
									children: event.action
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4 text-muted-foreground",
								children: event.planType
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4 font-mono font-semibold",
								children: event.rsiAtDecision
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StressStateBadge, {
									state: event.stateAtDecision,
									size: "sm"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4 font-mono text-[11px] text-muted-foreground",
								children: event.auditId.slice(0, 12)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
							})
						]
					}, event.auditId))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: !!selected,
			onOpenChange: (v) => !v && setSelected(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
				side: "right",
				className: "w-[480px] max-w-full flex flex-col p-0 overflow-y-auto",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					className: "px-5 py-4 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "text-[15px] font-semibold",
						children: "Decision snapshot"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12px] text-muted-foreground",
						children: [
							selected.auditId,
							" · ",
							new Date(selected.timestamp).toLocaleString()
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 p-5 space-y-4 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted/50 border border-border rounded px-3 py-2.5 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground mb-0.5",
								children: "Decision snapshot"
							}), "Evidence shown at decision time · Configuration at decision time · Immutable record"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 text-[12px]",
							children: [
								{
									label: "Decision",
									value: selected.action,
									bold: true
								},
								{
									label: "Officer",
									value: selected.officerName
								},
								{
									label: "Role",
									value: selected.role
								},
								{
									label: "Borrower",
									value: selected.borrowerName
								},
								{
									label: "Borrower ID",
									value: selected.borrowerId
								},
								{
									label: "RSI at decision",
									value: `${selected.rsiAtDecision} / 100`
								},
								{
									label: "State",
									value: selected.stateAtDecision
								},
								{
									label: "Plan",
									value: selected.planType
								},
								{
									label: "Model version",
									value: selected.modelVersion
								},
								{
									label: "Config version",
									value: selected.configurationSnapshot?.version ?? selected.modelVersion
								},
								{
									label: "Escalated",
									value: selected.escalated ? "Yes" : "No"
								}
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/50 rounded px-2.5 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: r.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `font-medium text-foreground ${r.bold && selected.action === "Approved" ? "text-success" : r.bold && selected.action === "Rejected" ? "text-danger" : ""}`,
									children: r.value
								})]
							}, r.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] font-semibold text-foreground mb-2",
							children: "Schedule"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border rounded px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mb-1",
									children: "Previous"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono font-medium",
									children: selected.previousSchedule
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border rounded px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mb-1",
									children: "New"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono font-medium",
									children: selected.newSchedule
								})]
							})]
						})] }),
						selected.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border rounded px-3 py-2 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mb-1",
								children: "Reason"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.reason })]
						}),
						selected.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border rounded px-3 py-2 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mb-1",
								children: "Officer notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "italic",
								children: [
									"\"",
									selected.notes,
									"\""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] font-semibold text-foreground mb-2",
							children: [
								"Evidence at decision time (",
								selected.evidenceSnapshot.length,
								" items)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: selected.evidenceSnapshot.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border rounded px-3 py-2 text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between mb-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: e.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: e.direction === "supports" ? "text-danger" : "text-success",
											children: e.direction === "supports" ? "↑ Stress" : "↓ Counter"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: e.statement
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground/60 mt-0.5",
										children: ["Source: ", e.source]
									})
								]
							}, i))
						})] })
					]
				})] })
			})
		})
	] });
}
//#endregion
export { AuditLogPage as component };
