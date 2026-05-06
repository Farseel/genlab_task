import { Routes, Route, Link, Navigate } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";
import DealsUser from "./DealsUser";

export default function UserLayout() {
  return (
    <div>
      <nav className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/user/products">Products</Link>
        <Link to="/user/cart">Cart</Link>
        <Link to="/user/deals">Deals</Link>
      </nav>

      <Routes>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="deals" element={<DealsUser />} />
      </Routes>
    </div>
  );
}