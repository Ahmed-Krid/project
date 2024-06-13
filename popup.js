document.getElementById('summarize').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
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
  });
  