// components/WalletPanel.jsx
import React, { useEffect, useState } from "react";

export default function WalletPanel() {
  const [data, setData] = useState({ pi: 314159.26, poa: 1250, usd: 89432.5 });
  useEffect(() => {
    // Could call /api/gcv to refresh values
    fetch("/api/gcv").then(r=>r.json()).then(json=>{
      if(json.success){
        setData(prev => ({...prev, pi: json.gcv, usd: (json.gcv*0.25) || prev.usd }));
      }
    }).catch(()=>{});
  }, []);

  return (
    <div className="wallet">
      <h3>Wallet</h3>
      <div className="bal">π: <strong>{data.pi.toLocaleString()}</strong></div>
      <div className="bal">POA: <strong>{data.poa}</strong></div>
      <div className="bal">Value: <strong>${data.usd.toLocaleString()}</strong></div>
      <div className="actions">
        <button>Send</button>
        <button>Receive</button>
        <button>Stake</button>
      </div>
      <style jsx>{`
        .wallet{ padding:12px; border-radius:10px; background:#071020; color:#dff7ff}
        .bal{ margin:6px 0}
        .actions button{ margin-right:6px; padding:8px 10px; background:#06c; color:white; border:none; border-radius:6px}
      `}</style>
    </div>
  )
}
