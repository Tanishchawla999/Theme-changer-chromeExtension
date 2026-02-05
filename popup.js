function sendToPage(data) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, data);
    });
  }
  
  document.getElementById("brightness").oninput = (e) => {
    sendToPage({ type: "BRIGHTNESS", value: e.target.value });
  };
  
  document.querySelector(".cyber").onclick = () =>
    sendToPage({ type: "PRESET", value: "cyberpunk" });
  
  document.querySelector(".pastel").onclick = () =>
    sendToPage({ type: "PRESET", value: "pastel" });
  
  document.querySelector(".dark").onclick = () =>
    sendToPage({ type: "PRESET", value: "dark" });
  
  document.getElementById("random").onclick = () =>
    sendToPage({ type: "PRESET", value: "random" });
  
  document.getElementById("reset").onclick = () =>
    chrome.tabs.reload();
  