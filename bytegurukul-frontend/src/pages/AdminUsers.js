import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from '../components/admin/AdminNavbar';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { utils, writeFile } from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/ThemeContext";

function AdminUsers() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#1e293b",
    secondary: isDark ? "#94a3b8" : "#64748b",
    accent: "#2563eb",
    border: isDark ? "#334155" : "#e2e8f0",
  };

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Abhijeet Kumar Pandey",
      email: "abhijeet@bytegurukul.in",
      role: "admin",
      status: "active",
      joined: "2024-09-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@bytegurukul.in",
      role: "student",
      status: "active",
      joined: "2025-01-11",
    },
    {
      id: 3,
      name: "Dr. Rajesh Sharma",
      email: "rajesh@bytegurukul.in",
      role: "instructor",
      status: "suspended",
      joined: "2025-02-01",
    },
  ]);

  const COLORS = ["#2563eb", "#9333ea", "#16a34a"];

  // User Growth Chart
  const userGrowthData = [
    { month: "Jan", users: 520 },
    { month: "Feb", users: 640 },
    { month: "Mar", users: 740 },
    { month: "Apr", users: 910 },
    { month: "May", users: 1000 },
    { month: "Jun", users: 1140 },
  ];

  const roleCounts = {
    student: users.filter((u) => u.role === "student").length,
    instructor: users.filter((u) => u.role === "instructor").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  const pieData = [
    { name: "Students", value: roleCounts.student },
    { name: "Instructors", value: roleCounts.instructor },
    { name: "Admins", value: roleCounts.admin },
  ];

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      id: users.length + 1,
      name: form.name.value,
      email: form.email.value,
      role: form.role.value,
      status: "active",
      joined: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    toast.success("New user added successfully!");
  };

  const handleEdit = (user) => setEditUser({ ...user });
  const handleSaveEdit = () => {
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
    toast.info("User details updated!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.error("User deleted!");
    }
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
    toast.info("User status changed!");
  };

  const exportToCSV = () => {
    const sheet = utils.json_to_sheet(users);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, sheet, "Users");
    writeFile(wb, "ByteGurukul_Users_Report.xlsx");
    toast.success("User report exported!");
  };

  const filteredUsers = users.filter(
    (u) =>
      (selectedRole === "all" || u.role === selectedRole) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        
        transition: "all 0.3s ease",
      }}
    >
      <ToastContainer position="bottom-right" />
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
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Manage Users 👥</h1>
          <p style={{ color: colors.secondary }}>
            View, edit, export and analyze platform users
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

      {/* CHARTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            background: colors.card,
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h3>User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: colors.card,
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h3>User Growth (Monthly)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke={colors.accent} />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
          placeholder="Search user..."
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
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{
            padding: "10px 12px",
            border: `2px solid ${colors.border}`,
            borderRadius: 8,
            background: colors.card,
            color: colors.text,
          }}
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          style={{
            background: "linear-gradient(135deg, #2563eb, #9333ea)",
            color: "white",
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
          }}
          onClick={() => setShowAddModal(true)}
        >
          + Add User
        </button>
        <button
          style={{
            background: "linear-gradient(135deg, #059669, #10b981)",
            color: "white",
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
          }}
          onClick={exportToCSV}
        >
          ⬇️ Export Report
        </button>
      </div>

      {/* USER TABLE */}
      <div
        style={{
          background: colors.card,
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
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
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
              >
                <td>{u.id}</td>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 12,
                      fontSize: 12,
                      background:
                        u.role === "admin"
                          ? "#c7d2fe"
                          : u.role === "instructor"
                          ? "#d1fae5"
                          : "#fef9c3",
                      color:
                        u.role === "admin"
                          ? "#3730a3"
                          : u.role === "instructor"
                          ? "#065f46"
                          : "#92400e",
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 12,
                      fontSize: 12,
                      background:
                        u.status === "active" ? "#dcfce7" : "#fee2e2",
                      color:
                        u.status === "active" ? "#166534" : "#991b1b",
                    }}
                  >
                    {u.status}
                  </span>
                </td>
                <td>{u.joined}</td>
                <td>
                  <button
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 6,
                      marginRight: 5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(u)}
                  >
                    ✏️
                  </button>
                  <button
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 6,
                      marginRight: 5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(u.id)}
                  >
                    🗑
                  </button>
                  <button
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.status === "active" ? "⏸" : "✅"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;