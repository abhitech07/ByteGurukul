import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import { useTheme } from "../contexts/ThemeContext";

function AdminCourses() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#1e293b",
    secondary: isDark ? "#94a3b8" : "#475569",
    border: isDark ? "#334155" : "#cbd5e1",
    accent: "#2563eb",
  };

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "KCS301",
      instructor: "Dr. Sharma",
      semester: 3,
      status: "approved",
      students: 120,
      created: "2025-09-20",
      description:
        "Master arrays, linked lists, trees, and sorting algorithms to strengthen your DSA foundation.",
    },
    {
      id: 2,
      name: "Operating Systems",
      code: "KCS401",
      instructor: "Prof. Singh",
      semester: 4,
      status: "pending",
      students: 80,
      created: "2025-09-15",
      description:
        "Dive deep into processes, threads, memory management, and scheduling techniques.",
    },
    {
      id: 3,
      name: "Database Management Systems",
      code: "KCS503",
      instructor: "Dr. Gupta",
      semester: 5,
      status: "approved",
      students: 150,
      created: "2025-08-11",
      description:
        "Learn relational and NoSQL databases, SQL queries, normalization, and data integrity concepts.",
    },
  ]);

  // ⚙️ Handlers
  const handleStatusChange = (id, newStatus) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (course) => setEditCourse({ ...course });

  const handleSaveEdit = () => {
    setCourses((prev) =>
      prev.map((c) => (c.id === editCourse.id ? editCourse : c))
    );
    setEditCourse(null);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCourse = {
      id: courses.length + 1,
      name: form.name.value,
      code: form.code.value,
      instructor: form.instructor.value,
      semester: parseInt(form.semester.value),
      status: "pending",
      students: 0,
      created: new Date().toISOString().split("T")[0],
      description: form.description.value,
    };
    setCourses([...courses, newCourse]);
    setShowAddModal(false);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || course.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        
        transition: "all 0.3s ease",
      }}
    >
      <AdminNavbar />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Manage Courses 📘</h1>
          <p style={{ color: colors.secondary }}>
            View, edit, and manage all ByteGurukul courses
          </p>
        </div>
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            background: colors.accent,
            color: "white",
            padding: "8px 16px",
            borderRadius: 8,
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 25,
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 2,
            padding: "10px 15px",
            border: `2px solid ${colors.border}`,
            borderRadius: 8,
            background: colors.card,
            color: colors.text,
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px 15px",
            border: `2px solid ${colors.border}`,
            borderRadius: 8,
            background: colors.card,
            color: colors.text,
          }}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: "linear-gradient(135deg, #2563eb, #9333ea)",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add New Course
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: colors.card,
          borderRadius: 16,
          padding: 20,
          boxShadow: isDark
            ? "0 6px 15px rgba(0,0,0,0.6)"
            : "0 6px 15px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: isDark ? "#334155" : "#f1f5f9",
                color: colors.text,
              }}
            >
              <th>ID</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Students</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length ? (
              filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <td>{course.id}</td>
                  <td>
                    <span
                      onClick={() => setSelectedCourse(course)}
                      style={{
                        color: colors.accent,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {course.name}
                    </span>
                  </td>
                  <td>{course.instructor}</td>
                  <td>{course.semester}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 12,
                        fontSize: 12,
                        background:
                          course.status === "approved"
                            ? "#dcfce7"
                            : course.status === "pending"
                            ? "#fef9c3"
                            : "#e2e8f0",
                        color:
                          course.status === "approved"
                            ? "#166534"
                            : course.status === "pending"
                            ? "#92400e"
                            : "#475569",
                      }}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td>{course.students}</td>
                  <td>{course.created}</td>
                  <td>
                    {course.status !== "approved" ? (
                      <button
                        onClick={() =>
                          handleStatusChange(course.id, "approved")
                        }
                        style={styles.approveButton}
                      >
                        ✅ Approve
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleStatusChange(course.id, "pending")
                        }
                        style={styles.pendingButton}
                      >
                        ⏳ Pending
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(course)}
                      style={styles.editButton}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      style={styles.deleteButton}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📘 MODALS */}
      {selectedCourse && (
        <Modal onClose={() => setSelectedCourse(null)}>
          <h2>{selectedCourse.name}</h2>
          <p>
            <strong>Code:</strong> {selectedCourse.code} |{" "}
            <strong>Semester:</strong> {selectedCourse.semester}
          </p>
          <p>{selectedCourse.description}</p>
          <p>
            <strong>Instructor:</strong> {selectedCourse.instructor}
          </p>
          <p>
            <strong>Status:</strong> {selectedCourse.status}
          </p>
          <button style={styles.closeButton} onClick={() => setSelectedCourse(null)}>
            Close
          </button>
        </Modal>
      )}

      {editCourse && (
        <Modal onClose={() => setEditCourse(null)}>
          <h2>Edit Course</h2>
          <label>Name</label>
          <input
            style={styles.input}
            value={editCourse.name}
            onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
          />
          <label>Instructor</label>
          <input
            style={styles.input}
            value={editCourse.instructor}
            onChange={(e) =>
              setEditCourse({ ...editCourse, instructor: e.target.value })
            }
          />
          <label>Description</label>
          <textarea
            rows="3"
            style={{ ...styles.input, height: 80 }}
            value={editCourse.description}
            onChange={(e) =>
              setEditCourse({ ...editCourse, description: e.target.value })
            }
          />
          <div style={styles.modalButtons}>
            <button style={styles.closeButton} onClick={() => setEditCourse(null)}>
              Cancel
            </button>
            <button style={styles.primaryButton} onClick={handleSaveEdit}>
              Save
            </button>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h2>Add Course</h2>
          <form onSubmit={handleAddCourse}>
            <label>Name</label>
            <input name="name" style={styles.input} required />
            <label>Code</label>
            <input name="code" style={styles.input} required />
            <label>Instructor</label>
            <input name="instructor" style={styles.input} required />
            <label>Semester</label>
            <input name="semester" type="number" style={styles.input} required />
            <label>Description</label>
            <textarea name="description" rows="3" style={{ ...styles.input, height: 80 }} />
            <div style={styles.modalButtons}>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button type="submit" style={styles.primaryButton}>
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* 🧩 Modal Component */
function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 25,
          width: "480px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Button Styles */
const styles = {
  approveButton: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
  pendingButton: {
    background: "#fbbf24",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
  editButton: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    marginRight: 5,
    cursor: "pointer",
  },
  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
    background: "#e5e7eb",
    border: "none",
    color: "#1e293b",
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default AdminCourses;