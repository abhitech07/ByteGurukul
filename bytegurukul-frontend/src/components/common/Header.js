import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <h1 style={styles.logoText}>ByteGurukul</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          <Link to="/" style={{ ...styles.navLink, ...(isActive('/') ? styles.activeNavLink : {}) }}>Home</Link>
          <Link to="/courses" style={{ ...styles.navLink, ...(isActive('/courses') ? styles.activeNavLink : {}) }}>Courses</Link>
          <Link to="/internship" style={{ ...styles.navLink, ...(isActive('/internship') ? styles.activeNavLink : {}) }}>Internship</Link>
          <Link to="/projects" style={{ ...styles.navLink, ...(isActive('/projects') ? styles.activeNavLink : {}) }}>Projects</Link>
          {user && (
            <Link to="/dashboard" style={{ ...styles.navLink, ...(isActive('/dashboard') ? styles.activeNavLink : {}) }}>
              Dashboard
            </Link>
          )}
        </nav>

        {/* Theme and Auth Controls */}
        <div style={styles.controls}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={styles.themeButton}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Auth Buttons */}
          <div style={styles.auth}>
            {user ? (
              <>
                <span style={styles.userWelcome}>Hi, {user.name}</span>
                <button onClick={logout} style={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button style={styles.loginBtn}>Login</button>
                </Link>
                <Link to="/signup">
                  <button style={styles.signupBtn}>Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: 'var(--header-bg)',
    padding: '8px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    flexShrink: 0,
  },
  logoLink: {
    textDecoration: 'none',
  },
  logoText: {
    color: 'var(--primary)',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    padding: '6px 10px',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    fontSize: '15px',
  },
  activeNavLink: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    fontWeight: '600',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  themeButton: {
    padding: '5px 8px',
    border: '1px solid var(--border)',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userWelcome: {
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '500',
  },
  loginBtn: {
    padding: '6px 12px',
    border: '1.5px solid var(--primary)',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  signupBtn: {
    padding: '6px 12px',
    border: 'none',
    backgroundColor: 'var(--primary)',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  logoutBtn: {
    padding: '6px 12px',
    border: '1.5px solid var(--error)',
    backgroundColor: 'transparent',
    color: 'var(--error)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
};

// Hover Effects (Injected CSS)
const hoverStyle = `
  @media (hover: hover) {
    a:hover:not(.active) {
      background-color: var(--hover-bg);
      color: var(--primary);
    }

    button:hover {
      transform: scale(1.05);
    }

    .loginBtn:hover {
      background-color: var(--primary);
      color: white;
    }

    .signupBtn:hover {
      background-color: var(--primary-dark);
    }

    .logoutBtn:hover {
      background-color: var(--error);
      color: white;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Header;