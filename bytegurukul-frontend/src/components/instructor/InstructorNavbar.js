// src/components/instructor/InstructorNavbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function InstructorNavbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo / Brand */}
        <Link to="/instructor/dashboard" style={styles.brand}>
          <span style={styles.logoIcon}>🎓</span> ByteGurukul Instructor
        </Link>

        {/* Desktop Menu */}
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/instructor/courses" style={styles.link}>Courses</Link>
          <Link to="/instructor/students" style={styles.link}>Students</Link>
          <Link to="/instructor/analytics" style={styles.link}>Analytics</Link>
          <Link to="/instructor/earnings" style={styles.link}>Earnings</Link>
        </div>

        {/* Profile / Logout */}
        <div style={styles.profileSection}>
          <div
            style={styles.profile}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={styles.avatar}>👨‍🏫</span>
            <span>{user?.name || "Instructor"}</span>
          </div>

          {menuOpen && (
            <div style={styles.dropdown}>
              <Link to="/instructor/profile" style={styles.dropdownItem}>
                👤 Profile
              </Link>
              <button onClick={logout} style={styles.dropdownLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

/* 🌈 Instructor Navbar Styles */
const styles = {
  navbar: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    padding: "12px 24px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700",
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoIcon: { fontSize: "24px" },
  navLinks: {
    display: "flex",
    gap: "24px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    transition: "opacity 0.3s ease",
  },
  linkHover: { opacity: 0.8 },
  profileSection: { position: "relative" },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.15)",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
  avatar: { fontSize: "20px" },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "42px",
    background: "white",
    color: "#1e293b",
    borderRadius: "8px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
    width: "160px",
  },
  dropdownItem: {
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background 0.2s ease",
  },
  dropdownLogout: {
    width: "100%",
    background: "transparent",
    border: "none",
    padding: "10px 15px",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: "500",
    color: "#ef4444",
  },
};

export default InstructorNavbar;