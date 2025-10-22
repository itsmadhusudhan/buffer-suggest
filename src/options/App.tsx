import {
	RouterProvider,
	createRouter,
	createHashHistory,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, history: createHashHistory() });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}
