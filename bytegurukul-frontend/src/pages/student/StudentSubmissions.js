import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import StudentNavbar from "../../components/student/StudentNavbar";
import { FaTasks, FaStar, FaComment, FaGithub, FaFileDownload } from "react-icons/fa";

function StudentSubmissions() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.8)",
    text: isDark ? "#f8fafc" : "#1e293b",
    secondary: isDark ? "#94a3b8" : "#64748b",
    accent: "#3b82f6",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5003/api/submissions/my-submissions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setSubmissions(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: isDark
        ? "radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)"
        : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      color: colors.text,
      fontFamily: "'Inter', sans-serif"
    }}>
      <StudentNavbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ marginBottom: "30px", color: colors.text }}>
          <FaTasks style={{ marginRight: "10px" }} />
          My Submissions
        </h1>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="glass-card" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "20px", padding: "40px", textAlign: "center" }}>
            <p style={{ color: colors.secondary, fontSize: "18px" }}>No submissions yet.</p>
            <p style={{ color: colors.secondary }}>Start working on tasks to see your progress here!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {submissions.map(sub => (
              <div key={sub.id} className="glass-card" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "20px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "20px", color: colors.text }}>{sub.Task?.title}</h3>
                    <p style={{ margin: "5px 0", color: colors.secondary }}>
                      Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{
                    padding: "5px 15px",
                    borderRadius: "20px",
                    background: sub.status === 'graded' ? colors.success + "20" : sub.status === 'submitted' ? colors.warning + "20" : colors.secondary + "20",
                    color: sub.status === 'graded' ? colors.success : sub.status === 'submitted' ? colors.warning : colors.secondary,
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    {sub.status.toUpperCase()}
                  </div>
                </div>

                {sub.content && (
                  <div style={{ marginBottom: "10px" }}>
                    <FaGithub style={{ marginRight: "10px", color: colors.accent }} />
                    <a href={sub.content} target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: "none" }}>
                      View GitHub Repository
                    </a>
                  </div>
                )}

                {sub.fileUrl && (
                  <div style={{ marginBottom: "10px" }}>
                    <FaFileDownload style={{ marginRight: "10px", color: colors.secondary }} />
                    <a href={`http://localhost:5003/${sub.fileUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: "none" }}>
                      Download Submitted File
                    </a>
                  </div>
                )}

                {sub.grade !== null && (
                  <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    <FaStar style={{ color: colors.warning, marginRight: "10px" }} />
                    <strong style={{ color: colors.text }}>Grade: {sub.grade}/{sub.Task?.maxGrade}</strong>
                  </div>
                )}

                {sub.feedback && (
                  <div style={{ marginBottom: "10px" }}>
                    <FaComment style={{ color: colors.secondary, marginRight: "10px" }} />
                    <strong style={{ color: colors.text }}>Feedback:</strong>
                    <p style={{ margin: "5px 0", color: colors.secondary, padding: "10px", background: colors.bg, borderRadius: "10px" }}>
                      {sub.feedback}
                    </p>
                  </div>
                )}

                {sub.status === 'draft' && (
                  <p style={{ color: colors.secondary, fontStyle: "italic" }}>
                    This submission is still in draft. Submit it to get graded.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentSubmissions;
