import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./pages/AdminLayout";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* USER */}
        {role === "user" && (
          <Route path="/user/*" element={<UserLayout />} />
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <Route path="/admin/*" element={<AdminLayout />} />
        )}

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;