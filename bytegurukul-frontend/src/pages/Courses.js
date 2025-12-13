import React, { useState, useEffect } from "react";
import { useCourse } from "../contexts/CourseContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const { enrollInCourse, isEnrolled } = useCourse();
  const { user } = useAuth();
  const navigate = useNavigate();

  // STATE UPDATED: Replaced mock data with real state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH COURSES FROM BACKEND
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        if (response.data && response.data.success) {
          setCourses(response.data.data);
        } else {
          // Fallback if data structure is different
          console.warn("Unexpected API response structure:", response.data);
          setCourses([]);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      selectedSemester === "all" ||
      course.semester === parseInt(selectedSemester);
    return matchesSearch && matchesSemester;
  });

  const handleEnroll = (course) => {
    if (!user) {
      alert("Please login to enroll in courses");
      navigate("/login");
      return;
    }
    enrollInCourse(course);
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/learn/${courseId}`);
  };

  // Loading State
  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Loading Courses...</h2>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{ ...styles.container, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#ef4444' }}>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} style={styles.demoButton}>Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>AKTU B.Tech CS Courses</h1>
        <p style={styles.subtitle}>
          Learn smarter with structured modules, expert mentors & free access!
        </p>
      </div>

      {/* SEARCH & FILTER */}
      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="🔍 Search by course name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>

      {/* COURSE COUNT */}
      <div style={styles.resultsInfo}>
        Showing <strong>{filteredCourses.length}</strong> of{" "}
        {courses.length} courses
      </div>

      {/* COURSES GRID */}
      <div style={styles.coursesGrid}>
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);
          return (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.cardHeader}>
                <div style={styles.thumbnail}>{course.thumbnail}</div>
                <div style={styles.courseInfo}>
                  <h3 style={styles.courseName}>{course.name}</h3>
                  <div style={styles.metaTags}>
                    <span style={styles.levelTag}>{course.level}</span>
                    <span style={styles.semTag}>
                      Sem {course.semester}
                    </span>
                    <span style={styles.freeTag}>FREE</span>
                  </div>
                </div>
              </div>

              <p style={styles.description}>{course.description}</p>

              <div style={styles.courseStats}>
                <span>📚 {course.modules} Modules</span>
                <span>🎥 {course.lessons} Lessons</span>
              </div>

              <div style={styles.instructor}>
                👨‍🏫 {course.instructor}
              </div>

              <div style={styles.actions}>
                <Link to={`/courses/${course.id}`} style={styles.link}>
                  <button style={styles.detailButton}>View Details</button>
                </Link>
                {enrolled ? (
                  <button
                    style={styles.continueButton}
                    onClick={() => handleContinueLearning(course.id)}
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button
                    style={styles.enrollButton}
                    onClick={() => handleEnroll(course)}
                  >
                    Enroll Now
                  </button>
                )}
              </div>

              {enrolled && <div style={styles.enrolledBadge}>✅ Enrolled</div>}
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div style={styles.noResults}>
          <h3>No Courses Found</h3>
          <p>Try adjusting your search or semester filter</p>
        </div>
      )}
    </div>
  );
}

/* 🎨 ByteGurukul Course Styles */
const styles = {
  container: {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
  },
  header: { textAlign: "center", marginBottom: "40px" },
  title: {
    color: "#2563eb",
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "10px",
  },
  subtitle: { color: "#475569", fontSize: "18px" },
  searchSection: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },
  searchBox: { width: "400px", maxWidth: "100%" },
  searchInput: {
    width: "100%",
    padding: "12px 15px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    color: "#1e293b",
    backgroundColor: "white",
    transition: "all 0.3s ease",
  },
  filterSelect: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    background: "white",
    color: "#1e293b",
    fontWeight: "500",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  resultsInfo: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#475569",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "25px",
    maxWidth: "1300px",
    margin: "0 auto",
  },
  courseCard: {
    background: "white",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
  },
  cardHeader: { display: "flex", gap: "15px", marginBottom: "15px" },
  thumbnail: { fontSize: "42px" },
  courseInfo: { flex: 1 },
  courseName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "5px",
  },
  metaTags: { display: "flex", gap: "8px", flexWrap: "wrap" },
  levelTag: {
    background: "#dbeafe",
    color: "#2563eb",
    padding: "3px 8px",
    borderRadius: "8px",
    fontSize: "12px",
  },
  semTag: {
    background: "#f3e8ff",
    color: "#9333ea",
    padding: "3px 8px",
    borderRadius: "8px",
    fontSize: "12px",
  },
  freeTag: {
    background: "#dcfce7",
    color: "#15803d",
    padding: "3px 8px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
  },
  description: {
    color: "#475569",
    fontSize: "14px",
    marginBottom: "10px",
    lineHeight: "1.6",
  },
  courseStats: {
    display: "flex",
    justifyContent: "space-between",
    color: "#64748b",
    fontSize: "13px",
  },
  instructor: { color: "#475569", fontSize: "14px" },
  actions: { display: "flex", gap: "10px", marginTop: "10px" },
  link: { flex: 1 },
  detailButton: {
    width: "100%",
    padding: "10px",
    border: "2px solid #2563eb",
    background: "transparent",
    color: "#2563eb",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  enrollButton: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  continueButton: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(90deg, #16a34a, #22c55e)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  enrolledBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "#16a34a",
    color: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  noResults: { textAlign: "center", marginTop: "40px", color: "#64748b" },
};

/* ✨ Hover Effects */
const hoverStyle = `
  @media (hover: hover) {
    input:focus, select:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
    }
    .course-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(37,99,235,0.15);
    }
    button:hover {
      opacity: 0.9;
    }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Courses;