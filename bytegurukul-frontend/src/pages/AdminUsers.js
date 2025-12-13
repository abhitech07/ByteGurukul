// src/pages/AdminUsers.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from '../components/admin/AdminNavbar';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
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

  // Added a Mock Recruiter
  const [users, setUsers] = useState([
    { id: 1, name: "Abhijeet Kumar", email: "abhijeet@bytegurukul.in", role: "admin", status: "active", joined: "2024-09-15" },
    { id: 2, name: "Priya Sharma", email: "priya@bytegurukul.in", role: "student", status: "active", joined: "2025-01-11" },
    { id: 3, name: "Dr. Rajesh", email: "rajesh@bytegurukul.in", role: "instructor", status: "suspended", joined: "2025-02-01" },
    { id: 4, name: "HR Team", email: "hr@bytegurukul.in", role: "recruiter", status: "active", joined: "2025-03-10" },
  ]);

  // Added Color for Recruiter
  const COLORS = ["#2563eb", "#9333ea", "#16a34a", "#f59e0b"]; // Added Orange for Recruiter

  const userGrowthData = [
    { month: "Jan", users: 520 },
    { month: "Feb", users: 640 },
    { month: "Mar", users: 740 },
    { month: "Apr", users: 910 },
    { month: "May", users: 1000 },
    { month: "Jun", users: 1140 },
  ];

  // Updated Role Counts
  const roleCounts = {
    student: users.filter((u) => u.role === "student").length,
    instructor: users.filter((u) => u.role === "instructor").length,
    admin: users.filter((u) => u.role === "admin").length,
    recruiter: users.filter((u) => u.role === "recruiter").length,
  };

  const pieData = [
    { name: "Students", value: roleCounts.student },
    { name: "Instructors", value: roleCounts.instructor },
    { name: "Admins", value: roleCounts.admin },
    { name: "Recruiters", value: roleCounts.recruiter },
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
    toast.success(`New ${newUser.role} added successfully!`);
  };

  const handleEdit = (user) => setEditUser({ ...user });
  
  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.error("User deleted!");
    }
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
      )
    );
    toast.info("Status updated!");
  };

  const filteredUsers = users.filter(
    (u) =>
      (selectedRole === "all" || u.role === selectedRole) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh", paddingBottom: 40 }}>
      <ToastContainer position="bottom-right" />
      <AdminNavbar />

      <div style={{ padding: "0 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", margin: "25px 0" }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>Manage Users</h1>
            <p style={{ color: colors.secondary }}>Administer students, instructors, and recruiters.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ background: colors.accent, color: "white", padding: "10px 20px", borderRadius: 8, border: "none", fontWeight: "bold", cursor: "pointer" }}
          >
            + Add New User
          </button>
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 30 }}>
            {/* Pie Chart */}
            <div style={{ background: colors.card, padding: 20, borderRadius: 16 }}>
                <h3 style={{marginBottom: 20}}>User Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={70} label>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* Growth Chart */}
            <div style={{ background: colors.card, padding: 20, borderRadius: 16 }}>
                <h3 style={{marginBottom: 20}}>Growth Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke={colors.accent} strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 15, marginBottom: 20 }}>
            <input 
                placeholder="Search by name or email..." 
                value={search} onChange={e => setSearch(e.target.value)} 
                style={{ flex: 1, padding: 12, borderRadius: 8, border: `1px solid ${colors.border}`, background: colors.card, color: colors.text }} 
            />
            <select 
                value={selectedRole} onChange={e => setSelectedRole(e.target.value)}
                style={{ padding: "0 20px", borderRadius: 8, border: `1px solid ${colors.border}`, background: colors.card, color: colors.text }}
            >
                <option value="all">All Roles</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="recruiter">Recruiter</option> {/* Added Option */}
                <option value="admin">Admin</option>
            </select>
        </div>

        {/* Table */}
        <div style={{ background: colors.card, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: isDark ? "#334155" : "#f8fafc", textAlign: "left" }}>
                        <th style={{ padding: 15 }}>Name</th>
                        <th style={{ padding: 15 }}>Role</th>
                        <th style={{ padding: 15 }}>Status</th>
                        <th style={{ padding: 15 }}>Joined</th>
                        <th style={{ padding: 15 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(u => (
                        <tr key={u.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                            <td style={{ padding: 15 }}>
                                <div style={{fontWeight: "bold"}}>{u.name}</div>
                                <div style={{fontSize: 12, color: colors.secondary}}>{u.email}</div>
                            </td>
                            <td style={{ padding: 15 }}>
                                <span style={{
                                    padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold",
                                    background: u.role === 'recruiter' ? '#ffedd5' : (u.role === 'admin' ? '#e0e7ff' : '#d1fae5'),
                                    color: u.role === 'recruiter' ? '#c2410c' : (u.role === 'admin' ? '#4338ca' : '#065f46')
                                }}>
                                    {u.role.toUpperCase()}
                                </span>
                            </td>
                            <td style={{ padding: 15 }}>
                                <span style={{ color: u.status === 'active' ? '#16a34a' : '#dc2626', fontWeight: 500 }}>
                                    {u.status === 'active' ? '● Active' : '● Inactive'}
                                </span>
                            </td>
                            <td style={{ padding: 15 }}>{u.joined}</td>
                            <td style={{ padding: 15 }}>
                                <button onClick={() => handleEdit(u)} style={{ marginRight: 10, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>✏️</button>
                                <button onClick={() => handleDelete(u.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: colors.card, padding: 30, borderRadius: 16, width: 400 }}>
                <h2>Add New User</h2>
                <form onSubmit={handleAddUser} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                    <input name="name" placeholder="Full Name" required style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
                    <input name="email" type="email" placeholder="Email Address" required style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }} />
                    <select name="role" style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="recruiter">Recruiter</option> {/* Added Option */}
                        <option value="admin">Admin</option>
                    </select>
                    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                        <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", background: "#ccc", cursor: "pointer" }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", background: colors.accent, color: "white", cursor: "pointer" }}>Create User</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}

export default AdminUsers;