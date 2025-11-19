// src/pages/InstructorCreateCourse.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InstructorNavbar from "../components/instructor/InstructorNavbar";

function InstructorCreateCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    category: "Programming",
    duration: "",
    price: "",
    level: "Beginner",
    description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Course created successfully!");
    navigate("/instructor/courses");
  };

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <div style={{ height: "75px" }} /> {/* Space below navbar */}

      <div style={styles.header}>
        <h1 style={styles.title}>🎓 Create New Course</h1>
        <Link to="/instructor/courses" style={styles.backButton}>
          ← Back to Courses
        </Link>
      </div>

      <div style={styles.formGrid}>
        {/* Course Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter course title"
            style={styles.input}
            required
          />

          <label style={styles.label}>Course Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. REACT301"
            style={styles.input}
            required
          />

          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.select}
          >
            <option>Programming</option>
            <option>Data Science</option>
            <option>Cyber Security</option>
            <option>AI & ML</option>
            <option>Cloud Computing</option>
          </select>

          <label style={styles.label}>Duration (weeks)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            style={styles.input}
            required
          />

          <label style={styles.label}>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter course price"
            style={styles.input}
            required
          />

          <label style={styles.label}>Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            style={styles.select}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <label style={styles.label}>Course Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description about your course"
            style={styles.textarea}
            required
          />

          <label style={styles.label}>Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
          />

          <div style={styles.buttonRow}>
            <button type="button" style={styles.cancelButton} onClick={() => navigate("/instructor/courses")}>
              Cancel
            </button>
            <button type="submit" style={styles.createButton}>
              Create Course
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div style={styles.previewCard}>
          <h3 style={styles.previewTitle}>Live Preview</h3>
          <div style={styles.courseCard}>
            <div style={styles.thumbnailWrapper}>
              {thumbnail ? (
                <img src={thumbnail} alt="Preview" style={styles.thumbnail} />
              ) : (
                <div style={styles.placeholder}>📷 No Image</div>
              )}
            </div>
            <div style={styles.cardBody}>
              <h4>{formData.title || "Course Title"}</h4>
              <p>{formData.description || "Course description will appear here."}</p>
              <p>
                <strong>Category:</strong> {formData.category}
              </p>
              <p>
                <strong>Duration:</strong> {formData.duration || "--"} weeks
              </p>
              <p>
                <strong>Level:</strong> {formData.level}
              </p>
              <h4 style={{ color: "#2563eb" }}>₹ {formData.price || "0"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🌈 ByteGurukul Instructor Styling */
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
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#1e293b",
  },
  backButton: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "8px 16px",
    borderRadius: 8,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    alignItems: "flex-start",
  },
  form: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  label: { fontWeight: 600, color: "#334155", marginTop: 10 },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    marginBottom: 10,
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    marginBottom: 10,
  },
  textarea: {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: "10px 12px",
    marginBottom: 10,
  },
  fileInput: { marginBottom: 15 },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelButton: {
    background: "#e5e7eb",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
    color: "#1e293b",
  },
  createButton: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  previewCard: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  previewTitle: { fontSize: 18, marginBottom: 10 },
  courseCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnailWrapper: {
    height: "160px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: { color: "#94a3b8" },
  thumbnail: { width: "100%", height: "160px", objectFit: "cover" },
  cardBody: { padding: 10, fontSize: 14 },
};

export default InstructorCreateCourse;
