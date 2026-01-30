const KEY_URL =
"https://raw.githubusercontent.com/kielsvu/Utility/refs/heads/Lua/Utility/Major/Main.txt";

const COOLDOWN = 10 * 60 * 1000;
const lastTime = localStorage.getItem("lastKeyTime");
const savedKey = localStorage.getItem("savedKey");
const keyBox = document.getElementById("key");

if (lastTime && Date.now() - lastTime < COOLDOWN && savedKey) {
  keyBox.textContent = savedKey;
} else {
  fetch(KEY_URL)
    .then(r => r.text())
    .then(text => {
      const keys = text.trim().split(/\s+/);
      const key = keys[Math.floor(Math.random() * keys.length)];

      localStorage.setItem("savedKey", key);
      localStorage.setItem("lastKeyTime", Date.now());

      keyBox.textContent = key;
    })
    .catch(() => {
      keyBox.textContent = "Failed to load key";
    });
}
