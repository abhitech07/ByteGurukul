// src/pages/internship/InternshipOffer.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import InternshipNavbar from "../../components/internship/InternshipNavbar";

export default function InternshipOffer() {
  const { id } = useParams();
  const offer = {
    id: id || "1",
    candidate: "Abhijeet Kumar Pandey",
    role: "Frontend Intern (React)",
    stipend: "₹8,000 / month",
    start: "2025-12-01",
    duration: "3 months",
    details: "Work on real product features, coding tasks and receive mentorship.",
  };

  const downloadOffer = () => {
    const html = `<h1>Internship Offer</h1><p>Candidate: ${offer.candidate}</p><p>Role: ${offer.role}</p>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Offer_${offer.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" }}>
      <InternshipNavbar />
      <div style={{ padding: 28 }}>
        <div style={{ background: "white", padding: 20, borderRadius: 12, boxShadow: "0 8px 26px rgba(2,6,23,0.04)", maxWidth: 900 }}>
          <h2 style={{ margin: 0 }}>Offer Letter</h2>
          <div style={{ marginTop: 8, color: "#64748b" }}>Offer ID: OFFER-{offer.id}</div>

          <div style={{ marginTop: 16 }}>
            <p><strong>Candidate:</strong> {offer.candidate}</p>
            <p><strong>Role:</strong> {offer.role}</p>
            <p><strong>Stipend:</strong> {offer.stipend}</p>
            <p><strong>Start Date:</strong> {offer.start}</p>
            <p><strong>Duration:</strong> {offer.duration}</p>
            <p><strong>Details:</strong> {offer.details}</p>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button onClick={downloadOffer} style={{ background: "#2563eb", color: "white", padding: "8px 12px", borderRadius: 8, border: "none" }}>Download Offer</button>
            <Link to="/internship/tasks" style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e6eef8", textDecoration: "none", color: "#2563eb" }}>Go to Tasks</Link>
          </div>
        </div>
      </div>
    </div>
  );
}