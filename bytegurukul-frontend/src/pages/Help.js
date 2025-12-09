import React, { useState, useEffect, useRef } from "react";
import { 
  FaQuestionCircle, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaRegSmileBeam, 
  FaChevronDown,
  FaSearch,
  FaPaperPlane,
  FaUser,
  FaHeadset,
  FaLightbulb,
  FaBook,
  FaVideo,
  FaWhatsapp,
  FaClock,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Help() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", category: "General" });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef(null);
  
  const textToType = "Hello! How can we help you today?";
  const typingSpeed = 50;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < textToType.length) {
        setTypingText(textToType.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showForm]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
    setForm({ name: "", email: "", message: "", category: "General" });
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I access my enrolled courses?",
      a: "Go to your Dashboard after login. All your enrolled courses will appear there with progress tracking and upcoming lessons.",
      category: "Courses",
      icon: <FaBook />
    },
    {
      q: "Can I download notes and projects?",
      a: "Yes! Most of our resources are downloadable in PDF and ZIP formats. Premium projects may have additional downloadable assets.",
      category: "Resources",
      icon: <FaVideo />
    },
    {
      q: "How do I contact support?",
      a: "You can fill out the support form below, email us at abhijeet.kr.pandey.07@gmail.com, or use our live chat during business hours.",
      category: "Support",
      icon: <FaHeadset />
    },
    {
      q: "Is ByteGurukul free for all students?",
      a: "Yes! 90% of our study materials are completely free. Premium projects and certifications have minimal charges to support our platform.",
      category: "Pricing",
      icon: <FaLightbulb />
    },
    {
      q: "What are the system requirements?",
      a: "You need a modern browser (Chrome, Firefox, Edge), 4GB RAM minimum, and a stable internet connection. No special hardware required.",
      category: "Technical",
      icon: <FaQuestionCircle />
    },
    {
      q: "How do I get a certificate?",
      a: "Complete the course requirements and pass the final assessment. Certificates are automatically generated and available in your dashboard.",
      category: "Certification",
      icon: <FaCheckCircle />
    },
  ];

  const supportCategories = [
    { name: "Technical", icon: "🔧", color: "#3B82F6" },
    { name: "Billing", icon: "💰", color: "#10B981" },
    { name: "Account", icon: "👤", color: "#8B5CF6" },
    { name: "Content", icon: "📚", color: "#F59E0B" },
    { name: "General", icon: "💬", color: "#EC4899" },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundElements}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              ...styles.floatingElement,
              background: `rgba(255,255,255,${0.05 + Math.random() * 0.1})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* HERO SECTION */}
      <motion.section 
        style={styles.hero}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={styles.heroContent}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 style={styles.heroTitle}>
            How can we help? 
            <motion.span 
              style={styles.wave}
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👋
            </motion.span>
          </h1>
          <p style={styles.heroSubtitle}>
            We're here to assist you 24/7 on your learning journey
          </p>
          
          {/* Animated Typing Text */}
          <div style={styles.typingContainer}>
            <div style={styles.typingText}>
              {typingText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={styles.cursor}
              >|</motion.span>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Support</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>1-2 hrs</div>
              <div style={styles.statLabel}>Avg Response</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* NAVIGATION TABS */}
      <div style={styles.tabContainer}>
        <button 
          style={activeTab === "faq" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
        <button 
          style={activeTab === "contact" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
        <button 
          style={activeTab === "resources" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>
      </div>

      {/* FAQ SECTION */}
      <AnimatePresence>
        {activeTab === "faq" && (
          <motion.section 
            style={styles.faqSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Search Bar */}
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  style={styles.clearSearch}
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div style={styles.categoryContainer}>
              {supportCategories.map((cat, idx) => (
                <motion.button
                  key={idx}
                  style={{
                    ...styles.categoryTag,
                    background: cat.color,
                    opacity: filteredFaqs.some(f => f.category === cat.name) ? 1 : 0.5
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(cat.name)}
                >
                  <span style={styles.categoryIcon}>{cat.icon}</span>
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* FAQ Grid */}
            <div style={styles.faqGrid}>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  style={styles.faqCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  <div 
                    style={styles.faqHeader}
                    onClick={() => toggleFaq(index)}
                  >
                    <div style={styles.faqIconTitle}>
                      <div style={styles.faqIcon}>
                        {faq.icon}
                      </div>
                      <h3 style={styles.faqQuestion}>{faq.q}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        style={styles.faqAnswerWrapper}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p style={styles.faqAnswer}>{faq.a}</p>
                        <div style={styles.faqCategory}>
                          Category: {faq.category}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CONTACT SECTION */}
        {activeTab === "contact" && (
          <motion.section 
            style={styles.supportSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Contact Cards */}
            <div style={styles.contactGrid}>
              <motion.div 
                style={styles.contactCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope style={styles.contactIcon} />
                <h3>Email Support</h3>
                <p>abhijeet.kr.pandey.07@gmail.com</p>
                <motion.button
                  style={styles.contactButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.location.href = "mailto:abhijeet.kr.pandey.07@gmail.com"}
                >
                  Send Email
                </motion.button>
              </motion.div>

              <motion.div 
                style={styles.contactCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp style={styles.contactIcon} />
                <h3>WhatsApp</h3>
                <p>+91 63865 69211</p>
                <motion.button
                  style={styles.contactButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(`https://wa.me/916386569211?text=Hi%20ByteGurukul%20Support,`, '_blank')}
                >
                  Chat Now
                </motion.button>
              </motion.div>

              <motion.div 
                style={styles.contactCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeadset style={styles.contactIcon} />
                <h3>Live Chat</h3>
                <p>Available 9AM - 9PM IST</p>
                <motion.button
                  style={styles.contactButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowForm(true)}
                >
                  Start Chat
                </motion.button>
              </motion.div>
            </div>

            {/* Support Form */}
            <AnimatePresence>
              {showForm ? (
                <motion.form 
                  onSubmit={handleSubmit}
                  style={styles.form}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    style={styles.formHeader}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    <FaHeadset style={styles.formIcon} />
                    <div>
                      <h3 style={styles.formTitle}>Support Request</h3>
                      <p style={styles.formSubtitle}>We'll respond within 1-2 hours</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      style={styles.closeForm}
                    >
                      <FaTimes />
                    </button>
                  </motion.div>

                  {submitted ? (
                    <motion.div 
                      style={styles.successMessage}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <FaCheckCircle style={styles.successIcon} />
                      <h3>Message Sent!</h3>
                      <p>We've received your request and will contact you shortly.</p>
                      <motion.button
                        onClick={() => setShowForm(false)}
                        style={styles.successButton}
                        whileHover={{ scale: 1.05 }}
                      >
                        Close
                      </motion.button>
                    </motion.div>
                  ) : (
                    <>
                      <div style={styles.formGrid}>
                        <div style={styles.inputGroup}>
                          <FaUser style={styles.inputIcon} />
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                          />
                        </div>

                        <div style={styles.inputGroup}>
                          <FaEnvelope style={styles.inputIcon} />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                          />
                        </div>
                      </div>

                      <div style={styles.inputGroup}>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          style={styles.select}
                        >
                          {supportCategories.map((cat, idx) => (
                            <option key={idx} value={cat.name}>
                              {cat.name} Support
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.inputGroup}>
                        <textarea
                          name="message"
                          placeholder="Describe your issue in detail..."
                          rows="4"
                          value={form.message}
                          onChange={handleChange}
                          required
                          style={styles.textarea}
                        ></textarea>
                        <div style={styles.charCount}>
                          {form.message.length}/500
                        </div>
                      </div>

                      <motion.button 
                        type="submit" 
                        style={styles.submitButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPaperPlane style={styles.submitIcon} />
                        Send Message
                      </motion.button>
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </motion.form>
              ) : (
                <motion.div 
                  style={styles.formPrompt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>Need personalized help? Send us a detailed message</p>
                  <motion.button
                    onClick={() => setShowForm(true)}
                    style={styles.promptButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Open Support Form
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* RESOURCES SECTION */}
        {activeTab === "resources" && (
          <motion.section 
            style={styles.resourcesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={styles.sectionTitle}>Helpful Resources</h2>
            <div style={styles.resourcesGrid}>
              <div style={styles.resourceCard}>
                <div style={styles.resourceIcon}>📚</div>
                <h3>Documentation</h3>
                <p>Complete guides and tutorials</p>
              </div>
              <div style={styles.resourceCard}>
                <div style={styles.resourceIcon}>🎥</div>
                <h3>Video Tutorials</h3>
                <p>Step-by-step video guides</p>
              </div>
              <div style={styles.resourceCard}>
                <div style={styles.resourceIcon}>👨‍🏫</div>
                <h3>Community Forum</h3>
                <p>Connect with other learners</p>
              </div>
              <div style={styles.resourceCard}>
                <div style={styles.resourceIcon}>📖</div>
                <h3>Knowledge Base</h3>
                <p>Articles and best practices</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <motion.footer 
        style={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div style={styles.footerContent}>
          <div style={styles.thanksNote}>
            <FaRegSmileBeam style={styles.thanksIcon} />
            <span>Thank you for learning with ByteGurukul!</span>
          </div>
          <div style={styles.footerInfo}>
            <p><FaClock /> Response Time: 1-2 hours during business hours</p>
            <p><FaEnvelope /> For urgent queries: abhijeet.kr.pandey.07@gmail.com</p>
            <p><FaPhoneAlt /> +91 63865 69211 (9AM - 9PM IST)</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

/* 🎨 Modern Advanced Styles */
const styles = {
  container: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    minHeight: "100vh",
    color: "white",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "0",
    position: "relative",
    overflow: "hidden",
  },
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  floatingElement: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(40px)",
    opacity: 0.3,
  },
  hero: {
    padding: "80px 20px 60px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "60px 40px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #60a5fa, #c084fc, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  wave: {
    display: "inline-block",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    opacity: 0.9,
    marginBottom: "32px",
    color: "#cbd5e1",
  },
  typingContainer: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "40px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  typingText: {
    fontSize: "1.5rem",
    fontFamily: "'JetBrains Mono', monospace",
    color: "#60a5fa",
    minHeight: "40px",
  },
  cursor: {
    marginLeft: "4px",
    color: "#60a5fa",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "40px",
  },
  stat: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#60a5fa",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "40px",
    padding: "0 20px",
    position: "relative",
    zIndex: 1,
  },
  tab: {
    padding: "12px 32px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "50px",
    color: "#cbd5e1",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeTab: {
    padding: "12px 32px",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "50px",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
  },
  faqSection: {
    maxWidth: "1000px",
    margin: "0 auto 80px",
    padding: "0 20px",
    position: "relative",
    zIndex: 1,
  },
  searchContainer: {
    position: "relative",
    maxWidth: "600px",
    margin: "0 auto 32px",
  },
  searchIcon: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "1.25rem",
  },
  searchInput: {
    width: "100%",
    padding: "20px 60px 20px 60px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    color: "white",
    fontSize: "1.1rem",
    outline: "none",
    transition: "all 0.3s ease",
  },
  clearSearch: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "1rem",
  },
  categoryContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "40px",
  },
  categoryTag: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "50px",
    color: "white",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  categoryIcon: {
    fontSize: "1rem",
  },
  faqGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px",
  },
  faqCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  faqHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  faqIconTitle: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  faqIcon: {
    fontSize: "1.5rem",
    color: "#60a5fa",
    background: "rgba(96, 165, 250, 0.1)",
    padding: "12px",
    borderRadius: "12px",
  },
  faqQuestion: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#f1f5f9",
    margin: 0,
  },
  faqAnswerWrapper: {
    overflow: "hidden",
  },
  faqAnswer: {
    fontSize: "1rem",
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  faqCategory: {
    display: "inline-block",
    padding: "6px 12px",
    background: "rgba(96, 165, 250, 0.1)",
    borderRadius: "20px",
    fontSize: "0.75rem",
    color: "#60a5fa",
    fontWeight: "600",
  },
  supportSection: {
    maxWidth: "800px",
    margin: "0 auto 80px",
    padding: "0 20px",
    position: "relative",
    zIndex: 1,
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  contactCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "32px 24px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  },
  contactIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#60a5fa",
  },
  contactButton: {
    marginTop: "20px",
    padding: "12px 24px",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.875rem",
    width: "100%",
  },
  form: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
    position: "relative",
  },
  formIcon: {
    fontSize: "2rem",
    color: "#60a5fa",
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#f1f5f9",
  },
  formSubtitle: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    margin: 0,
  },
  closeForm: {
    position: "absolute",
    right: 0,
    top: 0,
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "1.25rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "24px",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 48px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
  },
  select: {
    width: "100%",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
    fontFamily: "inherit",
  },
  charCount: {
    textAlign: "right",
    fontSize: "0.75rem",
    color: "#94a3b8",
    marginTop: "4px",
  },
  submitButton: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginTop: "20px",
  },
  submitIcon: {
    fontSize: "1.25rem",
  },
  successMessage: {
    textAlign: "center",
    padding: "40px 20px",
  },
  successIcon: {
    fontSize: "4rem",
    color: "#10b981",
    marginBottom: "24px",
  },
  successButton: {
    marginTop: "24px",
    padding: "12px 32px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  formPrompt: {
    textAlign: "center",
    padding: "40px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    border: "2px dashed rgba(255, 255, 255, 0.1)",
  },
  promptButton: {
    marginTop: "20px",
    padding: "16px 32px",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  resourcesSection: {
    maxWidth: "1000px",
    margin: "0 auto 80px",
    padding: "0 20px",
  },
  resourcesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  resourceCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "32px 24px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
  },
  resourceIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  footer: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "40px 20px",
    marginTop: "40px",
  },
  footerContent: {
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  thanksNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: "24px",
  },
  thanksIcon: {
    fontSize: "1.5rem",
    color: "#f472b6",
  },
  footerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    color: "#94a3b8",
    fontSize: "0.875rem",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  input:focus, textarea:focus, select:focus {
    border-color: #60a5fa !important;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
  }

  .faqCard:hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .contactCard:hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .resourceCard:hover {
    transform: translateY(-8px) !important;
    background: rgba(255, 255, 255, 0.08) !important;
  }

  button:not(:disabled) {
    transition: all 0.3s ease !important;
  }

  button:hover:not(:disabled) {
    filter: brightness(1.1) !important;
  }

  ::selection {
    background: rgba(96, 165, 250, 0.3);
    color: white;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.5);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(96, 165, 250, 0.7);
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .pulse {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(styleSheet);

export default Help;