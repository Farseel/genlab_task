import { useEffect, useState } from "react";
import { API } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const addToCart = async (id, name) => {
    await API.post("/cart", { productId: id });

    // show message
   alert(`${name} added to cart`);
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-shell">
      <h2 className="page-title">Products</h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
        <span className="chip">Live catalog refreshes every 5 seconds</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map(p => (
          <ProductCard
            key={p._id}
            product={p}
            addToCart={() => addToCart(p._id, p.name)}
          />
        ))}
      </div>
    </div>
  );
}