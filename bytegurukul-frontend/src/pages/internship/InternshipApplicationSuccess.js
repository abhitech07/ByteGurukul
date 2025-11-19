// src/pages/internship/InternshipApplicationSuccess.js
import React from "react";
import { useLocation, Link } from "react-router-dom";
import InternshipNavbar from "../../components/internship/InternshipNavbar";

export default function InternshipApplicationSuccess() {
  const { state } = useLocation();
  const appId = state?.appId || `APP-${Date.now()}`;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" }}>
      <InternshipNavbar />
      <div style={{ padding: 28 }}>
        <div style={{ background: "white", padding: 22, borderRadius: 12, boxShadow: "0 8px 26px rgba(2,6,23,0.04)" }}>
          <h2 style={{ margin: 0 }}>Application Submitted</h2>
          <p style={{ color: "#64748b" }}>Thank you — your application has been submitted successfully.</p>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 700 }}>Application ID</div>
            <div style={{ color: "#2563eb", marginTop: 6 }}>{appId}</div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
            <Link to="/internship/status" style={{ padding: "10px 14px", background: "#2563eb", color: "white", borderRadius: 8, textDecoration: "none" }}>
              View My Applications
            </Link>
            <Link to="/internship" style={{ padding: "10px 14px", border: "1px solid #e6eef8", color: "#2563eb", borderRadius: 8, textDecoration: "none" }}>
              Browse Roles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
