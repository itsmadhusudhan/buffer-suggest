import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App.tsx";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

const container = document.createElement("div");
container.id = "buffer-suggest-app";

document.body.appendChild(container);

createRoot(container).render(
	<StrictMode>
		<App />
		<Toaster />
	</StrictMode>,
);
