// src/pages/internship/InternshipStatus.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InternshipNavbar from "../../components/internship/InternshipNavbar";

// simple mock statuses
const mockApplications = [
  { id: "APP-2025-001", role: "Frontend Intern (React)", date: "2025-10-06", status: "Under Review", progress: 30 },
  { id: "APP-2025-002", role: "Backend Intern (Node.js)", date: "2025-09-28", status: "Interview", progress: 60 },
];

export default function InternshipStatus() {
  const [apps] = useState(mockApplications);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" }}>
      <InternshipNavbar />
      <div style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ margin: 0 }}>My Applications</h2>
          <Link to="/internship" style={{ color: "#2563eb" }}>← Browse roles</Link>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {apps.map((a) => (
            <div key={a.id} style={{ background: "white", padding: 14, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{a.role}</div>
                <div style={{ color: "#64748b", marginTop: 6 }}>{a.id} • Applied {a.date}</div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 8, background: "#eef2ff", borderRadius: 8, overflow: "hidden", width: 240 }}>
                    <div style={{ width: `${a.progress}%`, height: "100%", background: "#2563eb" }} />
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: a.status === "Interview" ? "#b45309" : "#0f172a" }}>{a.status}</div>
                <div style={{ marginTop: 8 }}>
                  <Link to="/internship/scheduler" style={{ padding: "8px 12px", background: "#2563eb", color: "white", borderRadius: 8, textDecoration: "none" }}>
                    Schedule / View Interview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}