// src/pages/internship/InternshipDashboardStudent.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InternshipOffer from "./InternshipOffer";
import InterviewScheduler from "./InterviewScheduler"; // if you already created it
// If not, you can import path accordingly

export default function InternshipDashboardStudent() {
  const [tab, setTab] = useState("overview");

  // Mock data
  const [bookings] = useState([
    { id: "BK-001", date: "2025-11-20", time: "11:00 AM", status: "Confirmed", interviewer: "Rahul Kumar", joinUrl: "#" },
  ]);
  const [offers, setOffers] = useState([
    {
      id: "OF-2025-01",
      company: "Acme Corp",
      role: "Frontend Intern",
      stipend: "₹10,000 / mo",
      startDate: "2026-01-05",
      status: "Offered",
      letter: {
        candidate: "Abhijeet Kumar Pandey",
        company: "Acme Corp",
        role: "Frontend Intern",
        stipend: "₹10,000 / mo",
        startDate: "2026-01-05",
        offerId: "OF-2025-01",
        contactEmail: "hr@acme.example",
      },
    },
  ]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Internship — Student Dashboard</h1>
          <p style={styles.subtitle}>Overview, bookings, offers, chat and tasks</p>
        </div>

        <div style={styles.actions}>
          <Link to="/internship/interview" style={styles.linkBtn}>Book Interview</Link>
          <Link to="/internship/tasks" style={styles.linkBtn}>Tasks</Link>
          <Link to="/internship/chat" style={styles.linkBtn}>Chat</Link>
        </div>
      </div>

      <div style={styles.tabs}>
        {["overview", "bookings", "offers"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{ ...styles.tabBtn, ...(tab === t ? styles.tabActive : {}) }}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        {tab === "overview" && (
          <div style={styles.card}>
            <h3>Overview</h3>
            <p>You have <strong>{bookings.length}</strong> booking(s) and <strong>{offers.length}</strong> offer(s).</p>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <Link to="/internship/interview" style={styles.small}>Schedule / Manage Interviews</Link>
              <Link to="/internship/offers" style={styles.small}>View Offers</Link>
              <Link to="/internship/tasks" style={styles.small}>Open Tasks</Link>
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div style={styles.card}>
            <h3>Your Interview Bookings</h3>
            {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map(b => (
              <div key={b.id} style={styles.row}>
                <div>
                  <div style={{ fontWeight: 700 }}>{b.date} • {b.time}</div>
                  <div style={{ color: "#64748b" }}>{b.interviewer}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ marginBottom: 6 }}>{b.status}</div>
                  <a href={b.joinUrl} style={styles.small}>Join</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "offers" && (
          <div style={styles.card}>
            <h3>Offers</h3>
            {offers.length === 0 ? <p>No offers yet.</p> : offers.map(o => (
              <div key={o.id} style={styles.offerCard}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{o.company} — {o.role}</div>
                  <div style={{ color: "#64748b", marginTop: 6 }}>{o.stipend} • Start: {o.startDate}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <InternshipOffer offer={o.letter} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* minimal inline styles */
const styles = {
  page: { padding: 20, fontFamily: "'Poppins', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 700 },
  subtitle: { color: "#64748b" },
  actions: { display: "flex", gap: 8 },
  linkBtn: { textDecoration: "none", padding: "8px 12px", background: "#2563eb", color: "white", borderRadius: 8 },
  tabs: { display: "flex", gap: 8, marginTop: 6 },
  tabBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white", cursor: "pointer" },
  tabActive: { background: "#eef2ff", borderColor: "#2563eb", fontWeight: 700 },
  card: { background: "white", padding: 16, borderRadius: 10, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" },
  small: { color: "#2563eb", textDecoration: "none" },
  offerCard: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f1f5f9" },
};