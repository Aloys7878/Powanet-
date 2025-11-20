// pages/index.jsx
import Head from "next/head";
import EgoChat from "../components/EgoChat";
import NetworkGrid from "../components/NetworkGrid";
import { useState, useEffect } from "react";

export default function Home() {
  const [mode, setMode] = useState("testnet"); // testnet | mainnet
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className="app-root" style={{ padding: 12, fontFamily: "Helvetica, Arial" }}>
      <Head>
        <title>POWANET v4 — Quantum Global</title>
      </Head>

      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div><strong>POWANET v4 — Quantum Global</strong></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setMode(m => (m === "testnet" ? "mainnet" : "testnet"))}>
            {mode === "testnet" ? "Switch to Mainnet" : "Switch to Testnet"}
          </button>
          <button onClick={() => setDark(d => !d)}>{dark ? "Light" : "Dark"}</button>
        </div>
      </header>

      <section id="dashboard" style={{ marginBottom: 12 }}>
        <div style={{ background: dark ? "#0b1620" : "#f5f7fa", color: dark ? "#fff" : "#111", padding: 12, borderRadius: 8 }}>
          <h2>Global Snapshot</h2>
          <p>Mode: <b>{mode}</b></p>
          <p>Pi (π): <b>314,159.26 π</b></p>
          <p>POA tokens: <b>1,252 POA</b></p>
        </div>
      </section>

      <section style={{ marginBottom: 12 }}>
        <h3>Networks</h3>
        <NetworkGrid />
      </section>

      <section>
        <EgoChat />
      </section>
    </div>
  );
}
