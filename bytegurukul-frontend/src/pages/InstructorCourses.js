// src/pages/InstructorCourses.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InstructorNavbar from "../components/instructor/InstructorNavbar";

function InstructorCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "React Masterclass",
      code: "REACT301",
      students: 120,
      status: "Published",
      rating: 4.9,
      created: "2025-01-10",
    },
    {
      id: 2,
      name: "Node.js Fundamentals",
      code: "NODE101",
      students: 85,
      status: "Draft",
      rating: 4.7,
      created: "2025-02-01",
    },
    {
      id: 3,
      name: "Cyber Security Basics",
      code: "CS101",
      students: 60,
      status: "Pending",
      rating: 4.6,
      created: "2025-02-12",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <div style={{ height: "75px" }} /> {/* spacing below navbar */}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📘 My Courses</h1>
        <Link to="/instructor/courses/create" style={styles.addButton}>
          + Create New Course
        </Link>
      </div>

      {/* Course Table */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Code</th>
              <th>Status</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td style={styles.courseName}>
                  <Link to={`/instructor/courses/${course.id}`} style={styles.link}>
                    {course.name}
                  </Link>
                </td>
                <td>{course.code}</td>
                <td>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background:
                        course.status === "Published"
                          ? "#dcfce7"
                          : course.status === "Draft"
                          ? "#fef9c3"
                          : "#e0e7ff",
                      color:
                        course.status === "Published"
                          ? "#166534"
                          : course.status === "Draft"
                          ? "#92400e"
                          : "#3730a3",
                    }}
                  >
                    {course.status}
                  </span>
                </td>
                <td>{course.students}</td>
                <td>⭐ {course.rating}</td>
                <td>{course.created}</td>
                <td>
                  <div style={styles.actions}>
                    <Link to={`/instructor/courses/edit/${course.id}`} style={styles.editButton}>
                      ✏️ Edit
                    </Link>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(course.id)}
                    >
                      🗑 Delete
                    </button>
                    <Link to={`/instructor/analytics/${course.id}`} style={styles.viewButton}>
                      📊 View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div style={styles.emptyState}>
            <p>No courses found. Start by creating one!</p>
            <Link to="/instructor/courses/create" style={styles.primaryButton}>
              + Create Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎨 ByteGurukul Instructor Theme */
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
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#1e293b",
  },
  addButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    padding: "10px 18px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  },
  card: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderRow: {
    backgroundColor: "#f1f5f9",
    textAlign: "left",
  },
  courseName: { fontWeight: 600 },
  link: { color: "#2563eb", textDecoration: "none" },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  actions: { display: "flex", gap: "8px", flexWrap: "wrap" },
  editButton: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    textDecoration: "none",
  },
  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
  },
  viewButton: {
    background: "#f3f4f6",
    color: "#1e293b",
    borderRadius: 6,
    padding: "6px 10px",
    textDecoration: "none",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: "#475569",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    padding: "10px 20px",
    borderRadius: 8,
    textDecoration: "none",
    display: "inline-block",
    marginTop: 10,
  },
};

export default InstructorCourses;
