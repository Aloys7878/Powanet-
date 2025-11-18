// /api/ai.js
export default async function handler(req, res) {
  // Simple simulated AI reply. Replace with real OpenAI/GPT or your demo endpoint.
  const { prompt } = req.body || { prompt: "" };
  const reply = prompt
    ? `EGO (sim): Received: "${prompt}". I can help with Health, Finance, Maps, Payments, Voice, and more.`
    : "EGO (sim): Hello — ask me about networks, wallets, or your balance.";
  res.status(200).json({ reply, lang: req.headers["accept-language"] || "en" });
}
