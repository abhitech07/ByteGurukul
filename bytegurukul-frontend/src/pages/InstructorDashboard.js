// src/pages/InstructorDashboard.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import InstructorNavbar from "../components/instructor/InstructorNavbar";



function InstructorDashboard() {
  const { user, logout } = useAuth();

  const [instructorCourses] = useState([
    {
      id: 1,
      name: "Advanced JavaScript",
      code: "JS201",
      students: 145,
      rating: 4.8,
      revenue: "₹2,450",
      progress: 85,
    },
    {
      id: 2,
      name: "React Masterclass",
      code: "REACT301",
      students: 89,
      rating: 4.9,
      revenue: "₹1,780",
      progress: 92,
    },
    {
      id: 3,
      name: "Node.js Fundamentals",
      code: "NODE101",
      students: 203,
      rating: 4.7,
      revenue: "₹3,120",
      progress: 78,
    },
  ]);

  const analytics = {
    totalStudents: 437,
    totalRevenue: "₹7,350",
    averageRating: 4.8,
    totalCourses: 3,
  };

  const recentStudents = [
    {
      name: "Alice Johnson",
      course: "React Masterclass",
      progress: 45,
      joinDate: "2025-02-05",
    },
    {
      name: "Bob Smith",
      course: "Advanced JavaScript",
      progress: 78,
      joinDate: "2025-02-02",
    },
    {
      name: "Carol Davis",
      course: "Node.js Fundamentals",
      progress: 32,
      joinDate: "2025-01-28",
    },
  ];

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <div style={{ height: "75px" }} /> {/* spacing below navbar */}

      {/* Header Section */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>
            🎓 Welcome, {user?.name || "Instructor"}!
          </h1>
          <p style={styles.heroSubtitle}>
            Inspire your students, manage your courses, and grow with ByteGurukul.
          </p>
        </div>
        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsGrid}>
        {[
          { icon: "📘", title: "Courses", value: analytics.totalCourses },
          { icon: "👩‍🎓", title: "Students", value: analytics.totalStudents },
          { icon: "⭐", title: "Avg. Rating", value: analytics.averageRating },
          { icon: "💰", title: "Revenue", value: analytics.totalRevenue },
        ].map((item, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statIcon}>{item.icon}</div>
            <div>
              <h3 style={styles.statTitle}>{item.title}</h3>
              <p style={styles.statValue}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>My Courses</h2>
          <Link to="/instructor/courses/create" style={styles.primaryButton}>
            + Create New
          </Link>
        </div>

        <div style={styles.coursesGrid}>
          {instructorCourses.map((course) => (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.courseHeader}>
                <span style={styles.courseEmoji}>📚</span>
                <div>
                  <h3 style={styles.courseName}>{course.name}</h3>
                  <p style={styles.courseCode}>{course.code}</p>
                </div>
              </div>

              <div style={styles.courseStats}>
                <p>👩‍🎓 {course.students} Students</p>
                <p>⭐ {course.rating}</p>
                <p>💵 {course.revenue}</p>
              </div>

              <div style={styles.progressSection}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${course.progress}%`,
                    }}
                  ></div>
                </div>
                <small>{course.progress}% Complete</small>
              </div>

              <div style={styles.courseActions}>
                <Link to={`/instructor/courses/${course.id}`} style={styles.manageBtn}>
                  Manage
                </Link>
                <Link to={`/instructor/analytics/${course.id}`} style={styles.viewBtn}>
                  Analytics
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomGrid}>
        {/* Recent Students */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Recent Students</h3>
          {recentStudents.map((s, i) => (
            <div key={i} style={styles.studentCard}>
              <div style={styles.studentAvatar}>👤</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{s.name}</h4>
                <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
                  {s.course} • {s.progress}% complete
                </p>
              </div>
              <span style={styles.joinDate}>
                {new Date(s.joinDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            {[
              { icon: "🧑‍🏫", label: "Create Course", link: "/instructor/courses/create" },
              { icon: "📊", label: "View Analytics", link: "/instructor/analytics" },
              { icon: "💵", label: "Earnings", link: "/instructor/earnings" },
              { icon: "⚙️", label: "Settings", link: "/instructor/settings" },
            ].map((a) => (
              <Link key={a.label} to={a.link} style={styles.actionCard}>
                <span style={styles.actionIcon}>{a.icon}</span>
                <p>{a.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  page: {
    background: "linear-gradient(145deg, #f8fafc, #eef2ff)",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  hero: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    borderRadius: "16px",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    marginBottom: "35px",
  },
  heroTitle: { fontSize: 28, fontWeight: 700 },
  heroSubtitle: { fontSize: 15, opacity: 0.9 },
  logoutButton: {
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    borderRadius: 8,
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginBottom: 30,
  },
  statCard: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    display: "flex",
    gap: 15,
    alignItems: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },
  statIcon: { fontSize: 28 },
  statTitle: { fontSize: 14, color: "#475569" },
  statValue: { fontSize: 20, fontWeight: 700, color: "#2563eb" },
  section: { marginBottom: 30 },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: "#1e293b" },
  primaryButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: 20,
  },
  courseCard: {
    background: "white",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease",
  },
  courseHeader: { display: "flex", gap: 15, marginBottom: 10 },
  courseEmoji: { fontSize: 35 },
  courseName: { margin: 0, fontSize: 18, fontWeight: 600 },
  courseCode: { color: "#64748b", fontSize: 14 },
  courseStats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#475569",
  },
  progressSection: { marginTop: 10, marginBottom: 10 },
  progressBar: {
    width: "100%",
    height: 6,
    background: "#e2e8f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
  },
  courseActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },
  manageBtn: {
    background: "#2563eb",
    color: "white",
    padding: "6px 10px",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 500,
  },
  viewBtn: {
    background: "#f3f4f6",
    color: "#1e293b",
    padding: "6px 10px",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 500,
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: 20,
  },
  card: {
    background: "white",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  studentCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    background: "#f9fafb",
  },
  studentAvatar: { fontSize: 22 },
  joinDate: { fontSize: 12, color: "#64748b" },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 15,
    marginTop: 15,
  },
  actionCard: {
    background: "linear-gradient(135deg, #e0e7ff, #ede9fe)",
    borderRadius: 10,
    textAlign: "center",
    padding: 18,
    color: "#1e293b",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease",
  },
  actionIcon: { fontSize: 26, marginBottom: 6 },
};

export default InstructorDashboard;
