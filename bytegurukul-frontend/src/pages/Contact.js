import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contactCard}>
        <h1 style={styles.title}>Contact ByteGurukul 📩</h1>
        <p style={styles.subtitle}>
          Have questions, suggestions, or collaboration ideas?  
          We’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            style={styles.textarea}
          />

          <button type="submit" style={styles.submitButton}>
            {submitted ? "Message Sent ✅" : "Send Message"}
          </button>
        </form>

        {/* Contact Info Section */}
        <div style={styles.infoSection}>
          <div style={styles.infoItem}>
            <FaMapMarkerAlt style={styles.icon} />
            <p>Deoria, Uttar Pradesh, India 🇮🇳</p>
          </div>
          <div style={styles.infoItem}>
            <FaEnvelope style={styles.icon} />
            <p>abhijeet.kr.pandey.07@gmail.com</p>
          </div>
          <div style={styles.infoItem}>
            <FaPhoneAlt style={styles.icon} />
            <p>📞 +91 63865 69211</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  contactCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "700px",
    color: "white",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "16px",
    color: "#dbeafe",
    marginBottom: "35px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
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
    transition: "0.3s",
  },
  submitButton: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  infoSection: {
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "25px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    fontSize: "15px",
    color: "#f1f5f9",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    color: "#60a5fa",
    fontSize: "18px",
  },
};

/* Add focus & hover animations */
const hoverStyles = `
  input:focus, textarea:focus {
    border-color: #93c5fd !important;
    box-shadow: 0 0 10px rgba(147,197,253,0.5);
  }
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(147,197,253,0.3);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Contact;