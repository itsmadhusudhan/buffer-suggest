import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App.tsx";

const container = document.createElement("div");
container.id = "buffer-suggest-app";

document.body.appendChild(container);

createRoot(container).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
