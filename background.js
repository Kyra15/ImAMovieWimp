importScripts("config.js");


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ENDING") {
    classifyEnding(message.movie).then(sendResponse);
    return true;
  }
});

async function classifyEnding(movie) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 10,
        temperature: 0,
        messages: [{
          role: "user",
          content: `What is the ending of the movie "${movie}"? The title may or may not include a year in parentheses — use the year only if needed to differentiate between remakes. Reply with only one word: happy, sad, or ambiguous. If you are unsure, say: unknown.`
        }]
      })
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("Full response:", JSON.stringify(data));

    const sentiment = data.choices[0].message.content.trim().toLowerCase();

    console.log(sentiment);
    // return { sentiment: sentiment };
    return { sentiment: sentiment.includes("happy") ? "happy" : "sad" };
  } catch (err) {
    return { sentiment: "error" };
  }
}
