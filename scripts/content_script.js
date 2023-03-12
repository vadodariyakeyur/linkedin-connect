let terminate = false;

async function waitRandom() {
  const waitTime = Math.floor(Math.random() * 6) + 5;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, waitTime * 1000);
  });
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "start-connect") {
    const allButtons = Array.from(document.getElementsByTagName("button"));
    const connectButtons = allButtons.filter(
      (bt) => bt.innerText === "Connect"
    );

    for (const button of connectButtons) {
      if (terminate) {
        terminate = false;
        break;
      } else {
        button.click();
        Array.from(document.getElementsByTagName("button"))
          .find((bt) => bt.innerText === "Send")
          .click();
        await waitRandom();
      }
    }
  }

  if (message.action === "stop-connect") {
    terminate = true;
  }
});
