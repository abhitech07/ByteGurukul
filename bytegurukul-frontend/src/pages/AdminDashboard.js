import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/admin/AdminNavbar";
import {
  FaUserPlus,
  FaBook,
  FaDollarSign,
  FaChartLine,
  FaExclamationCircle,
  FaCheckCircle,
  FaUsers,
  FaGlobe,
  FaCogs,
  FaFileUpload,
  FaRocket,
  FaShieldAlt,
  FaSync,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaStar
} from "react-icons/fa";
import { useCounter } from "./Home.js";

// ------------------------------------------------------------------
// 1. ADVANCED STAT CARD (Merged Features)
// ------------------------------------------------------------------
const StatCard = ({ icon: Icon, title, value, trend, trendColor, isDark, colors, progress, subtitle }) => {
  const numericValue = parseInt(String(value).replace(/[$,]/g, "").split(" ")[0], 10) || 0;
  const animatedValue = useCounter(numericValue);
  const displayValue = typeof value === "string" && value.includes("$")
      ? `$${animatedValue.toLocaleString()}`
      : animatedValue.toLocaleString();

  const isPositive = trend?.includes('↑');
  const TrendIcon = isPositive ? FaArrowUp : FaArrowDown;

  return (
    <div className="stat-card-pro" style={{
        background: isDark 
            ? "linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))" 
            : "linear-gradient(145deg, #ffffff, #f0f9ff)",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.6)",
    }}>
      {/* Top Section: Icon & Value */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <div>
            <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", color: colors.secondary, marginBottom: "5px", fontWeight: 600 }}>{title}</h3>
            <div style={{ fontSize: "28px", fontWeight: "800", color: colors.text, letterSpacing: "-0.5px" }}>{displayValue}</div>
        </div>
        <div className="icon-glow" style={{ 
            background: `linear-gradient(135deg, ${trendColor}20, ${trendColor}10)`, 
            color: trendColor,
            boxShadow: `0 4px 15px ${trendColor}30`
        }}>
            <Icon size={24} />
        </div>
      </div>

      {/* Middle: Progress Bar */}
      {progress !== undefined && (
        <div style={{ width: "100%", height: "6px", background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", borderRadius: "10px", marginBottom: "12px", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: trendColor, borderRadius: "10px", transition: "width 1s ease-in-out" }} />
        </div>
      )}

      {/* Bottom: Trend & Subtitle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
        <span style={{ color: trendColor, fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendIcon size={10} /> {trend}
        </span>
        <span style={{ color: colors.secondary }}>{subtitle}</span>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 2. PERFORMANCE METRIC COMPONENT
// ------------------------------------------------------------------
const PerformanceMetric = ({ title, value, target, unit, color, isDark }) => {
  const percentage = Math.min(100, (value / target) * 100);

  return (
    <div className="metric-card" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: isDark ? "#e2e8f0" : "#334155" }}>
        <span>{title}</span>
        <span>{value}{unit} <span style={{opacity: 0.5, fontWeight: 400}}>/ {target}{unit}</span></span>
      </div>
      <div style={{ width: "100%", height: "8px", background: isDark ? "#334155" : "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
        <div className="progress-bar-animated" style={{ 
            width: `${percentage}%`, 
            background: color,
            boxShadow: `0 0 12px ${color}60` 
        }} />
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 3. MAIN DASHBOARD COMPONENT
// ------------------------------------------------------------------
function AdminDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // --- STATE ---
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [platformStats, setPlatformStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: 99.8,
    responseTime: 124,
    serverLoad: 32,
    activeSessions: 1247
  });

  // --- EFFECTS ---
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/internship/all");
        if (res.data.success) {
          const pending = res.data.data.filter((app) => app.status === "Pending");
          setPendingApplications(pending);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5003/api/analytics/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setPlatformStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        uptime: 99.8, // Keep stable
        responseTime: Math.max(80, prev.responseTime + (Math.random() - 0.5) * 20),
        serverLoad: Math.max(10, Math.min(90, prev.serverLoad + (Math.random() - 0.5) * 8)),
        activeSessions: prev.activeSessions + Math.floor((Math.random() - 0.5) * 10)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5003/api/internship/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingApplications((prev) => prev.filter((app) => app.id !== id));
      alert(`Application ${newStatus} successfully!`);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  // --- DATA & THEME CONFIG ---

  const recentActivities = [
    { type: "user_signup", message: "New user registered: John Doe", time: "2 mins ago", priority: "high" },
    { type: "payment", message: "Payment received: $49.99", time: "15 mins ago", priority: "low" },
    { type: "course", message: 'Course "React Pro" updated', time: "1 hour ago", priority: "medium" },
    { type: "instructor", message: "Instructor verified: Sarah Smith", time: "3 hours ago", priority: "medium" },
  ];

  const topCourses = [
    { name: "React Masterclass", instructor: "John Doe", students: 1245, revenue: "$24,900", rating: 4.9 },
    { name: "Python Zero to Hero", instructor: "Jane Smith", students: 987, revenue: "$19,740", rating: 4.8 },
  ];

  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.8)",
    text: isDark ? "#f8fafc" : "#1e293b",
    secondary: isDark ? "#94a3b8" : "#64748b",
    accent: "#3b82f6",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#8b5cf6",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
  };

  // --- RENDER ---
  return (
    <div style={{ 
        minHeight: "100vh", 
        background: isDark 
            ? "radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)" 
            : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
        color: colors.text, 
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.3s ease"
    }}>
      <AdminNavbar />
      
      <div style={styles.contentWrapper}>
        
        {/* 1. HERO BANNER */}
        <div className="glass-panel" style={{ ...styles.banner, borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ flex: 1 }}>
                <h1 className="gradient-text">Platform Control Center <FaRocket className="floating-icon" /></h1>
                <p style={{ color: colors.secondary, marginTop: "8px", fontSize: "15px" }}>
                    Welcome back, <strong>{user?.name || "Admin"}</strong>. System running at <span style={{color: colors.success}}>99.8% efficiency</span>.
                </p>
            </div>
            <div className="status-pill" style={{ background: isDark ? "rgba(16, 185, 129, 0.15)" : "#d1fae5", color: "#10b981" }}>
                <FaShieldAlt /> System Secure
            </div>
        </div>

        {/* 2. STATS GRID */}
        {loadingStats ? (
          <div style={{ textAlign: 'center', padding: '40px', color: colors.secondary }}>
            <FaSync className="spin" size={32} /> Loading platform statistics...
          </div>
        ) : (
          <div style={styles.grid4}>
            <StatCard
                icon={FaUsers} title="Total Users" value={platformStats?.totalUsers || 0}
                trend={`↑ ${platformStats?.recentEnrollments7Days || 0} new`} trendColor={colors.accent}
                isDark={isDark} colors={colors} progress={85} subtitle="Active this week"
            />
            <StatCard
                icon={FaBook} title="Total Courses" value={platformStats?.totalCourses || 0}
                trend="↑ 12 published" trendColor={colors.success}
                isDark={isDark} colors={colors} progress={72} subtitle="Engagement rate"
            />
            <StatCard
                icon={FaDollarSign} title="Revenue (YTD)" value={platformStats?.totalRevenue || 0}
                trend="↑ 15% growth" trendColor={colors.success}
                isDark={isDark} colors={colors} progress={92} subtitle="On target"
            />
            <StatCard
                icon={FaChartLine} title="Enrollments" value={platformStats?.totalEnrollments || 0}
                trend="↑ 8% increase" trendColor={colors.warning}
                isDark={isDark} colors={colors} progress={68} subtitle="Completion rate"
            />
          </div>
        )}

        {/* 3. DASHBOARD COLUMNS */}
        <div style={styles.gridMain}>
            
            {/* COLUMN LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Pending Approvals */}
                <div className="glass-card" style={{ background: colors.card, border: colors.border }}>
                    <div style={styles.cardHeader}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.warning }}>
                            <FaExclamationCircle /> Pending Approvals
                            <span className="badge-count">{pendingApplications.length}</span>
                        </h3>
                        <Link to="/admin/approvals" className="link-hover" style={{ color: colors.warning }}>View All &rarr;</Link>
                    </div>

                    <div className="scroll-container" style={{ maxHeight: '350px' }}>
                        {loadingApps ? (
                            <div style={{ textAlign: 'center', padding: '20px', color: colors.secondary }}>
                                <FaSync className="spin" /> Loading...
                            </div>
                        ) : pendingApplications.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px', color: colors.secondary }}>
                                <FaCheckCircle size={24} style={{ marginBottom: '10px', color: colors.success }} />
                                <p>All caught up!</p>
                            </div>
                        ) : (
                            pendingApplications.map(app => (
                                <div key={app.id} className="list-item-pro" style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div className="avatar-placeholder" style={{ background: `linear-gradient(135deg, ${colors.warning}, #f59e0b)` }}>
                                            {app.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '14px' }}>{app.name}</h4>
                                            <p style={{ margin: 0, fontSize: '12px', color: colors.secondary }}>{app.roleId} • {new Date(app.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => updateStatus(app.id, 'Approved')} className="btn-icon btn-success" title="Approve">✓</button>
                                        <button onClick={() => updateStatus(app.id, 'Rejected')} className="btn-icon btn-danger" title="Reject">✕</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* System Performance */}
                <div className="glass-card" style={{ background: colors.card, border: colors.border }}>
                    <div style={styles.cardHeader}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.info }}>
                            <FaCogs /> System Health
                        </h3>
                    </div>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <PerformanceMetric title="Server Uptime" value={systemMetrics.uptime.toFixed(1)} target={100} unit="%" color={colors.success} isDark={isDark} />
                        <PerformanceMetric title="Response Time" value={Math.round(systemMetrics.responseTime)} target={300} unit="ms" color={systemMetrics.responseTime < 200 ? colors.success : colors.warning} isDark={isDark} />
                        <PerformanceMetric title="CPU Load" value={Math.round(systemMetrics.serverLoad)} target={100} unit="%" color={systemMetrics.serverLoad > 80 ? colors.danger : colors.accent} isDark={isDark} />
                    </div>
                </div>
            </div>

            {/* COLUMN RIGHT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Quick Actions */}
                <div className="glass-card" style={{ background: colors.card, border: colors.border }}>
                    <div style={styles.cardHeader}>
                        <h3>Quick Actions</h3>
                    </div>
                    <div style={styles.grid2}>
                        <Link to="/admin/users" className="quick-btn">
                            <FaUsers /> Users
                        </Link>
                        <Link to="/admin/instructors" className="quick-btn">
                            <FaUserPlus /> Instructors
                        </Link>
                        <Link to="/admin/reports" className="quick-btn">
                            <FaChartLine /> Reports
                        </Link>
                        <Link to="/admin/pyq" className="quick-btn primary-btn">
                            <FaFileUpload /> Upload PYQ
                        </Link>
                    </div>
                </div>

                {/* Top Courses */}
                <div className="glass-card" style={{ background: colors.card, border: colors.border }}>
                     <div style={styles.cardHeader}>
                        <h3>Top Courses</h3>
                    </div>
                    {topCourses.map((course, idx) => (
                        <div key={idx} className="course-row">
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                <div className="rank-badge">{idx + 1}</div>
                                <div>
                                    <div style={{fontWeight: 600, fontSize: '14px'}}>{course.name}</div>
                                    <div style={{fontSize: '12px', color: colors.secondary}}>{course.instructor}</div>
                                </div>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <div style={{color: colors.success, fontWeight: '700', fontSize: '13px'}}>{course.revenue}</div>
                                <div style={{fontSize: '12px', color: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap:'4px'}}>
                                    <FaStar color="#f59e0b" size={10}/> {course.rating}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                 {/* Recent Activity */}
                 <div className="glass-card" style={{ background: colors.card, border: colors.border }}>
                    <div style={styles.cardHeader}>
                        <h3>Live Activity</h3>
                    </div>
                    <div className="activity-feed">
                        {recentActivities.map((act, i) => (
                            <div key={i} className="activity-item">
                                <div className={`dot ${act.priority}`}></div>
                                <div style={{flex: 1}}>
                                    <p style={{margin: 0, fontSize: '13px', fontWeight: 500}}>{act.message}</p>
                                    <span style={{fontSize: '11px', color: colors.secondary}}>{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}

/* ✅ CSS-in-JS Styles Object for Layout */
const styles = {
    contentWrapper: { maxWidth: "1350px", margin: "0 auto", padding: "20px" },
    banner: { padding: "30px", borderRadius: "24px", marginBottom: "40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" },
    grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "40px" },
    gridMain: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid rgba(100,116,139, 0.1)" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
};

/* 🎨 Advanced CSS Injection */
const advancedStyles = `
  /* General Animations */
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
  @keyframes grow { from { width: 0; } to { width: 100%; } }

  /* Glassmorphism Utilities */
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .glass-card {
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    overflow: hidden;
  }
  .glass-card:hover { transform: translateY(-4px); }

  /* Typography */
  .gradient-text {
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
  }

  /* Stat Cards */
  .stat-card-pro {
    border-radius: 20px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  .stat-card-pro:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  .icon-glow { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }

  /* Progress Bars */
  .progress-bar-animated { height: 100%; border-radius: 4px; animation: grow 1.5s ease-out forwards; }

  /* Quick Action Buttons */
  .quick-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px;
    border-radius: 16px;
    font-weight: 600;
    text-decoration: none;
    color: inherit;
    background: rgba(148, 163, 184, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    font-size: 14px;
  }
  .quick-btn:hover { background: rgba(148, 163, 184, 0.2); transform: translateY(-2px); }
  
  /* Primary Button "Shine" Effect */
  .quick-btn.primary-btn {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  }
  .quick-btn.primary-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
    transform: skewX(-20deg);
    animation: shine 3s infinite;
  }

  /* List Items (Approvals) */
  .list-item-pro {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px; border-radius: 12px; margin-bottom: 10px;
    background: rgba(255,255,255,0.02);
    transition: transform 0.2s;
  }
  .list-item-pro:hover { transform: translateX(4px); background: rgba(255,255,255,0.04); }
  
  .avatar-placeholder { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

  /* Action Icons */
  .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: all 0.2s; }
  .btn-success { background: rgba(16, 185, 129, 0.1); color: #10b981; }
  .btn-success:hover { background: #10b981; color: white; transform: scale(1.1); }
  .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
  .btn-danger:hover { background: #ef4444; color: white; transform: scale(1.1); }

  /* Status Badges & Pills */
  .status-pill { padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .badge-count { background: #f59e0b; color: white; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; }
  
  /* Activity Feed */
  .activity-item { display: flex; align-items: center; gap: 15px; padding: 12px 0; border-bottom: 1px solid rgba(148, 163, 184, 0.1); }
  .activity-item:last-child { border-bottom: none; }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot.high { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
  .dot.medium { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
  .dot.low { background: #10b981; box-shadow: 0 0 8px #10b981; }

  /* Top Courses */
  .course-row { display: flex; justify-content: space-between; align-items: center; padding: 14px; border-radius: 12px; margin-bottom: 8px; background: rgba(0,0,0,0.02); transition: 0.2s; }
  .course-row:hover { background: rgba(0,0,0,0.04); transform: scale(1.01); }
  .rank-badge { width: 28px; height: 28px; background: #3b82f6; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }

  /* Floating Animations */
  .floating-icon { animation: float 3s ease-in-out infinite; }
  .spin { animation: spin 1s linear infinite; }
  
  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
  
  @media (max-width: 768px) {
    .grid-main { grid-template-columns: 1fr; }
    .grid2 { grid-template-columns: 1fr; }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = advancedStyles;
  document.head.appendChild(styleSheet);
}

export default AdminDashboard;