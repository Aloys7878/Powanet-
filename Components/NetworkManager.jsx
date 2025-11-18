// components/NetworkManager.jsx
import React, { useEffect, useState } from "react";
import { POWA_CONFIG } from "../lib/powaConfig";

const initialNetworks = [
  "HealthNet","EcoNet","EduNet","AgriNet","FinNet","GovNet","TechNet",
  "TradeNet","EnergyNet","CityNet","TransNet","WaterNet","FoodNet",
  "SafeNet","ComNet","BizNet","ArtNet","FaithNet","MediaNet","BuildNet",
  "AirNet","SeaNet","AIHub","CryptoNet","PeaceNet"
];

export default function NetworkManager({ onSelect }) {
  const [networks, setNetworks] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    // expand networks safely up to config default
    const expanded = initialNetworks.slice(0, POWA_CONFIG.networksDefault);
    setNetworks(expanded);
    // init statuses
    const s = {};
    expanded.forEach(n => s[n] = { online: Math.random()>0.1, ping: Math.floor(40+Math.random()*300)});
    setStatus(s);
  }, []);

  const runTest = (name) => {
    // simulated network test (replace by real API call)
    setStatus(prev => ({...prev, [name]: { ...prev[name], testing: true}}));
    setTimeout(()=> {
      setStatus(prev => ({...prev, [name]: { ...prev[name], testing: false, online: true, ping: Math.floor(30+Math.random()*200)}}));
    }, 900 + Math.random()*1600);
  };

  return (
    <div className="network-manager">
      <h3>Connected Networks ({networks.length})</h3>
      <div className="grid">
        {networks.map(n => (
          <div key={n} className="net-card" onClick={()=> onSelect && onSelect(n)}>
            <div className="net-title">{n}</div>
            <div className="net-meta">
              <span>{status[n] ? (status[n].online ? "Online" : "Offline") : "Loading..."}</span>
              <span>{status[n] ? `${status[n].ping} ms` : ""}</span>
            </div>
            <div className="net-actions">
              <button onClick={(e)=>{ e.stopPropagation(); runTest(n); }}>Run Test</button>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
        .net-card{ padding:10px; border-radius:8px; background:linear-gradient(180deg,#0b1220, #0d1a2a); color:#eaf6ff}
        .net-title{ font-weight:700 }
        .net-meta{ font-size:12px; color:#bcd;}
        button{ margin-top:6px; padding:6px 10px; border-radius:6px; background:#05f; color:white; border:none }
      `}</style>
    </div>
  );
                                            }
