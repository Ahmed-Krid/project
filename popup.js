document.addEventListener("DOMContentLoaded", () => {
  const summarizeButton = document.getElementById("summarize-button");
  const statusElement = document.getElementById("status");
  const summaryElement = document.getElementById("summaryp");

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
        console.log('Service worker registered:', registration);
      })
    .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.status === 'uccess') {
      const summaryJson = request.summaryJson;
      const summaryObj = JSON.parse(summaryJson);
      const summaryHtml = `<pre>${JSON.stringify(summaryObj, null, 2)}</pre>`;
      summaryElement.innerHTML = summaryHtml;
    } else {
      console.error('Error:', request.message);
    }
  });

  if (summarizeButton) {
    summarizeButton.addEventListener("click", () => {
      if (statusElement) {
        statusElement.innerText = "Summarizing...";
        console.log("Summarizing...")
      }

      chrome.runtime.sendMessage({ action: "summarize" });
    });
  } else {
    console.error("Summarize button not found!");
  }
});