// src/pages/InstructorAnalytics.js
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import InstructorNavbar from "../components/instructor/InstructorNavbar";
import { Link } from "react-router-dom";

function InstructorAnalytics() {
  // Mock data
  const enrollmentTrend = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 160 },
    { month: "Mar", students: 200 },
    { month: "Apr", students: 240 },
    { month: "May", students: 270 },
    { month: "Jun", students: 310 },
    { month: "Jul", students: 355 },
  ];

  const revenueByCourse = [
    { course: "React Masterclass", revenue: 2450 },
    { course: "Node.js Fundamentals", revenue: 1780 },
    { course: "Advanced JavaScript", revenue: 3120 },
  ];

  const ratingDistribution = [
    { name: "5★", value: 62 },
    { name: "4★", value: 27 },
    { name: "3★", value: 8 },
    { name: "2★", value: 2 },
    { name: "1★", value: 1 },
  ];

  const COLORS = ["#16a34a", "#22c55e", "#84cc16", "#facc15", "#f87171"];

  const totalStudents = 355;
  const avgRating = 4.8;
  const totalRevenue = 7350;

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <div style={{ height: "70px" }} /> {/* Gap below navbar */}

      <div style={styles.header}>
        <h1 style={styles.title}>📈 Instructor Analytics</h1>
        <Link to="/instructor/dashboard" style={styles.backButton}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Overview Summary */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <h4>Total Students</h4>
            <p style={styles.statValue}>{totalStudents}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <h4>Total Revenue</h4>
            <p style={styles.statValue}>₹ {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div>
            <h4>Average Rating</h4>
            <p style={styles.statValue}>{avgRating}/5.0</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartGrid}>
        {/* Line Chart: Enrollment Trend */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Monthly Enrollments</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Revenue */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Revenue by Course</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByCourse}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip formatter={(v) => `₹ ${v}`} />
              <Bar dataKey="revenue" fill="#9333ea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Ratings */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={ratingDistribution}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {ratingDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* 🎨 ByteGurukul Instructor Analytics Styling */
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
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  },
  chartCard: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
    color: "#1e293b",
  },
};

export default InstructorAnalytics;