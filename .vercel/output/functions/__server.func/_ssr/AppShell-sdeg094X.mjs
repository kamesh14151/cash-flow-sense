import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, k as Slot, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as slugFor, l as useApp } from "./store-BdGbiYXL.mjs";
import { g as Link, l as useLocation, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ChevronDown, C as ClipboardList, F as Briefcase, I as Bell, M as ChartColumn, P as Building2, T as CircleQuestionMark, V as Activity, _ as LayoutDashboard, a as TriangleAlert, d as Settings, f as Search, i as Upload, n as Users, o as TrendingUp, p as RefreshCw, s as TrendingDown, t as X, y as FileText } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-sdeg094X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV_GROUPS = [
	{
		label: "LENDER OPERATIONS",
		items: [
			{
				label: "Overview",
				to: "/dashboard",
				icon: LayoutDashboard
			},
			{
				label: "Portfolio",
				to: "/portfolio",
				icon: Briefcase
			},
			{
				label: "Borrowers",
				to: "/borrowers",
				icon: Users
			},
			{
				label: "Alerts",
				to: "/alerts",
				icon: TriangleAlert
			},
			{
				label: "Plans",
				to: "/plans",
				icon: FileText
			}
		]
	},
	{
		label: "ANALYTICS",
		items: [
			{
				label: "Forecasts",
				to: "/forecasts",
				icon: TrendingUp
			},
			{
				label: "Monitoring",
				to: "/monitoring",
				icon: Activity
			},
			{
				label: "Model Insights",
				to: "/model-insights",
				icon: ChartColumn
			}
		]
	},
	{
		label: "OPERATIONS",
		items: [{
			label: "Data Ingestion",
			to: "/data-ingestion",
			icon: Upload
		}, {
			label: "Audit Log",
			to: "/audit-log",
			icon: ClipboardList
		}]
	},
	{
		label: "SYSTEM",
		items: [{
			label: "Settings",
			to: "/settings",
			icon: Settings
		}, {
			label: "Help",
			to: "/help",
			icon: CircleQuestionMark
		}]
	}
];
function Sidebar() {
	const location = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "fixed inset-y-0 left-0 z-40 flex w-56 flex-col bg-sidebar border-r border-sidebar-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-14 items-center px-4 border-b border-sidebar-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-7 w-7 rounded bg-cfc-amber flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-semibold text-sidebar-foreground leading-tight",
						children: "Cash-Flow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold text-sidebar-primary leading-tight",
						children: "Copilot"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto py-3 px-2",
				children: NAV_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 mb-1 text-[10px] font-semibold tracking-widest text-sidebar-foreground/40 uppercase",
						children: group.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-0.5",
						children: group.items.map((item) => {
							const active = item.to === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-center gap-2.5 rounded px-2 py-1.5 text-[13px] font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0 opacity-80" }), item.label]
							}) }, item.to);
						})
					})]
				}, group.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-sidebar-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-7 w-7 rounded-full bg-cfc-amber/20 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-cfc-amber",
								children: "PS"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] font-semibold text-sidebar-foreground leading-tight truncate",
								children: "Priya Sharma"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-sidebar-foreground/50 truncate",
								children: "Loan Officer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-sidebar-foreground/30 ml-auto" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-1.5 px-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3 w-3 text-sidebar-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-sidebar-foreground/40 truncate",
						children: "Salem Central Branch"
					})]
				})]
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
function NotificationDrawer({ open, onClose }) {
	const { state } = useApp();
	const router = useRouter();
	const notifications = [
		...Object.values(state.analyses).filter((a) => a.state === "Structural Decline").slice(0, 3).map((a) => ({
			id: `decline-${a.borrower.id}`,
			icon: TrendingDown,
			iconColor: "text-danger",
			bg: "bg-danger/8",
			title: "Structural decline detected",
			detail: `${a.borrower.name} — RSI ${a.rsi.value}`,
			time: /* @__PURE__ */ new Date(Date.now() - 108e4),
			borrowerId: a.borrower.id,
			slug: slugFor(a.borrower)
		})),
		...state.decisions.slice(-3).map((d) => ({
			id: `decision-${d.id}`,
			icon: Bell,
			iconColor: "text-warning",
			bg: "bg-warning/8",
			title: `Plan ${d.action.toLowerCase()} — ${d.borrowerName}`,
			detail: `${d.planType} · ${d.officerName}`,
			time: new Date(d.timestamp),
			borrowerId: d.borrowerId,
			slug: ""
		})),
		{
			id: "recalib",
			icon: RefreshCw,
			iconColor: "text-success",
			bg: "bg-success/8",
			title: "Forecast recalibration complete",
			detail: `${state.borrowers.length} borrowers updated`,
			time: /* @__PURE__ */ new Date(Date.now() - 27e5),
			borrowerId: null,
			slug: ""
		},
		...Object.values(state.analyses).filter((a) => a.state === "Seasonal Dip").slice(0, 2).map((a) => ({
			id: `seasonal-${a.borrower.id}`,
			icon: TriangleAlert,
			iconColor: "text-info",
			bg: "bg-info/8",
			title: "Seasonal dip — plan awaiting review",
			detail: `${a.borrower.name} — RSI ${a.rsi.value}`,
			time: /* @__PURE__ */ new Date(Date.now() - 72e5),
			borrowerId: a.borrower.id,
			slug: slugFor(a.borrower)
		}))
	].slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-80 p-0 flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "px-4 py-3 border-b border-border flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "text-[15px] font-semibold",
					children: "Notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "h-7 w-7 flex items-center justify-center rounded hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 text-muted-foreground" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto divide-y divide-border",
				children: notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: cn("w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors"),
					onClick: () => {
						if (n.slug) {
							router.navigate({ to: `/borrowers/${n.slug}` });
							onClose();
						}
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5", n.bg),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: cn("h-3.5 w-3.5", n.iconColor) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] font-medium text-foreground leading-tight",
									children: n.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-muted-foreground mt-0.5",
									children: n.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground/60 mt-1",
									children: formatDistanceToNow(n.time, { addSuffix: true })
								})
							]
						})]
					})
				}, n.id))
			})]
		})
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Command$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$1.displayName = _e.displayName;
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
var PAGES = [
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard
	},
	{
		label: "Portfolio",
		to: "/portfolio",
		icon: Briefcase
	},
	{
		label: "Borrowers",
		to: "/borrowers",
		icon: Users
	},
	{
		label: "Alerts",
		to: "/alerts",
		icon: TriangleAlert
	},
	{
		label: "Plans",
		to: "/plans",
		icon: FileText
	},
	{
		label: "Forecasts",
		to: "/forecasts",
		icon: TrendingUp
	},
	{
		label: "Monitoring",
		to: "/monitoring",
		icon: Activity
	},
	{
		label: "Model Insights",
		to: "/model-insights",
		icon: ChartColumn
	},
	{
		label: "Data Ingestion",
		to: "/data-ingestion",
		icon: Upload
	},
	{
		label: "Audit Log",
		to: "/audit-log",
		icon: ClipboardList
	},
	{
		label: "Settings",
		to: "/settings",
		icon: Settings
	},
	{
		label: "Help",
		to: "/help",
		icon: CircleQuestionMark
	}
];
function CommandPalette({ open, onClose }) {
	const { state } = useApp();
	const router = useRouter();
	const [query, setQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				if (!open) {}
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open]);
	const filteredBorrowers = state.borrowers.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()) || b.id.toLowerCase().includes(query.toLowerCase()) || b.occupation.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
	function navigate(to) {
		router.navigate({ to });
		onClose();
		setQuery("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "p-0 gap-0 max-w-lg overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, {
				shouldFilter: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
					placeholder: "Search borrowers, pages, alerts…",
					value: query,
					onValueChange: setQuery,
					className: "text-[13px]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
					className: "max-h-80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No results found." }),
						query === "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
							heading: "Pages",
							children: PAGES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
								onSelect: () => navigate(p.to),
								className: "gap-2 text-[13px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-4 w-4 text-muted-foreground" }), p.label]
							}, p.to))
						}),
						filteredBorrowers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
							heading: "Borrowers",
							children: filteredBorrowers.map((b) => {
								const analysis = state.analyses[b.id];
								const slug = slugFor(b);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									onSelect: () => navigate(`/borrowers/${slug}`),
									className: "gap-2 text-[13px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: b.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground text-[12px]",
											children: [
												b.id,
												" · ",
												b.occupation
											]
										}),
										analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-auto text-[11px] text-muted-foreground",
											children: ["RSI ", analysis.rsi.value]
										})
									]
								}, b.id);
							})
						}),
						query !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
							heading: "Pages",
							children: PAGES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase())).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
								onSelect: () => navigate(p.to),
								className: "gap-2 text-[13px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-4 w-4 text-muted-foreground" }), p.label]
							}, p.to))
						})
					]
				})]
			})
		})
	});
}
function Topbar() {
	const { state, dispatch } = useApp();
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [cmdOpen, setCmdOpen] = (0, import_react.useState)(false);
	const router = useRouter();
	const pendingCount = state.decisions.filter((d) => d.action === "Approved").length;
	const alertCount = Object.values(state.analyses).filter((a) => a.state === "Structural Decline" || a.state === "Emerging Stress").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "fixed top-0 left-56 right-0 z-30 h-14 flex items-center justify-between px-5 bg-card border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setCmdOpen(true),
				className: "flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-muted/50 text-muted-foreground text-[13px] hover:border-ring/50 transition-colors w-64",
				"aria-label": "Open command palette",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search borrowers, pages…" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "ml-auto text-[10px] font-mono bg-border/80 px-1.5 py-0.5 rounded",
						children: "⌘K"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "text-muted-foreground text-[12px] gap-1.5",
						onClick: () => {
							dispatch({ type: "RESET_DEMO" });
							router.navigate({ to: "/dashboard" });
						},
						title: "Reset demo to initial state",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), "Reset Demo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setNotifOpen(true),
						className: "relative h-8 w-8 flex items-center justify-center rounded hover:bg-muted transition-colors",
						"aria-label": "Notifications",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-muted-foreground" }), alertCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 h-2 w-2 rounded-full bg-danger" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-full bg-cfc-amber/15 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold text-cfc-amber",
							children: "PS"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationDrawer, {
			open: notifOpen,
			onClose: () => setNotifOpen(false),
			pendingCount
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
			open: cmdOpen,
			onClose: () => setCmdOpen(false)
		})
	] });
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pl-56 pt-14 min-h-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6",
					children
				})
			})
		]
	});
}
//#endregion
export { DialogHeader as a, SheetContent as c, buttonVariants as d, cn as f, DialogContent as i, SheetHeader as l, Button as n, DialogTitle as o, Dialog as r, Sheet as s, AppShell as t, SheetTitle as u };
