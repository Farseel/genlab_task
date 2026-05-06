export default function Landing() {
  const selectRole = (role) => {
    localStorage.setItem("role", role);
    window.location.href = `/${role}`;
  };

  return (
    <div className="page-shell" style={{ minHeight: "72vh", display: "grid", placeItems: "center" }}>
      <div className="panel" style={{ width: "100%", maxWidth: "560px", textAlign: "center", padding: "28px" }}>
        <h1 style={{ marginTop: 0, color: "#093C5D" }}>Select Role</h1>
        <p style={{ color: "#4A6575", marginTop: 0 }}>Continue to your workspace panel.</p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="primary-btn" onClick={() => selectRole("user")}>
            User Panel
          </button>

          <button className="ghost-btn" onClick={() => selectRole("admin")}>
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}