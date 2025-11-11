import React from "react";

const NETS = [
  "HealthNet","EcoNet","EduNet","AgriNet","FinNet","GovNet","TechNet","TradeNet","EnergyNet","CityNet",
  "TransNet","WaterNet","FoodNet","SafeNet","ComNet","BizNet","ArtNet","FaithNet","MediaNet","BuildNet",
  "AirNet","SeaNet","AIHub","CryptoNet","PeaceNet"
];

export default function Networks({ mode }) {
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:12}}>
      {NETS.map((n, i)=>(
        <div key={n} style={{padding:12, borderRadius:10, background:"#fff", boxShadow:"0 6px 18px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div><strong>{n}</strong></div>
            <div style={{fontSize:12, color:"#07a"}}>{mode==="test"?"Test":"Live"}</div>
          </div>
          <p style={{marginTop:8, color:"#444"}}>Status: ✅ online</p>
          <div style={{display:"flex", gap:8, marginTop:6}}>
            <button style={{padding:"8px 10px", background:"#007bff", color:"#fff", border:"none", borderRadius:8}}>Open</button>
            <button style={{padding:"8px 10px", background:"#6c757d", color:"#fff", border:"none", borderRadius:8}}>Test</button>
          </div>
        </div>
      ))}
    </div>
  );
}
