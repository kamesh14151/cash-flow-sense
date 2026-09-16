import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useApp } from "./store-BdGbiYXL.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as TrendingUp, u as Shield, z as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DcuZx4B1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { state, dispatch } = useApp();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (state.isLoggedIn) navigate({ to: "/dashboard" });
	}, [state.isLoggedIn, navigate]);
	if (state.isLoggedIn) return null;
	function handleLogin() {
		dispatch({ type: "LOGIN" });
		navigate({ to: "/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex flex-col justify-between w-[480px] bg-foreground p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-9 w-9 rounded bg-cfc-amber flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] font-bold text-background leading-tight",
						children: "Cash-Flow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-bold text-cfc-amber leading-tight",
						children: "Copilot"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl font-bold text-background leading-tight",
							children: [
								"Two income drops.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Two different",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"stories."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[15px] text-background/60 leading-relaxed",
							children: "Understand the cash flow. Detect the stress. Structure the recovery."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [{
								label: "Seasonal Dip",
								sub: "Pattern-matched to historical profile",
								color: "bg-info"
							}, {
								label: "Structural Decline",
								sub: "Unexplained by seasonal factors",
								color: "bg-danger"
							}].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2.5 w-2.5 rounded-full ${s.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] font-semibold text-background",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-background/50",
									children: s.sub
								})] })]
							}, s.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-background/10 pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] text-background/40 uppercase tracking-wide mb-3",
								children: "Human-in-the-loop workflow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [
									"Detect",
									"Forecast",
									"Classify",
									"Recommend",
									"Officer Review",
									"Audit"
								].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[12px] text-background/70",
										children: s
									}), i < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 text-background/30" })]
								}, s))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] text-background/30",
					children: ["Salem Central Branch · Prototype v1.0 · ", (/* @__PURE__ */ new Date()).getFullYear()]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded bg-cfc-amber flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14px] font-bold text-foreground leading-tight",
							children: "Cash-Flow Copilot"
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-foreground",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] text-muted-foreground",
						children: "Salem Central Branch · Lender Operations"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[12px] font-medium text-foreground",
									children: "Username"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: "priya.sharma",
									readOnly: true,
									className: "w-full border border-border rounded px-3 py-2 text-[13px] bg-muted/50 text-foreground"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[12px] font-medium text-foreground",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: "••••••••",
									readOnly: true,
									className: "w-full border border-border rounded px-3 py-2 text-[13px] bg-muted/50 text-foreground"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[12px] text-muted-foreground bg-muted/50 border border-border rounded px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Demo mode — credentials are pre-filled. Click Sign in to continue." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleLogin,
								className: "w-full bg-foreground text-background rounded py-2.5 text-[14px] font-semibold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2",
								children: ["Sign in", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 text-[12px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: "Demo credentials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Officer: Priya Sharma · Loan Officer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Branch: Salem Central Branch" })
							]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
