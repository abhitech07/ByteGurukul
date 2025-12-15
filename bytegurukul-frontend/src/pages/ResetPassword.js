import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      const response = await fetch(`http://localhost:5003/api/auth/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage("✅ Password updated! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError("❌ " + data.message);
      }
    } catch (err) {
      setError("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password 🔑</h2>
        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="New Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={styles.input} required minLength="6" />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={styles.input} required />
          <button type="submit" style={styles.button}>Update Password</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" },
  card: { background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px", textAlign: "center" },
  title: { color: "#1e293b", marginBottom: "20px" },
  input: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "15px", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  success: { color: "green", background: "#dcfce7", padding: "10px", borderRadius: "6px", marginBottom: "15px" },
  error: { color: "red", background: "#fee2e2", padding: "10px", borderRadius: "6px", marginBottom: "15px" }
};

export default ResetPassword;