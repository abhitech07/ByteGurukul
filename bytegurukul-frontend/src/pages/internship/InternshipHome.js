// src/pages/internship/InternshipHome.js
import React from "react";
import { Link } from "react-router-dom";
import InternshipNavbar from "../../components/internship/InternshipNavbar";

const openings = [
  {
    id: 1,
    title: "Frontend Intern (React)",
    company: "ByteGurukul",
    stipend: "₹8,000 / month",
    duration: "3 months",
    location: "Remote",
    posted: "2025-10-01",
  },
  {
    id: 2,
    title: "Backend Intern (Node.js)",
    company: "ByteGurukul",
    stipend: "₹10,000 / month",
    duration: "4 months",
    location: "Remote",
    posted: "2025-09-20",
  },
];

export default function InternshipHome() {
  return (
    <div style={pageStyles.container}>
      <InternshipNavbar />
      <div style={pageStyles.header}>
        <div>
          <h1 style={pageStyles.title}>Available Internship Openings</h1>
          <p style={pageStyles.subtitle}>
            Choose an opening, apply, track status and schedule interviews.
          </p>
        </div>
        <Link to="/internship/apply/1" style={pageStyles.applyBtn}>
          + Quick Apply
        </Link>
      </div>

      <div style={pageStyles.grid}>
        {openings.map((o) => (
          <div key={o.id} style={pageStyles.card}>
            <div style={pageStyles.cardHeader}>
              <div>
                <div style={pageStyles.jobTitle}>{o.title}</div>
                <div style={pageStyles.jobMeta}>{o.company} • {o.location}</div>
              </div>
              <div>
                <div style={pageStyles.stipend}>{o.stipend}</div>
                <div style={pageStyles.duration}>{o.duration}</div>
              </div>
            </div>
            <div style={pageStyles.cardFooter}>
              <small style={{ color: "#64748b" }}>Posted: {o.posted}</small>
              <div>
                <Link to={`/internship/apply/${o.id}`} style={pageStyles.btn}>
                  Apply
                </Link>
                <Link to={`/internship/offer/${o.id}`} style={pageStyles.outlineBtn}>
                  Offer (Preview)
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pageStyles = {
  container: { fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 22px" },
  title: { margin: 0, fontSize: 22, color: "#0f172a" },
  subtitle: { margin: "6px 0 0", color: "#64748b" },
  applyBtn: { background: "#2563eb", color: "white", padding: "10px 14px", borderRadius: 8, textDecoration: "none", fontWeight: 700 },
  grid: { display: "grid", gap: 12, padding: "0 22px 40px", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" },
  card: { background: "white", padding: 18, borderRadius: 12, boxShadow: "0 8px 26px rgba(2,6,23,0.04)", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  jobTitle: { fontSize: 16, fontWeight: 700 },
  jobMeta: { color: "#64748b", marginTop: 6 },
  stipend: { color: "#0f172a", fontWeight: 700 },
  duration: { color: "#64748b", textAlign: "right", marginTop: 6 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  btn: { background: "#2563eb", color: "white", padding: "8px 12px", borderRadius: 8, textDecoration: "none", marginRight: 8 },
  outlineBtn: { border: "1px solid #e6eef8", color: "#2563eb", padding: "8px 12px", borderRadius: 8, textDecoration: "none" },
};