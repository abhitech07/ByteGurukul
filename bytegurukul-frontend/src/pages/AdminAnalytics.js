// src/pages/AdminAnalytics.js
import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminAnalytics() {
  const userGrowthData = [
    { month: "Jan", users: 800 },
    { month: "Feb", users: 950 },
    { month: "Mar", users: 1200 },
    { month: "Apr", users: 1500 },
    { month: "May", users: 1850 },
    { month: "Jun", users: 2100 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 3200 },
    { month: "Feb", revenue: 4100 },
    { month: "Mar", revenue: 5400 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 8800 },
    { month: "Jun", revenue: 10400 },
  ];

  const performanceMetrics = [
    { name: "Active Users", value: "2,450" },
    { name: "Total Enrollments", value: "4,875" },
    { name: "Avg. Session Time", value: "18 min" },
    { name: "Conversion Rate", value: "12.6%" },
  ];

  const handleExport = () => {
    toast.success("Analytics data exported successfully!", { position: "top-right" });
  };

  return (
    <div style={styles.container}>
      <AdminNavbar />
      <ToastContainer />

      <div style={styles.header}>
        <h1 style={styles.title}>📊 Platform Analytics</h1>
        <p style={styles.subtitle}>Overview of user growth, revenue, and performance</p>
      </div>

      {/* Metrics Overview */}
      <div style={styles.metricsGrid}>
        {performanceMetrics.map((metric) => (
          <div key={metric.name} style={styles.metricCard}>
            <h3 style={styles.metricValue}>{metric.value}</h3>
            <p style={styles.metricName}>{metric.name}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsContainer}>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>User Growth (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Revenue Analytics ($)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Section */}
      <div style={styles.exportSection}>
        <h3>Download Report</h3>
        <p>Export complete analytics data as Excel or CSV file.</p>
        <button style={styles.exportButton} onClick={handleExport}>
          📥 Export Analytics Data
        </button>
      </div>
    </div>
  );
}

/* 🎨 ByteGurukul Analytics Styles */
const styles = {
  container: {
    background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  header: {
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "40px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1e3a8a",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto 40px",
    padding: "0 20px",
  },
  metricCard: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  metricValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2563eb",
    margin: "0 0 8px 0",
  },
  metricName: {
    color: "#64748b",
    fontSize: "14px",
  },
  chartsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  chartBox: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
  chartTitle: {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
  },
  exportSection: {
    textAlign: "center",
    marginTop: "50px",
  },
  exportButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  },
};

export default AdminAnalytics;