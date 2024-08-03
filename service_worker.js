chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "summarize" }, (response) => {
          if (response && response.summary) {
            const summaryJson = JSON.stringify(response.summary);
            chrome.runtime.sendMessage({ status: 'success', summaryJson });
          } else {
            chrome.runtime.sendMessage({ status: 'error', message: 'Failed to get summary from content script' });
          }
        });
      } else {
        chrome.runtime.sendMessage({ status: 'error', message: 'No active tab found' });
      }
    });
  } else {
    chrome.runtime.sendMessage({ status: 'unknown_action' });
  }
})