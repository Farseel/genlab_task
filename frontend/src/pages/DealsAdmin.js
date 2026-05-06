import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function DealsAdmin() {
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data);
  };

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchDeals();
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await API.put(`/deals/${editingId}`, form);
    } else {
      await API.post("/deals", form);
    }

    setForm({});
    setEditingId(null);
    fetchDeals();
  };

  const handleEdit = (deal) => {
    setForm(deal);
    setEditingId(deal._id);
  };

  const deleteDeal = async (id) => {
    await API.delete(`/deals/${id}`);
    fetchDeals();
  };

  return (
    <div className="page-shell">
      <h2 className="page-title">Manage Deals</h2>

      <div className="panel" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", flexDirection: "column" }}>
          <input placeholder="Title" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
          
          <select
            value={form.productId || ""}
            onChange={e => setForm({ ...form, productId: e.target.value })}
            style={{ padding: "10px", borderRadius: "10px", border: "1px solid rgba(59,117,151,0.45)" }}
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <input placeholder="Discount %" value={form.discount || ""} onChange={e => setForm({ ...form, discount: e.target.value })} />

          <div style={{ display: "flex", gap: "8px" }}>
            <button className="primary-btn" onClick={handleSubmit}>{editingId ? "Update Deal" : "Add Deal"}</button>
            <button className="ghost-btn" onClick={() => { setForm({}); setEditingId(null); }}>Reset</button>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "12px" }}>Deals List</h3>

      <div style={{ display: "grid", gap: "10px" }}>
        {deals.map(d => (
          <div key={d._id} className="panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4 style={{ margin: 0 }}>{d.title}</h4>
              <p style={{ margin: 0, color: "#4A6575" }}>{d.discount}% OFF • {d.productId?.name || "Unknown Product"} • {d.active ? "Active" : "Inactive"}</p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button className="ghost-btn" onClick={() => handleEdit(d)}>Edit</button>
              <button className="danger-btn" onClick={() => deleteDeal(d._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}