import React, { useState, useEffect } from "react";
import { 
  FaFileContract, 
  FaUserCheck, 
  FaCopyright, 
  FaMoneyBillWave,
  FaShieldAlt,
  FaLink,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGavel,
  FaUserShield,
  FaBalanceScale,
  FaBook,
  FaQuestionCircle
} from "react-icons/fa";

function Terms() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [userType, setUserType] = useState("student"); // student, educator, business
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
      setShowScrollTop(scrollTop > 300);
      
      // Update active section
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowAcceptModal(false);
    // In a real app, you would save this to localStorage or send to backend
    localStorage.setItem('termsAccepted', 'true');
  };

  const sections = [
    { id: "introduction", title: "1. Introduction", icon: <FaFileContract />, color: "#3B82F6" },
    { id: "use-platform", title: "2. Use of Our Platform", icon: <FaUserCheck />, color: "#10B981" },
    { id: "account", title: "3. Account Responsibilities", icon: <FaUserShield />, color: "#8B5CF6" },
    { id: "intellectual", title: "4. Intellectual Property", icon: <FaCopyright />, color: "#F59E0B" },
    { id: "payment", title: "5. Payment & Refund Policy", icon: <FaMoneyBillWave />, color: "#EC4899" },
    { id: "liability", title: "6. Limitation of Liability", icon: <FaShieldAlt />, color: "#3B82F6" },
    { id: "termination", title: "7. Termination", icon: <FaGavel />, color: "#10B981" },
    { id: "external-links", title: "8. External Links", icon: <FaLink />, color: "#8B5CF6" },
    { id: "changes", title: "9. Changes to Terms", icon: <FaCalendarAlt />, color: "#F59E0B" },
    { id: "contact", title: "10. Contact Us", icon: <FaEnvelope />, color: "#EC4899" }
  ];

  const userTypes = [
    { id: "student", label: "Student", icon: "🎓", description: "Individual learner" },
    { id: "educator", label: "Educator", icon: "👨‍🏫", description: "Teacher or instructor" },
    { id: "business", label: "Business", icon: "💼", description: "Organization use" }
  ];

  const keyPoints = [
    { icon: "📋", text: "Must be at least 13 years old to use" },
    { icon: "🔒", text: "You are responsible for account security" },
    { icon: "⚖️", text: "Respect intellectual property rights" },
    { icon: "💰", text: "Check refund policies before purchase" },
    { icon: "🛡️", text: "Platform liability is limited" }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animatedBackground}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingElement,
              animationDelay: `${i * 0.5}s`,
              background: `radial-gradient(circle, ${['#3B82F6', '#8B5CF6', '#10B981'][i % 3]}20, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div 
          style={{
            ...styles.progressFill,
            width: `${readingProgress}%`,
            background: `linear-gradient(90deg, #3B82F6, #8B5CF6)`
          }}
        />
      </div>

      {/* User Type Selector */}
      <div style={styles.userTypeSelector}>
        <div style={styles.selectorLabel}>Viewing as:</div>
        <div style={styles.selectorButtons}>
          {userTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setUserType(type.id)}
              style={{
                ...styles.userTypeButton,
                background: userType === type.id ? typeColors[type.id] : 'rgba(255,255,255,0.1)',
                borderColor: userType === type.id ? typeColors[type.id] : 'transparent'
              }}
            >
              <span style={styles.userTypeIcon}>{type.icon}</span>
              <span style={styles.userTypeText}>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContainer}>
        {/* Sidebar Navigation */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <FaFileContract style={styles.sidebarIcon} />
            <h3 style={styles.sidebarTitle}>Terms Navigation</h3>
          </div>
          
          <div style={styles.sectionList}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  ...styles.sectionButton,
                  background: activeSection === section.id ? `${section.color}20` : 'transparent',
                  borderLeft: `4px solid ${activeSection === section.id ? section.color : 'transparent'}`
                }}
              >
                <span style={{...styles.sectionButtonIcon, color: section.color}}>
                  {section.icon}
                </span>
                <span style={styles.sectionButtonText}>
                  {section.title.split('. ')[1]}
                </span>
                {activeSection === section.id && (
                  <span style={styles.activeIndicator}>●</span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={styles.sidebarActions}>
            <button 
              style={styles.printButton}
              onClick={() => window.print()}
            >
              🖨️ Print Terms
            </button>
            <button 
              style={styles.saveButton}
              onClick={() => alert('Terms saved to your account')}
            >
              💾 Save for Later
            </button>
          </div>

          {/* Stats */}
          <div style={styles.sidebarStats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>10</div>
              <div style={styles.statLabel}>Sections</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>2025</div>
              <div style={styles.statLabel}>Last Updated</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <div style={styles.heroContent}>
              <div style={styles.titleContainer}>
                <FaFileContract style={styles.titleIcon} />
                <h1 style={styles.mainTitle}>
                  Terms & Conditions
                  <span style={styles.titleBadge}>📜 Legal Document</span>
                </h1>
              </div>
              
              <div style={styles.heroSubtitle}>
                <p style={styles.subtitleText}>
                  These terms govern your use of ByteGurukul's educational platform. 
                  By accessing our services, you agree to be bound by these terms.
                </p>
                
                <div style={styles.updateInfo}>
                  <FaCalendarAlt style={styles.calendarIcon} />
                  <span><strong>Last Updated:</strong> November 2025</span>
                  <span style={styles.versionBadge}>v3.2</span>
                </div>
              </div>

              {/* Key Points */}
              <div style={styles.keyPointsGrid}>
                {keyPoints.map((point, index) => (
                  <div key={index} style={styles.keyPointCard}>
                    <span style={styles.keyPointIcon}>{point.icon}</span>
                    <span style={styles.keyPointText}>{point.text}</span>
                  </div>
                ))}
              </div>

              {/* Important Notice */}
              <div style={styles.importantNotice}>
                <FaExclamationTriangle style={styles.noticeIcon} />
                <div>
                  <h4 style={styles.noticeTitle}>Important Legal Notice</h4>
                  <p style={styles.noticeText}>
                    These are legally binding terms. Please read them carefully. 
                    If you disagree with any part, you may not use our services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div style={styles.termsContent}>
            {/* Introduction */}
            <section id="introduction" data-section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIcon, background: '#3B82F620'}}>
                  <FaFileContract style={{color: '#3B82F6'}} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>1. Introduction</h2>
                  <p style={styles.sectionSubtitle}>Welcome to Our Platform</p>
                </div>
              </div>
              
              <div style={styles.sectionBody}>
                <p style={styles.paragraph}>
                  Welcome to <strong style={styles.highlight}>ByteGurukul</strong>. 
                  By accessing or using our website, resources, or services, you agree 
                  to these Terms and Conditions. Please read them carefully before 
                  continuing to use our platform.
                </p>
                
                <div style={styles.userSpecificNote}>
                  <div style={styles.userTypeIndicator}>
                    <span style={styles.userTypeEmoji}>
                      {userTypes.find(t => t.id === userType)?.icon}
                    </span>
                    <span>Relevant for {userTypes.find(t => t.id === userType)?.label}s</span>
                  </div>
                  <p style={styles.userNoteText}>
                    {userType === 'student' && 'As a student, these terms outline your rights and responsibilities while using our learning resources.'}
                    {userType === 'educator' && 'As an educator, these terms govern how you can use and reference our educational materials.'}
                    {userType === 'business' && 'As a business, these terms define commercial usage rights and organizational responsibilities.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Use of Our Platform */}
            <section id="use-platform" data-section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIcon, background: '#10B98120'}}>
                  <FaUserCheck style={{color: '#10B981'}} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>2. Use of Our Platform</h2>
                  <p style={styles.sectionSubtitle}>Acceptable Use Guidelines</p>
                </div>
              </div>
              
              <div style={styles.sectionBody}>
                <div style={styles.rulesGrid}>
                  <div style={styles.ruleCard}>
                    <div style={styles.ruleIcon}>👤</div>
                    <h4 style={styles.ruleTitle}>Age Requirement</h4>
                    <p style={styles.ruleText}>
                      You must be at least <strong>13 years old</strong> to use our platform.
                    </p>
                  </div>
                  
                  <div style={styles.ruleCard}>
                    <div style={styles.ruleIcon}>🎓</div>
                    <h4 style={styles.ruleTitle}>Educational Use</h4>
                    <p style={styles.ruleText}>
                      Use ByteGurukul only for lawful educational purposes.
                    </p>
                  </div>
                  
                  <div style={styles.ruleCard}>
                    <div style={styles.ruleIcon}>🚫</div>
                    <h4 style={styles.ruleTitle}>Prohibited Activities</h4>
                    <p style={styles.ruleText}>
                      No harmful activities, hacking, or platform abuse.
                    </p>
                  </div>
                  
                  <div style={styles.ruleCard}>
                    <div style={styles.ruleIcon}>📝</div>
                    <h4 style={styles.ruleTitle}>Content Usage</h4>
                    <p style={styles.ruleText}>
                      Do not copy, distribute, or modify materials without permission.
                    </p>
                  </div>
                </div>
                
                <div style={styles.warningBox}>
                  <FaExclamationTriangle style={styles.warningIcon} />
                  <p>
                    <strong>Violation Consequences:</strong> Any violation of these use 
                    guidelines may result in account suspension or termination.
                  </p>
                </div>
              </div>
            </section>

            {/* Account Responsibilities */}
            <section id="account" data-section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIcon, background: '#8B5CF620'}}>
                  <FaUserShield style={{color: '#8B5CF6'}} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>3. Account Responsibilities</h2>
                  <p style={styles.sectionSubtitle}>Your Account Security Duties</p>
                </div>
              </div>
              
              <div style={styles.sectionBody}>
                <div style={styles.responsibilityList}>
                  <div style={styles.responsibilityItem}>
                    <div style={styles.respIcon}>🔐</div>
                    <div>
                      <h4 style={styles.respTitle}>Confidentiality</h4>
                      <p style={styles.respText}>
                        You are responsible for maintaining the confidentiality of your account credentials.
                      </p>
                    </div>
                  </div>
                  
                  <div style={styles.responsibilityItem}>
                    <div style={styles.respIcon}>⚠️</div>
                    <div>
                      <h4 style={styles.respTitle}>Limited Liability</h4>
                      <p style={styles.respText}>
                        ByteGurukul is not liable for unauthorized access due to password sharing or negligence.
                      </p>
                    </div>
                  </div>
                  
                  <div style={styles.responsibilityItem}>
                    <div style={styles.respIcon}>🚨</div>
                    <div>
                      <h4 style={styles.respTitle}>Immediate Notification</h4>
                      <p style={styles.respText}>
                        You must immediately notify us if you suspect unauthorized account access.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div style={styles.securityTips}>
                  <h4 style={styles.tipsTitle}>🔒 Security Best Practices</h4>
                  <ul style={styles.tipsList}>
                    <li>Use a strong, unique password</li>
                    <li>Enable two-factor authentication if available</li>
                    <li>Never share your login credentials</li>
                    <li>Log out from shared devices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual" data-section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIcon, background: '#F59E0B20'}}>
                  <FaCopyright style={{color: '#F59E0B'}} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>4. Intellectual Property</h2>
                  <p style={styles.sectionSubtitle}>Copyright and Ownership</p>
                </div>
              </div>
              
              <div style={styles.sectionBody}>
                <div style={styles.ipContent}>
                  <p style={styles.paragraph}>
                    All content available on ByteGurukul—including course materials, 
                    images, videos, logos, and designs—are protected by copyright 
                    laws and belong to ByteGurukul or its content creators.
                  </p>
                  
                  <div style={styles.ipGrid}>
                    <div style={styles.ipCard}>
                      <h4 style={styles.ipTitle}>✅ Permitted Use</h4>
                      <ul style={styles.ipList}>
                        <li>Personal educational use</li>
                        <li>Classroom instruction</li>
                        <li>Non-commercial research</li>
                      </ul>
                    </div>
                    
                    <div style={styles.ipCard}>
                      <h4 style={styles.ipTitle}>❌ Prohibited Use</h4>
                      <ul style={styles.ipList}>
                        <li>Commercial redistribution</li>
                        <li>Modification without permission</li>
                        <li>Claiming as your own work</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div style={styles.licensingNote}>
                    <FaBook style={styles.licenseIcon} />
                    <p>
                      <strong>Licensing:</strong> Some materials may be available under 
                      specific licenses. Check individual course details for licensing information.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment & Refund Policy */}
            <section id="payment" data-section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIcon, background: '#EC489920'}}>
                  <FaMoneyBillWave style={{color: '#EC4899'}} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>5. Payment & Refund Policy</h2>
                  <p style={styles.sectionSubtitle}>Financial Terms and Conditions</p>
                </div>
              </div>
              
              <div style={styles.sectionBody}>
                <div style={styles.paymentPolicy}>
                  <div style={styles.policyGrid}>
                    <div style={styles.policyCard}>
                      <div style={styles.policyIcon}>💳</div>
                      <h4>Payment Terms</h4>
                      <p>Certain resources or courses may require payment.</p>
                    </div>
                    
                    <div style={styles.policyCard}>
                      <div style={styles.policyIcon}>↩️</div>
                      <h4>Refund Policy</h4>
                      <p>Payments are generally non-refundable unless stated.</p>
                    </div>
                    
                    <div style={styles.policyCard}>
                      <div style={styles.policyIcon}>👁️</div>
                      <h4>Review Before Purchase</h4>
                      <p>Always review course details before purchasing.</p>
                    </div>
                  </div>
                  
                  <div style={styles.refundTimeline}>
                    <h4 style={styles.timelineTitle}>Refund Timeline (If Applicable)</h4>
                    <div style={styles.timeline}>
                      <div style={styles.timelineItem}>
                        <div style={styles.timelineDot}></div>
                        <div style={styles.timelineContent}>
                          <strong>Within 7 days:</strong> Full refund for eligible courses
                        </div>
                      </div>
                      <div style={styles.timelineItem}>
                        <div style={styles.timelineDot}></div>
                        <div style={styles.timelineContent}>
                          <strong>8-14 days:</strong> Partial refund (50%)
                        </div>
                      </div>
                      <div style={styles.timelineItem}>
                        <div style={styles.timelineDot}></div>
                        <div style={styles.timelineContent}>
                          <strong>After 14 days:</strong> No refund
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" data-section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIcon, background: '#EC489920'}}>
                  <FaEnvelope style={{color: '#EC4899'}} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>10. Contact Us</h2>
                  <p style={styles.sectionSubtitle}>Get Legal and Support Assistance</p>
                </div>
              </div>
              
              <div style={styles.sectionBody}>
                <div style={styles.contactCard}>
                  <p style={styles.paragraph}>
                    If you have any questions or concerns about these Terms, contact us at:
                  </p>
                  
                  <div style={styles.contactInfo}>
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
                    
                    <div style={styles.contactItem}>
                      <div style={styles.contactIcon}>⏰</div>
                      <div>
                        <strong>Response Time:</strong>
                        <p>Typically within 48 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Acceptance Footer */}
            <div style={styles.acceptanceFooter}>
              {!acceptedTerms ? (
                <div style={styles.acceptanceBox}>
                  <div style={styles.acceptanceContent}>
                    <FaCheckCircle style={styles.acceptIcon} />
                    <div>
                      <h3 style={styles.acceptanceTitle}>Accept Terms & Conditions</h3>
                      <p style={styles.acceptanceText}>
                        By clicking "I Accept", you acknowledge that you have read, 
                        understood, and agree to be bound by these Terms and Conditions.
                      </p>
                    </div>
                  </div>
                  <button 
                    style={styles.acceptButton}
                    onClick={() => setShowAcceptModal(true)}
                  >
                    I Accept These Terms
                  </button>
                </div>
              ) : (
                <div style={styles.acceptedBox}>
                  <FaCheckCircle style={styles.acceptedIcon} />
                  <div>
                    <h3 style={styles.acceptedTitle}>Terms Accepted</h3>
                    <p style={styles.acceptedText}>
                      You have accepted these Terms and Conditions on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
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

      {/* Accept Modal */}
      {showAcceptModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <FaCheckCircle style={styles.modalIcon} />
              <h2 style={styles.modalTitle}>Confirm Acceptance</h2>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.modalWarning}>
                <FaExclamationTriangle style={styles.warningIcon} />
                <p>
                  <strong>Important:</strong> These are legally binding terms. 
                  Please ensure you have read and understood all sections before accepting.
                </p>
              </div>
              
              <div style={styles.modalChecklist}>
                <h4 style={styles.checklistTitle}>By accepting, you confirm:</h4>
                <ul style={styles.checklist}>
                  <li>✓ You are at least 13 years old</li>
                  <li>✓ You will use the platform for educational purposes only</li>
                  <li>✓ You accept our privacy practices</li>
                  <li>✓ You understand the refund policy</li>
                </ul>
              </div>
            </div>
            
            <div style={styles.modalActions}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowAcceptModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.confirmButton}
                onClick={handleAcceptTerms}
              >
                I Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const typeColors = {
  student: '#3B82F6',
  educator: '#10B981',
  business: '#8B5CF6'
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    color: "white",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    opacity: 0.05,
    animation: "float 20s infinite ease-in-out",
    filter: "blur(30px)",
  },
  progressBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "rgba(255,255,255,0.1)",
    zIndex: 1000,
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease",
  },
  userTypeSelector: {
    position: "fixed",
    top: "80px",
    right: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "12px",
    zIndex: 900,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  selectorLabel: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    marginBottom: "8px",
    textAlign: "center",
  },
  selectorButtons: {
    display: "flex",
    gap: "8px",
  },
  userTypeButton: {
    padding: "8px 12px",
    border: "1px solid transparent",
    borderRadius: "12px",
    background: "transparent",
    color: "white",
    fontSize: "0.75rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
  },
  userTypeIcon: {
    fontSize: "1rem",
  },
  userTypeText: {
    fontWeight: "500",
  },
  mainContainer: {
    display: "flex",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "100px 20px 40px",
    gap: "40px",
  },
  sidebar: {
    width: "280px",
    flexShrink: 0,
    position: "sticky",
    top: "100px",
    height: "fit-content",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  sidebarIcon: {
    fontSize: "1.5rem",
    color: "#60a5fa",
  },
  sidebarTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  sectionList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sectionButton: {
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
    textAlign: "left",
  },
  sectionButtonIcon: {
    fontSize: "1rem",
    width: "20px",
  },
  sectionButtonText: {
    fontSize: "0.875rem",
    fontWeight: "500",
    flex: 1,
  },
  activeIndicator: {
    color: "#60a5fa",
    fontSize: "0.75rem",
  },
  sidebarActions: {
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  printButton: {
    padding: "12px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
  },
  saveButton: {
    padding: "12px",
    background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
  },
  sidebarStats: {
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent: "space-around",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#60a5fa",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    marginTop: "4px",
  },
  contentArea: {
    flex: 1,
  },
  heroSection: {
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
    borderRadius: "32px",
    padding: "48px",
    marginBottom: "40px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  heroContent: {
    maxWidth: "800px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
  },
  titleIcon: {
    fontSize: "3rem",
    color: "#60a5fa",
  },
  mainTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #60a5fa, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  titleBadge: {
    fontSize: "0.875rem",
    padding: "8px 16px",
    background: "rgba(96, 165, 250, 0.1)",
    borderRadius: "20px",
    color: "#60a5fa",
    fontWeight: "600",
    border: "1px solid rgba(96, 165, 250, 0.3)",
  },
  heroSubtitle: {
    marginBottom: "32px",
  },
  subtitleText: {
    fontSize: "1.25rem",
    color: "#cbd5e1",
    lineHeight: 1.6,
    marginBottom: "20px",
  },
  updateInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1rem",
    color: "#cbd5e1",
  },
  calendarIcon: {
    color: "#60a5fa",
  },
  versionBadge: {
    background: "rgba(255,255,255,0.1)",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.875rem",
  },
  keyPointsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  keyPointCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  keyPointIcon: {
    fontSize: "1.5rem",
  },
  keyPointText: {
    fontSize: "0.875rem",
    color: "#cbd5e1",
  },
  importantNotice: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "24px",
    background: "rgba(245, 158, 11, 0.1)",
    borderRadius: "16px",
    border: "1px solid rgba(245, 158, 11, 0.3)",
  },
  noticeIcon: {
    fontSize: "1.5rem",
    color: "#F59E0B",
    marginTop: "4px",
  },
  noticeTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  noticeText: {
    fontSize: "0.875rem",
    color: "#cbd5e1",
    margin: 0,
    lineHeight: 1.6,
  },
  termsContent: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "32px",
    padding: "48px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  section: {
    marginBottom: "60px",
    scrollMarginTop: "80px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
  },
  sectionIcon: {
    padding: "20px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    margin: 0,
  },
  sectionBody: {
    marginLeft: "84px",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#cbd5e1",
    marginBottom: "24px",
  },
  highlight: {
    color: "#60a5fa",
    fontWeight: "600",
  },
  userSpecificNote: {
    background: "rgba(96, 165, 250, 0.1)",
    borderRadius: "16px",
    padding: "20px",
    margin: "24px 0",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },
  userTypeIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  userTypeEmoji: {
    fontSize: "1.5rem",
  },
  userNoteText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    margin: 0,
    lineHeight: 1.6,
  },
  rulesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "24px",
  },
  ruleCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  ruleIcon: {
    fontSize: "2rem",
    marginBottom: "12px",
  },
  ruleTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  ruleText: {
    fontSize: "0.875rem",
    color: "#cbd5e1",
    margin: 0,
  },
  warningBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "20px",
    background: "rgba(239, 68, 68, 0.1)",
    borderRadius: "16px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  },
  warningIcon: {
    color: "#EF4444",
    fontSize: "1.5rem",
    marginTop: "4px",
  },
  responsibilityList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginBottom: "32px",
  },
  responsibilityItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  respIcon: {
    fontSize: "1.5rem",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "12px",
    borderRadius: "12px",
    minWidth: "48px",
    textAlign: "center",
  },
  respTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  respText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    margin: 0,
    lineHeight: 1.6,
  },
  securityTips: {
    background: "rgba(96, 165, 250, 0.1)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },
  tipsTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 16px 0",
  },
  tipsList: {
    margin: "0 0 0 20px",
    color: "#cbd5e1",
    lineHeight: 1.8,
  },
  ipGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    margin: "24px 0",
  },
  ipCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  ipTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 16px 0",
  },
  ipList: {
    margin: "0 0 0 20px",
    color: "#cbd5e1",
    lineHeight: 1.8,
  },
  licensingNote: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
  },
  licenseIcon: {
    color: "#60a5fa",
    fontSize: "1.5rem",
  },
  policyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "32px",
  },
  policyCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  policyIcon: {
    fontSize: "2rem",
    marginBottom: "12px",
  },
  refundTimeline: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
  },
  timelineTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 20px 0",
  },
  timeline: {
    position: "relative",
    paddingLeft: "20px",
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
    marginTop: "6px",
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
    color: "#cbd5e1",
  },
  contactCard: {
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  contactInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "32px",
    marginTop: "24px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  contactIcon: {
    fontSize: "1.5rem",
    color: "#60a5fa",
  },
  acceptanceFooter: {
    marginTop: "60px",
    paddingTop: "40px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  acceptanceBox: {
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
    borderRadius: "24px",
    padding: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  acceptanceContent: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flex: 1,
  },
  acceptIcon: {
    fontSize: "2.5rem",
    color: "#10B981",
  },
  acceptanceTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  acceptanceText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    margin: 0,
    maxWidth: "600px",
  },
  acceptButton: {
    padding: "16px 32px",
    background: "linear-gradient(90deg, #10B981, #3B82F6)",
    border: "none",
    borderRadius: "16px",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  acceptedBox: {
    background: "rgba(16, 185, 129, 0.1)",
    borderRadius: "24px",
    padding: "32px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    border: "1px solid rgba(16, 185, 129, 0.3)",
  },
  acceptedIcon: {
    fontSize: "2.5rem",
    color: "#10B981",
  },
  acceptedTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  acceptedText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    margin: 0,
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
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    borderRadius: "32px",
    padding: "40px",
    maxWidth: "500px",
    width: "90%",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "32px",
  },
  modalIcon: {
    fontSize: "2.5rem",
    color: "#10B981",
  },
  modalTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  modalBody: {
    marginBottom: "32px",
  },
  modalWarning: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "20px",
    background: "rgba(245, 158, 11, 0.1)",
    borderRadius: "16px",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    marginBottom: "24px",
  },
  modalChecklist: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
  },
  checklistTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 16px 0",
  },
  checklist: {
    margin: "0 0 0 20px",
    color: "#cbd5e1",
    lineHeight: 1.8,
  },
  modalActions: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
  },
  cancelButton: {
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  confirmButton: {
    padding: "12px 24px",
    background: "linear-gradient(90deg, #10B981, #3B82F6)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
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

  button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
  }

  .section-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .rule-card:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-5px);
  }

  .policy-card:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-5px);
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
    .main-container {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100% !important;
      position: static !important;
      margin-bottom: 40px;
    }
    
    .section-list {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    
    .user-type-selector {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    .rules-grid,
    .policy-grid,
    .contact-info,
    .ip-grid {
      grid-template-columns: 1fr !important;
    }
    
    .section-body {
      margin-left: 0 !important;
    }
    
    .main-title {
      font-size: 2.5rem !important;
      flex-direction: column;
      align-items: flex-start !important;
      gap: 10px !important;
    }
  }

  @media (max-width: 768px) {
    .hero-section,
    .terms-content {
      padding: 30px !important;
      border-radius: 20px !important;
    }
    
    .title-container {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 10px !important;
    }
    
    .section-header {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 20px !important;
    }
    
    .acceptance-box {
      flex-direction: column;
      gap: 20px;
    }
    
    .key-points-grid {
      grid-template-columns: 1fr !important;
    }
    
    .modal-actions {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .main-container {
      padding: 80px 15px 30px !important;
    }
    
    .section-title {
      font-size: 1.5rem !important;
    }
    
    .scroll-top-button {
      bottom: 20px !important;
      right: 20px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Terms;