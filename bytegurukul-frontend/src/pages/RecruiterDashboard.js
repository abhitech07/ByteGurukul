import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Mock Data for Applicants
const mockApplicants = [
  { id: 101, name: "Rahul Verma", role: "Frontend Developer", status: "Pending", score: 85, submitted: "2 hrs ago" },
  { id: 102, name: "Sneha Gupta", role: "Backend Developer", status: "Interview", score: 92, submitted: "1 day ago" },
  { id: 103, name: "Amit Kumar", role: "UI/UX Designer", status: "Rejected", score: 45, submitted: "3 days ago" },
  { id: 104, name: "Pooja Singh", role: "Data Analyst", status: "Hired", score: 98, submitted: "1 week ago" },
];

export default function RecruiterDashboard() {
  const { user, logout } = useAuth();
  const [applicants, setApplicants] = useState(mockApplicants);
  const [filter, setFilter] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setApplicants(prev => prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const filteredList = filter === "All" 
    ? applicants 
    : applicants.filter(a => a.status === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Inter', sans-serif" }}>
      {/* Top Navbar */}
      <nav style={{ background: "white", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 24, fontWeight: "800", color: "#2563eb" }}>BG<span style={{color:"#1e293b"}}>Recruit</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ color: "#64748b" }}>Welcome, {user?.name || "Recruiter"}</span>
            <button onClick={logout} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px 16px", borderRadius: 6, fontWeight: "600", cursor: "pointer" }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "30px auto", padding: "0 20px" }}>
        
        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 30 }}>
            <StatCard label="Total Applications" value={applicants.length} color="#3b82f6" />
            <StatCard label="Interviews Scheduled" value={applicants.filter(a => a.status === "Interview").length} color="#f59e0b" />
            <StatCard label="Candidates Hired" value={applicants.filter(a => a.status === "Hired").length} color="#10b981" />
            <StatCard label="Rejected" value={applicants.filter(a => a.status === "Rejected").length} color="#ef4444" />
        </div>

        {/* Main Content Area */}
        <div style={{ background: "white", borderRadius: 12, padding: 25, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 style={{ margin: 0, color: "#1f2937" }}>Candidate Pipeline</h2>
                <div style={{ display: "flex", gap: 10 }}>
                    {['All', 'Pending', 'Interview', 'Hired'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: "500",
                                background: filter === f ? "#2563eb" : "#f3f4f6",
                                color: filter === f ? "white" : "#4b5563"
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f9fafb", textAlign: "left", color: "#6b7280", fontSize: 13, textTransform: "uppercase" }}>
                        <th style={{ padding: 15 }}>Candidate</th>
                        <th style={{ padding: 15 }}>Role Applied</th>
                        <th style={{ padding: 15 }}>Assessment Score</th>
                        <th style={{ padding: 15 }}>Status</th>
                        <th style={{ padding: 15 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map(app => (
                        <tr key={app.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: 15 }}>
                                <div style={{ fontWeight: "600", color: "#111827" }}>{app.name}</div>
                                <div style={{ fontSize: 12, color: "#9ca3af" }}>Applied {app.submitted}</div>
                            </td>
                            <td style={{ padding: 15, color: "#374151" }}>{app.role}</td>
                            <td style={{ padding: 15 }}>
                                <span style={{ 
                                    background: app.score > 90 ? "#d1fae5" : (app.score > 70 ? "#fff7ed" : "#fee2e2"), 
                                    color: app.score > 90 ? "#047857" : (app.score > 70 ? "#c2410c" : "#b91c1c"),
                                    padding: "4px 8px", borderRadius: 4, fontWeight: "bold", fontSize: 12
                                }}>
                                    {app.score}%
                                </span>
                            </td>
                            <td style={{ padding: 15 }}>
                                <span style={getStatusStyle(app.status)}>{app.status}</span>
                            </td>
                            <td style={{ padding: 15 }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={() => handleStatusChange(app.id, 'Interview')} title="Schedule Interview" style={actionBtnStyle}>📅</button>
                                    <button onClick={() => handleStatusChange(app.id, 'Hired')} title="Hire" style={actionBtnStyle}>✅</button>
                                    <button onClick={() => handleStatusChange(app.id, 'Rejected')} title="Reject" style={actionBtnStyle}>❌</button>
                                    <Link to="/internship/chat" style={actionBtnStyle}>💬</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {filteredList.length === 0 && (
                <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>No candidates found in this category.</div>
            )}
        </div>

      </div>
    </div>
  );
}

// Sub-components & Styles
const StatCard = ({ label, value, color }) => (
    <div style={{ background: "white", padding: 20, borderRadius: 12, borderLeft: `5px solid ${color}`, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ color: "#6b7280", fontSize: 13, fontWeight: "600", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: "800", color: "#1f2937", marginTop: 5 }}>{value}</div>
    </div>
);

const getStatusStyle = (status) => {
    const base = { padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: "600", display: "inline-block" };
    switch(status) {
        case 'Hired': return { ...base, background: "#dcfce7", color: "#15803d" };
        case 'Rejected': return { ...base, background: "#fee2e2", color: "#b91c1c" };
        case 'Interview': return { ...base, background: "#e0f2fe", color: "#0369a1" };
        default: return { ...base, background: "#f3f4f6", color: "#4b5563" };
    }
};

const actionBtnStyle = {
    width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", 
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", textDecoration: "none", fontSize: 14
};