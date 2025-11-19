import React from "react";

function Privacy() {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Privacy Policy 🔒</h1>
        <p style={styles.subtitle}>
          Last Updated: <strong>November 2025</strong>
        </p>
      </section>

      <section style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.heading}>1. Introduction</h2>
          <p style={styles.text}>
            Welcome to <strong>ByteGurukul</strong>. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, and protect your personal
            information when you use our website, courses, and learning resources.
          </p>

          <h2 style={styles.heading}>2. Information We Collect</h2>
          <ul style={styles.list}>
            <li>
              <strong>Personal Information:</strong> Name, email, and contact details when
              you sign up or contact us.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, course progress, and interaction
              details for improving your experience.
            </li>
            <li>
              <strong>Device Information:</strong> Browser type, operating system, and IP
              address for analytics and security.
            </li>
          </ul>

          <h2 style={styles.heading}>3. How We Use Your Information</h2>
          <ul style={styles.list}>
            <li>To provide and improve our courses and learning materials.</li>
            <li>To send important updates, newsletters, and course recommendations.</li>
            <li>To ensure the security of your account and platform data.</li>
            <li>To respond to your queries and technical support requests.</li>
          </ul>

          <h2 style={styles.heading}>4. Data Security</h2>
          <p style={styles.text}>
            We take data protection seriously. Your personal data is stored securely with
            encryption and limited access. However, please note that no online platform
            can guarantee absolute security.
          </p>

          <h2 style={styles.heading}>5. Cookies & Tracking</h2>
          <p style={styles.text}>
            We use cookies to enhance user experience, remember your preferences, and
            analyze traffic patterns. You can disable cookies in your browser settings.
          </p>

          <h2 style={styles.heading}>6. Third-Party Services</h2>
          <p style={styles.text}>
            We may use third-party tools (e.g., Google Analytics) for analytics and
            performance improvement. These services may collect data according to their
            own privacy policies.
          </p>

          <h2 style={styles.heading}>7. Your Rights</h2>
          <ul style={styles.list}>
            <li>Access and review your personal information.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Opt-out of newsletters and marketing emails anytime.</li>
          </ul>

          <h2 style={styles.heading}>8. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions or concerns regarding this Privacy Policy, please
            contact us at:
          </p>
          <p style={styles.contact}>
            📧 <strong>abhijeet.kr.pandey.07@gmail.com</strong>
            <br />
            📍 Deoria, Uttar Pradesh, India 🇮🇳
          </p>

          <h2 style={styles.heading}>9. Policy Updates</h2>
          <p style={styles.text}>
            We may update this Privacy Policy from time to time to reflect changes in our
            practices. The updated version will be available on this page.
          </p>
        </div>
      </section>
    </div>
  );
}

/* 🎨 ByteGurukul Privacy Page Styles */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    padding: "60px 20px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "800",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#dbeafe",
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    marginTop: "25px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#e2e8f0",
  },
  list: {
    marginLeft: "20px",
    color: "#e2e8f0",
    fontSize: "15px",
    lineHeight: "1.8",
  },
  contact: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#f0f9ff",
    lineHeight: "1.6",
  },
};

/* ✨ Hover and animation effects */
const hoverStyles = `
  h2:hover {
    color: #bfdbfe;
    transform: translateX(5px);
    transition: all 0.3s ease;
  }
  li:hover {
    color: #ffffff;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Privacy;
