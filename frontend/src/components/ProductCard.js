export default function ProductCard({ product, addToCart }) {
  return (
    <div
      className="panel"
      style={{
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "12px" }}
      />

      <h3>{product.name}</h3>
      <p style={{ margin: "0", fontWeight: 800, color: "#093C5D", fontSize: "1.06rem" }}>₹{product.price}</p>
      <p style={{ fontSize: "12px", color: "#4A6575" }}>{product.category}</p>

      <button className="primary-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}