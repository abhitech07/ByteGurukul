import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/admin/AdminNavbar";
import { FaCalendarAlt, FaVideo, FaUser, FaClock, FaExternalLinkAlt } from "react-icons/fa";

export default function AdminInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/internship/all"); 
      if (res.data.success) {
        const scheduled = res.data.data.filter(
          (app) => app.status === "Interview Scheduled" && app.interviewDate
        );
        
        scheduled.sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));
        
        setInterviews(scheduled);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* 1. TOP HORIZONTAL NAVIGATION BAR CONTAINER */}
      <div style={styles.topNavWrapper}>
        <AdminNavbar />
      </div>
      
      {/* 2. MAIN CONTENT AREA (Takes remaining vertical height) */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h2 style={styles.title}>Upcoming Interviews</h2>
          <span style={styles.badge}>{interviews.length} Scheduled</span>
        </div>

        {loading ? (
          <p style={{ color: styles.detailText.color }}>Loading schedule...</p>
        ) : interviews.length === 0 ? (
          <div style={styles.emptyState}>
            <FaCalendarAlt style={{ fontSize: 40, color: styles.emptyStateIcon.color, marginBottom: 10 }} />
            <p style={{ color: styles.detailText.color }}>No interviews scheduled yet. Time to recruit!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {interviews.map((app) => {
              const dateObj = new Date(app.interviewDate);
              return (
                <div key={app.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    {/* Enhanced Date Box */}
                    <div style={styles.dateBox}>
                      <span style={styles.month}>{dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                      <span style={styles.day}>{dateObj.getDate()}</span>
                    </div>
                    <div style={styles.candidateInfo}>
                      <h3 style={styles.name}>{app.name || "N/A"}</h3>
                      <p style={styles.role}><FaUser size={12} style={{ color: styles.icon.color }} /> {app.roleId || "General Applicant"}</p>
                    </div>
                  </div>
                  
                  <div style={styles.divider} />

                  <div style={styles.details}>
                    <div style={styles.detailRow}>
                      <FaClock style={styles.detailIcon} />
                      {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "Time not set"}
                    </div>
                    <div style={styles.detailRow}>
                      <FaVideo style={styles.detailIcon} />
                      {app.interviewType || "Technical Round"}
                    </div>
                  </div>

                  <a 
                    href={app.interviewLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.joinButton}
                  >
                    Join Meeting <FaExternalLinkAlt style={styles.joinButtonIcon} />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  // --- Color Palette ---
  primary: '#1e40ff', 
  primaryLight: '#eef2ff', 
  darkText: '#1f2937', 
  mediumText: '#4b5563', 
  lightText: '#9ca3af', 
  background: '#f9fafb', 
  white: '#ffffff', 

  // --- Layout & Page ---
  page: { 
    display: "flex", 
    flexDirection: 'column', // CRITICAL: Stacks nav and main content vertically
    minHeight: "100vh", 
    background: '#f9fafb', 
    fontFamily: "'Inter', sans-serif" 
  },
  topNavWrapper: { // New container for the horizontal navbar
    width: '100%', 
    height: '60px', 
    background: '#ffffff',
    flexShrink: 0, 
    display: 'flex',
    alignItems: 'center',
    padding: '0 25px', 
    borderBottom: '1px solid #e5e7eb'
  },
  main: { // Main content takes remaining height
    flex: 1, 
    padding: "40px", 
    maxWidth: '1200px', 
    margin: '0 auto',
    width: '100%', 
  },
  
  // --- Header & Title ---
  header: { 
    display: "flex", 
    alignItems: "center", 
    gap: "15px", 
    marginBottom: "30px",
    borderBottom: `2px solid ${'#e5e7eb'}`, 
    paddingBottom: '20px'
  },
  title: { 
    fontSize: "28px", 
    fontWeight: "800", 
    color: '#1f2937', 
    margin: 0 
  },
  badge: { 
    background: '#eef2ff', 
    color: '#1e40ff', 
    padding: "6px 14px", 
    borderRadius: "9999px", 
    fontSize: "14px", 
    fontWeight: "700" 
  },
  
  // --- Card Grid ---
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
    gap: "30px" 
  },
  card: { 
    background: '#ffffff', 
    borderRadius: "16px", 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", 
    padding: "25px", 
    border: '1px solid #f3f4f6', 
    transition: "transform 0.2s, box-shadow 0.2s" 
  },
  cardHeader: { 
    display: "flex", 
    gap: "20px", 
    alignItems: "center", 
    marginBottom: "15px" 
  },
  
  // --- Date Box (Key Visual Element) ---
  dateBox: { 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center", 
    background: '#eef2ff', 
    borderRadius: "10px", 
    width: "70px", 
    height: "70px", 
    flexShrink: 0,
    border: '2px solid #1e40ff'
  },
  month: { 
    fontSize: "13px", 
    color: '#1e40ff', 
    textTransform: "uppercase", 
    fontWeight: "700" 
  },
  day: { 
    fontSize: "28px", 
    fontWeight: "900", 
    color: '#1f2937', 
    lineHeight: 1 
  },
  
  // --- Details & Footer ---
  divider: { 
    height: "1px", 
    background: '#e5e7eb', 
    margin: "15px 0 20px 0" 
  },
  details: { 
    display: "flex", 
    flexDirection: 'column',
    gap: '12px', 
    marginBottom: "25px" 
  },
  detailRow: { 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    fontSize: "15px", 
    color: '#4b5563' 
  },
  detailIcon: { 
    color: '#1e40ff', 
    fontSize: '16px' 
  },
  
  // --- Action Button ---
  joinButton: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    width: "100%", 
    padding: "12px", 
    background: '#1e40ff', 
    color: '#ffffff', 
    textDecoration: "none", 
    borderRadius: "10px", 
    fontWeight: "700", 
    fontSize: "15px", 
    border: 'none',
    cursor: 'pointer'
  },
  joinButtonIcon: { 
    marginLeft: 10, 
    fontSize: 12 
  },
  
  // --- Empty State ---
  emptyState: { 
    textAlign: "center", 
    padding: "60px", 
    background: '#ffffff', 
    borderRadius: "16px", 
    border: '2px dashed #e5e7eb',
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.02)",
    color: '#9ca3af'
  },
  emptyStateIcon: { 
    color: '#cbd5e1' 
  },
  
  // Backwards compatibility for unused styles in the new version
  navContainer: { display: 'none' }, // Hides the original vertical nav column
  icon: { color: '#9ca3af' },
  detailText: { color: '#4b5563' }
};