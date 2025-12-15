// StudentDashboard.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCourse } from "../contexts/CourseContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import StudentNavbar from "../components/student/StudentNavbar";

function StudentDashboard() {
  const { user, logout } = useAuth();
  
  // 🛡️ SAFETY FIX: prevent crash if contexts are missing
  const courseContext = useCourse();
  const cartContext = useCart();

  // Default values to prevent "cannot read property of undefined" errors
  const enrolledCourses = courseContext?.enrolledCourses || [];
  const completedCourses = courseContext?.completedCourses || [];
  const getOverallProgress = courseContext?.getOverallProgress || (() => 0);
  
  const orders = cartContext?.orders || [];
  const getCartItemsCount = cartContext?.getCartItemsCount || (() => 0);

  const overallProgress = getOverallProgress();
  const enrolledCount = enrolledCourses.length;
  const completedCount = completedCourses.length;

  // Safety check for reduce
  const totalLessons = Array.isArray(enrolledCourses) 
    ? enrolledCourses.reduce((t, c) => t + (c.lessons || 24), 0) 
    : 0;

  const completedLessons = Array.isArray(enrolledCourses) 
    ? enrolledCourses.reduce((t, c) => {
        const progress = c.progress || 0;
        const courseLessons = c.lessons || 24;
        return t + Math.round((progress / 100) * courseLessons);
      }, 0)
    : 0;

  return (
    <div style={styles.container}>
      {/* Navbar handled here */}
      <StudentNavbar />
      
      {/* WELCOME HEADER */}
      <div style={styles.headerCard}>
        <div>
          <h1 style={styles.headerTitle}>
            Welcome back,{" "}
            <span style={styles.highlight}>{user?.name || "Student"}</span> 🎓
          </h1>
          <p style={styles.headerSubtitle}>{user?.email}</p>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* TOP STATS */}
      <div style={styles.overviewGrid}>
        <div style={styles.overviewCard}>
          <h3 style={styles.cardTitle}>Enrolled Courses</h3>
          <p style={styles.cardValue}>{enrolledCount}</p>
        </div>
        <div style={styles.overviewCard}>
          <h3 style={styles.cardTitle}>Completed Courses</h3>
          <p style={styles.cardValue}>{completedCount}</p>
        </div>
        <div style={styles.overviewCard}>
          <h3 style={styles.cardTitle}>Lessons Done</h3>
          <p style={styles.cardValue}>{completedLessons}</p>
        </div>
        <div style={styles.overviewCard}>
          <h3 style={styles.cardTitle}>Overall Progress</h3>
          <p style={styles.cardValue}>{overallProgress}%</p>
        </div>
      </div>

      {/* PROGRESS BAR SECTION */}
      <div style={styles.progressSection}>
        <h2 style={styles.sectionTitle}>Your Learning Journey</h2>

        <div style={styles.progressCard}>
          <div style={styles.progressInfo}>
            <p style={styles.progressText}>
              You’ve completed{" "}
              <strong>{overallProgress}%</strong> of your enrolled courses.
            </p>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${overallProgress}%`,
                }}
              />
            </div>
          </div>

          <div style={styles.circleWrapper}>
            <div style={styles.circle}>
              <span style={styles.circleText}>{overallProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES SECTION */}
      <div style={styles.coursesSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>My Courses</h2>
          <Link to="/courses" style={styles.link}>
            View All →
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyText}>
              You haven’t enrolled in any courses yet.
            </p>
            <Link to="/courses">
              <button style={styles.browseButton}>Browse Courses</button>
            </Link>
          </div>
        ) : (
          <div style={styles.coursesGrid}>
            {enrolledCourses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                style={styles.courseCard}
              >
                <div style={styles.courseHeader}>
                  <div style={styles.courseIcon}>
                    {course.thumbnail || "📘"}
                  </div>
                  <div>
                    <h3 style={styles.courseName}>{course.name}</h3>
                    <p style={styles.courseInstructor}>
                      By {course.instructor}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={styles.progressBox}>
                  <span>
                    Progress: <b>{course.progress || 0}%</b>
                  </span>
                  <div style={styles.courseBar}>
                    <div
                      style={{
                        ...styles.courseFill,
                        width: `${course.progress || 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div style={styles.courseButtons}>
                  <Link
                    to={`/learn/${course.id}`}
                    style={styles.btnPrimary}
                  >
                    {course.progress > 0 ? "Continue" : "Start"}
                  </Link>

                  <Link
                    to={`/courses/${course.id}`}
                    style={styles.btnOutline}
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.actionsSection}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsGrid}>
          <Link to="/courses" style={styles.actionCard}>
            🎓 Browse Courses
          </Link>

          <Link to="/internship" style={styles.actionCard}>
            💼 Find Internships
          </Link>

          <Link to="/projects" style={styles.actionCard}>
            🧠 Buy Projects
            {getCartItemsCount() > 0 && (
              <span style={styles.cartBadge}>
                {getCartItemsCount()}
              </span>
            )}
          </Link>

          <Link to="/student/progress" style={styles.actionCard}>
            📊 My Progress
          </Link>
        </div>
      </div>
    </div>
  );
}

/* 🔥 Updated Student Dashboard Styles */
const styles = {
  container: {
    background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    paddingTop: "10px", // Added small padding so content doesn't touch top
  },
  /* HEADER */
  headerCard: {
    background: "linear-gradient(135deg,#2563eb,#9333ea)",
    padding: "35px 40px",
    color: "white",
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
    marginBottom: 35,
    marginTop: 20,
  },
  headerTitle: { fontSize: 30, fontWeight: 700, margin: 0 },
  highlight: { color: "#facc15" },
  headerSubtitle: { marginTop: 5, opacity: 0.9, fontSize: 16 },

  logoutButton: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
  },

  /* OVERVIEW BOXES */
  overviewGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    marginBottom: 35,
  },
  overviewCard: {
    background: "white",
    borderRadius: 14,
    padding: 25,
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    transition: "0.3s",
  },

  cardTitle: { fontSize: 14, color: "#6b7280", margin: 0 },
  cardValue: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: 700,
    color: "#2563eb",
    margin: "10px 0 0 0",
  },

  /* PROGRESS */
  progressSection: { marginBottom: 50 },
  sectionTitle: { fontSize: 24, fontWeight: 600, marginBottom: 20, color: "#1e293b" },

  progressCard: {
    background: "white",
    borderRadius: 16,
    padding: 30,
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
    flexWrap: "wrap",
  },

  progressInfo: { flex: 1 },
  progressText: { fontSize: 15, color: "#475569", marginBottom: 15 },

  progressBar: {
    width: "100%",
    maxWidth: "400px",
    height: 8,
    background: "#e2e8f0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#2563eb,#9333ea)",
    transition: "width 0.5s ease",
  },

  circleWrapper: { display: "flex", alignItems: "center" },
  circle: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#2563eb,#9333ea)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 22,
    fontWeight: 700,
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
  },
  circleText: { color: "white" },

  /* MY COURSES */
  coursesSection: { marginBottom: 60 },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  link: { color: "#2563eb", textDecoration: "none", fontWeight: 600 },

  coursesGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  },

  courseCard: {
    background: "white",
    borderRadius: 14,
    padding: 25,
    boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
  },

  courseHeader: {
    display: "flex",
    gap: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  courseIcon: { fontSize: 40 },
  courseName: { fontWeight: 600, fontSize: 18, margin: 0, color: "#1e293b" },
  courseInstructor: { color: "#64748b", fontSize: 14, margin: "5px 0 0 0" },

  progressBox: { marginBottom: 15 },

  courseBar: {
    height: 6,
    background: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
  },
  courseFill: {
    height: "100%",
    background: "linear-gradient(90deg,#2563eb,#9333ea)",
  },

  courseButtons: { display: "flex", gap: 10, marginTop: "auto" },

  btnPrimary: {
    flex: 1,
    background: "linear-gradient(90deg,#2563eb,#9333ea)",
    color: "white",
    padding: "10px 0",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 14,
  },
  btnOutline: {
    flex: 1,
    border: "2px solid #e2e8f0",
    padding: "8px 0",
    borderRadius: 8,
    textAlign: "center",
    textDecoration: "none",
    color: "#475569",
    fontWeight: 500,
    transition: "0.3s",
    fontSize: 14,
  },

  /* QUICK ACTIONS */
  actionsSection: { marginBottom: 40 },
  actionsGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  },
  actionCard: {
    position: "relative",
    background: "white",
    borderRadius: 14,
    padding: 30,
    textAlign: "center",
    boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
    textDecoration: "none",
    color: "#1e293b",
    fontSize: 16,
    fontWeight: 600,
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    border: "1px solid #f1f5f9",
  },

  cartBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "#ef4444",
    color: "white",
    padding: "2px 8px",
    fontSize: 12,
    borderRadius: "10px",
    fontWeight: "bold",
  },

  /* EMPTY STATE */
  emptyBox: {
    padding: 50,
    background: "white",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
  },
  emptyText: { fontSize: 16, color: "#475569", marginBottom: 20 },

  browseButton: {
    padding: "12px 22px",
    background: "linear-gradient(90deg,#2563eb,#9333ea)",
    color: "white",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default StudentDashboard;