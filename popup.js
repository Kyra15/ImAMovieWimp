// Get active tab info and trigger search + classify
document.querySelector("button").addEventListener("click", async () => {
  const button = document.querySelector("button");
  const label = document.querySelector("p");

  button.disabled = true;
  button.textContent = "Searching...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const movieTitle = extractMovieName(tab.title, tab.url);

  label.textContent = `Current movie: ${movieTitle}`;

  const response = await chrome.runtime.sendMessage({
    type: "GET_ENDING",
    movie: movieTitle
  });

  button.disabled = false;
  button.textContent = "Reveal ending";

  showResult(response.sentiment);
});

function extractMovieName(title, url) {
  return title
    .replace(/[\(\[].*?[\)\]]/g, "")   // remove (1972), [HD], etc.
    .replace(/[-–|].*$/g, "")          // remove "- IMDb", "| Letterboxd"
    .replace(/\s+/g, " ")
    .trim();
}

function showResult(sentiment) {
  const existing = document.getElementById("result-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "result-popup";
  popup.className = sentiment === "happy" ? "happy" : "sad";
  popup.innerHTML = `
    <span class="label">${sentiment === "happy" ? "Happy :D" : "Sad :("}</span>
  `;
  document.body.appendChild(popup);
}