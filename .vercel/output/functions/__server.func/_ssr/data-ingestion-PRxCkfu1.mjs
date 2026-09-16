import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useApp } from "./store-BdGbiYXL.mjs";
import { E as CircleCheck, a as TriangleAlert, i as Upload, y as FileText } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./AppShell-sdeg094X.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CuIia4UB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-ingestion-PRxCkfu1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DataIngestionPage() {
	const { state, dispatch } = useApp();
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [count, setCount] = (0, import_react.useState)(200);
	const [generated, setGenerated] = (0, import_react.useState)(false);
	function handleGenerate() {
		setGenerating(true);
		setTimeout(() => {
			dispatch({
				type: "GENERATE_BORROWERS",
				count
			});
			setGenerating(false);
			setGenerated(true);
		}, 800);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: "Data Ingestion"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] text-muted-foreground mt-0.5",
			children: "Import transaction data or generate synthetic datasets"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "upload",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "upload",
					children: "Upload data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "synthetic",
					children: "Generate synthetic data"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "upload",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-lg p-6 max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[15px] font-semibold text-foreground mb-2",
							children: "Upload transaction file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mb-4",
							children: "CSV or JSON format"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-cfc-amber/40 transition-colors cursor-pointer mb-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8 text-muted-foreground/40 mx-auto mb-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] font-medium text-foreground",
									children: "Drag and drop your file here"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-muted-foreground mt-1",
									children: "or click to browse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground/60 mt-3",
									children: "CSV, JSON · max 50MB"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border rounded p-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] font-semibold text-foreground mb-2",
								children: "Required columns"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-1 text-[11px] font-mono text-muted-foreground",
								children: [
									"borrower_id",
									"date",
									"amount",
									"type",
									"source"
								].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-muted/50 px-2 py-1 rounded",
									children: f
								}, f))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full gap-2",
							variant: "outline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), "Select file"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] font-semibold text-foreground",
									children: "Last ingestion — Sep 16, 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 text-[12px]",
									children: [
										{
											label: "Records",
											value: "1,847"
										},
										{
											label: "Borrowers",
											value: "200"
										},
										{
											label: "Date range",
											value: "Apr 2025 – Sep 2026"
										},
										{
											label: "Quality score",
											value: "97.3%"
										},
										{
											label: "Missing values",
											value: "12"
										},
										{
											label: "Irregular intervals",
											value: "3"
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between bg-muted/50 rounded px-2.5 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: s.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: s.value
										})]
									}, s.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[12px] text-success mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "All records validated"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "synthetic",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-lg p-6 max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[15px] font-semibold text-foreground mb-2",
							children: "Generate synthetic dataset"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mb-4",
							children: "Deterministic seeded generation using the existing engine. Includes all three archetypes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] font-medium text-foreground mb-2",
								children: "Number of borrowers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: [
									50,
									100,
									200
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCount(n),
									className: `px-4 py-2 text-[13px] font-medium rounded border transition-colors ${count === n ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/30"}`,
									children: n
								}, n))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted/50 rounded p-3 mb-4 text-[12px] space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "Archetypes included"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2 mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-card border border-border rounded px-2 py-1.5 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-success",
											children: ["~", Math.round(count * .68)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-[10px]",
											children: "Stable"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-card border border-border rounded px-2 py-1.5 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-info",
											children: ["~", Math.round(count * .22)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-[10px]",
											children: "Seasonal"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-card border border-border rounded px-2 py-1.5 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-danger",
											children: ["~", Math.round(count * .1)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-[10px]",
											children: "Declining"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/50 rounded px-3 py-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" }), "This will replace the current borrower dataset. Demo borrowers (Meena, Suresh, Anitha) are always preserved at the top."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: handleGenerate,
							disabled: generating,
							children: generating ? "Generating…" : `Generate ${count} borrowers`
						}),
						generated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2 text-[12px] text-success",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }),
								count,
								" borrowers generated · Analysis engine ready"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground mt-3",
							children: [
								"Current dataset: ",
								state.borrowers.length,
								" borrowers"
							]
						})
					]
				})
			})
		]
	})] });
}
//#endregion
export { DataIngestionPage as component };
