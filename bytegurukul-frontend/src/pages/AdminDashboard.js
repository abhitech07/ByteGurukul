import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme(); // 🎨 Get current theme (light/dark)
  const [activeTab, setActiveTab] = useState("overview");

  // Mock Data
  const platformStats = {
    totalUsers: 12543,
    totalCourses: 287,
    totalRevenue: "$124,850",
    activeInstructors: 56,
    newUsersThisMonth: 324,
    courseEnrollments: 4587,
  };

  const recentActivities = [
    { type: "user_signup", message: "New user registered: John Doe", time: "2 hours ago" },
    { type: "course_created", message: 'New course published: "Advanced Python"', time: "5 hours ago" },
    { type: "payment_received", message: "Payment received: $49.99", time: "1 day ago" },
    { type: "instructor_approved", message: "Instructor approved: Sarah Wilson", time: "2 days ago" },
  ];

  const pendingApprovals = [
    { id: 1, type: "Instructor", name: "Mike Johnson", email: "mike@example.com", submitted: "2025-11-10" },
    { id: 2, type: "Course", name: "Machine Learning Basics", instructor: "Dr. Smith", submitted: "2025-11-09" },
  ];

  const topCourses = [
    { name: "React Masterclass", instructor: "John Doe", students: 1245, revenue: "$24,900" },
    { name: "Python for Beginners", instructor: "Jane Smith", students: 987, revenue: "$19,740" },
  ];

  // 🌗 Dynamic Theme Styles
  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#1e293b",
    secondary: isDark ? "#94a3b8" : "#64748b",
    accent: "#2563eb",
    success: "#22c55e",
    danger: "#ef4444",
  };

  return (
    <div
      style={{
        background: isDark
          ? "linear-gradient(145deg, #0f172a, #1e293b)"
          : "linear-gradient(145deg, #eef2ff, #f8fafc)",
        minHeight: "100vh",
        color: colors.text,
        transition: "all 0.3s ease",
        
      }}
    >
      <AdminNavbar />

      {/* STATS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {[
          ["👥", "Total Users", platformStats.totalUsers, `${platformStats.newUsersThisMonth} new this month`],
          ["📚", "Courses", platformStats.totalCourses, "↑ 12 this month"],
          ["💰", "Revenue", platformStats.totalRevenue, "↑ 15% growth"],
          ["📈", "Enrollments", platformStats.courseEnrollments, "↑ 8% this month"],
        ].map(([icon, title, value, trend]) => (
          <div
            key={title}
            style={{
              background: colors.card,
              padding: "25px",
              borderRadius: "14px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
              boxShadow: isDark
                ? "0 6px 15px rgba(0,0,0,0.6)"
                : "0 6px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div style={{ fontSize: "36px" }}>{icon}</div>
            <div>
              <h3>{title}</h3>
              <p style={{ fontSize: "22px", fontWeight: "700", color: colors.accent }}>
                {value.toLocaleString?.() || value}
              </p>
              <span style={{ color: colors.success, fontSize: "13px" }}>{trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "30px",
        }}
      >
        {/* Pending Approvals */}
        <div style={{ ...styles.sectionCard, background: colors.card, color: colors.text }}>
          <div style={styles.sectionHeader}>
            <h2>Pending Approvals</h2>
            <Link to="/admin/approvals" style={{ ...styles.viewAll, color: colors.accent }}>
              View All →
            </Link>
          </div>
          {pendingApprovals.map((item) => (
            <div key={item.id} style={{ ...styles.approvalCard, background: isDark ? "#334155" : "#f9fafb" }}>
              <div>
                <h4>{item.name}</h4>
                <p style={{ color: colors.secondary }}>{item.email || `By: ${item.instructor}`}</p>
                <small>📅 {new Date(item.submitted).toLocaleDateString()}</small>
              </div>
              <div>
                <button style={{ ...styles.approveButton, background: colors.success }}>Approve</button>
                <button style={{ ...styles.rejectButton, background: colors.danger }}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div style={{ ...styles.sectionCard, background: colors.card }}>
          <div style={styles.sectionHeader}>
            <h2>Recent Activities</h2>
            <Link to="/admin/activity" style={{ ...styles.viewAll, color: colors.accent }}>
              View All →
            </Link>
          </div>
          {recentActivities.map((activity, index) => (
            <div key={index} style={{ ...styles.activityCard, background: isDark ? "#334155" : "#f8fafc" }}>
              <span style={{ fontSize: "22px" }}>
                {activity.type === "user_signup" && "👤"}
                {activity.type === "course_created" && "📘"}
                {activity.type === "payment_received" && "💳"}
                {activity.type === "instructor_approved" && "👨‍🏫"}
              </span>
              <div>
                <p style={{ fontWeight: "500", margin: 0 }}>{activity.message}</p>
                <small style={{ color: colors.secondary }}>{activity.time}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Top Courses */}
        <div style={{ ...styles.sectionCard, background: colors.card }}>
          <div style={styles.sectionHeader}>
            <h2>Top Performing Courses</h2>
            <Link to="/admin/courses" style={{ ...styles.viewAll, color: colors.accent }}>
              View All →
            </Link>
          </div>
          {topCourses.map((course, index) => (
            <div key={index} style={{ ...styles.topCourseCard, background: isDark ? "#334155" : "#f9fafb" }}>
              <div>
                <h4>
                  {index + 1}. {course.name}
                </h4>
                <p style={{ color: colors.secondary }}>By {course.instructor}</p>
              </div>
              <div style={{ textAlign: "right", fontSize: "13px" }}>
                <span>👥 {course.students}</span>
                <strong style={{ color: colors.success, display: "block" }}>{course.revenue}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ✅ Reusable Styles */
const styles = {
  sectionCard: {
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  viewAll: {
    textDecoration: "none",
    fontWeight: "500",
  },
  approvalCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  approveButton: {
    border: "none",
    color: "white",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  rejectButton: {
    border: "none",
    color: "white",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  activityCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  topCourseCard: {
    borderRadius: "10px",
    padding: "10px 15px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default AdminDashboard;