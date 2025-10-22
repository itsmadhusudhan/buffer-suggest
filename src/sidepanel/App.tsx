/** biome-ignore-all lint/a11y/noStaticElementInteractions: I know */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents:  I know */
import { useState } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";
import { Lightbulb, RefreshCcw, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import type { Idea } from "@/shared/types";

export default function App() {
	const [ideas, setIdeas] = useChromeStorageLocal<Idea[]>("ideas", []);
	const [selectionMode, setSelectionMode] = useState(false);
	const [bufferIdeas, setBufferIdeas] = useState<number[]>([]);

	const handleDelete = async (id: number) => {
		const updatedIdeas = ideas.filter((idea) => idea.id !== id);

		await chrome.storage.local.set({ ideas: updatedIdeas });
	};

	const handleBufferSelection = (id: number) => {
		if (!selectionMode) return;

		let updatedIdeas = [...bufferIdeas];

		if (bufferIdeas.includes(id)) {
			updatedIdeas = bufferIdeas.filter((idea) => idea !== id);
		} else {
			updatedIdeas.push(id);
		}

		setBufferIdeas(updatedIdeas);
	};

	return (
		<div className="h-full grid grid-rows-[auto_1fr]">
			<header className="flex justify-between items-center p-4">
				<h1 className="text-lg font-semibold flex items-center gap-2">
					<Lightbulb /> <span>Saved Ideas</span>
				</h1>

				{ideas.length > 0 && (
					<div className="flex items-center gap-2">
						<Button
							disabled={bufferIdeas.length === 0}
							size="sm"
							onClick={() => {
								if (!selectionMode) return;

								toast.success("Ideas saved to buffer!");
								setSelectionMode(false);
								setIdeas((value) => {
									return value.map((idea) => {
										if (bufferIdeas.includes(idea.id)) {
											return {
												...idea,
												synced: true,
											};
										}
										return idea;
									});
								});
								setBufferIdeas([]);
							}}
							variant="outline"
							className={cn(!selectionMode && "invisible")}
						>
							<RefreshCcw />
							Buffer
						</Button>

						<Switch
							checked={selectionMode}
							onCheckedChange={() => {
								setSelectionMode(!selectionMode);
								setBufferIdeas([]);
							}}
						/>
					</div>
				)}
			</header>
			{ideas.length === 0 ? (
				<div className="flex items-center justify-center flex-col h-full text-lg gap-1 p-4">
					<Lightbulb />
					<p>Your ideas will appear here</p>
				</div>
			) : (
				<div className="flex flex-col gap-3 overflow-y-auto px-4">
					{ideas.map((idea) => {
						const checked = bufferIdeas.includes(idea.id);

						return (
							<div
								key={idea.id}
								className={cn(
									"bg-white rounded-lg p-3 border border-gray-200 w-full",
									selectionMode && "cursor-pointer",
									checked && "bg-primary/5",
									idea.synced && "bg-green-50",
								)}
								onClick={handleBufferSelection.bind(null, idea.id)}
							>
								<div className="text-sm items-start justify-between gap-3 grid grid-cols-[1fr_auto]">
									<p className="text-sm text-wrap block overflow-hidden">
										{idea.text}
									</p>

									<div className="min-w-5">
										{selectionMode ? (
											<Checkbox
												checked={checked}
												className={cn("size-4", checked && "stroke-green-500")}
											/>
										) : (
											<button
												type="button"
												onClick={handleDelete.bind(null, idea.id)}
												className="p-1 hover:bg-destructive/80 hover:text-white cursor-pointer rounded-md"
											>
												<Trash className="size-4" />
											</button>
										)}
									</div>
								</div>
								{idea.tags.length > 0 && (
									<div className="flex flex-wrap gap-1 mt-2">
										{idea.tags.map((tag) => (
											<span
												key={tag}
												className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
											>
												#{tag}
											</span>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
