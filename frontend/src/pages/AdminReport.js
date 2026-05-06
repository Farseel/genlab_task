import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function AdminReport() {
  const [data, setData] = useState({});
  const [cartTotal, setCartTotal] = useState(null);

  useEffect(() => {
    // fetch server report
    API.get("/admin/report").then(res => setData(res.data)).catch(() => setData({}));

    // fetch cart and compute sum of quantities as a reliable fallback/source of truth
    API.get("/cart").then(res => {
      const items = res.data || [];
      const total = items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
      setCartTotal(total);
    }).catch(() => setCartTotal(null));
  }, []);

  const shownCartTotal = (cartTotal !== null) ? cartTotal : (data.totalCartItems ?? 0);

  return (
    <div className="page-shell">
      <h2 className="page-title">Admin Report</h2>

      <div className="panel" style={{ display: "grid", gap: "8px" }}>
        <p style={{ margin: 0 }}>Total Products: <strong>{data.totalProducts ?? 0}</strong></p>
        <p style={{ margin: 0 }}>Total Deals: <strong>{data.totalDeals ?? 0}</strong></p>
        <p style={{ margin: 0 }}>Total Cart Items: <strong>{shownCartTotal}</strong></p>
      </div>
    </div>
  );
}