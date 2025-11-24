import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import api from "../../services/api"; // Use your existing API service if configured
import axios from 'axios'; // Or use axios directly for now
import InternshipNavbar from "../../components/internship/InternshipNavbar"; 
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaFileAlt, FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function InternshipApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    resumeText: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      // Prepare the payload
      const payload = {
        ...form,
        roleId: id // Include the role ID from the URL
      };

      // --- BACKEND CONNECTION HERE ---
      // Ensure your backend is running on localhost:5000
      const response = await axios.post('http://localhost:5000/api/internship/apply', payload);

      if (response.data.success) {
        // Navigate to success page on successful DB entry
        navigate("/internship/application-success", { 
            state: { 
                appId: response.data.data.id, // Get real ID from DB
                openingId: id 
            }
        });
      }

    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
          error.response?.data?.message || "Failed to submit application. Please check your connection."
      );
    } finally {
      setSubmitting(false);
    }
  };
  
  // ... Keep getRoleTitle and the rest of the JSX (return statement) exactly the same ...
  const getRoleTitle = (id) => {
      switch (id) {
          case 'android': return 'Android Development Internship';
          case 'web': return 'Full Stack Web Development Internship';
          case 'cyber': return 'Cyber Security Analyst Internship';
          default: return 'Open Internship Role';
      }
  };
  
  const roleTitle = getRoleTitle(id);

  return (
      // ... REST OF YOUR JSX CODE REMAINS THE SAME ...
      <div style={styles.page}>
      <InternshipNavbar />
      <div style={styles.mainContent}>
        <div style={styles.applicationCard}>
            
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.roleInfo}>
              <h1 style={styles.title}>Apply for: {roleTitle}</h1>
              <p style={styles.subtitle}>Fill out the form below to submit your application for the role (ID: {id}).</p>
            </div>
            <Link to="/internship" style={styles.backButton}>
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Back to Open Roles
            </Link>
          </div>
          
          {/* Error Message Display */}
          {errorMessage && (
            <div style={styles.errorBox}>
              {errorMessage}
            </div>
          )}

          {/* Application Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            
            <h3 style={styles.formSectionTitle}>Personal Information</h3>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                  <FaUser style={styles.inputIcon} />
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Full Name" 
                    style={styles.input} 
                    required 
                    className="form-input"
                  />
              </div>
              <div style={styles.inputGroup}>
                  <FaEnvelope style={styles.inputIcon} />
                  <input 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Email Address" 
                    type="email"
                    style={styles.input} 
                    required 
                    className="form-input"
                  />
              </div>
              <div style={styles.inputGroup}>
                  <FaPhone style={styles.inputIcon} />
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="Phone Number (Required)" 
                    type="tel"
                    style={styles.input} 
                    required 
                    className="form-input"
                  />
              </div>
              <div style={styles.inputGroup}>
                  <FaUniversity style={styles.inputIcon} />
                  <input 
                    name="university" 
                    value={form.university} 
                    onChange={handleChange} 
                    placeholder="University / College" 
                    style={styles.input} 
                    className="form-input"
                  />
              </div>
            </div>

            <h3 style={styles.formSectionTitle}>Resume / Summary (Demo)</h3>
            <div style={styles.inputGroup}>
                <FaFileAlt style={{ ...styles.inputIcon, top: '20px' }} />
                <textarea 
                    name="resumeText" 
                    value={form.resumeText} 
                    onChange={handleChange} 
                    placeholder="Paste your resume content or a brief summary of your skills and experience here..." 
                    style={styles.textarea} 
                    className="form-textarea"
                />
            </div>

            {/* Actions */}
            <div style={styles.actions}>
              <button 
                type="submit" 
                disabled={submitting} 
                style={{
                    ...styles.primaryBtn,
                    ...(submitting ? styles.loadingBtn : {})
                }}
                className="primaryBtn"
              >
                {submitting ? (
                    <>
                        <FaSpinner className="spinner" style={styles.spinner} />
                        Submitting...
                    </>
                ) : (
                    <>
                        <FaCheckCircle style={{ marginRight: '8px' }} />
                        Submit Application
                    </>
                )}
              </button>
              <Link to="/internship/status" style={styles.ghostBtn} className="ghostBtn">View My Applications</Link>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

// ... Copy the styles object from your original file here ...
const styles = {
  // Global/Layout Styles
  page: { 
    fontFamily: "'Poppins', sans-serif", 
    minHeight: "100vh", 
    backgroundColor: "var(--background)", // Using CSS variable from App.css
    color: "var(--text-primary)",
  },
  mainContent: { 
    padding: "40px 20px", 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 80px)', // Adjust for header height
  },
  applicationCard: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
    background: "var(--surface, white)", 
    borderRadius: 16, 
    boxShadow: "var(--shadow-lg, 0 10px 25px rgba(0,0,0,0.1))", 
    border: '1px solid var(--border, #e6eef8)'
  },
  
  // Header and Navigation
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: 25,
    borderBottom: '1px solid var(--border)',
    paddingBottom: '20px'
  },
  roleInfo: {
    maxWidth: '70%'
  },
  title: { 
    margin: 0, 
    fontSize: '24px', 
    fontWeight: '700',
    color: 'var(--primary, #2563eb)',
  },
  subtitle: { 
    margin: "6px 0 0", 
    color: "var(--text-secondary, #64748b)",
    fontSize: '15px'
  },
  backButton: { 
    color: "var(--primary, #2563eb)", 
    textDecoration: "none", 
    fontWeight: '600',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: 'var(--hover-bg, #f3f4f6)',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease'
  },

  // Form Styles
  form: { 
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formSectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginTop: '10px',
    marginBottom: '5px'
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 20, 
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--text-secondary, #64748b)',
    fontSize: '16px',
    zIndex: 1
  },
  input: { 
    flex: 1, 
    padding: "12px 12px 12px 40px", 
    borderRadius: 10, 
    border: "2px solid var(--border, #e6eef8)",
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    transition: 'border-color 0.3s ease',
  },
  textarea: { 
    width: "100%", 
    padding: "12px 12px 12px 40px", 
    minHeight: 140, 
    borderRadius: 10, 
    border: "2px solid var(--border, #e6eef8)",
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    resize: 'vertical',
    transition: 'border-color 0.3s ease',
  },

  // Actions
  actions: { 
    display: "flex", 
    gap: 15, 
    marginTop: 15,
    flexWrap: 'wrap' // Responsive wrapping
  },
  primaryBtn: { 
    backgroundColor: "var(--primary, #2563eb)", 
    color: "white", 
    padding: "14px 24px", 
    borderRadius: 10, 
    border: "none", 
    cursor: "pointer", 
    fontWeight: 600,
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
    flexGrow: 1
  },
  loadingBtn: {
    backgroundColor: 'var(--text-muted, #94a3b8)',
    cursor: 'not-allowed',
  },
  ghostBtn: { 
    border: "2px solid var(--primary, #2563eb)", 
    backgroundColor: 'transparent',
    color: "var(--primary, #2563eb)", 
    padding: "14px 24px", 
    borderRadius: 10, 
    textDecoration: "none", 
    fontWeight: 600,
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  },
  errorBox: {
    backgroundColor: 'var(--error-bg, #fee2e2)', 
    color: 'var(--error, #dc2626)',
    padding: '12px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid var(--error, #dc2626)',
    fontWeight: '500'
  }
};

const customStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (hover: hover) {
    .primaryBtn:hover:not(:disabled) {
      background-color: var(--primary-dark, #1d4ed8);
      transform: translateY(-1px);
    }
    
    .ghostBtn:hover {
      background-color: var(--primary, #2563eb);
      color: white;
      transform: translateY(-1px);
    }
    
    .backButton:hover {
        background-color: var(--primary, #2563eb);
        color: white;
    }
    
    .form-input:focus, .form-textarea:focus {
      border-color: var(--primary, #2563eb);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }
  }
  
  @media (max-width: 640px) {
    .applicationCard {
        padding: 20px !important;
    }
    .header {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 15px;
    }
    .grid {
        grid-template-columns: 1fr !important;
    }
    .backButton {
        width: 100%;
        justify-content: center;
    }
    .actions {
        flex-direction: column;
        gap: 15px;
    }
    .primaryBtn, .ghostBtn {
        width: 100%;
    }
  }
`;

// Append CSS to head to enable dynamic styling and animations
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
}