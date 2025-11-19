// src/components/admin/AdminNavbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AdminNavbar() {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin-dashboard", icon: "🏠" },
    { label: "Users", path: "/admin/users", icon: "👥" },
    { label: "Courses", path: "/admin/courses", icon: "📚" },
    { label: "Instructors", path: "/admin/instructors", icon: "👨‍🏫" },
    { label: "Reports", path: "/admin/reports", icon: "📊" },
    { label: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/admin-dashboard" style={styles.logo}>
          ByteGurukul <span style={styles.adminText}>Admin</span>
        </Link>
      </div>

      <div style={styles.center}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.link,
              ...(location.pathname === link.path ? styles.activeLink : {}),
            }}
          >
            <span style={styles.icon}>{link.icon}</span> {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'sticky',        // stays visible while scrolling
    top: 0,
    zIndex: 100,
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: 'white',
    padding: '18px 40px',
    display: 'flex',
    justifyContent: 'space-between',
     marginBottom: '8px',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',  // 🔥 subtle elevation
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)', // 👇 defines separation
    backdropFilter: 'blur(12px)', // modern translucent glow
  },
  left: { display: "flex", alignItems: "center", gap: "10px" },
  logo: {
    fontWeight: "700",
    fontSize: "20px",
    color: "white",
    textDecoration: "none",
  },
  adminText: {
    color: "#facc15",
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "5px",
  },
  center: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: '500',
    transition: 'opacity 0.3s ease',
  },
  activeLink: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontWeight: "600",
  },
  icon: {
    fontSize: "16px",
  },
  brand: {
    fontWeight: '700',
    fontSize: '22px',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default AdminNavbar;