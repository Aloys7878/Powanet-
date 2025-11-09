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
