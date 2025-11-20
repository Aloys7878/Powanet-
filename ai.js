// pages/api/ai.js
import axios from 'axios';

const DEMO_AI_ENDPOINT = process.env.DEMO_AI_ENDPOINT || 'https://demo-kzmg7kgtkpavjsk0s7kf.vusercontent.net/api/ai';

export default async function handler(req, res) {
  try {
    const prompt = req.body?.prompt || req.query?.prompt || '';
    const r = await axios.post(DEMO_AI_ENDPOINT, { prompt }, { timeout: 15000 });
    const reply = r.data?.reply || (r.data?.output || 'Demo AI responded.');
    res.status(200).json({ reply });
  } catch (err) {
    console.error('AI proxy error', err?.message || err);
    res.status(200).json({ reply: "EGO: (demo fallback) I'm having trouble contacting AI; please try again." });
  }
}
