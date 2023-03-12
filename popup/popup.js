const connectButton = document.getElementById("connect-button");

connectButton.addEventListener("click", (event) => {
  const variants = event.target.classList;

  if (variants.contains("start")) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "start-connect" });
    });
    connectButton.innerText = "Stop Connecting";
    variants.remove("start");
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stop-connect" });
    });
    connectButton.innerText = "Start Connecting";
    variants.add("start");
  }
});
