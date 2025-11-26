import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import { FaGraduationCap, FaCalendarCheck, FaClock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import InternshipNavbar from "../../components/internship/InternshipNavbar";

export default function InternshipStatus() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // NOTE: In a real app, you would get this email from your AuthContext/Login state.
  // For this demo, we are hardcoding the email you used to apply.
  // CHANGE THIS to the email you enter in the application form to see your results.
  const studentEmail = "student@example.com"; 

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      // Fetch data from the new backend route we just created
      const res = await axios.get(`http://localhost:5000/api/internship/student/${studentEmail}`);
      
      if (res.data.success) {
        // Format the DB data to match our UI structure
        const formattedData = res.data.data.map(app => ({
            id: `APP-${app.id}`,
            role: getRoleLabel(app.roleId), // Convert code to readable name
            date: new Date(app.createdAt).toLocaleDateString(),
            status: app.status,
            progress: getProgress(app.status),
            canSchedule: app.status === 'Approved', // Logic: Only approved students can schedule
            rawDate: app.createdAt
        }));
        setApps(formattedData);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper: Get readable role name
  const getRoleLabel = (roleId) => {
      const roles = {
          'web': 'Full Stack Web Development',
          'android': 'Android Development',
          'cyber': 'Cyber Security Analyst',
          'datascience': 'Data Science Intern'
      };
      return roles[roleId] || roleId || 'Internship Role';
  };

  // Helper: Calculate progress bar based on status
  const getProgress = (status) => {
      switch (status) {
          case 'Pending': return 30;
          case 'Approved': return 100;
          case 'Rejected': return 100;
          case 'Hired': return 100;
          default: return 10;
      }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Hired":
      case "Approved":
        return { backgroundColor: 'var(--success)', icon: FaCheckCircle, color: 'white' }; // Using generic success color
      case "Rejected":
        return { backgroundColor: 'var(--error)', icon: FaTimesCircle, color: 'white' };
      case "Interview Scheduled":
        return { backgroundColor: 'var(--warning)', icon: FaCalendarCheck, color: 'black' };
      case "Pending":
      default:
        return { backgroundColor: 'var(--primary)', icon: FaClock, color: 'white' };
    }
  };

  return (
    <div style={styles.page}>
      <InternshipNavbar />
      <div style={styles.mainContent}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.header}>
            <div>
                <h2 style={styles.title}>My Internship Applications</h2>
                <p style={{margin: '5px 0 0', color: '#64748b', fontSize: '14px'}}>Viewing applications for: <strong>{studentEmail}</strong></p>
            </div>
            <Link to="/internship" style={styles.browseLink} className="browseLink">
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Browse More Roles
            </Link>
          </div>

          {loading ? (
              <div style={styles.loadingContainer}>
                  <FaSpinner className="spinner" style={{ fontSize: '40px', color: 'var(--primary)' }} />
                  <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Loading your applications...</p>
              </div>
          ) : (
            <div style={styles.applicationsGrid}>
                {apps.length === 0 ? (
                <div style={styles.noApplications}>
                    <FaGraduationCap style={{ fontSize: '48px', color: 'var(--text-secondary)' }} />
                    <h3>You haven't submitted any applications yet.</h3>
                    <Link to="/internship" style={styles.browseButton}>
                    Start Applying Now
                    </Link>
                </div>
                ) : (
                apps.map((a) => {
                    const statusInfo = getStatusStyle(a.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                    <div key={a.id} style={styles.appCard} className="appCard">
                        {/* Role & ID */}
                        <div style={styles.infoSection}>
                        <div style={styles.roleTitle}>{a.role}</div>
                        <div style={styles.appMeta}>{a.id} • Applied {a.date}</div>
                        
                        {/* Progress Bar */}
                        <div style={styles.progressContainer}>
                            <div style={styles.progressBar}>
                            <div 
                                style={{
                                ...styles.progressFill,
                                width: `${a.progress}%`,
                                backgroundColor: a.status === 'Rejected' ? 'var(--error)' : (a.progress === 100 ? 'var(--success)' : 'var(--primary)')
                                }} 
                            />
                            </div>
                            <span style={styles.progressText}>
                                {a.status === 'Pending' ? 'Under Review' : a.status}
                            </span>
                        </div>
                        </div>

                        {/* Status & Actions */}
                        <div style={styles.statusSection}>
                            <div style={{ 
                                ...styles.statusBadge, 
                                backgroundColor: statusInfo.backgroundColor, 
                                color: 'white' // Ensure text is readable
                            }}>
                                <StatusIcon style={{ marginRight: '6px' }} />
                                {a.status}
                            </div>
                            
                            {a.canSchedule && (
                                <Link to="/internship/interview" style={styles.actionButton} className="actionButton">
                                    Schedule Interview <FaCalendarCheck style={{ marginLeft: '6px' }} />
                                </Link>
                            )}
                            
                            {a.status === "Rejected" && (
                                <button style={{ ...styles.actionButton, backgroundColor: 'var(--text-secondary)', cursor: 'not-allowed' }} disabled>
                                    Closed
                                </button>
                            )}

                            {!a.canSchedule && a.status !== "Rejected" && (
                                <div style={styles.pendingAction}>
                                    <FaClock style={{ marginRight: '6px' }} />
                                    Awaiting update
                                </div>
                            )}
                        </div>
                    </div>
                    );
                })
                )}
            </div>
          )}
        </div>
      </div>
      
      {/* Inject Keyframes for Spinner */}
      <style>{`
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinner {
            animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

const styles = {
  // Global/Layout Styles
  page: { 
    fontFamily: "'Poppins', sans-serif", 
    minHeight: "100vh", 
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
  },
  mainContent: {
    padding: "40px 20px", 
    maxWidth: '1200px', 
    margin: '0 auto'
  },
  container: { 
    width: '100%' 
  },
  loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 0'
  },
  
  // Header and Navigation
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 30,
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border)'
  },
  title: { 
    margin: 0, 
    fontSize: '28px', 
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  browseLink: { 
    color: "var(--primary)", 
    textDecoration: "none",
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: 'var(--surface)',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  },

  // Applications List
  applicationsGrid: { 
    display: "flex", 
    flexDirection: 'column', 
    gap: 20 
  },
  appCard: { 
    backgroundColor: "var(--surface)", 
    padding: '25px', 
    borderRadius: 16, 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    boxShadow: "var(--shadow)",
    border: '1px solid var(--border)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  infoSection: {
    flex: 1,
    paddingRight: '20px',
  },
  roleTitle: { 
    fontWeight: 700, 
    fontSize: '18px', 
    color: 'var(--text-primary)' 
  },
  appMeta: { 
    color: "var(--text-secondary)", 
    marginTop: 6,
    fontSize: '14px' 
  },

  // Progress Bar
  progressContainer: { 
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  progressBar: { 
    height: 8, 
    backgroundColor: "var(--hover-bg)", 
    borderRadius: 8, 
    overflow: "hidden", 
    width: 200,
  },
  progressFill: { 
    height: "100%", 
    transition: 'width 0.5s ease',
    borderRadius: 8,
  },
  progressText: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase'
  },

  // Status and Actions
  statusSection: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12px',
    minWidth: '220px'
  },
  statusBadge: { 
    fontWeight: 700, 
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '120px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  actionButton: { 
    padding: "10px 20px", 
    backgroundColor: "var(--primary)", 
    color: "white", 
    borderRadius: 8, 
    textDecoration: "none",
    fontWeight: 600,
    fontSize: '14px',
    transition: 'transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    border: 'none'
  },
  pendingAction: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: 'var(--hover-bg)',
    borderRadius: '8px'
  },

  // Empty State
  noApplications: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    border: '2px dashed var(--border)',
    color: 'var(--text-secondary)',
  },
  browseButton: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
  }
};

// Inject custom hover and responsive styles
const customStyles = `
  @media (hover: hover) {
    .appCard:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    }
    
    .browseLink:hover {
        background-color: var(--primary);
        color: white;
    }

    .actionButton:hover {
      background-color: var(--primary-dark, #1d4ed8);
      transform: translateY(-2px);
    }
    
    .browseButton:hover {
        background-color: var(--primary-dark, #1d4ed8);
        transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    .browseLink {
        width: 100%;
        justify-content: center;
    }
    .appCard {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 20px;
    }
    
    .statusSection {
        align-items: flex-start !important;
        width: 100%;
        border-top: 1px solid var(--border);
        padding-top: 15px;
    }
    
    .progressContainer {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .progressBar {
        width: 100% !important;
    }
    
    .actionButton {
        width: 100%;
        justify-content: center;
    }
    
    .pendingAction {
        width: 100%;
        justify-content: center;
    }
  }
`;

// Append CSS to head to enable dynamic styling and animations
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
}