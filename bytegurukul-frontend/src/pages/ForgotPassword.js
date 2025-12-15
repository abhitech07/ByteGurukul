import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5003/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Reset link sent to your email!");
      } else {
        setError("❌ " + data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password? 🔒</h2>
        <p style={styles.subtitle}>Enter your email and we'll send you a reset link.</p>

        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div style={styles.backLink}>
          <Link to="/login" style={{ color: "#2563eb", textDecoration: "none" }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" },
  card: { background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px", textAlign: "center" },
  title: { color: "#1e293b", marginBottom: "10px" },
  subtitle: { color: "#64748b", fontSize: "14px", marginBottom: "25px" },
  input: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "15px", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "16px" },
  backLink: { marginTop: "20px", fontSize: "14px" },
  success: { color: "green", background: "#dcfce7", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "14px" },
  error: { color: "red", background: "#fee2e2", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "14px" }
};

export default ForgotPassword;