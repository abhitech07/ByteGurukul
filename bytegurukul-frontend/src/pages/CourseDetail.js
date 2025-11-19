import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourse } from "../contexts/CourseContext";
import { useAuth } from "../contexts/AuthContext";
import {
  FaUserGraduate,
  FaClock,
  FaStar,
  FaBookOpen,
  FaLaptopCode,
  FaCertificate,
} from "react-icons/fa";

function CourseDetail() {
  const { courseId } = useParams();
  const { enrollInCourse, isEnrolled } = useCourse();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock Data (Replace with API later)
  const course = {
    id: "ds-101",
    name: "Data Structures & Algorithms",
    code: "KCS301",
    semester: 3,
    credits: 4,
    instructor: "Dr. Rajesh Sharma",
    icon: "🧠",
    domain: "Programming",
    description:
      "Master data structures and algorithms to ace interviews and build efficient solutions.",
    duration: "8 weeks",
    level: "Beginner",
    lessons: 24,
    rating: 4.8,
    students: 1250,
    price: 0,
    learningOutcomes: [
      "Understand time and space complexity analysis",
      "Implement arrays, linked lists, stacks, and queues",
      "Master tree and graph data structures",
      "Learn sorting and searching algorithms",
      "Solve complex algorithmic problems",
      "Prepare for technical interviews",
    ],
    syllabus: [
      {
        module: 1,
        title: "Introduction to Data Structures",
        topics: ["Time Complexity", "Big O Notation", "Space Complexity"],
      },
      {
        module: 2,
        title: "Linear Data Structures",
        topics: ["Arrays", "Linked Lists", "Stacks", "Queues"],
      },
      {
        module: 3,
        title: "Trees & Graphs",
        topics: ["Tree Traversals", "Binary Search Trees", "BFS & DFS"],
      },
    ],
  };

  const enrolled = isEnrolled(courseId);

  const handleEnroll = () => {
    if (!user) {
      alert("Please login to enroll in this course");
      navigate("/login");
      return;
    }
    enrollInCourse(course);
    navigate(`/learn/${courseId}`);
  };

  return (
    <div style={styles.container}>
      {/* ---------- HERO SECTION ---------- */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <h1 style={styles.courseTitle}>{course.name}</h1>
            <p style={styles.courseSubtitle}>{course.description}</p>
            <div style={styles.courseMeta}>
              <span>
                <FaUserGraduate /> {course.students}+ Students
              </span>
              <span>
                <FaClock /> {course.duration}
              </span>
              <span>
                <FaStar color="#fbbf24" /> {course.rating}
              </span>
            </div>
            <div style={styles.buttonRow}>
              {enrolled ? (
                <button style={styles.continueBtn} onClick={() => navigate(`/learn/${courseId}`)}>
                  Continue Learning
                </button>
              ) : (
                <button style={styles.enrollBtn} onClick={handleEnroll}>
                  Enroll Now {course.price === 0 ? "• FREE" : `• ₹${course.price}`}
                </button>
              )}
              <Link to="/courses" style={styles.secondaryBtn}>
                ← Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- COURSE DETAILS ---------- */}
      <section style={styles.detailsSection}>
        <div style={styles.contentGrid}>
          {/* Left Column */}
          <div style={styles.leftCol}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>📘 What You'll Learn</h2>
              <ul style={styles.learningList}>
                {course.learningOutcomes.map((point, i) => (
                  <li key={i} style={styles.learningItem}>
                    ✅ {point}
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🗂 Course Syllabus</h2>
              {course.syllabus.map((mod) => (
                <div key={mod.module} style={styles.moduleCard}>
                  <h3 style={styles.moduleTitle}>
                    Module {mod.module}: {mod.title}
                  </h3>
                  <ul>
                    {mod.topics.map((topic, i) => (
                      <li key={i} style={styles.topicItem}>
                        • {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightCol}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🎓 Course Info</h3>
              <p><FaBookOpen /> Level: {course.level}</p>
              <p><FaLaptopCode /> Lessons: {course.lessons}</p>
              <p><FaCertificate /> Certificate: Yes</p>
              <p><FaUserGraduate /> Instructor: {course.instructor}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>💡 Course Highlights</h3>
              <ul style={styles.highlightsList}>
                <li>🎥 HD Video Lectures</li>
                <li>📚 Downloadable Notes</li>
                <li>💬 Student Discussion Forum</li>
                <li>🏆 Certificate of Completion</li>
                <li>💻 24/7 Access Anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f9fafb",
    color: "#1e293b",
  },
  heroSection: {
    position: "relative",
    backgroundImage: "url('/course-banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "380px",
    color: "white",
  },
  heroOverlay: {
    background: "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(147,51,234,0.9))",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "center",
  },
  heroContent: { maxWidth: "800px" },
  courseTitle: { fontSize: "42px", fontWeight: "800", marginBottom: "10px" },
  courseSubtitle: { fontSize: "18px", color: "#e0e7ff", marginBottom: "25px" },
  courseMeta: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    fontSize: "16px",
    color: "#bfdbfe",
    marginBottom: "30px",
  },
  buttonRow: { display: "flex", gap: "15px", justifyContent: "center" },
  enrollBtn: {
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    border: "none",
    padding: "14px 32px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 8px 20px rgba(96,165,250,0.3)",
  },
  continueBtn: {
    background: "linear-gradient(90deg, #34d399, #059669)",
    border: "none",
    padding: "14px 32px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(52,211,153,0.3)",
  },
  secondaryBtn: {
    background: "transparent",
    border: "2px solid white",
    padding: "12px 28px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s",
  },
  detailsSection: { padding: "80px 40px" },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: "25px" },
  rightCol: { display: "flex", flexDirection: "column", gap: "25px" },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  cardTitle: { fontSize: "22px", fontWeight: "700", marginBottom: "15px", color: "#1e3a8a" },
  learningList: { paddingLeft: "20px", color: "#475569" },
  learningItem: { marginBottom: "8px" },
  moduleCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    padding: "15px 20px",
    marginBottom: "15px",
  },
  moduleTitle: { fontSize: "16px", fontWeight: "600", color: "#334155" },
  topicItem: { color: "#475569", fontSize: "14px", marginLeft: "10px" },
  highlightsList: { listStyle: "none", paddingLeft: 0, color: "#475569" },
};

/* Hover Animations */
const hoverStyles = `
  button:hover, a:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(147,197,253,0.3);
  }

  .moduleCard:hover {
    background-color: #e0f2fe;
    transform: translateY(-2px);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default CourseDetail;
