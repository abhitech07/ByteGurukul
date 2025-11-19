// src/components/student/StudentNavbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function StudentNavbar() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const linkStyle = ({ isActive }) => ({
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
    background: isActive ? 'var(--hover-bg, rgba(37,99,235,0.10))' : 'transparent',
    fontWeight: isActive ? 700 : 500,
    fontSize: '15px',
    transition: '0.2s ease',
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.wrapper}>

        {/* LEFT SIDE LINKS */}
        <div style={styles.links}>
          <NavLink to="/dashboard" style={linkStyle}>Home</NavLink>
          <NavLink to="/student/notifications" style={linkStyle}>Notifications</NavLink>
          <NavLink to="/student/certificates" style={linkStyle}>Certificates</NavLink>
          <NavLink to="/student/profile" style={linkStyle}>Profile</NavLink>
          <NavLink to="/student/progress" style={linkStyle}>Progress</NavLink>
          <NavLink to="/student/wishlist" style={linkStyle}>Wishlist</NavLink>
          <NavLink to="/student/orders" style={linkStyle}>Orders</NavLink>

        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: '100%',
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: '60px',          // keeps it just below top navbar
    zIndex: 999,
    padding: '8px 0',     // avoids white blank gap
  },

  wrapper: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  actions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },

  themeBtn: {
    fontSize: '18px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '6px 10px',
    cursor: 'pointer',
  },

  userText: {
    color: 'var(--text-primary)',
    fontWeight: 600,
  },

  logoutBtn: {
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1px solid var(--error)',
    background: 'transparent',
    color: 'var(--error)',
    cursor: 'pointer',
    fontWeight: 600,
  },
};