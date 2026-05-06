import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await API.put(`/products/${editingId}`, form);
    } else {
      await API.post("/products", form);
    }

    setForm({});
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="page-shell">
      <h2 className="page-title">Manage Products</h2>

      <div className="panel" style={{ marginBottom: "20px" }}>
        <div style={{ display: "grid", gap: "8px" }}>
          <input placeholder="Name" value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} />
          <div style={{ display: "flex", gap: "8px" }}>
            <input placeholder="Price" value={form.price || ""} onChange={e => setForm({...form, price: e.target.value})} />
            <input placeholder="Stock" value={form.stock || ""} onChange={e => setForm({...form, stock: e.target.value})} />
          </div>

          <input placeholder="Image URL" value={form.image || ""} onChange={e => setForm({...form, image: e.target.value})} />
          <input placeholder="Category" value={form.category || ""} onChange={e => setForm({...form, category: e.target.value})} />
          <textarea placeholder="Description" value={form.description || ""} onChange={e => setForm({...form, description: e.target.value})} />

          <div style={{ display: "flex", gap: "8px" }}>
            <button className="primary-btn" onClick={handleSubmit}>{editingId ? "Update Product" : "Add Product"}</button>
            <button className="ghost-btn" onClick={() => { setForm({}); setEditingId(null); }}>Reset</button>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "12px" }}>All Products</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        {products.map(p => (
          <div key={p._id} className="panel">
            <img src={p.image} alt="" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px" }} />
            <h3 style={{ margin: "10px 0 6px" }}>{p.name}</h3>
            <p style={{ margin: 0, color: "#4A6575" }}>Price: ₹{p.price} • Category: {p.category}</p>
            <p style={{ fontSize: "13px", color: "#4A6575" }}>{p.description}</p>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button className="ghost-btn" onClick={() => handleEdit(p)}>Edit</button>
              <button className="danger-btn" onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}