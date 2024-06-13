chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
        chrome.runtime.sendMessage({ action: "summarize" }, (response) => {
        let summary = response.summary;
        let blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
        let url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: "profile_summary.json"
        });
        });
    }
    });
});
