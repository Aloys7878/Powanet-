// components/NetworkGrid.jsx
import React from "react";

const NETWORKS = [
  { id:'health', name:'HealthNet', status:'online', img:'/assets/health.jpg' },
  { id:'eco', name:'EcoNet', status:'online', img:'/assets/eco.jpg' },
  { id:'edu', name:'EduNet', status:'updating', img:'/assets/edu.jpg' },
  { id:'agri', name:'AgriNet', status:'online', img:'/assets/agri.jpg' },
  { id:'fin', name:'FinNet', status:'online', img:'/assets/fin.jpg' },
  /* add more until 25+ — use matching images in public/assets */
];

export default function NetworkGrid() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 }}>
      {NETWORKS.map(n => (
        <button key={n.id} onClick={() => window.alert(`${n.name}: open test panel`)} style={{ padding:10, borderRadius:8, background: '#fff', textAlign:'center' }}>
          <img src={n.img} alt={n.name} style={{ width:'100%', height:80, objectFit:'cover', borderRadius:6, marginBottom:6 }} />
          <div style={{ fontWeight:700 }}>{n.name}</div>
          <div style={{ fontSize:12, color:'#666' }}>{n.status}</div>
        </button>
      ))}
    </div>
  );
}
