// src/pages/internship/InternshipHome.js
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
// Ensure this path is correct in your project
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
  {
    id: 3,
    title: "Full-Stack Developer Intern",
    company: "Innovate Inc.",
    stipend: "₹12,000 / month",
    duration: "6 months",
    location: "On-site",
    posted: "2025-11-15",
  },
  {
    id: 4,
    title: "Data Science Intern",
    company: "DataDriven Co.",
    stipend: "₹15,000 / month",
    duration: "3 months",
    location: "Remote",
    posted: "2025-11-20",
  },
];

// FIXED: More robust date formatter with singular/plural support
const formatDistanceToNow = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - postDate) / 1000);

  if (seconds < 60) return "just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export default function InternshipHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");

  const filteredOpenings = useMemo(() => {
    return openings.filter((o) => {
      // FIXED: Added safe optional chaining in case data is missing
      const matchesSearch =
        o.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.company?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === "All" || o.location === locationFilter;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, locationFilter]);

  const uniqueLocations = ["All", ...new Set(openings.map((o) => o.location))];

  return (
    <div style={pageStyles.container}>
      <InternshipNavbar />
      <header style={pageStyles.header}>
        <div style={pageStyles.headerContent}>
          <h1 style={pageStyles.title}>Available Internship Openings</h1>
          <p style={pageStyles.subtitle}>
            Find your next opportunity. Apply, track, and get hired.
          </p>
        </div>
      </header>

      <div style={pageStyles.filters}>
        <input
          type="text"
          placeholder="Search by title or company..."
          style={pageStyles.searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          style={pageStyles.locationSelect}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <main style={pageStyles.grid}>
        {filteredOpenings.length > 0 ? (
          filteredOpenings.map((o) => (
            <div key={o.id} style={pageStyles.card}>
              <div>
                <div style={pageStyles.cardHeader}>
                  <h2 style={pageStyles.jobTitle}>{o.title}</h2>
                  <span style={pageStyles.company}>{o.company}</span>
                </div>
                <div style={pageStyles.jobMeta}>
                  <span title="Stipend">💰 {o.stipend}</span>
                  <span title="Location">📍 {o.location}</span>
                  <span title="Duration">⏳ {o.duration}</span>
                </div>
              </div>
              <div style={pageStyles.cardFooter}>
                <small style={{ color: "#64748b" }}>
                  Posted: {formatDistanceToNow(o.posted)}
                </small>
                <div style={pageStyles.buttonGroup}>
                  <Link to={`/internship/apply/${o.id}`} style={pageStyles.btn}>
                    Apply Now
                  </Link>
                  <Link to={`/internship/offer/${o.id}`} style={pageStyles.outlineBtn}>
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={pageStyles.noResults}>No openings match your filters.</p>
        )}
      </main>
    </div>
  );
}

// STYLES
const pageStyles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "40px 28px",
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.2,
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#475569",
    fontSize: "16px",
  },
  // FIXED: Added flex-wrap to prevent breaking on mobile
  filters: {
    display: "flex",
    gap: "16px",
    padding: "24px 28px",
    flexWrap: "wrap", 
  },
  searchInput: {
    flex: "2 1 300px", // Allow growing, allow shrinking, base width 300px
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },
  locationSelect: {
    flex: "1 1 150px", // Allow growing, allow shrinking, base width 150px
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
  },
  // FIXED: Changed minmax from 350px to 280px to fit on small screens (iPhone SE, etc)
  grid: {
    display: "grid",
    gap: "20px",
    padding: "0 28px 40px",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  },
  card: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", // Ensures all cards in a row match height
  },
  cardHeader: {
    marginBottom: "16px",
  },
  jobTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1e293b",
    margin: 0,
    lineHeight: 1.4,
  },
  company: {
    color: "#475569",
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "4px",
    display: "block",
  },
  jobMeta: {
    display: "flex",
    flexWrap: "wrap", // Allow tags to wrap if they get too long
    gap: "12px",
    color: "#475569",
    margin: "16px 0",
    fontSize: "14px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
    marginTop: "auto", // Pushes footer to bottom if content is short
    flexWrap: "wrap", // Prevents buttons from overlapping date on small cards
    gap: "10px",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  btn: {
    background: "#2563eb",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "14px",
    display: "inline-block",
  },
  outlineBtn: {
    border: "1px solid #d1d5db",
    color: "#374151",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    display: "inline-block",
  },
  noResults: {
    color: "#64748b",
    textAlign: "center",
    fontSize: "18px",
    gridColumn: "1 / -1",
    padding: "40px",
  },
};