import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section */}
        <div style={styles.brandSection}>
          <h2 style={styles.brand}>ByteGurukul</h2>
          <p style={styles.desc}>
            Empowering AKTU students with accessible, high-quality learning resources,
            hands-on projects, and professional growth opportunities.
          </p>
          <div style={styles.socialIcons}>
            <a
              href="https://linkedin.com/in/abhitech07"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.iconLink}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/abhitech07"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.iconLink}
            >
              <FaGithub />
            </a>
            <a href="mailto:abhijeet.kr.pandey.07@gmail.com" style={styles.iconLink}>
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div style={styles.linkSection}>
          <h4 style={styles.heading}>Quick Links</h4>
          <a href="/courses" style={styles.link}>
            Courses
          </a>
          <a href="/resources" style={styles.link}>
            Resources
          </a>
          <a href="/projects" style={styles.link}>
            Projects
          </a>
          <a href="/internship" style={styles.link}>
            Internship
          </a>
        </div>

        {/* Right Section */}
        <div style={styles.linkSection}>
          <h4 style={styles.heading}>Support</h4>
          <a href="/help" style={styles.link}>
            Help Center
          </a>
          <a href="/contact" style={styles.link}>
            Contact Us
          </a>
          <a href="/privacy" style={styles.link}>
            Privacy Policy
          </a>
          <a href="/terms" style={styles.link}>
            Terms & Conditions
          </a>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyText}>
          © 2025 <strong>ByteGurukul</strong> — Designed with ❤️ by Abhijeet Kumar Pandey
        </p>
      </div>
    </footer>
  );
}

/* 🎨 Modern Footer Styles */
const styles = {
  footer: {
    background: "linear-gradient(135deg, #1e3a8a, #6d28d9)",
    color: "white",
    padding: "60px 20px 20px",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "40px",
  },
  brandSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  brand: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
  },
  desc: {
    color: "#e0e7ff",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  iconLink: {
    color: "#e0e7ff",
    fontSize: "20px",
    transition: "all 0.3s ease",
  },
  linkSection: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#fff",
  },
  link: {
    color: "#dbeafe",
    textDecoration: "none",
    fontSize: "15px",
    transition: "color 0.3s ease",
  },
  bottomBar: {
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    marginTop: "40px",
    paddingTop: "20px",
  },
  copyText: {
    fontSize: "14px",
    color: "#cbd5e1",
  },
};

/* ✨ Hover Animations */
const hoverStyles = `
  a:hover {
    color: #ffffff !important;
    transform: translateY(-2px);
  }
  a:hover svg {
    color: #60a5fa !important;
    transform: scale(1.2);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Footer;