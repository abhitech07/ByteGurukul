import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { FaTasks, FaUser, FaGithub, FaStar, FaComment, FaSave } from "react-icons/fa";

function AdminTaskReviews() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grading, setGrading] = useState({});

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
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks/my-tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setTasks(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/submissions/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setSubmissions(res.data.data);
        setSelectedTask(taskId);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleGrade = async (submissionId) => {
    const { grade, feedback } = grading[submissionId] || {};
    if (!grade || grade < 0) return alert("Please enter a valid grade");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/submissions/${submissionId}`,
        { grade: parseInt(grade), feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Grade submitted successfully!");
      // Refresh submissions
      fetchSubmissions(selectedTask);
      setGrading(prev => ({ ...prev, [submissionId]: {} }));
    } catch (error) {
      console.error("Error grading submission:", error);
      alert("Failed to submit grade");
    }
  };

  const updateGrading = (submissionId, field, value) => {
    setGrading(prev => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value }
    }));
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
      <AdminNavbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ marginBottom: "30px", color: colors.text }}>
          <FaTasks style={{ marginRight: "10px" }} />
          Task Reviews
        </h1>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
            {/* Tasks List */}
            <div className="glass-card" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "20px", padding: "20px" }}>
              <h3 style={{ marginBottom: "20px" }}>My Tasks</h3>
              {tasks.length === 0 ? (
                <p style={{ color: colors.secondary }}>No tasks created yet.</p>
              ) : (
                tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => fetchSubmissions(task.id)}
                    style={{
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      background: selectedTask === task.id ? colors.accent + "20" : "rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      transition: "all 0.3s"
                    }}
                  >
                    <h4 style={{ margin: 0, fontSize: "16px" }}>{task.title}</h4>
                    <p style={{ margin: "5px 0", fontSize: "14px", color: colors.secondary }}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Submissions */}
            <div className="glass-card" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "20px", padding: "20px" }}>
              <h3 style={{ marginBottom: "20px" }}>Submissions</h3>
              {selectedTask ? (
                submissions.length === 0 ? (
                  <p style={{ color: colors.secondary }}>No submissions yet.</p>
                ) : (
                  submissions.map(sub => (
                    <div key={sub.id} style={{ marginBottom: "20px", padding: "20px", border: `1px solid ${colors.border}`, borderRadius: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <FaUser style={{ marginRight: "10px", color: colors.accent }} />
                        <div>
                          <strong>{sub.User?.name}</strong> ({sub.User?.email})
                        </div>
                      </div>

                      {sub.content && (
                        <div style={{ marginBottom: "10px" }}>
                          <FaGithub style={{ marginRight: "10px", color: colors.secondary }} />
                          <a href={sub.content} target="_blank" rel="noopener noreferrer" style={{ color: colors.accent }}>
                            View GitHub Link
                          </a>
                        </div>
                      )}

                      {sub.fileUrl && (
                        <div style={{ marginBottom: "10px" }}>
                          <strong>File:</strong> <a href={`http://localhost:5000/${sub.fileUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: colors.accent }}>
                            Download
                          </a>
                        </div>
                      )}

                      <div style={{ marginBottom: "10px" }}>
                        <strong>Status:</strong> {sub.status}
                      </div>

                      {sub.grade !== null && (
                        <div style={{ marginBottom: "10px" }}>
                          <FaStar style={{ color: colors.warning, marginRight: "5px" }} />
                          <strong>Grade:</strong> {sub.grade}/{sub.Task?.maxGrade}
                        </div>
                      )}

                      {sub.feedback && (
                        <div style={{ marginBottom: "10px" }}>
                          <FaComment style={{ color: colors.secondary, marginRight: "5px" }} />
                          <strong>Feedback:</strong> {sub.feedback}
                        </div>
                      )}

                      {sub.status === 'submitted' && (
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <input
                            type="number"
                            placeholder="Grade"
                            value={grading[sub.id]?.grade || ""}
                            onChange={(e) => updateGrading(sub.id, 'grade', e.target.value)}
                            min="0"
                            max={sub.Task?.maxGrade}
                            style={{ padding: "5px", borderRadius: "5px", border: `1px solid ${colors.border}`, background: colors.bg, color: colors.text }}
                          />
                          <textarea
                            placeholder="Feedback"
                            value={grading[sub.id]?.feedback || ""}
                            onChange={(e) => updateGrading(sub.id, 'feedback', e.target.value)}
                            rows="2"
                            style={{ padding: "5px", borderRadius: "5px", border: `1px solid ${colors.border}`, background: colors.bg, color: colors.text, flex: 1 }}
                          />
                          <button
                            onClick={() => handleGrade(sub.id)}
                            style={{ padding: "5px 10px", borderRadius: "5px", border: "none", background: colors.success, color: "white", cursor: "pointer" }}
                          >
                            <FaSave />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )
              ) : (
                <p style={{ color: colors.secondary }}>Select a task to view submissions.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTaskReviews;
