import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import AdminNavbar from '../components/admin/AdminNavbar';


function AdminInstructors() {
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
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [editInstructor, setEditInstructor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      email: "rajesh@bytegurukul.in",
      qualification: "PhD, IIT Delhi",
      expertise: "Data Structures & Algorithms",
      status: "approved",
      students: 1245,
      joined: "2024-09-15",
    },
    {
      id: 2,
      name: "Prof. Aditi Singh",
      email: "aditi@bytegurukul.in",
      qualification: "M.Tech, NIT Allahabad",
      expertise: "Cyber Security",
      status: "pending",
      students: 856,
      joined: "2025-02-10",
    },
    {
      id: 3,
      name: "Dr. Amit Gupta",
      email: "amit@bytegurukul.in",
      qualification: "PhD, BITS Pilani",
      expertise: "Database Systems",
      status: "approved",
      students: 940,
      joined: "2023-12-01",
    },
  ]);

  // 🟩 Handlers
  const handleStatusChange = (id, newStatus) => {
    setInstructors((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this instructor?")) {
      setInstructors((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleEdit = (instructor) => setEditInstructor({ ...instructor });

  const handleSaveEdit = () => {
    setInstructors((prev) =>
      prev.map((i) => (i.id === editInstructor.id ? editInstructor : i))
    );
    setEditInstructor(null);
  };

  const handleAddInstructor = (e) => {
    e.preventDefault();
    const form = e.target;
    const newInstructor = {
      id: instructors.length + 1,
      name: form.name.value,
      email: form.email.value,
      qualification: form.qualification.value,
      expertise: form.expertise.value,
      status: "pending",
      students: 0,
      joined: new Date().toISOString().split("T")[0],
    };
    setInstructors([...instructors, newInstructor]);
    setShowAddModal(false);
  };

  const filteredInstructors = instructors.filter(
    (inst) =>
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
    
        fontFamily: "'Poppins', sans-serif",
        transition: "all 0.3s ease",
      }}
    > <AdminNavbar />
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Manage Instructors 👨‍🏫</h1>
          <p style={{ color: colors.secondary }}>
            Approve, edit, and manage all instructors on ByteGurukul
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

      {/* SEARCH + ADD */}
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
          placeholder="Search instructor..."
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
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: "linear-gradient(135deg, #2563eb, #9333ea)",
            color: "white",
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add New Instructor
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
              <th>Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Expertise</th>
              <th>Status</th>
              <th>Students</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstructors.length > 0 ? (
              filteredInstructors.map((inst) => (
                <tr
                  key={inst.id}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <td>{inst.id}</td>
                  <td
                    style={{
                      color: colors.accent,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                    onClick={() => setSelectedInstructor(inst)}
                  >
                    {inst.name}
                  </td>
                  <td>{inst.email}</td>
                  <td>{inst.qualification}</td>
                  <td>{inst.expertise}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 12,
                        fontSize: 12,
                        backgroundColor:
                          inst.status === "approved" ? "#dcfce7" : "#fef9c3",
                        color:
                          inst.status === "approved" ? "#166534" : "#92400e",
                      }}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td>{inst.students}</td>
                  <td>{inst.joined}</td>
                  <td>
                    {inst.status !== "approved" ? (
                      <button
                        style={styles.approveButton}
                        onClick={() => handleStatusChange(inst.id, "approved")}
                      >
                        ✅ Approve
                      </button>
                    ) : (
                      <button
                        style={styles.pendingButton}
                        onClick={() => handleStatusChange(inst.id, "pending")}
                      >
                        ⏳ Pending
                      </button>
                    )}
                    <button
                      style={styles.editButton}
                      onClick={() => handleEdit(inst)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(inst.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No instructors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {selectedInstructor && (
        <Modal onClose={() => setSelectedInstructor(null)}>
          <h2>{selectedInstructor.name}</h2>
          <p><strong>Email:</strong> {selectedInstructor.email}</p>
          <p><strong>Qualification:</strong> {selectedInstructor.qualification}</p>
          <p><strong>Expertise:</strong> {selectedInstructor.expertise}</p>
          <p><strong>Status:</strong> {selectedInstructor.status}</p>
          <p><strong>Students:</strong> {selectedInstructor.students}</p>
          <p><strong>Joined:</strong> {selectedInstructor.joined}</p>
          <button style={styles.closeButton} onClick={() => setSelectedInstructor(null)}>Close</button>
        </Modal>
      )}

      {editInstructor && (
        <Modal onClose={() => setEditInstructor(null)}>
          <h2>Edit Instructor</h2>
          <input
            style={styles.input}
            value={editInstructor.name}
            onChange={(e) => setEditInstructor({ ...editInstructor, name: e.target.value })}
          />
          <input
            style={styles.input}
            value={editInstructor.email}
            onChange={(e) => setEditInstructor({ ...editInstructor, email: e.target.value })}
          />
          <input
            style={styles.input}
            value={editInstructor.qualification}
            onChange={(e) => setEditInstructor({ ...editInstructor, qualification: e.target.value })}
          />
          <input
            style={styles.input}
            value={editInstructor.expertise}
            onChange={(e) => setEditInstructor({ ...editInstructor, expertise: e.target.value })}
          />
          <div style={styles.modalButtons}>
            <button style={styles.closeButton} onClick={() => setEditInstructor(null)}>Cancel</button>
            <button style={styles.primaryButton} onClick={handleSaveEdit}>Save</button>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h2>Add Instructor</h2>
          <form onSubmit={handleAddInstructor}>
            <input name="name" placeholder="Name" style={styles.input} required />
            <input name="email" placeholder="Email" style={styles.input} required />
            <input name="qualification" placeholder="Qualification" style={styles.input} required />
            <input name="expertise" placeholder="Expertise" style={styles.input} required />
            <div style={styles.modalButtons}>
              <button type="button" style={styles.closeButton} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit" style={styles.primaryButton}>Add Instructor</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* 📦 Reusable Modal */
function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: 16,
          width: "460px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* 🎨 Buttons */
const styles = {
  header: { display: "flex", justifyContent: "space-between", marginBottom: 25 },
  approveButton: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    marginRight: 5,
    cursor: "pointer",
  },
  pendingButton: {
    background: "#fbbf24",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    marginRight: 5,
    cursor: "pointer",
  },
  editButton: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    marginRight: 5,
    cursor: "pointer",
  },
  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
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

export default AdminInstructors;