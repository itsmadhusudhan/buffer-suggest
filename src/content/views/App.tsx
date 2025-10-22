import { useEffect, useId, useState } from "react";

function App() {
	const [textSelection, setTextSelection] = useState("");
	const buttonId = useId();
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleMouseUp = () => {
			try {
				const selection = window.getSelection();

				if (!selection || selection.isCollapsed) {
					setTextSelection("");
					return;
				}

				const range = selection.getRangeAt(0);
				const rect = range.getBoundingClientRect();
				const _currentSelection = selection.toString().trim();

				if (!_currentSelection) {
					setTextSelection("");
					return;
				}

				setTextSelection(selection.toString().trim());

				setPosition({
					x: rect.left + 40,
					y: rect.top - 20,
				});
			} catch (e) {
				console.log(e);
			}
		};

		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return textSelection ? (
		<button
			id={buttonId}
			className="ideaBtn"
			style={{
				top: position.y,
				left: position.x,
			}}
			type="button"
			onClick={async () => {
				if (!textSelection) return;

				const { ideas = [] } = await chrome.storage.local.get("ideas");

				const newIdea = {
					id: Date.now(),
					text: textSelection,
					tags: ["Default"],
					synced: false,
				};

				const updatedIdeas = [...ideas, newIdea];
				await chrome.storage.local.set({ ideas: updatedIdeas });
				window.getSelection()?.empty();
				window.getSelection()?.removeAllRanges();

				const toast = document.createElement("div");
				toast.innerText = "Idea saved!";
				toast.className = "toast";
				toast.style.paddingInline = "12px";
				toast.style.paddingBlock = "8px";
				document.body.appendChild(toast);
				setTimeout(() => toast.remove(), 1500);

				setTextSelection("");
			}}
		>
			💡 Add to Ideas
		</button>
	) : null;
}

export default App;
