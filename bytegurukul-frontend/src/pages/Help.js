import React, { useState } from "react";
import { FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaRegSmileBeam } from "react-icons/fa";

function Help() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      q: "How do I access my enrolled courses?",
      a: "Go to your Dashboard after login. All your enrolled courses will appear there.",
    },
    {
      q: "Can I download notes and projects?",
      a: "Yes! Most of our resources are downloadable in PDF and ZIP formats.",
    },
    {
      q: "How do I contact support?",
      a: "You can fill out the support form below or email us at abhijeet.kr.pandey.07@gmail.com.",
    },
    {
      q: "Is ByteGurukul free for all students?",
      a: "Yes! Most of our study materials are completely free. Premium projects may have minimal charges.",
    },
  ];

  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Help & Support 💬</h1>
        <p style={styles.heroSubtitle}>
          We're here to assist you with your learning journey on ByteGurukul.
        </p>
      </section>

      {/* FAQ SECTION */}
      <section style={styles.faqSection}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div style={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div key={index} style={styles.faqCard}>
              <FaQuestionCircle style={styles.faqIcon} />
              <h3 style={styles.faqQuestion}>{faq.q}</h3>
              <p style={styles.faqAnswer}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SUPPORT */}
      <section style={styles.supportSection}>
        <h2 style={styles.sectionTitle}>Need More Help?</h2>
        <p style={styles.supportText}>
          If you still need help, feel free to contact our support team.
        </p>
        {!showForm ? (
          <button style={styles.supportButton} onClick={() => setShowForm(true)}>
            Contact Support
          </button>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <textarea
              name="message"
              placeholder="Describe your issue"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              style={styles.textarea}
            ></textarea>
            <button type="submit" style={styles.submitButton}>
              {submitted ? "Message Sent ✅" : "Submit Request"}
            </button>
          </form>
        )}
        <div style={styles.contactInfo}>
          <p><FaEnvelope /> abhijeet.kr.pandey.07@gmail.com</p>
          <p><FaPhoneAlt /> +91 63865 69211</p>
        </div>
        <div style={styles.thanksNote}>
          <FaRegSmileBeam /> Thank you for learning with ByteGurukul!
        </div>
      </section>
    </div>
  );
}

/* 🎨 Modern ByteGurukul Help Page Styles */
const styles = {
  container: {
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    minHeight: "100vh",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    padding: "60px 20px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },
  heroTitle: {
    fontSize: "42px",
    fontWeight: "700",
  },
  heroSubtitle: {
    fontSize: "18px",
    opacity: 0.9,
    marginTop: "10px",
    color: "#e0e7ff",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "40px",
  },
  faqSection: {
    marginBottom: "80px",
  },
  faqGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  faqCard: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "25px",
    textAlign: "center",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease",
  },
  faqCardHover: {
    transform: "translateY(-5px)",
  },
  faqIcon: {
    fontSize: "30px",
    color: "#60a5fa",
    marginBottom: "10px",
  },
  faqQuestion: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  faqAnswer: {
    fontSize: "15px",
    color: "#f1f5f9",
  },
  supportSection: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "40px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  supportText: {
    marginBottom: "20px",
    color: "#e0e7ff",
  },
  supportButton: {
    padding: "12px 28px",
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    resize: "none",
  },
  submitButton: {
    padding: "12px",
    borderRadius: "10px",
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    color: "white",
    border: "none",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  contactInfo: {
    marginTop: "25px",
    fontSize: "15px",
    color: "#dbeafe",
  },
  thanksNote: {
    marginTop: "15px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#e0f2fe",
  },
};

/* Add hover animations */
const hoverStyles = `
  .faqCard:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(147,197,253,0.3);
  }

  input:focus, textarea:focus {
    border-color: #93c5fd !important;
    box-shadow: 0 0 8px rgba(147,197,253,0.4);
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(147,197,253,0.3);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Help;
