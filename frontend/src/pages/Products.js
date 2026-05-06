import { useEffect, useState } from "react";
import { API } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data.filter(d => d.active));
  };

  const addToCart = async (id, name) => {
    await API.post("/cart", { productId: id });

    // show message
   alert(`${name} added to cart`);
  };

  useEffect(() => {
    fetchProducts();
    fetchDeals();
    const interval = setInterval(() => {
      fetchProducts();
      fetchDeals();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-shell">
      <h2 className="page-title">Products</h2>

      

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
            deal={deals.find(d => d.productId?._id === p._id || d.productId === p._id)}
            addToCart={() => addToCart(p._id, p.name)}
          />
        ))}
      </div>
    </div>
  );
}