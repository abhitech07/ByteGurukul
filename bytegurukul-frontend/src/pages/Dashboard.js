import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const { user } = useAuth();

  // DEBUG: Check what user data is reaching the Dashboard
  useEffect(() => {
    console.log("Dashboard Mounted. Current User:", user);
  }, [user]);

  // 1. Handle Not Logged In
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Session Expired or Not Logged In</h2>
          <p>Please log in again to access your dashboard.</p>
          <Link to="/login">
            <button style={styles.button}>Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Handle Roles
  const role = (user.role || "").toLowerCase();
  console.log("Rendering Dashboard for Role:", role);

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      // If role is missing or unknown, default to Student but log it
      console.warn("Unknown role detected:", role, "- Defaulting to StudentDashboard");
      return <StudentDashboard />;
  }
}

// Fixed Styles with Hardcoded Colors to prevent "Blank" screens
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc', // Light gray background
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff', // White card
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    color: '#1e293b',
    marginBottom: '16px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '20px',
  }
};

export default Dashboard;