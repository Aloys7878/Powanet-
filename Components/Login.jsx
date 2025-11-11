import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [piId, setPiId] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // Simple client-side mock login. Replace with Pi Connect or OAuth later.
    if (!piId && !email) return alert("Enter Pi ID or email.");
    const user = { id: piId || `pi-${Date.now()}`, name: "Pioneer", email };
    onLogin(user);
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "24px auto" }}>
      <h1 style={{ marginBottom: 8 }}>Welcome to POWANET Quantum v3.8</h1>
      <p style={{ color: "#666" }}>Login with your Pi ID (mock) or Gmail (OAuth plug-in).</p>

      <div style={{ display: "grid", gap: 10 }}>
        <input placeholder="Pi ID (e.g. POWA-XXXX)" value={piId} onChange={(e)=>setPiId(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <input placeholder="Email (Gmail)" value={email} onChange={(e)=>setEmail(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button onClick={handleLogin} style={{ padding: 12, borderRadius: 8, background: "#007bff", color: "#fff", border: "none" }}>
          Continue (Mock)
        </button>

        <div style={{ marginTop: 6 }}>
          <small style={{ color:"#888" }}>
            To integrate Pi Connect: replace this mock with Pi Connect OAuth flow. See instructions below.
          </small>
        </div>
      </div>
    </div>
  );
}
