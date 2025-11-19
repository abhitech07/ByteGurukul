// Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'; // Add this import
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.notLoggedIn}>
          <h2>Please log in to view your dashboard</h2>
          <Link to="/login">
            <button style={styles.loginButton}>Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
}

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  notLoggedIn: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--text-primary)'
  },
  loginButton: {
    padding: '12px 30px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default Dashboard;