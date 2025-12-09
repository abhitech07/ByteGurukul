import React, { useState, useEffect } from "react";
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaClock
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [typingEffect, setTypingEffect] = useState("");

  useEffect(() => {
    const text = "Let's build something amazing together!";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypingEffect(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with animation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 100);
      
      // Reset success message after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      detail: "abhijeet.kr.pandey.07@gmail.com",
      subtext: "We reply within 2 hours",
      color: "#3B82F6",
      action: () => window.location.href = "mailto:abhijeet.kr.pandey.07@gmail.com"
    },
    {
      icon: <FaPhoneAlt />,
      title: "Call Us",
      detail: "+91 63865 69211",
      subtext: "Mon-Fri, 9AM-6PM IST",
      color: "#10B981",
      action: () => window.location.href = "tel:+916386569211"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      detail: "Deoria, Uttar Pradesh",
      subtext: "India 🇮🇳",
      color: "#8B5CF6"
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, label: "LinkedIn", color: "#0A66C2" },
    { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2" },
    { icon: <FaInstagram />, label: "Instagram", color: "#E4405F" },
    { icon: <FaGlobe />, label: "Website", color: "#2563EB" },
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animatedBackground}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingShape,
              animationDelay: `${i * 0.5}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${['#3B82F6', '#8B5CF6', '#EC4899'][i % 3]}, transparent)`,
            }}
          />
        ))}
      </div>

      <div style={styles.contactWrapper}>
        {/* Left Panel - Contact Info */}
        <div style={styles.infoPanel}>
          <div style={styles.infoContent}>
            <h1 style={styles.mainTitle}>
              Let's Connect
              <span style={styles.highlight}>!</span>
            </h1>
            
            <div style={styles.typingContainer}>
              <div style={styles.typingText}>{typingEffect}</div>
              <div style={styles.cursor}>|</div>
            </div>

            <p style={styles.description}>
              Whether you have questions about our courses, want to collaborate, 
              or just want to say hello — we're here to help!
            </p>

            {/* Contact Cards */}
            <div style={styles.contactCards}>
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  style={styles.contactCard}
                  onClick={info.action}
                  className="contact-card-hover"
                >
                  <div style={{...styles.iconWrapper, background: `${info.color}20`}}>
                    <div style={{...styles.icon, color: info.color}}>
                      {info.icon}
                    </div>
                  </div>
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{info.title}</h3>
                    <p style={styles.cardDetail}>{info.detail}</p>
                    <p style={styles.cardSubtext}>{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div style={styles.socialSection}>
              <h3 style={styles.socialTitle}>Follow Us</h3>
              <div style={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    style={{...styles.socialButton, background: `${social.color}20`}}
                    className="social-hover"
                    aria-label={social.label}
                  >
                    <span style={{...styles.socialIcon, color: social.color}}>
                      {social.icon}
                    </span>
                    <span style={styles.socialLabel}>{social.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div style={styles.supportHours}>
              <FaClock style={styles.clockIcon} />
              <div>
                <p style={styles.hoursTitle}>Support Hours</p>
                <p style={styles.hoursDetail}>Monday - Friday: 9AM - 6PM IST</p>
                <p style={styles.hoursSub}>24/7 email support available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <div style={styles.formPanel}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <div style={styles.headerIcon}>
                <FaPaperPlane />
              </div>
              <div>
                <h2 style={styles.formTitle}>Send us a Message</h2>
                <p style={styles.formSubtitle}>Fill out the form below</p>
              </div>
            </div>

            {submitted ? (
              <div style={styles.successMessage}>
                <div style={styles.successIcon}>
                  <FaCheckCircle />
                </div>
                <h3 style={styles.successTitle}>Message Sent Successfully!</h3>
                <p style={styles.successText}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button 
                  style={styles.newMessageButton}
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGrid}>
                  <div style={styles.inputGroup}>
                    <div style={styles.inputIcon}>
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      required
                      style={{
                        ...styles.input,
                        borderColor: activeField === 'name' ? '#3B82F6' : 'rgba(255,255,255,0.2)'
                      }}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <div style={styles.inputIcon}>
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      required
                      style={{
                        ...styles.input,
                        borderColor: activeField === 'email' ? '#3B82F6' : 'rgba(255,255,255,0.2)'
                      }}
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setActiveField('subject')}
                    onBlur={() => setActiveField(null)}
                    required
                    style={{
                      ...styles.input,
                      borderColor: activeField === 'subject' ? '#3B82F6' : 'rgba(255,255,255,0.2)'
                    }}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <div style={styles.textareaIcon}>
                    <FaComment />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    required
                    rows={6}
                    style={{
                      ...styles.textarea,
                      borderColor: activeField === 'message' ? '#3B82F6' : 'rgba(255,255,255,0.2)'
                    }}
                  />
                  <div style={styles.charCount}>
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <button 
                  type="submit" 
                  style={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div style={styles.spinner}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane style={styles.buttonIcon} />
                      Send Message
                    </>
                  )}
                </button>

                <div style={styles.formFooter}>
                  <p style={styles.privacyNote}>
                    Your information is secure and will never be shared with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <button style={styles.floatingButton} aria-label="Quick contact">
        <FaEnvelope style={styles.floatingIcon} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  floatingShape: {
    position: "absolute",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "float 20s infinite linear",
    filter: "blur(20px)",
  },
  contactWrapper: {
    display: "flex",
    maxWidth: "1200px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
    minHeight: "80vh",
  },
  infoPanel: {
    flex: 1,
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  infoContent: {
    maxWidth: "500px",
    margin: "0 auto",
  },
  mainTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "20px",
    lineHeight: 1.2,
  },
  highlight: {
    color: "#60a5fa",
  },
  typingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "30px",
    minHeight: "40px",
  },
  typingText: {
    fontSize: "1.5rem",
    color: "#60a5fa",
    fontFamily: "'JetBrains Mono', monospace",
  },
  cursor: {
    color: "#60a5fa",
    animation: "blink 1s infinite",
  },
  description: {
    fontSize: "1.1rem",
    color: "#cbd5e1",
    lineHeight: 1.6,
    marginBottom: "50px",
  },
  contactCards: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "50px",
  },
  contactCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "24px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  iconWrapper: {
    padding: "16px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: "24px",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  cardDetail: {
    fontSize: "1rem",
    color: "#60a5fa",
    margin: "0 0 4px 0",
    fontWeight: "500",
  },
  cardSubtext: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    margin: 0,
  },
  socialSection: {
    marginBottom: "40px",
  },
  socialTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "20px",
  },
  socialLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  socialIcon: {
    fontSize: "18px",
  },
  socialLabel: {
    color: "#ffffff",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  supportHours: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "24px",
    background: "rgba(96, 165, 250, 0.1)",
    borderRadius: "20px",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },
  clockIcon: {
    fontSize: "32px",
    color: "#60a5fa",
  },
  hoursTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  hoursDetail: {
    fontSize: "0.875rem",
    color: "#cbd5e1",
    margin: "0 0 4px 0",
  },
  hoursSub: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    margin: 0,
  },
  formPanel: {
    flex: 1,
    padding: "60px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    maxWidth: "500px",
    width: "100%",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  headerIcon: {
    fontSize: "2.5rem",
    color: "#60a5fa",
    background: "rgba(96, 165, 250, 0.1)",
    padding: "20px",
    borderRadius: "20px",
  },
  formTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  formSubtitle: {
    fontSize: "1rem",
    color: "#94a3b8",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  inputGroup: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "1rem",
    zIndex: 1,
  },
  input: {
    width: "100%",
    padding: "18px 20px 18px 48px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
  },
  textareaIcon: {
    position: "absolute",
    left: "16px",
    top: "20px",
    color: "#94a3b8",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "20px 20px 20px 48px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
  },
  charCount: {
    textAlign: "right",
    fontSize: "0.75rem",
    color: "#94a3b8",
    marginTop: "8px",
  },
  submitButton: {
    padding: "20px",
    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
    border: "none",
    borderRadius: "16px",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.3s ease",
  },
  buttonIcon: {
    fontSize: "1.25rem",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  formFooter: {
    textAlign: "center",
    marginTop: "20px",
  },
  privacyNote: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    margin: 0,
  },
  successMessage: {
    textAlign: "center",
    padding: "40px 20px",
  },
  successIcon: {
    fontSize: "4rem",
    color: "#10B981",
    marginBottom: "24px",
  },
  successTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 16px 0",
  },
  successText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    marginBottom: "32px",
    lineHeight: 1.6,
  },
  newMessageButton: {
    padding: "16px 32px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  floatingButton: {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    border: "none",
    borderRadius: "50%",
    color: "#ffffff",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  floatingIcon: {
    animation: "pulse 2s infinite",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .contact-card-hover:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .social-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  input:focus, textarea:focus {
    background: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3) !important;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ::selection {
    background: rgba(96, 165, 250, 0.3);
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(96, 165, 250, 0.7);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .contact-wrapper {
      flex-direction: column;
    }
    
    .info-panel, .form-panel {
      width: 100%;
    }
    
    .form-grid {
      grid-template-columns: 1fr !important;
    }
    
    .main-title {
      font-size: 2.5rem !important;
    }
  }

  @media (max-width: 768px) {
    .contact-wrapper {
      border-radius: 20px;
    }
    
    .info-panel, .form-panel {
      padding: 40px 20px !important;
    }
    
    .social-links {
      justify-content: center;
    }
    
    .floating-button {
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Contact;