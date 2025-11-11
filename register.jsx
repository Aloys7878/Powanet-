import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", piid: "" });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Welcome ${form.username}! Your Pi ID is ${form.piid}`);
  };

  return (
    <div className="auth-screen">
      <h2>Join POWANET Quantum 🌐</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Pi ID" onChange={e => setForm({...form, piid: e.target.value})}/>
        <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})}/>
        <input placeholder="Gmail" type="email" onChange={e => setForm({...form, email: e.target.value})}/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export function LoginScreen() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🔐 POWANET Login</h2>
      <input type="text" placeholder="Pi ID" style={{ padding: 8, margin: 8 }} />
      <input type="email" placeholder="Email" style={{ padding: 8, margin: 8 }} />
      <button style={{ padding: 10, marginTop: 12, background: "#007bff", color: "white" }}>
        Login
      </button>
    </div>
  );
}
