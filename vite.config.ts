import path from "node:path";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import zip from "vite-plugin-zip-pack";
import manifest from "./manifest.config.js";
import { name, version } from "./package.json";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
	resolve: {
		alias: {
			"@": `${path.resolve(__dirname, "src")}`,
		},
	},
	plugins: [
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "src/options/routes",
			generatedRouteTree: "src/options/routeTree.gen.ts",
		}),
		react(),
		crx({ manifest }),
		zip({
			outDir: "release",
			outFileName: `buffer-suggest-${name}-${version}.zip`,
		}),
	],
	server: {
		cors: {
			origin: [/chrome-extension:\/\//],
		},
	},
});
