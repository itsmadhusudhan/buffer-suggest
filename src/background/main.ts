console.log("Hello from background");

chrome.runtime.onInstalled.addListener(() => {
	chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === "toggleSidePanel") {
		if (sender.tab?.id) {
			chrome.sidePanel.open({ tabId: sender.tab?.id });
		}

		sendResponse({ status: "side panel opened" });
	}
});
