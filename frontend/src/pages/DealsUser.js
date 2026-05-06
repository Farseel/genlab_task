import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function DealsUser() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    API.get("/deals").then(res => {
      setDeals(res.data.filter(d => d.active));
    });
  }, []);

  return (
    <div className="page-shell">
      <h2 className="page-title">Available Deals</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
        {deals.map(d => (
          <div key={d._id} className="panel">
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>{d.title}</h3>
            <span className="chip">{d.discount}% OFF</span>
          </div>
        ))}

        {!deals.length && (
          <div className="panel">
            <p style={{ margin: 0, color: "#4A6575" }}>No active deals are available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}