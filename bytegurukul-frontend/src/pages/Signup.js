import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("⚠️ Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupCard}>
        <h1 style={styles.title}>Create Your ByteGurukul Account</h1>
        <p style={styles.subtitle}>
          Join the community of learners and innovators 🚀
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <FaUserAlt style={styles.icon} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Role Selection */}
          <div style={styles.roleGroup}>
            <label style={styles.roleLabel}>I am a</label>
            <div style={styles.roleOptions}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleChange}
                  style={styles.radio}
                />
                <FaUserGraduate /> Student
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={formData.role === "instructor"}
                  onChange={handleChange}
                  style={styles.radio}
                />
                <FaUserTie /> Instructor
              </label>
            </div>
          </div>

          {/* Terms */}
          <label style={styles.checkboxLabel}>
            <input type="checkbox" required />
            I agree to the{" "}
            <a href="/terms" style={styles.link}>
              Terms & Conditions
            </a>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.signupButton,
              ...(isLoading ? styles.loadingButton : {}),
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

/* 🌈 Modern UI Styles */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },
  signupCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(14px)",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "420px",
    width: "100%",
    color: "white",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#dbeafe",
    marginBottom: "25px",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "10px 15px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "15px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "12px 15px 12px 40px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  },
  inputFocus: {
    borderColor: "#60a5fa",
    boxShadow: "0 0 8px rgba(96,165,250,0.5)",
  },
  roleGroup: { textAlign: "center", marginTop: "10px" },
  roleLabel: { fontSize: "14px", color: "#cbd5e1" },
  roleOptions: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginTop: "10px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#e2e8f0",
    cursor: "pointer",
  },
  radio: { margin: 0 },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#cbd5e1",
    marginTop: "10px",
  },
  signupButton: {
    padding: "12px",
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
    transition: "all 0.3s ease",
  },
  loadingButton: {
    background: "#94a3b8",
    cursor: "not-allowed",
  },
  loginText: {
    textAlign: "center",
    marginTop: "20px",
    color: "#e2e8f0",
    fontSize: "14px",
  },
  link: {
    color: "#93c5fd",
    textDecoration: "none",
    fontWeight: "600",
  },
};

/* Hover & Focus animations */
const hoverStyles = `
  input:focus {
    border-color: #93c5fd !important;
    box-shadow: 0 0 8px rgba(147,197,253,0.6);
  }
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(96,165,250,0.3);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Signup;