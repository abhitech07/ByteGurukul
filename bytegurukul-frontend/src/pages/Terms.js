import React from "react";

function Terms() {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Terms & Conditions 📜</h1>
        <p style={styles.subtitle}>
          Last Updated: <strong>November 2025</strong>
        </p>
      </section>

      <section style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.heading}>1. Introduction</h2>
          <p style={styles.text}>
            Welcome to <strong>ByteGurukul</strong>. By accessing or using our website,
            resources, or services, you agree to these Terms and Conditions. Please read
            them carefully before continuing to use our platform.
          </p>

          <h2 style={styles.heading}>2. Use of Our Platform</h2>
          <ul style={styles.list}>
            <li>You must be at least 13 years old to use our platform.</li>
            <li>
              You agree to use ByteGurukul only for lawful educational purposes and not
              for any harmful activities.
            </li>
            <li>
              You may not copy, distribute, or modify our materials without prior written
              consent.
            </li>
          </ul>

          <h2 style={styles.heading}>3. Account Responsibilities</h2>
          <ul style={styles.list}>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>
              ByteGurukul is not liable for any unauthorized access to your account due to
              password sharing or negligence.
            </li>
            <li>
              You must immediately notify us if you suspect unauthorized account access.
            </li>
          </ul>

          <h2 style={styles.heading}>4. Intellectual Property</h2>
          <p style={styles.text}>
            All content available on ByteGurukul—including course materials, images,
            videos, logos, and designs—are protected by copyright laws and belong to
            ByteGurukul or its content creators.
          </p>

          <h2 style={styles.heading}>5. Payment & Refund Policy</h2>
          <p style={styles.text}>
            Certain resources or courses may be paid. Once purchased, payments are
            non-refundable unless explicitly stated. Ensure you review all details before
            purchasing.
          </p>

          <h2 style={styles.heading}>6. Limitation of Liability</h2>
          <p style={styles.text}>
            ByteGurukul strives to provide accurate and up-to-date content. However, we do
            not guarantee the completeness or accuracy of materials. We are not
            responsible for any loss or damage caused by reliance on provided information.
          </p>

          <h2 style={styles.heading}>7. Termination</h2>
          <p style={styles.text}>
            ByteGurukul reserves the right to suspend or terminate user accounts for
            violating our terms, including academic dishonesty, misuse of resources, or
            abusive behavior.
          </p>

          <h2 style={styles.heading}>8. External Links</h2>
          <p style={styles.text}>
            Our platform may include links to third-party websites. We are not responsible
            for their content, privacy policies, or practices.
          </p>

          <h2 style={styles.heading}>9. Changes to Terms</h2>
          <p style={styles.text}>
            ByteGurukul may modify these Terms periodically. Updates will be posted on
            this page with a revised “Last Updated” date.
          </p>

          <h2 style={styles.heading}>10. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions or concerns about these Terms, contact us at:
          </p>
          <p style={styles.contact}>
            📧 <strong>abhijeet.kr.pandey.07@gmail.com</strong>
            <br />
            📍 Deoria, Uttar Pradesh, India 🇮🇳
          </p>
        </div>
      </section>
    </div>
  );
}

/* 🎨 ByteGurukul Terms Page Styles */
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
    backdropFilter: "blur(12px)",
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

/* ✨ Hover & animation effects */
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

export default Terms;
