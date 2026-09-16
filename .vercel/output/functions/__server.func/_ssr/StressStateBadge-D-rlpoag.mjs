import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { E as CircleCheck, a as TriangleAlert, h as Minus, s as TrendingDown } from "../_libs/lucide-react.mjs";
import { f as cn } from "./AppShell-sdeg094X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StressStateBadge-D-rlpoag.js
var import_jsx_runtime = require_jsx_runtime();
var CONFIG = {
	Stable: {
		label: "Stable",
		icon: CircleCheck,
		textClass: "text-success",
		bgClass: "bg-success/10",
		borderClass: "border-success/20"
	},
	"Seasonal Dip": {
		label: "Seasonal Dip",
		icon: Minus,
		textClass: "text-info",
		bgClass: "bg-info/10",
		borderClass: "border-info/20"
	},
	"Emerging Stress": {
		label: "Emerging Stress",
		icon: TriangleAlert,
		textClass: "text-warning",
		bgClass: "bg-warning/10",
		borderClass: "border-warning/20"
	},
	"Structural Decline": {
		label: "Structural Decline",
		icon: TrendingDown,
		textClass: "text-danger",
		bgClass: "bg-danger/10",
		borderClass: "border-danger/20"
	}
};
/** Always renders icon + label. Never relies on color alone. WCAG-compliant. */
function StressStateBadge({ state, size = "md", className }) {
	const cfg = CONFIG[state];
	const Icon = cfg.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded border font-medium", cfg.textClass, cfg.bgClass, cfg.borderClass, size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-[12px]", className),
		role: "status",
		"aria-label": `Stress state: ${state}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5",
			"aria-hidden": true
		}), cfg.label]
	});
}
//#endregion
export { StressStateBadge as t };
