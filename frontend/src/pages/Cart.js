import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [deals, setDeals] = useState([]);
  const [selectedDealId, setSelectedDealId] = useState("");
  const [selectedDealMeta, setSelectedDealMeta] = useState(null);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    const active = res.data.filter(d => d.active);
    setDeals(active);

    // restore previously selected deal from localStorage if still active
    try {
      const storedRaw = localStorage.getItem("selectedDeal");
      if (storedRaw) {
        const stored = JSON.parse(storedRaw);
        // if still active, prefer the server object
        if (stored && stored.id && active.find(d => d._id === stored.id)) {
          setSelectedDealId(stored.id);
          setSelectedDealMeta(null);
        } else if (stored && stored.id) {
          // keep metadata so we can show it as previously selected
          setSelectedDealId(stored.id);
          setSelectedDealMeta(stored);
        }
      }
    } catch (e) {
      // ignore localStorage errors
    }
  };

  useEffect(() => {
    fetchCart();
    fetchDeals();
  }, []);

  // persist selected deal (with metadata) to localStorage so it survives reloads
  useEffect(() => {
    try {
      if (selectedDealId) {
        // find a matching active deal to store metadata, otherwise keep existing meta
        const active = deals.find(d => d._id === selectedDealId);
        const meta = active
          ? { id: active._id, title: active.title, discount: active.discount, active: true }
          : (selectedDealMeta || { id: selectedDealId, title: "(previously selected)", discount: 0, active: false });

        localStorage.setItem("selectedDeal", JSON.stringify(meta));
        setSelectedDealMeta(meta.active ? null : meta);
      } else {
        localStorage.removeItem("selectedDeal");
        setSelectedDealMeta(null);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [selectedDealId, deals, selectedDealMeta]);

  const increaseQty = async (item) => {
    await API.put(`/cart/${item._id}`, {
      quantity: item.quantity + 1,
    });
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity === 1) return;

    await API.put(`/cart/${item._id}`, {
      quantity: item.quantity - 1,
    });
    fetchCart();
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  const subtotal = cart.reduce((sum, item) => {
    if (!item.productId) return sum;
    return sum + Number(item.productId.price) * Number(item.quantity);
  }, 0);

  const selectedDeal = deals.find(d => d._id === selectedDealId);
  const discountPercent = selectedDeal ? Number(selectedDeal.discount) : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(subtotal - discountAmount, 0);

  return (
    <div className="page-shell">
      <h2 className="page-title">Cart</h2>

      <div className="panel" style={{ marginBottom: "16px" }}>
        <h3 style={{ marginTop: 0 }}>Apply a Deal</h3>

        <select
          value={selectedDealId}
          onChange={(e) => setSelectedDealId(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(59,117,151,0.45)",
          }}
        >
          <option value="">No deal</option>
          {selectedDealMeta && !selectedDealMeta.active && (
            <option value={selectedDealMeta.id}>
              Previously selected: {selectedDealMeta.title} (inactive)
            </option>
          )}
          {deals.map((d) => (
            <option key={d._id} value={d._id}>
              {d.title} - {d.discount}% OFF
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        {cart.map(item => (
          <div
            key={item._id}
            className="panel cart-row"
          >
            <div>
              <h4 style={{ margin: 0 }}>{item.productId?.name || "Product unavailable"}</h4>
              <p style={{ margin: "6px 0 0", color: "#4A6575" }}>₹{item.productId?.price ?? 0}</p>
            </div>

            <div className="cart-qty-controls">
              <button className="ghost-btn" onClick={() => decreaseQty(item)}>-</button>
              <span style={{ minWidth: "20px", textAlign: "center", fontWeight: 700 }}>{item.quantity}</span>
              <button className="ghost-btn" onClick={() => increaseQty(item)}>+</button>
            </div>

            <button className="danger-btn" onClick={() => removeItem(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="panel" style={{ marginTop: "16px" }}>
        <p style={{ margin: "4px 0" }}>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p style={{ margin: "4px 0" }}>
          Deal Discount: -₹{discountAmount.toFixed(2)}
          {selectedDeal ? ` (${selectedDeal.title})` : ""}
        </p>
        <h3 style={{ marginBottom: 0, color: "#093C5D" }}>Final Total: ₹{total.toFixed(2)}</h3>
      </div>

      {!cart.length && (
        <div className="panel" style={{ marginTop: "12px" }}>
          <p style={{ margin: 0, color: "#4A6575" }}>Your cart is empty. Add products to continue.</p>
        </div>
      )}
    </div>
  );
}