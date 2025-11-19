// src/pages/student/InternshipApply.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

function InternshipApply() {
  const { user } = useAuth();
  const location = useLocation();
  const internship = location.state?.internship || {};

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    internshipTitle: internship.title || "",
    internshipCategory: internship.category || "",
    resume: null,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Here you'd POST form data to backend
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Apply for Internship</h1>

      {!submitted ? (
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Internship</label>
            <input
              name="internshipTitle"
              value={form.internshipTitle}
              readOnly
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Upload Resume (PDF only)</label>
            <input
              type="file"
              accept="application/pdf"
              name="resume"
              onChange={handleChange}
              required
              style={styles.fileInput}
            />
          </div>

          <div style={styles.field}>
            <label>Why should we select you?</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              style={styles.textarea}
              required
            />
          </div>

          <button style={styles.submitBtn}>Submit Application</button>
          <Link to="/internship" style={styles.backBtn}>
            ← Back
          </Link>
        </form>
      ) : (
        <div style={styles.successBox}>
          <h2>🎉 Application Submitted!</h2>
          <p>We will review your application and update your status soon.</p>
          <Link to="/student/internship/status" style={styles.link}>
            View Application Status →
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    maxWidth: 650,
    margin: "0 auto",
    background: "var(--background)",
    color: "var(--text-primary)",
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: "var(--surface)",
    padding: 20,
    borderRadius: 12,
    boxShadow: "var(--shadow)",
  },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
  },
  textarea: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
  },
  fileInput: {
    padding: 8,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
  },
  submitBtn: {
    padding: 12,
    background: "var(--primary)",
    color: "white",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: 10,
  },
  backBtn: {
    marginTop: 10,
    textDecoration: "none",
    color: "var(--text-secondary)",
  },
  successBox: {
    background: "var(--surface)",
    padding: 25,
    borderRadius: 12,
    textAlign: "center",
  },
  link: { color: "var(--primary)", fontWeight: 600 },
};

export default InternshipApply;
