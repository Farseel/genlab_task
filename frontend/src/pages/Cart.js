import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [deals, setDeals] = useState([]);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data.filter(d => d.active));
  };

  useEffect(() => {
    fetchCart();
    fetchDeals();
  }, []);

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

  // Calculate price for each cart item considering product-specific deals
  const getItemPrice = (item) => {
    if (!item.productId) return 0;
    const basePrice = Number(item.productId.price);
    const productId = item.productId._id;

    // Find if there's a deal for this product
    const productDeal = deals.find(d => {
      const dealProductId = d.productId?._id || d.productId;
      return dealProductId === productId;
    });

    if (productDeal) {
      return Math.round(basePrice * (1 - productDeal.discount / 100));
    }
    return basePrice;
  };

  // Calculate subtotal using discounted prices
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = getItemPrice(item);
    return sum + itemPrice * Number(item.quantity);
  }, 0);

  return (
    <div className="page-shell">
      <h2 className="page-title">Cart</h2>

      <div style={{ display: "grid", gap: "12px" }}>
        {cart.map(item => {
          const originalPrice = Number(item.productId?.price ?? 0);
          const itemPrice = getItemPrice(item);
          const productDeal = deals.find(d => {
            const dealProductId = d.productId?._id || d.productId;
            return dealProductId === item.productId._id;
          });

          return (
            <div
              key={item._id}
              className="panel cart-row"
            >
              <div>
                <h4 style={{ margin: 0 }}>{item.productId?.name || "Product unavailable"}</h4>
                <div style={{ margin: "6px 0 0", display: "flex", gap: "8px", alignItems: "center" }}>
                  <p style={{ margin: 0, fontWeight: 800, color: "#093C5D" }}>₹{itemPrice}</p>
                  {productDeal && (
                    <p style={{ margin: 0, color: "#4A6575", textDecoration: "line-through", fontSize: "0.9rem" }}>
                      ₹{originalPrice}
                    </p>
                  )}
                  {productDeal && (
                    <span style={{ fontSize: "0.75rem", color: "#eb5d66", fontWeight: 800 }}>
                      {productDeal.discount}% OFF
                    </span>
                  )}
                </div>
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
          );
        })}
      </div>

      <div className="panel" style={{ marginTop: "16px" }}>
        <h3 style={{ marginBottom: "8px", color: "#093C5D" }}>Total: ₹{subtotal.toFixed(2)}</h3>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#4A6575" }}>Product-specific discounts applied automatically</p>
      </div>

      {!cart.length && (
        <div className="panel" style={{ marginTop: "12px" }}>
          <p style={{ margin: 0, color: "#4A6575" }}>Your cart is empty. Add products to continue.</p>
        </div>
      )}
    </div>
  );
}