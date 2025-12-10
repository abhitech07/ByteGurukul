import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaBars, FaTimes } from 'react-icons/fa'; // FIXED: Imported icons for mobile menu

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // FIXED: State for mobile menu

  const isActive = (path) => location.pathname === path;

  // Helper to safely get the display name
  const getDisplayName = () => {
    if (!user) return '';
    return user.username || user.name || 'Student';
  };

  const getDashboardRoute = () => {
    if (!user) return "/dashboard";
    const role = user.role ? user.role.toLowerCase() : "";

    if (role === 'admin') {
      return "/admin-dashboard";
    } else if (role === 'instructor') {
      return "/instructor/courses"; 
    } else {
      return "/dashboard"; 
    }
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <h1 style={styles.logoText}>ByteGurukul</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav style={styles.navDesktop}>
          <Link to="/" style={{ ...styles.navLink, ...(isActive('/') ? styles.activeNavLink : {}) }}>
            Home
          </Link>
          <Link to="/courses" style={{ ...styles.navLink, ...(isActive('/courses') ? styles.activeNavLink : {}) }}>
            Courses
          </Link>
          <Link to="/internship" style={{ ...styles.navLink, ...(isActive('/internship') ? styles.activeNavLink : {}) }}>
            Internship
          </Link>
          
          <Link to="/pyq-papers" style={{ ...styles.navLink, ...(isActive('/pyq-papers') ? styles.activeNavLink : {}) }}>
            PYQ Papers
          </Link>

          <Link to="/projects" style={{ ...styles.navLink, ...(isActive('/projects') ? styles.activeNavLink : {}) }}>
            Projects
          </Link>
          
          {user && (
            <Link 
              to={getDashboardRoute()} 
              style={{ 
                ...styles.navLink, 
                ...(isActive(getDashboardRoute()) ? styles.activeNavLink : {}) 
              }}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Controls (Theme & Auth) for Desktop */}
        <div style={styles.controlsDesktop}>
          <button
            onClick={toggleTheme}
            style={styles.themeButton}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <div style={styles.auth}>
            {user ? (
              <>
                <span style={styles.userWelcome}>Hi, {getDisplayName()}</span>
                <button onClick={logout} style={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"><button style={styles.loginBtn}>Login</button></Link>
                <Link to="/signup"><button style={styles.signupBtn}>Sign Up</button></Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button style={styles.hamburgerBtn} onClick={toggleMenu}>
           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
           <Link to="/" onClick={toggleMenu} style={styles.mobileNavLink}>Home</Link>
           <Link to="/courses" onClick={toggleMenu} style={styles.mobileNavLink}>Courses</Link>
           <Link to="/internship" onClick={toggleMenu} style={styles.mobileNavLink}>Internship</Link>
           <Link to="/pyq-papers" onClick={toggleMenu} style={styles.mobileNavLink}>PYQ Papers</Link>
           <Link to="/projects" onClick={toggleMenu} style={styles.mobileNavLink}>Projects</Link>
           {user && <Link to={getDashboardRoute()} onClick={toggleMenu} style={styles.mobileNavLink}>Dashboard</Link>}
           
           <div style={styles.mobileControls}>
              <button onClick={toggleTheme} style={styles.themeButton}>{isDarkMode ? 'Switch Light ☀️' : 'Switch Dark 🌙'}</button>
              {user ? (
                <button onClick={() => { logout(); toggleMenu(); }} style={styles.logoutBtn}>Logout ({getDisplayName()})</button>
              ) : (
                <div style={{display:'flex', gap:'10px'}}>
                  <Link to="/login" onClick={toggleMenu}><button style={styles.loginBtn}>Login</button></Link>
                  <Link to="/signup" onClick={toggleMenu}><button style={styles.signupBtn}>Sign Up</button></Link>
                </div>
              )}
           </div>
        </div>
      )}
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
  logo: { flexShrink: 0 },
  logoLink: { textDecoration: 'none' },
  logoText: {
    color: 'var(--primary)',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  // Desktop Nav - Hidden on mobile via media query injection logic below or CSS
  navDesktop: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  controlsDesktop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  hamburgerBtn: {
    display: 'none', // Hidden by default, shown on mobile via media query below
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: 'var(--text-primary)',
    cursor: 'pointer'
  },
  mobileMenu: {
    position: 'absolute',
    top: '60px',
    left: 0,
    right: 0,
    backgroundColor: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: 'var(--text-primary)',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 0',
    borderBottom: '1px solid var(--border)'
  },
  mobileControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '10px'
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
  themeButton: {
    padding: '5px 8px',
    border: '1px solid var(--border)',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'var(--text-primary)'
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
  },
};

// Inject Media Queries for Responsiveness
const responsiveStyles = `
  @media (max-width: 768px) {
    /* Hide desktop nav elements */
    header nav { display: none !important; }
    header .auth { display: none !important; } 
    /* The controls container needs to hide too, except maybe theme toggle? 
       For simplicity, hide all desktop controls and show hamburger */
    div[style*="display: flex"][style*="gap: 12px"] { display: none !important; } 
    
    /* Show Hamburger */
    button[style*="display: none"] { display: block !important; }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default Header;