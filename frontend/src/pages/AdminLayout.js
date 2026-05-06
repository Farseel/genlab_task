import { Routes, Route, Link, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import DealsAdmin from "./DealsAdmin";
import AdminReport from "./AdminReport";

export default function AdminLayout() {
  return (
    <div>
      <nav className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/deals">Deals</Link>
        <Link to="/admin/report">Report</Link>
      </nav>

      <Routes>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<AdminDashboard />} />
        <Route path="deals" element={<DealsAdmin />} />
        <Route path="report" element={<AdminReport />} />
      </Routes>
    </div>
  );
}