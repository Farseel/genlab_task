import { Routes, Route, Link, Navigate } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";

export default function UserLayout() {
  return (
    <div>
      <nav className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/user/products">Products</Link>
        <Link to="/user/cart">Cart</Link>
      </nav>

      <Routes>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}