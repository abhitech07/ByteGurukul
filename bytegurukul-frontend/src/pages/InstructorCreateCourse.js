import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InstructorNavbar from "../components/instructor/InstructorNavbar";
import { useAuth } from "../contexts/AuthContext"; // Auth context for token (if stored there) or verify localStorage

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

  const [thumbnailFile, setThumbnailFile] = useState(null); // Stores the actual file
  const [previewUrl, setPreviewUrl] = useState(null); // Stores the preview URL
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Create FormData object (Required for file uploads)
    const data = new FormData();
    data.append("title", formData.title);
    data.append("code", formData.code);
    data.append("category", formData.category);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("level", formData.level);
    data.append("description", formData.description);
    
    if (thumbnailFile) {
      data.append("thumbnail", thumbnailFile); // 'thumbnail' matches upload.single('thumbnail') in backend
    }

    try {
      // 2. Send to Backend
      const token = localStorage.getItem('token') || ""; // Get Token from storage
      
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': token, // Send Token
          // Note: Do NOT set 'Content-Type': 'multipart/form-data' manually. Fetch does it automatically.
        },
        body: data
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Course created successfully!");
        navigate("/instructor/courses");
      } else {
        alert("❌ Error: " + result.message);
      }

    } catch (error) {
      console.error("Error creating course:", error);
      alert("❌ Server Error. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <div style={{ height: "75px" }} />

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

          <div style={styles.row}>
             <div style={{flex: 1}}>
                <label style={styles.label}>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} style={styles.select}>
                    <option>Programming</option>
                    <option>Data Science</option>
                    <option>Cyber Security</option>
                    <option>AI & ML</option>
                    <option>Cloud Computing</option>
                </select>
             </div>
             <div style={{flex: 1}}>
                <label style={styles.label}>Level</label>
                <select name="level" value={formData.level} onChange={handleChange} style={styles.select}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
             </div>
          </div>

          <div style={styles.row}>
            <div style={{flex: 1}}>
                <label style={styles.label}>Duration (weeks)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 4" style={styles.input} required />
            </div>
            <div style={{flex: 1}}>
                <label style={styles.label}>Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 499" style={styles.input} required />
            </div>
          </div>

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
            <button type="submit" style={styles.createButton} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div style={styles.previewCard}>
          <h3 style={styles.previewTitle}>Live Preview</h3>
          <div style={styles.courseCard}>
            <div style={styles.thumbnailWrapper}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={styles.thumbnail} />
              ) : (
                <div style={styles.placeholder}>📷 No Image</div>
              )}
            </div>
            <div style={styles.cardBody}>
              <h4>{formData.title || "Course Title"}</h4>
              <p style={styles.descPreview}>{formData.description || "Course description will appear here."}</p>
              <div style={styles.metaTags}>
                 <span style={styles.tag}>{formData.category}</span>
                 <span style={styles.tag}>{formData.level}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center'}}>
                 <span style={{fontSize: '14px', color: '#64748b'}}>⏳ {formData.duration || "0"} Weeks</span>
                 <h4 style={{ color: "#2563eb", margin: 0 }}>₹ {formData.price || "0"}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🌈 Styles */
const styles = {
  page: { background: "linear-gradient(145deg, #f8fafc, #eef2ff)", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Poppins', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  title: { fontSize: 28, fontWeight: 700, color: "#1e293b" },
  backButton: { textDecoration: "none", background: "#2563eb", color: "white", padding: "8px 16px", borderRadius: 8 },
  formGrid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px", alignItems: "flex-start" },
  form: { background: "white", borderRadius: 16, padding: 20, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
  label: { fontWeight: 600, color: "#334155", marginTop: 10, display: 'block', marginBottom: '5px' },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, marginBottom: 10, boxSizing: 'border-box' },
  select: { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, marginBottom: 10, boxSizing: 'border-box' },
  textarea: { width: "100%", border: "1px solid #cbd5e1", borderRadius: 8, padding: "10px 12px", marginBottom: 10, boxSizing: 'border-box' },
  fileInput: { marginBottom: 15 },
  row: { display: 'flex', gap: '15px' },
  buttonRow: { display: "flex", justifyContent: "space-between", marginTop: 15 },
  cancelButton: { background: "#e5e7eb", border: "none", padding: "10px 18px", borderRadius: 8, cursor: "pointer", color: "#1e293b" },
  createButton: { background: "linear-gradient(135deg, #2563eb, #9333ea)", color: "white", padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 },
  previewCard: { background: "white", borderRadius: 16, padding: 20, boxShadow: "0 6px 20px rgba(0,0,0,0.1)", position: 'sticky', top: '20px' },
  previewTitle: { fontSize: 18, marginBottom: 10 },
  courseCard: { border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" },
  thumbnailWrapper: { height: "160px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" },
  placeholder: { color: "#94a3b8" },
  thumbnail: { width: "100%", height: "160px", objectFit: "cover" },
  cardBody: { padding: 15, fontSize: 14 },
  descPreview: { color: '#64748b', fontSize: '13px', margin: '5px 0 15px' },
  metaTags: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tag: { background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }
};

export default InstructorCreateCourse;