import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
	manifest_version: 3,
	name: "Buffer Suggest",
	version: pkg.version,
	icons: {
		48: "public/logo.png",
	},
	action: {
		default_icon: {
			48: "public/logo.png",
		},
	},
	permissions: ["sidePanel", "contentSettings", "storage"],
	content_scripts: [
		{
			js: ["src/content/main.tsx"],
			matches: ["https://*/*"],
			run_at: "document_idle",
		},
	],
	side_panel: {
		default_path: "src/sidepanel/index.html",
	},
	background: {
		service_worker: "src/background/main.ts",
		type: "module",
	},
	options_ui: {
		page: "src/options/index.html",
		open_in_tab: true,
	},
});
