import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/global.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
		<Toaster richColors />
	</StrictMode>,
);
