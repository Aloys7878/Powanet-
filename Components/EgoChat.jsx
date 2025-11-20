// components/EgoChat.jsx
import React, { useState } from "react";
import axios from "axios";

export default function EgoChat() {
  const [messages, setMessages] = useState([{id:0,from:'EGO',text:'Welcome to POWANET — EGO at your service.'}]);
  const [input, setInput] = useState('');

  const speak = (txt) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  const send = async (t) => {
    if (!t) return;
    setMessages(m => [...m, {id: Date.now(), from:'You', text: t}]);
    setInput('');
    try {
      const res = await axios.post('/api/ai', { prompt: t });
      const reply = res.data.reply || "EGO: couldn't generate a response.";
      setMessages(m => [...m, {id: Date.now()+1, from:'EGO', text: reply}]);
      speak(reply);
    } catch (e) {
      const err = 'EGO: error contacting AI endpoint.';
      setMessages(m => [...m, {id: Date.now()+2, from:'EGO', text: err}]);
      speak(err);
    }
  };

  return (
    <div style={{ background: '#fafafa', padding: 10, borderRadius: 8 }}>
      <h4>EGO Voice + Chat</h4>
      <div style={{ height: 160, overflow: 'auto', background: '#fff', padding: 8, borderRadius: 6 }}>
        {messages.map(m => <div key={m.id}><strong>{m.from}:</strong> {m.text}</div>)}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} style={{ flex:1, padding:8 }} placeholder="Type or use voice..." onKeyDown={(e)=> e.key==='Enter' && send(input)} />
        <button onClick={()=>send(input)}>Send</button>
      </div>
    </div>
  );
}
