import React from "react";

const LIST = [
  { id: "health", name: "HealthNet", status: "offline" },
  { id: "econet", name: "EcoNet", status: "online" },
  { id: "edunet", name: "EduNet", status: "online" },
  { id: "agrinet", name: "AgriNet", status: "online" },
  { id: "finnet", name: "FinNet", status: "online" },
  { id: "govnet", name: "GovNet", status: "online" },
  { id: "technet", name: "TechNet", status: "online" },
  { id: "tradenet", name: "TradeNet", status: "online" },
  { id: "energynet", name: "EnergyNet", status: "online" },
  { id: "citynet", name: "CityNet", status: "online" },
  { id: "transnet", name: "TransNet", status: "online" },
  { id: "waternet", name: "WaterNet", status: "online" },
  { id: "foodnet", name: "FoodNet", status: "online" },
  { id: "safenet", name: "SafeNet", status: "online" },
  { id: "comnet", name: "ComNet", status: "updating" },
  { id: "biznet", name: "BizNet", status: "online" },
  { id: "artnet", name: "ArtNet", status: "online" },
  { id: "faithnet", name: "FaithNet", status: "online" },
  { id: "medianet", name: "MediaNet", status: "online" },
  { id: "buildnet", name: "BuildNet", status: "online" },
  { id: "airnet", name: "AirNet", status: "online" },
  { id: "seanet", name: "SeaNet", status: "online" },
  { id: "aihub", name: "AIHub", status: "online" },
  { id: "cryptonet", name: "CryptoNet", status: "updating" },
  { id: "peacenet", name: "PeaceNet", status: "offline" }
];

export default function NetworkGrid() {
  return (
    <div className="grid">
      {LIST.map(n => (
        <div key={n.id} className={`card ${n.status}`}>
          <div className="net-name">{n.name}</div>
          <div className="net-status">{n.status === "online" ? "✅ online" : n.status === "offline" ? "⚠️ offline" : "🛠 updating"}</div>
        </div>
      ))}
    </div>
  );
}
