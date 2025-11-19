// src/pages/internship/InternshipTasks.js
import React, { useState } from "react";
import InternshipNavbar from "../../components/internship/InternshipNavbar";
import { Link } from "react-router-dom";

const initialTasks = [
  { id: 1, title: "Submit offer acceptance form", done: false },
  { id: 2, title: "Upload scanned ID (Aadhaar/Passport)", done: false },
  { id: 3, title: "Sign NDA (electronic)", done: true },
  { id: 4, title: "Complete first week onboarding quiz", done: false },
];

export default function InternshipTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id) => setTasks((p) => p.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" }}>
      <InternshipNavbar />
      <div style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Onboarding Tasks</h2>
          <Link to="/internship" style={{ color: "#2563eb" }}>← Back to roles</Link>
        </div>

        <div style={{ maxWidth: 820, display: "grid", gap: 12 }}>
          {tasks.map(t => (
            <div key={t.id} style={{ background: "white", padding: 12, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{t.title}</div>
                <div style={{ color: "#64748b", marginTop: 6 }}>{t.done ? "Completed" : "Pending"}</div>
              </div>
              <div>
                <button onClick={() => toggle(t.id)} style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: t.done ? "#059669" : "#2563eb", color: "white" }}>
                  {t.done ? "Done" : "Mark Done"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}