let currentBrightness = 100;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "BRIGHTNESS") {
    currentBrightness = msg.value;
    document.body.style.filter = `brightness(${currentBrightness}%)`;
  }

  if (msg.type === "PRESET") {
    applyTheme(msg.value);
  }
});

function getContrastColor(bg) {
  const rgb = bg.match(/\d+/g).map(Number);
  const luminance = 0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2];
  return luminance > 150 ? "#000" : "#fff";
}

function applyTheme(preset) {
  let bg, accent;

  if (preset === "cyberpunk") {
    bg = "rgb(10,10,20)";
    accent = "rgb(0,255,247)";
  } else if (preset === "pastel") {
    bg = "rgb(253,230,240)";
    accent = "rgb(147,197,253)";
  } else if (preset === "dark") {
    bg = "rgb(15,23,42)";
    accent = "rgb(148,163,184)";
  } else {
    bg = `hsl(${Math.random()*360},70%,85%)`;
    accent = `hsl(${Math.random()*360},80%,45%)`;
  }

  const text = getContrastColor(bg);

  document.body.style.background = bg;
  document.body.style.color = text;

  document.querySelectorAll("a, button").forEach(el => {
    el.style.color = accent;
  });
}
