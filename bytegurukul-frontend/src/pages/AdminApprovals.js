import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import { FaCheck, FaTimes, FaSpinner, FaArrowLeft, FaFileAlt } from "react-icons/fa";

export default function AdminApprovals() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/internship/all");
      if (res.data.success) {
        setApplications(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(id);
    try {
      const res = await axios.put(`http://localhost:5003/api/internship/${id}/status`, {
        status: newStatus,
      });
      if (res.data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: { bg: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74" },
      Approved: { bg: "#f0fdf4", color: "#15803d", border: "1px solid #86efac" },
      Rejected: { bg: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5" },
    };
    const style = styles[status] || styles.Pending;

    return (
      <span style={{
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        backgroundColor: style.bg,
        color: style.color,
        border: style.border,
      }}>
        {status}
      </span>
    );
  };

  return (
    <div style={styles.page}>
      <AdminNavbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <Link to="/admin-dashboard" style={styles.backLink}>
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h1 style={styles.title}>Internship Applications</h1>
        </div>

        {loading ? (
          <div style={styles.loading}>
             <FaSpinner className="spinner" style={{marginRight: '10px'}}/> Loading...
          </div>
        ) : (
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>Applicant</th>
                  <th style={styles.th}>Role Applied</th>
                  <th style={styles.th}>University</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{textAlign: 'center', padding: '30px', color: '#64748b'}}>
                            No applications found.
                        </td>
                    </tr>
                ) : applications.map((app) => (
                  <tr key={app.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={{ fontWeight: "600", color: "#0f172a" }}>{app.name}</div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>{app.email}</div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>{app.phone}</div>
                    </td>
                    <td style={styles.td}>
                        <span style={styles.roleTag}>{app.roleId?.toUpperCase()}</span>
                    </td>
                    <td style={styles.td}>{app.university || "N/A"}</td>
                    <td style={styles.td}>{getStatusBadge(app.status)}</td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        {app.resumeText && (
                             <div style={styles.resumePreview}>
                                 <FaFileAlt style={{marginRight: '5px'}}/> Resume Text
                                 <div style={styles.resumeTooltip}>{app.resumeText}</div>
                             </div>
                        )}
                        
                        {app.status === "Pending" && (
                          <div style={styles.actionButtons}>
                            <button
                              onClick={() => handleStatusUpdate(app.id, "Approved")}
                              disabled={actionLoading === app.id}
                              style={{ ...styles.btn, ...styles.btnApprove }}
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app.id, "Rejected")}
                              disabled={actionLoading === app.id}
                              style={{ ...styles.btn, ...styles.btnReject }}
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Inject keyframes for spinner */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" },
  header: { marginBottom: "25px" },
  backLink: { textDecoration: "none", color: "#64748b", display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", fontSize: "14px", fontWeight: "500" },
  title: { fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 },
  loading: { textAlign: "center", padding: "40px", color: "#64748b", fontSize: "18px", display: 'flex', justifyContent: 'center', alignItems: 'center' },
  tableCard: { backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)", overflow: "hidden", border: "1px solid #e2e8f0" },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  th: { textAlign: "left", padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" },
  tr: { borderBottom: "1px solid #e2e8f0", transition: "background 0.2s" },
  td: { padding: "16px 24px", fontSize: "14px", color: "#334155", verticalAlign: "middle" },
  roleTag: { backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  actionButtons: { display: "flex", gap: "8px" },
  btn: { width: "32px", height: "32px", borderRadius: "8px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },
  btnApprove: { backgroundColor: "#dcfce7", color: "#15803d", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.1)" },
  btnReject: { backgroundColor: "#fee2e2", color: "#b91c1c", boxShadow: "0 2px 4px rgba(220, 38, 38, 0.1)" },
  resumePreview: { fontSize: '12px', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative' },
  resumeTooltip: { display: 'none', position: 'absolute', bottom: '100%', left: 0, background: '#1e293b', color: 'white', padding: '10px', borderRadius: '6px', width: '200px', zIndex: 10, fontSize: '12px', lineHeight: '1.4' },
};