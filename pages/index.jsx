import React, { useState } from "react";
import Head from "next/head";
import EgoChat from "../components/EgoChat";
import NetworkGrid from "../components/NetworkGrid";
import { formatPi, getBalances } from "../modules/wallet";

export default function Home() {
  const [dark, setDark] = useState(true);
  const balances = getBalances();
  return (
    <div className={dark ? "theme-dark app-root" : "theme-light app-root"}>
      <Head><title>POWANET v3 — Quantum Global</title></Head>
      <header className="topbar">
        <div className="brand">POWANET ⚡ Quantum</div>
        <div className="controls">
          <button className="btn" onClick={() => setDark(d => !d)}>Toggle Theme</button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>POWANET v3 — Quantum Global Edition</h1>
          <p>25 Networks · Pi & POWA Wallet · EGO Assistant · Mixed Test/Main modes</p>
          <div className="balances">
            <div>Test Pi: {formatPi(balances.testnet.pi)}</div>
            <div>Test POWA: {balances.testnet.powa} POWA</div>
          </div>
        </section>

        <section className="panels">
          <div className="left">
            <NetworkGrid />
          </div>
          <div className="right">
            <EgoChat />
          </div>
        </section>
      </main>
    </div>
  );
}
