// src/pages/AdminSettings.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    name: "Abhijeet Kumar Pandey",
    email: "abhijeet@bytegurukul.in",
    role: "Admin",
    profilePic: "",
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert("Password changed successfully!");
  };

  return (
    <div style={styles.container}>
      <AdminNavbar />
      {/* Small visual divider */}
  <div
    style={{
      height: "8px",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
    }}
  />

      <div style={styles.header}>
        <h1 style={styles.title}>⚙️ Admin Settings</h1>
        <p style={styles.subtitle}>
          Manage your profile, preferences, and account security.
        </p>
      </div>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        {["profile", "theme", "security"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tabButton,
              background:
                activeTab === tab
                  ? "linear-gradient(135deg, #2563eb, #9333ea)"
                  : "#f1f5f9",
              color: activeTab === tab ? "white" : "#1e293b",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profile" && "👤 Profile"}
            {tab === "theme" && "🎨 Theme"}
            {tab === "security" && "🔒 Security"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={styles.card}>
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSave}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Role</label>
              <input
                type="text"
                value={user.role}
                disabled
                style={{ ...styles.input, background: "#f1f5f9" }}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Profile Picture</label>
              <input type="file" accept="image/*" style={styles.input} />
            </div>

            <button type="submit" style={styles.saveButton}>
              💾 Save Changes
            </button>
          </form>
        )}

        {activeTab === "theme" && (
          <div>
            <h3 style={styles.sectionTitle}>Theme Preferences</h3>
            <div style={styles.themeOptions}>
              {["light", "dark", "system"].map((mode) => (
                <div
                  key={mode}
                  style={{
                    ...styles.themeCard,
                    border:
                      theme === mode
                        ? "2px solid #2563eb"
                        : "1px solid #cbd5e1",
                  }}
                  onClick={() => handleThemeChange(mode)}
                >
                  <p style={{ margin: 0, fontWeight: 600, textTransform: "capitalize" }}>
                    {mode} Mode
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <form onSubmit={handlePasswordChange}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Current Password</label>
              <input type="password" style={styles.input} required />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>New Password</label>
              <input type="password" style={styles.input} required />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <input type="password" style={styles.input} required />
            </div>

            <button type="submit" style={styles.saveButton}>
              🔒 Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* 💠 ByteGurukul Admin Settings Styling */
const styles = {
  container: {
    background: "linear-gradient(145deg, #f8fafc, #eef2ff)",
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  header: { textAlign: "center", marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 700, color: "#1e293b" },
  subtitle: { color: "#475569", fontSize: 14 },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    marginBottom: 25,
    flexWrap: "wrap",
  },
  tabButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  card: {
    background: "white",
    borderRadius: 16,
    padding: 30,
    maxWidth: 700,
    margin: "0 auto",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  fieldGroup: { marginBottom: 18 },
  label: { display: "block", marginBottom: 6, color: "#334155", fontWeight: 600 },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    fontSize: 14,
  },
  saveButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "600",
    marginTop: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 700, marginBottom: 20 },
  themeOptions: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  themeCard: {
    background: "white",
    padding: "20px 30px",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default AdminSettings;