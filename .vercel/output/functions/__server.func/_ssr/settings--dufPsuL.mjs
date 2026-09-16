import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useApp } from "./store-BdGbiYXL.mjs";
import { I as Bell, P as Building2, g as Lock, r as User } from "../_libs/lucide-react.mjs";
import { f as cn, t as AppShell } from "./AppShell-sdeg094X.mjs";
import { t as Label } from "./label-sDalcsGp.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings--dufPsuL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	const { state } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] text-muted-foreground mt-0.5",
			children: "Application and profile preferences"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-6 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground",
						children: "Profile"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 text-[13px]",
					children: [
						{
							label: "Name",
							value: state.currentUser.name
						},
						{
							label: "Role",
							value: state.currentUser.role
						},
						{
							label: "Branch",
							value: state.currentUser.branch
						},
						{
							label: "Username",
							value: "priya.sharma"
						}
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between border-b border-border pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: r.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: r.value
						})]
					}, r.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground",
						children: "Permissions"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 text-[12px]",
					children: [
						{
							label: "Review recommendations",
							allowed: true
						},
						{
							label: "Modify plan values",
							allowed: true
						},
						{
							label: "Approve plans",
							allowed: true
						},
						{
							label: "Reject plans",
							allowed: true
						},
						{
							label: "View audit log",
							allowed: true
						},
						{
							label: "Configure model",
							allowed: false
						},
						{
							label: "Execute loan changes",
							allowed: false,
							note: "Never automatic"
						}
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between py-1.5 border-b border-border last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: p.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [p.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-danger",
								children: p.note
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: p.allowed ? "text-success font-medium" : "text-muted-foreground/50",
								children: p.allowed ? "✓ Allowed" : "✗"
							})]
						})]
					}, p.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground",
						children: "Notifications"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						{
							label: "Structural decline alerts",
							id: "notif-decline"
						},
						{
							label: "Plan awaiting review",
							id: "notif-plan"
						},
						{
							label: "Forecast recalibration",
							id: "notif-forecast"
						},
						{
							label: "Data ingestion complete",
							id: "notif-ingest"
						}
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: n.id,
							className: "text-[13px] text-foreground cursor-pointer",
							children: n.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: n.id,
							defaultChecked: true
						})]
					}, n.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-semibold text-foreground",
						children: "System"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 text-[12px]",
					children: [
						{
							label: "Model version",
							value: state.modelConfig.version
						},
						{
							label: "Borrower count",
							value: String(state.borrowers.length)
						},
						{
							label: "Decisions recorded",
							value: String(state.auditLog.length)
						},
						{
							label: "Monitoring cycles",
							value: String(state.monitoringCycle)
						},
						{
							label: "Branch",
							value: "Salem Central Branch"
						},
						{
							label: "Prototype",
							value: "v1.0 · 2026"
						}
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between py-1.5 border-b border-border last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: r.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-foreground",
							children: r.value
						})]
					}, r.label))
				})]
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
