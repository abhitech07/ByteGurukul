// src/components/internship/InternshipNavbar.js
import React from "react";
import { NavLink } from "react-router-dom";

export default function InternshipNavbar() {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    borderRadius: 8,
    textDecoration: "none",
    color: isActive ? "#0f172a" : "#334155",
    background: isActive ? "#e6f0ff" : "transparent",
    fontWeight: isActive ? 700 : 600,
    marginRight: 8,
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <div style={styles.logo}>ByteGurukul</div>
        <div style={styles.title}>Internships</div>
      </div>
      <div style={styles.links}>
        <NavLink to="/internship" style={linkStyle} end>Openings</NavLink>
        <NavLink to="/internship/apply" style={linkStyle}>Apply</NavLink>
        <NavLink to="/internship/status" style={linkStyle}>My Applications</NavLink>
        <NavLink to="/internship/scheduler" style={linkStyle}>Scheduler</NavLink>
        <NavLink to="/internship/tasks" style={linkStyle}>Tasks</NavLink>
        <NavLink to="/internship/chat" style={linkStyle}>Recruiter Chat</NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #e6eef8",
    boxShadow: "0 2px 6px rgba(15,23,42,0.04)",
    position: "sticky",
    top: 0,
    zIndex: 90,
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  logo: { color: "#2563eb", fontWeight: 800, fontSize: 18 },
  title: { fontSize: 15, color: "#0f172a", fontWeight: 700 },
  links: { display: "flex", alignItems: "center" },
};
