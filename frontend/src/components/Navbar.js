import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background: "#222",
      padding: "15px",
      display: "flex",
      justifyContent: "space-around",
      color: "white"
    }}>
      <Link to="/" style={{ color: "white" }}>Home</Link>
      <Link to="/products" style={{ color: "white" }}>Products</Link>
      <Link to="/cart" style={{ color: "white" }}>Cart</Link>
      <Link to="/admin" style={{ color: "white" }}>Admin</Link>
      <Link to="/deals" style={{ color: "white" }}>Deals</Link>
      <Link to="/report" style={{ color: "white" }}>Report</Link>
    </nav>
  );
}