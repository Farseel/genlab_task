export default function ProductCard({ product, deal, addToCart }) {
  const discountedPrice = deal
    ? Math.round(product.price * (1 - deal.discount / 100))
    : product.price;

  return (
    <div
      className="panel"
      style={{
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {deal && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "#eb5d66",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "0.75rem",
            fontWeight: 800,
          }}
        >
          {deal.discount}% OFF
        </div>
      )}

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "12px" }}
      />

      <h3>{product.name}</h3>
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
        <p style={{ margin: "0", fontWeight: 800, color: "#093C5D", fontSize: "1.06rem" }}>
          ₹{discountedPrice}
        </p>
        {deal && (
          <p style={{ margin: "0", fontWeight: 600, color: "#4A6575", fontSize: "0.9rem", textDecoration: "line-through" }}>
            ₹{product.price}
          </p>
        )}
      </div>

      <p style={{ fontSize: "12px", color: "#4A6575" }}>{product.category}</p>

      <button className="primary-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}