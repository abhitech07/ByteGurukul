import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW FUNCTION FOR SOCIAL LOGIN ---
  const handleSocialLogin = (provider) => {
    // Redirect browser to Backend URL
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <p style={styles.subtitle}>Sign in to continue your learning journey</p>

        {/* Error Message */}
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.remember}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              Remember me
            </label>
            <a href="/forgot" style={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              ...styles.loginButton,
              ...(isLoading ? styles.loadingButton : {}),
            }}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerText}>or continue with</span>
        </div>

        {/* Social Buttons */}
        <div style={styles.socialButtons}>
          <button 
            type="button" 
            style={styles.googleButton}
            onClick={() => handleSocialLogin('google')} // ADDED ONCLICK
          >
            <FaGoogle /> Google
          </button>
          <button 
            type="button" 
            style={styles.githubButton}
            onClick={() => handleSocialLogin('github')} // ADDED ONCLICK
          >
            <FaGithub /> GitHub
          </button>
        </div>

        <div style={styles.signupText}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

/* 🌈 ByteGurukul Modern UI Styles */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },
  loginCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
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
  inputGroup: { position: "relative" },
  icon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
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
  remember: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#e2e8f0",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#cbd5e1",
  },
  checkbox: { margin: 0 },
  forgotLink: {
    color: "#bfdbfe",
    textDecoration: "none",
    fontWeight: "500",
  },
  loginButton: {
    padding: "12px",
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.3s ease",
  },
  loadingButton: {
    background: "#94a3b8",
    cursor: "not-allowed",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "25px 0",
    color: "#cbd5e1",
  },
  dividerText: {
    background: "rgba(255,255,255,0.1)",
    padding: "0 12px",
    borderRadius: "4px",
    fontSize: "13px",
  },
  socialButtons: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  googleButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.3s",
  },
  githubButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.3s",
  },
  signupText: {
    textAlign: "center",
    marginTop: "15px",
    color: "#e2e8f0",
    fontSize: "14px",
  },
  link: {
    color: "#93c5fd",
    textDecoration: "none",
    fontWeight: "600",
  },
};

/* 💫 Hover & Focus Animations */
const hoverStyles = `
  input:focus {
    border-color: #93c5fd !important;
    box-shadow: 0 0 8px rgba(147,197,253,0.6);
  }

  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(147,197,253,0.3);
  }

  .googleButton:hover, .githubButton:hover {
    background: rgba(255,255,255,0.25);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Login;