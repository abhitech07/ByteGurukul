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
        // Filter only applications that have an interview scheduled
        const scheduled = res.data.data.filter(
          (app) => app.status === "Interview Scheduled" && app.interviewDate
        );
        
        // Sort by date (soonest first)
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
      <div style={styles.navContainer}>
        <AdminNavbar />
      </div>
      <div style={styles.main}>
        <div style={styles.header}>
          <h2 style={styles.title}>Upcoming Interviews</h2>
          <span style={styles.badge}>{interviews.length} Scheduled</span>
        </div>

        {loading ? (
          <p>Loading schedule...</p>
        ) : interviews.length === 0 ? (
          <div style={styles.emptyState}>
            <FaCalendarAlt style={{ fontSize: 40, color: "#cbd5e1", marginBottom: 10 }} />
            <p>No interviews scheduled yet.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {interviews.map((app) => {
              const dateObj = new Date(app.interviewDate);
              return (
                <div key={app.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.dateBox}>
                      <span style={styles.month}>{dateObj.toLocaleString('default', { month: 'short' })}</span>
                      <span style={styles.day}>{dateObj.getDate()}</span>
                    </div>
                    <div style={styles.candidateInfo}>
                      <h3 style={styles.name}>{app.name}</h3>
                      <p style={styles.role}><FaUser size={12} /> {app.roleId}</p>
                    </div>
                  </div>
                  
                  <div style={styles.divider} />

                  <div style={styles.details}>
                    <div style={styles.detailRow}>
                      <FaClock style={styles.icon} />
                      {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div style={styles.detailRow}>
                      <FaVideo style={styles.icon} />
                      {app.interviewType || "Technical Round"}
                    </div>
                  </div>

                  <a 
                    href={app.interviewLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.joinButton}
                  >
                    Join Meeting <FaExternalLinkAlt style={{ marginLeft: 8, fontSize: 12 }} />
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
  page: { display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Poppins', sans-serif" },
  navContainer: { width: "250px", flexShrink: 0 }, // Adjust width based on your AdminNavbar width
  main: { flex: 1, padding: "40px" },
  header: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" },
  title: { fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: 0 },
  badge: { background: "#eff6ff", color: "#2563eb", padding: "5px 12px", borderRadius: "20px", fontSize: "14px", fontWeight: "600" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" },
  card: { background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", padding: "20px", transition: "transform 0.2s" },
  cardHeader: { display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" },
  dateBox: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f1f5f9", borderRadius: "12px", width: "60px", height: "60px", flexShrink: 0 },
  month: { fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" },
  day: { fontSize: "24px", fontWeight: "700", color: "#1e293b", lineHeight: 1 },
  candidateInfo: { overflow: "hidden" },
  name: { margin: "0 0 5px 0", fontSize: "16px", fontWeight: "600", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  role: { margin: 0, fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" },
  divider: { height: "1px", background: "#e2e8f0", margin: "15px 0" },
  details: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  detailRow: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#334155" },
  icon: { color: "#94a3b8" },
  joinButton: { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "10px", background: "#2563eb", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "600", fontSize: "14px", transition: "background 0.2s" },
  emptyState: { textAlign: "center", padding: "50px", background: "white", borderRadius: "12px", border: "2px dashed #e2e8f0" }
};