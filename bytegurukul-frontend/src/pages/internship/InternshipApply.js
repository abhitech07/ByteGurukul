// src/pages/internship/InternshipApply.js
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import InternshipNavbar from "../../components/internship/InternshipNavbar";

export default function InternshipApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    resumeText: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const validate = () => form.name && form.email && form.phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return alert("Please fill name, email and phone.");
    setSubmitting(true);

    // mock submit delay
    setTimeout(() => {
      setSubmitting(false);
      // ideally send to API, then navigate to success with application id
      navigate("/internship/application-success", { state: { appId: `APP-${Date.now()}`, openingId: id }});
    }, 900);
  };

  return (
    <div style={styles.page}>
      <InternshipNavbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Apply for Internship</h1>
            <p style={styles.subtitle}>Fill your details and attach resume (paste text for demo).</p>
          </div>
          <Link to="/internship" style={styles.back}>← Back to open roles</Link>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" style={styles.input} />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={styles.input} />
          </div>
          <div style={styles.row}>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" style={styles.input} />
            <input name="university" value={form.university} onChange={handleChange} placeholder="University / College" style={styles.input} />
          </div>

          <textarea name="resumeText" value={form.resumeText} onChange={handleChange} placeholder="Paste your resume / summary" style={styles.textarea} />

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button type="submit" disabled={submitting} style={styles.primaryBtn}>
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
            <Link to="/internship/status" style={styles.ghostBtn}>View My Applications</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" },
  container: { padding: "28px 22px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  title: { margin: 0, fontSize: 22 },
  subtitle: { margin: "6px 0 0", color: "#64748b" },
  back: { color: "#2563eb", textDecoration: "none" },
  form: { background: "white", padding: 18, borderRadius: 12, boxShadow: "0 8px 26px rgba(2,6,23,0.04)", maxWidth: 900 },
  row: { display: "flex", gap: 12, marginBottom: 12 },
  input: { flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #e6eef8" },
  textarea: { width: "100%", padding: "12px", minHeight: 140, borderRadius: 8, border: "1px solid #e6eef8" },
  primaryBtn: { background: "#2563eb", color: "white", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 },
  ghostBtn: { border: "1px solid #e6eef8", color: "#2563eb", padding: "10px 12px", borderRadius: 8, textDecoration: "none" },
};