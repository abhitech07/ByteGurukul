import React, { useState, useEffect } from "react";
import { 
  FaShieldAlt, 
  FaDatabase, 
  FaLock, 
  FaCookieBite, 
  FaUserCheck,
  FaEnvelope,
  FaCalendarAlt,
  FaChevronRight,
  FaDownload,
  FaEye,
  FaHistory
} from "react-icons/fa";

function Privacy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("November 2025");
  const [userViewMode, setUserViewMode] = useState("summary"); // summary, detailed, legal
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Handle scroll
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const privacyMetrics = [
    { label: "Data Collection", value: "Minimal", icon: <FaDatabase /> },
    { label: "Data Sharing", value: "Limited", icon: <FaShieldAlt /> },
    { label: "Encryption", value: "Strong", icon: <FaLock /> },
    { label: "Cookie Usage", value: "Essential", icon: <FaCookieBite /> },
  ];

  const sections = [
    {
      id: "introduction",
      icon: <FaShieldAlt />,
      title: "1. Introduction",
      color: "#3B82F6"
    },
    {
      id: "information-collected",
      icon: <FaDatabase />,
      title: "2. Information We Collect",
      color: "#10B981"
    },
    {
      id: "data-usage",
      icon: <FaEye />,
      title: "3. How We Use Your Information",
      color: "#8B5CF6"
    },
    {
      id: "security",
      icon: <FaLock />,
      title: "4. Data Security",
      color: "#F59E0B"
    },
    {
      id: "cookies",
      icon: <FaCookieBite />,
      title: "5. Cookies & Tracking",
      color: "#EC4899"
    },
    {
      id: "third-party",
      icon: <FaShieldAlt />,
      title: "6. Third-Party Services",
      color: "#3B82F6"
    },
    {
      id: "rights",
      icon: <FaUserCheck />,
      title: "7. Your Rights",
      color: "#10B981"
    },
    {
      id: "contact",
      icon: <FaEnvelope />,
      title: "8. Contact Us",
      color: "#8B5CF6"
    },
    {
      id: "updates",
      icon: <FaCalendarAlt />,
      title: "9. Policy Updates",
      color: "#F59E0B"
    }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animatedBackground}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingElement,
              animationDelay: `${i * 0.3}s`,
              background: `radial-gradient(circle at 30% 30%, ${['#3B82F6', '#8B5CF6', '#EC4899'][i % 3]}20, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Floating Navigation */}
      <div style={styles.floatingNav}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            style={{
              ...styles.navItem,
              background: activeSection === section.id ? section.color : 'rgba(255,255,255,0.1)',
              borderLeft: `3px solid ${activeSection === section.id ? section.color : 'transparent'}`
            }}
          >
            <span style={styles.navIcon}>{section.icon}</span>
            <span style={styles.navText}>{section.title.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.heroHeader}>
              <FaShieldAlt style={styles.shieldIcon} />
              <h1 style={styles.mainTitle}>Privacy Policy</h1>
              <div style={styles.badge}>🔒 Secure & Transparent</div>
            </div>
            
            <p style={styles.heroSubtitle}>
              Your trust is our priority. This policy explains how ByteGurukul collects, 
              uses, and protects your personal information.
            </p>

            <div style={styles.metricsGrid}>
              {privacyMetrics.map((metric, index) => (
                <div key={index} style={styles.metricCard}>
                  <div style={styles.metricIcon}>{metric.icon}</div>
                  <div style={styles.metricLabel}>{metric.label}</div>
                  <div style={styles.metricValue}>{metric.value}</div>
                </div>
              ))}
            </div>

            <div style={styles.updateInfo}>
              <FaCalendarAlt style={styles.calendarIcon} />
              <span>Last Updated: <strong>{lastUpdated}</strong></span>
              <span style={styles.timeStamp}>🕒 {currentTime} UTC</span>
            </div>

            {/* View Mode Toggle */}
            <div style={styles.viewToggle}>
              <button
                onClick={() => setUserViewMode("summary")}
                style={userViewMode === "summary" ? styles.activeToggle : styles.toggleButton}
              >
                Summary
              </button>
              <button
                onClick={() => setUserViewMode("detailed")}
                style={userViewMode === "detailed" ? styles.activeToggle : styles.toggleButton}
              >
                Detailed
              </button>
              <button
                onClick={() => setUserViewMode("legal")}
                style={userViewMode === "legal" ? styles.activeToggle : styles.toggleButton}
              >
                Legal
              </button>
            </div>
          </div>
        </div>

        {/* Policy Content */}
        <div style={styles.policyContent}>
          {/* Introduction */}
          <section id="introduction" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaShieldAlt style={{...styles.sectionIcon, color: '#3B82F6'}} />
              <div>
                <h2 style={styles.sectionTitle}>1. Introduction</h2>
                <p style={styles.sectionSubtitle}>Our Commitment to Your Privacy</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <p style={styles.text}>
                Welcome to <strong style={styles.highlight}>ByteGurukul</strong>. Your privacy 
                is critically important to us. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your personal information when you use our 
                educational platform, courses, and learning resources.
              </p>
              <div style={styles.noticeBox}>
                <strong>📋 Key Points:</strong> We collect minimal data, use strong encryption, 
                and never sell your personal information to third parties.
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-collected" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaDatabase style={{...styles.sectionIcon, color: '#10B981'}} />
              <div>
                <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
                <p style={styles.sectionSubtitle}>What We Collect & Why</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.dataGrid}>
                <div style={styles.dataCard}>
                  <h3 style={styles.dataTitle}>
                    <span style={styles.dataIcon}>👤</span> Personal Information
                  </h3>
                  <ul style={styles.dataList}>
                    <li>Name & contact details (when you sign up)</li>
                    <li>Email address for communication</li>
                    <li>Profile information (optional)</li>
                  </ul>
                </div>
                
                <div style={styles.dataCard}>
                  <h3 style={styles.dataTitle}>
                    <span style={styles.dataIcon}>📊</span> Usage Data
                  </h3>
                  <ul style={styles.dataList}>
                    <li>Course progress & completion rates</li>
                    <li>Pages visited & time spent</li>
                    <li>Learning preferences & interests</li>
                  </ul>
                </div>
                
                <div style={styles.dataCard}>
                  <h3 style={styles.dataTitle}>
                    <span style={styles.dataIcon}>💻</span> Technical Information
                  </h3>
                  <ul style={styles.dataList}>
                    <li>Device type & operating system</li>
                    <li>Browser type & IP address</li>
                    <li>Cookies & session data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="data-usage" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaEye style={{...styles.sectionIcon, color: '#8B5CF6'}} />
              <div>
                <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
                <p style={styles.sectionSubtitle}>Purpose of Data Processing</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.usageGrid}>
                <div style={styles.usageItem}>
                  <div style={styles.usageIcon}>🎯</div>
                  <div>
                    <h4 style={styles.usageTitle}>Service Delivery</h4>
                    <p>Provide and improve our courses and learning materials</p>
                  </div>
                </div>
                
                <div style={styles.usageItem}>
                  <div style={styles.usageIcon}>📧</div>
                  <div>
                    <h4 style={styles.usageTitle}>Communication</h4>
                    <p>Send updates, newsletters, and course recommendations</p>
                  </div>
                </div>
                
                <div style={styles.usageItem}>
                  <div style={styles.usageIcon}>🛡️</div>
                  <div>
                    <h4 style={styles.usageTitle}>Security</h4>
                    <p>Protect your account and platform security</p>
                  </div>
                </div>
                
                <div style={styles.usageItem}>
                  <div style={styles.usageIcon}>🔧</div>
                  <div>
                    <h4 style={styles.usageTitle}>Support</h4>
                    <p>Respond to queries and provide technical support</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section id="security" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaLock style={{...styles.sectionIcon, color: '#F59E0B'}} />
              <div>
                <h2 style={styles.sectionTitle}>4. Data Security</h2>
                <p style={styles.sectionSubtitle}>How We Protect Your Information</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.securityGrid}>
                <div style={styles.securityFeature}>
                  <div style={styles.securityIcon}>🔐</div>
                  <h4>End-to-End Encryption</h4>
                  <p>Your data is encrypted both in transit and at rest</p>
                </div>
                
                <div style={styles.securityFeature}>
                  <div style={styles.securityIcon}>🚫</div>
                  <h4>Limited Access</h4>
                  <p>Only authorized personnel can access sensitive data</p>
                </div>
                
                <div style={styles.securityFeature}>
                  <div style={styles.securityIcon}>📋</div>
                  <h4>Regular Audits</h4>
                  <p>Continuous security assessments and compliance checks</p>
                </div>
                
                <div style={styles.securityFeature}>
                  <div style={styles.securityIcon}>🔄</div>
                  <h4>Backup & Recovery</h4>
                  <p>Regular backups to prevent data loss</p>
                </div>
              </div>
              <div style={styles.noteBox}>
                <strong>Note:</strong> While we implement industry-standard security measures, 
                no online platform can guarantee absolute security. We continuously improve 
                our security protocols to protect your information.
              </div>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section id="cookies" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaCookieBite style={{...styles.sectionIcon, color: '#EC4899'}} />
              <div>
                <h2 style={styles.sectionTitle}>5. Cookies & Tracking</h2>
                <p style={styles.sectionSubtitle}>How We Use Tracking Technologies</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.cookieTypes}>
                <h3 style={styles.subsectionTitle}>Types of Cookies We Use:</h3>
                <div style={styles.cookieGrid}>
                  <div style={styles.cookieCard}>
                    <h4>Essential Cookies</h4>
                    <p>Required for basic site functionality</p>
                    <span style={styles.cookieStatus}>Required</span>
                  </div>
                  
                  <div style={styles.cookieCard}>
                    <h4>Performance Cookies</h4>
                    <p>Help us improve website performance</p>
                    <span style={styles.cookieStatus}>Optional</span>
                  </div>
                  
                  <div style={styles.cookieCard}>
                    <h4>Functional Cookies</h4>
                    <p>Remember your preferences</p>
                    <span style={styles.cookieStatus}>Optional</span>
                  </div>
                </div>
              </div>
              <p style={styles.text}>
                You can manage cookie preferences through your browser settings. 
                Disabling cookies may affect certain website features.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section id="rights" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaUserCheck style={{...styles.sectionIcon, color: '#10B981'}} />
              <div>
                <h2 style={styles.sectionTitle}>7. Your Rights</h2>
                <p style={styles.sectionSubtitle}>Control Over Your Personal Data</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.rightsGrid}>
                <div style={styles.rightCard}>
                  <h3>📋 Access & Review</h3>
                  <p>Request a copy of your personal information</p>
                </div>
                
                <div style={styles.rightCard}>
                  <h3>✏️ Correction</h3>
                  <p>Update or correct inaccurate data</p>
                </div>
                
                <div style={styles.rightCard}>
                  <h3>🗑️ Deletion</h3>
                  <p>Request deletion of your personal data</p>
                </div>
                
                <div style={styles.rightCard}>
                  <h3>📤 Data Portability</h3>
                  <p>Receive your data in a machine-readable format</p>
                </div>
              </div>
              <div style={styles.actionBox}>
                <button style={styles.dataRequestButton}>
                  <FaDownload style={styles.buttonIcon} />
                  Request My Data
                </button>
                <button style={styles.deleteButton}>
                  <FaHistory style={styles.buttonIcon} />
                  Delete My Account
                </button>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section id="contact" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaEnvelope style={{...styles.sectionIcon, color: '#8B5CF6'}} />
              <div>
                <h2 style={styles.sectionTitle}>8. Contact Us</h2>
                <p style={styles.sectionSubtitle}>Get in Touch with Our Privacy Team</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.contactCard}>
                <div style={styles.contactInfo}>
                  <h3 style={styles.contactTitle}>Privacy Support</h3>
                  <p style={styles.contactText}>
                    For privacy-related questions, concerns, or to exercise your rights:
                  </p>
                  
                  <div style={styles.contactDetails}>
                    <div style={styles.contactItem}>
                      <FaEnvelope style={styles.contactIcon} />
                      <div>
                        <strong>Email:</strong>
                        <p>abhijeet.kr.pandey.07@gmail.com</p>
                      </div>
                    </div>
                    
                    <div style={styles.contactItem}>
                      <div style={styles.contactIcon}>📍</div>
                      <div>
                        <strong>Location:</strong>
                        <p>Deoria, Uttar Pradesh, India 🇮🇳</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={styles.responseTime}>
                    <strong>Response Time:</strong> We aim to respond to privacy inquiries 
                    within 48 hours during business days.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section id="updates" data-section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaCalendarAlt style={{...styles.sectionIcon, color: '#F59E0B'}} />
              <div>
                <h2 style={styles.sectionTitle}>9. Policy Updates</h2>
                <p style={styles.sectionSubtitle}>Staying Current with Changes</p>
              </div>
            </div>
            <div style={styles.sectionBody}>
              <div style={styles.updateTimeline}>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineDot}></div>
                  <div style={styles.timelineContent}>
                    <h4>Current Version</h4>
                    <p><strong>November 2025:</strong> Comprehensive privacy policy update</p>
                  </div>
                </div>
                
                <div style={styles.timelineItem}>
                  <div style={styles.timelineDot}></div>
                  <div style={styles.timelineContent}>
                    <h4>Previous Update</h4>
                    <p><strong>July 2024:</strong> Enhanced data protection measures</p>
                  </div>
                </div>
                
                <div style={styles.timelineItem}>
                  <div style={styles.timelineDot}></div>
                  <div style={styles.timelineContent}>
                    <h4>Initial Policy</h4>
                    <p><strong>January 2023:</strong> First privacy policy implementation</p>
                  </div>
                </div>
              </div>
              
              <div style={styles.notificationBox}>
                <p>
                  <strong>Notification:</strong> We will notify users of significant changes 
                  via email and in-platform notifications. The updated version will always 
                  be available on this page.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.footerContent}>
              <div style={styles.footerLogo}>
                <FaShieldAlt style={styles.footerIcon} />
                <span>ByteGurukul Privacy Center</span>
              </div>
              <p style={styles.footerText}>
                This Privacy Policy is effective as of {lastUpdated}. 
                By using our services, you acknowledge that you have read 
                and understood this Privacy Policy.
              </p>
              <div style={styles.footerLinks}>
                <span>Need help? Contact our privacy team at</span>
                <strong> abhijeet.kr.pandey.07@gmail.com</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopButton}>
          ↑
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    color: "white",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "0",
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
  floatingElement: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    opacity: 0.05,
    animation: "float 20s infinite ease-in-out",
    filter: "blur(40px)",
  },
  floatingNav: {
    position: "fixed",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "15px",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    minWidth: "200px",
  },
  navIcon: {
    fontSize: "14px",
    opacity: 0.8,
  },
  navText: {
    fontSize: "12px",
    fontWeight: "500",
  },
  contentWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px",
    position: "relative",
    zIndex: 1,
  },
  heroSection: {
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
    borderRadius: "32px",
    padding: "60px",
    marginBottom: "50px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  heroHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  shieldIcon: {
    fontSize: "3rem",
    color: "#60a5fa",
  },
  mainTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #60a5fa, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
  },
  badge: {
    display: "inline-block",
    padding: "8px 16px",
    background: "rgba(96, 165, 250, 0.1)",
    borderRadius: "20px",
    fontSize: "0.875rem",
    color: "#60a5fa",
    fontWeight: "600",
    border: "1px solid rgba(96, 165, 250, 0.3)",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    color: "#cbd5e1",
    marginBottom: "40px",
    lineHeight: 1.6,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },
  metricCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px 20px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
  },
  metricIcon: {
    fontSize: "1.5rem",
    color: "#60a5fa",
    marginBottom: "12px",
  },
  metricLabel: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    marginBottom: "8px",
  },
  metricValue: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#ffffff",
  },
  updateInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "30px",
    fontSize: "1rem",
    color: "#cbd5e1",
  },
  calendarIcon: {
    color: "#60a5fa",
  },
  timeStamp: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.875rem",
  },
  viewToggle: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  toggleButton: {
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  activeToggle: {
    padding: "12px 24px",
    background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
  },
  policyContent: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "32px",
    padding: "60px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  section: {
    marginBottom: "60px",
    scrollMarginTop: "80px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
  },
  sectionIcon: {
    fontSize: "2.5rem",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "20px",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  sectionSubtitle: {
    fontSize: "1rem",
    color: "#94a3b8",
    margin: "0",
  },
  sectionBody: {
    marginLeft: "80px",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#cbd5e1",
    marginBottom: "20px",
  },
  highlight: {
    color: "#60a5fa",
    fontWeight: "600",
  },
  noticeBox: {
    background: "rgba(96, 165, 250, 0.1)",
    borderLeft: "4px solid #60a5fa",
    padding: "20px",
    borderRadius: "12px",
    margin: "20px 0",
    color: "#cbd5e1",
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  dataCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  dataTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  dataIcon: {
    fontSize: "1.5rem",
  },
  dataList: {
    margin: "0",
    paddingLeft: "20px",
    color: "#cbd5e1",
    lineHeight: 1.8,
  },
  usageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  usageItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
  },
  usageIcon: {
    fontSize: "1.5rem",
  },
  usageTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  securityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  securityFeature: {
    textAlign: "center",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
  },
  securityIcon: {
    fontSize: "2rem",
    marginBottom: "12px",
  },
  noteBox: {
    background: "rgba(245, 158, 11, 0.1)",
    borderLeft: "4px solid #F59E0B",
    padding: "20px",
    borderRadius: "12px",
    color: "#cbd5e1",
  },
  cookieTypes: {
    marginBottom: "30px",
  },
  subsectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "20px",
  },
  cookieGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  cookieCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  cookieStatus: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    background: "rgba(96, 165, 250, 0.2)",
    color: "#60a5fa",
    marginTop: "12px",
  },
  rightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  rightCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  actionBox: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
  },
  dataRequestButton: {
    padding: "16px 32px",
    background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  },
  deleteButton: {
    padding: "16px 32px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  },
  buttonIcon: {
    fontSize: "1.25rem",
  },
  contactCard: {
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
    borderRadius: "24px",
    padding: "40px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  contactInfo: {
    maxWidth: "600px",
  },
  contactTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "20px",
  },
  contactText: {
    fontSize: "1.1rem",
    color: "#cbd5e1",
    marginBottom: "30px",
    lineHeight: 1.6,
  },
  contactDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "30px",
    marginBottom: "30px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  contactIcon: {
    fontSize: "1.5rem",
    color: "#60a5fa",
  },
  responseTime: {
    background: "rgba(96, 165, 250, 0.1)",
    padding: "16px",
    borderRadius: "12px",
    color: "#cbd5e1",
    fontSize: "0.875rem",
  },
  updateTimeline: {
    marginBottom: "30px",
  },
  timelineItem: {
    display: "flex",
    gap: "20px",
    marginBottom: "24px",
    position: "relative",
  },
  timelineDot: {
    width: "12px",
    height: "12px",
    background: "#60a5fa",
    borderRadius: "50%",
    marginTop: "8px",
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
  },
  notificationBox: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "24px",
    color: "#cbd5e1",
  },
  footer: {
    marginTop: "60px",
    paddingTop: "40px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  footerContent: {
    textAlign: "center",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "20px",
  },
  footerIcon: {
    color: "#60a5fa",
  },
  footerText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    lineHeight: 1.6,
    marginBottom: "20px",
    maxWidth: "800px",
    margin: "0 auto 20px",
  },
  footerLinks: {
    fontSize: "0.875rem",
    color: "#94a3b8",
  },
  scrollTopButton: {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    width: "50px",
    height: "50px",
    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    border: "none",
    borderRadius: "50%",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
};

// Add CSS animations and responsive styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(20px) rotate(240deg); }
  }

  .data-card-hover:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .metric-card-hover:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(96, 165, 250, 0.3) !important;
  }

  .right-card-hover:hover {
    background: rgba(96, 165, 250, 0.1) !important;
    transform: translateY(-3px);
  }

  button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
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
  @media (max-width: 1200px) {
    .floating-nav {
      display: none;
    }
    
    .content-wrapper {
      padding: 20px !important;
    }
  }

  @media (max-width: 1024px) {
    .metrics-grid,
    .data-grid,
    .security-grid,
    .rights-grid,
    .cookie-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .usage-grid {
      grid-template-columns: 1fr !important;
    }
    
    .section-body {
      margin-left: 0 !important;
    }
  }

  @media (max-width: 768px) {
    .hero-section,
    .policy-content {
      padding: 30px !important;
      border-radius: 20px !important;
    }
    
    .main-title {
      font-size: 2.5rem !important;
    }
    
    .metrics-grid,
    .data-grid,
    .security-grid,
    .rights-grid,
    .cookie-grid,
    .contact-details {
      grid-template-columns: 1fr !important;
    }
    
    .section-header {
      flex-direction: column;
      text-align: center;
      gap: 10px;
    }
    
    .action-box {
      flex-direction: column;
    }
    
    .scroll-top-button {
      bottom: 20px;
      right: 20px;
    }
  }

  @media (max-width: 480px) {
    .hero-header {
      flex-direction: column;
      gap: 10px;
    }
    
    .view-toggle {
      flex-direction: column;
    }
    
    .section-title {
      font-size: 1.5rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Privacy;