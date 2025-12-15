import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

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
    <header style={styles.header} className="main-header">
      <div style={styles.container} className="header-container">
        {/* Logo */}
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <h1 style={styles.logoText}>ByteGurukul</h1>
          </Link>
        </div>

        {/* Desktop Navigation - Added className for responsive targeting */}
        <nav style={styles.navDesktop} className="desktop-nav">
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

        {/* Controls (Theme & Auth) for Desktop - Added className */}
        <div style={styles.controlsDesktop} className="desktop-controls">
          <button
            onClick={toggleTheme}
            style={styles.themeButton}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <div style={styles.auth} className="desktop-auth">
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
        <button style={styles.hamburgerBtn} onClick={toggleMenu} className="hamburger-btn">
           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu} className="mobile-menu-dropdown">
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
                  <Link to="/login" onClick={toggleMenu} style={{flex: 1}}><button style={{...styles.loginBtn, width: '100%'}}>Login</button></Link>
                  <Link to="/signup" onClick={toggleMenu} style={{flex: 1}}><button style={{...styles.signupBtn, width: '100%'}}>Sign Up</button></Link>
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
    zIndex: 1000, // Increased z-index for safety
    width: '100%',
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    width: '100%',
    maxWidth: '1440px', // Increased for large screens
    margin: '0 auto',
  },
  logo: { flexShrink: 0 },
  logoLink: { textDecoration: 'none' },
  logoText: {
    color: 'var(--primary)',
    fontSize: '24px', // Slightly larger
    fontWeight: 'bold',
    margin: 0,
  },
  navDesktop: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: '0 20px',
  },
  controlsDesktop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
  },
  hamburgerBtn: {
    display: 'none', 
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    padding: '5px',
    zIndex: 1001,
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    zIndex: 999,
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: 'var(--text-primary)',
    fontSize: '16px',
    fontWeight: '500',
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
    display: 'block',
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
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    fontSize: '15px',
    whiteSpace: 'nowrap',
  },
  activeNavLink: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    fontWeight: '600',
  },
  themeButton: {
    padding: '6px 10px',
    border: '1px solid var(--border)',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    whiteSpace: 'nowrap',
  },
  loginBtn: {
    padding: '8px 16px',
    border: '1.5px solid var(--primary)',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  signupBtn: {
    padding: '8px 16px',
    border: 'none',
    backgroundColor: 'var(--primary)',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  logoutBtn: {
    padding: '8px 16px',
    border: '1.5px solid var(--error)',
    backgroundColor: 'transparent',
    color: 'var(--error)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

// Robust Responsive Styles Injection
const responsiveStyles = `
  /* Tablet and Mobile Breakpoint */
  @media (max-width: 992px) {
    .desktop-nav { display: none !important; }
    .desktop-auth { display: none !important; }
    /* Hide theme button in header control group, show in mobile menu instead? 
       Actually, kept it in header for quick access, but adjusted layout */
    
    .hamburger-btn { display: block !important; }
    
    /* Ensure header container handles space correctly */
    .header-container {
      padding: 0 5px;
    }
  }

  /* Large Desktop / TV */
  @media (min-width: 1441px) {
    .header-container {
      max-width: 1600px !important;
    }
    .desktop-nav {
      gap: 30px !important;
    }
    .nav-link {
      font-size: 18px !important;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default Header;