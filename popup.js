document.addEventListener("DOMContentLoaded", async () => {
    const label = document.querySelector("h1");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const movieTitle = extractMovieName(tab.title, tab.url);
    label.textContent = `${movieTitle}`;
});


document.querySelector("button").addEventListener("click", async () => {
  const button = document.querySelector("button");

  button.disabled = true;
  button.textContent = "Searching...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const movieTitle = extractMovieName(tab.title, tab.url);

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
    .replace(/[\(\[].*?[\)\]]/g, "")
    .replace(/[-–|].*$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function showResult(sentiment) {
  const existing = document.getElementById("result-popup");
  if (existing) existing.remove();

  // get the label class thing inside the document and then make a div
  const card = document.querySelector(".verdict-card");
  card.innerHTML = "";
 
  const cls = sentiment.toLowerCase().trim();
 
  const badge = document.createElement("span");
  badge.className = `badge ${cls}`;
  badge.innerHTML = `<span class="badge-dot"></span>${sentiment}`;
 
  card.appendChild(badge);
}