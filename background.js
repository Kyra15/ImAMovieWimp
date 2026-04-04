const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${GROQ_API_KEY}`
  },
  body: JSON.stringify({
    model: "llama3-8b-8192",
    max_tokens: 10,
    messages: [{
      role: "user",
      content: `Does "${movie}" have a happy or sad ending? Reply with only: happy or sad.`
    }]
  })
});

const data = await response.json();
const sentiment = data.choices[0].message.content.trim().toLowerCase();