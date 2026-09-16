import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as AppProvider } from "./store-BdGbiYXL.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$14 } from "../_id-M3_Av4cB.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BaQ8822D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CSA5tDEU.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go to dashboard"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing or head back to the dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/dashboard",
						className: "inline-flex items-center justify-center rounded border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted",
						children: "Dashboard"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Cash-Flow Copilot — Lender Operations Platform" },
			{
				name: "description",
				content: "Understand the cash flow. Detect the stress. Structure the recovery."
			},
			{
				property: "og:title",
				content: "Cash-Flow Copilot"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-DcuZx4B1.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./alerts-05fIVxkZ.mjs");
var Route$11 = createFileRoute("/alerts")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./audit-log-BtZv4W4g.mjs");
var Route$10 = createFileRoute("/audit-log")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./dashboard-BApEaWPU.mjs");
var Route$9 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./data-ingestion-PRxCkfu1.mjs");
var Route$8 = createFileRoute("/data-ingestion")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./forecasts-ChQBHn-s.mjs");
var Route$7 = createFileRoute("/forecasts")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./help-D6bRi2xX.mjs");
var Route$6 = createFileRoute("/help")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./model-insights-BJ4MjQks.mjs");
var Route$5 = createFileRoute("/model-insights")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./monitoring-DP9Nh-GF.mjs");
var Route$4 = createFileRoute("/monitoring")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./plans-DmqlVwK-.mjs");
var Route$3 = createFileRoute("/plans")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./portfolio-DSPPdIqo.mjs");
var Route$2 = createFileRoute("/portfolio")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings--dufPsuL.mjs");
var Route$1 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./borrowers-DQUO93Mn.mjs");
var Route = createFileRoute("/borrowers/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AlertsRoute = Route$11.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => Route$13
});
var AuditLogRoute = Route$10.update({
	id: "/audit-log",
	path: "/audit-log",
	getParentRoute: () => Route$13
});
var DashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$13
});
var DataIngestionRoute = Route$8.update({
	id: "/data-ingestion",
	path: "/data-ingestion",
	getParentRoute: () => Route$13
});
var ForecastsRoute = Route$7.update({
	id: "/forecasts",
	path: "/forecasts",
	getParentRoute: () => Route$13
});
var HelpRoute = Route$6.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$13
});
var ModelInsightsRoute = Route$5.update({
	id: "/model-insights",
	path: "/model-insights",
	getParentRoute: () => Route$13
});
var MonitoringRoute = Route$4.update({
	id: "/monitoring",
	path: "/monitoring",
	getParentRoute: () => Route$13
});
var PlansRoute = Route$3.update({
	id: "/plans",
	path: "/plans",
	getParentRoute: () => Route$13
});
var PortfolioRoute = Route$2.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => Route$13
});
var SettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$13
});
var BorrowersIndexRoute = Route.update({
	id: "/borrowers/",
	path: "/borrowers/",
	getParentRoute: () => Route$13
});
var rootRouteChildren = {
	IndexRoute,
	AlertsRoute,
	AuditLogRoute,
	DashboardRoute,
	DataIngestionRoute,
	ForecastsRoute,
	HelpRoute,
	ModelInsightsRoute,
	MonitoringRoute,
	PlansRoute,
	PortfolioRoute,
	SettingsRoute,
	BorrowersIdRoute: Route$14.update({
		id: "/borrowers/$id",
		path: "/borrowers/$id",
		getParentRoute: () => Route$13
	}),
	BorrowersIndexRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
