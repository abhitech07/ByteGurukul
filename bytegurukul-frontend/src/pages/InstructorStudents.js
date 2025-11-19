// src/pages/InstructorStudents.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InstructorNavbar from "../components/instructor/InstructorNavbar";

function InstructorStudents() {
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@bytegurukul.in",
      course: "React Masterclass",
      progress: 85,
      joined: "2025-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Rohit Verma",
      email: "rohit@bytegurukul.in",
      course: "Advanced JavaScript",
      progress: 65,
      joined: "2025-02-01",
      status: "Active",
    },
    {
      id: 3,
      name: "Anjali Singh",
      email: "anjali@bytegurukul.in",
      course: "Node.js Fundamentals",
      progress: 45,
      joined: "2025-01-20",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Rahul Kumar",
      email: "rahul@bytegurukul.in",
      course: "React Masterclass",
      progress: 92,
      joined: "2025-02-05",
      status: "Active",
    },
  ]);

  // Suspend or Reactivate
  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" }
          : s
      )
    );
  };

  const handleRemove = (id) => {
    if (window.confirm("Remove this student from the course?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      (filterCourse === "all" || s.course === filterCourse) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()))
  );

  // Unique courses for filter dropdown
  const uniqueCourses = [...new Set(students.map((s) => s.course))];

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <div style={{ height: "70px" }} /> {/* Space below navbar */}

      <div style={styles.header}>
        <h1 style={styles.title}>👨‍🎓 My Students</h1>
        <Link to="/instructor/dashboard" style={styles.backButton}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Search & Filter */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search student by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Courses</option>
          {uniqueCourses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Analytics Summary */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <h4>Total Students</h4>
            <p style={styles.statValue}>{students.length}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <div>
            <h4>Active Courses</h4>
            <p style={styles.statValue}>{uniqueCourses.length}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🏆</div>
          <div>
            <h4>Avg. Progress</h4>
            <p style={styles.statValue}>
              {(
                students.reduce((a, s) => a + s.progress, 0) / students.length
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td style={styles.studentName}>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>
                    <div style={styles.progressBarWrapper}>
                      <div
                        style={{
                          ...styles.progressBarFill,
                          width: `${s.progress}%`,
                        }}
                      ></div>
                    </div>
                    <small>{s.progress}%</small>
                  </td>
                  <td>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background:
                          s.status === "Active" ? "#dcfce7" : "#fee2e2",
                        color: s.status === "Active" ? "#166534" : "#991b1b",
                      }}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td>{s.joined}</td>
                  <td style={styles.actions}>
                    <button
                      style={styles.suspendButton}
                      onClick={() => toggleStatus(s.id)}
                    >
                      {s.status === "Active" ? "⏸ Suspend" : "✅ Activate"}
                    </button>
                    <button
                      style={styles.removeButton}
                      onClick={() => handleRemove(s.id)}
                    >
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🎨 Styling */
const styles = {
  page: {
    background: "linear-gradient(145deg, #f8fafc, #eef2ff)",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: { fontSize: 28, fontWeight: 700, color: "#1e293b" },
  backButton: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "8px 16px",
    borderRadius: 8,
  },
  filters: {
    display: "flex",
    gap: 15,
    marginBottom: 25,
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 2,
    padding: "10px 15px",
    border: "2px solid #cbd5e1",
    borderRadius: 8,
  },
  select: {
    padding: "10px 12px",
    border: "2px solid #cbd5e1",
    borderRadius: 8,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  statIcon: { fontSize: "30px" },
  statValue: { fontWeight: 700, color: "#2563eb" },
  card: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    overflowX: "auto",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  studentName: { fontWeight: 600 },
  progressBarWrapper: {
    background: "#e2e8f0",
    borderRadius: "4px",
    height: "6px",
    overflow: "hidden",
    width: "100px",
    display: "inline-block",
    marginRight: "8px",
  },
  progressBarFill: {
    background: "#2563eb",
    height: "100%",
    borderRadius: "4px",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  actions: { display: "flex", gap: "8px" },
  suspendButton: {
    background: "#fbbf24",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
  },
  removeButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default InstructorStudents;
