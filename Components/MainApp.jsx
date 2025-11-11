import React, { useState } from "react";
import EgoVoice from "./EgoVoice";
import Networks from "./Networks";
import Rewards from "./Rewards";

export default function MainApp({ user, mode, setMode, onLogout }) {
  const [dark, setDark] = useState(true);

  return (
    <div style={{
      minHeight: "100vh",
      background: dark ? "#071124" : "#f3f7ff",
      color: dark ? "#e8eefc" : "#0b1b34",
      paddingBottom: 60
    }}>
      <header style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:16, maxWidth:1100, margin:"auto" }}>
        <div>
          <h2 style={{margin:0}}>⚡ POWANET Quantum</h2>
          <small style={{opacity:0.8}}>User: {user.email || user.id}</small>
        </div>

        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <label style={{display:"flex",alignItems:"center",gap:8}}>
            <input type="checkbox" checked={dark} onChange={()=>setDark(d=>!d)} />
            Dark
          </label>
          <label style={{display:"flex",alignItems:"center",gap:8}}>
            <select value={mode} onChange={(e)=>setMode(e.target.value)}>
              <option value="test">Testnet</option>
              <option value="main">Mainnet</option>
            </select>
            Mode
          </label>
          <button onClick={onLogout} style={{background:"#ff5a5f", color:"#fff", border:"none", padding:"8px 12px", borderRadius:8}}>Logout</button>
        </div>
      </header>

      <main style={{maxWidth:1100, margin:"12px auto", padding:16}}>
        <section>
          <EgoVoice user={user} mode={mode} />
        </section>

        <section style={{marginTop:20}}>
          <Networks mode={mode} />
        </section>

        <section style={{marginTop:20}}>
          <Rewards user={user} mode={mode} />
        </section>
      </main>
    </div>
  );
            }
