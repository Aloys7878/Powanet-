# POWANET -v3 
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function EgoChat() {
  const [messages, setMessages] = useState([{ id: 0, from: "EGO", text: "Welcome to POWANET EGO — type or speak." }]);
  const [input, setInput] = useState("");
  const ref = useRef();

  useEffect(()=> { ref.current?.scrollTo(0, ref.current.scrollHeight); }, [messages]);

  const send = async (text) => {
    if (!text) return;
    setMessages(m => [...m, { id: m.length+1, from: "You", text }]);
    setInput("");
    try {
      const res = await axios.post("/api/ai", { prompt: text });
      const reply = res.data.reply || "EGO: no reply.";
      setMessages(m => [...m, { id: m.length+2, from: "EGO", text: reply }]);
      if (typeof window !== "undefined") {
        const u = new SpeechSynthesisUtterance(reply);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    } catch (e) {
      setMessages(m => [...m, { id: m.length+2, from: "EGO", text: "EGO: error." }]);
    }
  };

  return (
    <div className="ego">
      <div className="ego-window" ref={ref}>
        {messages.map(m => <div key={m.id} className={`msg ${m.from==="EGO"?"ego":"you"}`}><strong>{m.from}:</strong> {m.text}</div>)}
      </div>
      <div className="ego-input">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask EGO..." onKeyDown={e => e.key==="Enter" && send(input)} />
        <button onClick={() => send(input)}>Send</button>
      </div>
    </div>
  );
}
