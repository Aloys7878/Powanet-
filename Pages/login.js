import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [piId, setPiId] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("powanetUser", JSON.stringify({ email, piId }));
    router.push("/dashboard");
  };

  return (
    <div className="login-screen">
      <h1>🔐 POWANET Secure Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Pi ID" value={piId} onChange={e => setPiId(e.target.value)} required />
        <input type="email" placeholder="Email / Gmail" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Login / Register</button>
      </form>
    </div>
  );
}
