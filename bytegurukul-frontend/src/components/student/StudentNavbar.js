// src/components/student/StudentNavbar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function StudentNavbar() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Navigation items with icon classes
  const navItems = [
    { path: "/dashboard", label: "Home", icon: "fas fa-home" },
    { path: "/student/notifications", label: "Notifications", icon: "fas fa-bell", badge: 3 },
    { path: "/student/certificates", label: "Certificates", icon: "fas fa-award" },
    { path: "/student/profile", label: "Profile", icon: "fas fa-user" },
    { path: "/student/progress", label: "Progress", icon: "fas fa-chart-line" },
    { path: "/student/wishlist", label: "Wishlist", icon: "fas fa-heart" },
    { path: "/student/orders", label: "Orders", icon: "fas fa-shopping-bag" },
  ];

  const linkStyle = ({ isActive }) => ({
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
    background: isActive ? 'var(--hover-bg, rgba(37,99,235,0.10))' : 'transparent',
    fontWeight: isActive ? 700 : 500,
    fontSize: '15px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
  });

  const mobileLinkStyle = ({ isActive }) => ({
    padding: '14px 20px',
    borderRadius: '10px',
    textDecoration: 'none',
    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
    background: isActive ? 'var(--hover-bg, rgba(37,99,235,0.10))' : 'transparent',
    fontWeight: isActive ? 700 : 500,
    fontSize: '16px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
  });

  return (
    <>
      <nav style={{
        ...styles.nav,
        background: isScrolled ? 'var(--surface)' : 'var(--surface)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        borderBottom: isScrolled ? 'none' : '1px solid var(--border)',
      }}>
        <div style={styles.wrapper}>
          
          {/* Desktop Navigation Links */}
          <div style={styles.desktopLinks}>
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                style={linkStyle}
                className="nav-link"
              >
                <i className={item.icon} style={{ fontSize: '16px', width: '20px' }}></i>
                <span>{item.label}</span>
                {item.badge && (
                  <span style={styles.badge}>{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>

          {/* User Actions (Desktop) */}
          <div style={styles.actions}>
            <button
              style={styles.themeBtn}
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
            </button>
            
            <div style={styles.userDropdown}>
              <button 
                style={styles.userButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div style={styles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={styles.userText}>
                  {user?.name?.split(' ')[0] || 'Student'}
                </span>
                <i 
                  className="fas fa-chevron-down" 
                  style={{
                    fontSize: '12px',
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}
                ></i>
              </button>
              
              {isDropdownOpen && (
                <div style={styles.dropdownMenu}>
                  <div style={styles.dropdownHeader}>
                    <div style={styles.dropdownAvatar}>
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div style={styles.dropdownName}>{user?.name || 'Student'}</div>
                      <div style={styles.dropdownEmail}>{user?.email || 'student@example.com'}</div>
                    </div>
                  </div>
                  <button 
                    style={styles.dropdownItem}
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt" style={{ width: '20px' }}></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div style={styles.mobileOverlay}>
            <div style={styles.mobileMenu}>
              <div style={styles.mobileMenuHeader}>
                <div style={styles.mobileUserInfo}>
                  <div style={styles.mobileAvatar}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div style={styles.mobileUserName}>{user?.name || 'Student'}</div>
                    <div style={styles.mobileUserEmail}>{user?.email || 'student@example.com'}</div>
                  </div>
                </div>
                <button 
                  style={styles.mobileThemeBtn}
                  onClick={toggleTheme}
                >
                  <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>
              </div>

              <div style={styles.mobileNavItems}>
                {navItems.map((item) => (
                  <NavLink 
                    key={item.path}
                    to={item.path}
                    style={mobileLinkStyle}
                  >
                    <i className={item.icon} style={{ fontSize: '18px', width: '24px' }}></i>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span style={styles.mobileBadge}>{item.badge}</span>
                    )}
                  </NavLink>
                ))}
              </div>

              <div style={styles.mobileMenuFooter}>
                <button 
                  style={styles.mobileLogoutBtn}
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll Indicator */}
      <div style={styles.scrollIndicator}>
        <div 
          style={{
            ...styles.scrollProgress,
            width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`
          }} 
        />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav-link span {
            display: none;
          }
          .nav-link {
            padding: 10px 12px;
          }
        }
        
        @media (max-width: 768px) {
          .nav-link {
            padding: 8px;
          }
          .nav-link i {
            margin-right: 0;
          }
        }
        
        /* Smooth transitions */
        .nav-link {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Focus styles for accessibility */
        button:focus-visible,
        .nav-link:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}

const styles = {
  nav: {
    width: '100%',
    background: 'var(--surface)',
    position: 'sticky',
    top: '60px',
    zIndex: 1000,
    padding: '0',
    transition: 'all 0.3s ease',
  },
  
  wrapper: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '56px',
  },
  
  desktopLinks: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    flex: 1,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    padding: '4px 0',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  
  badge: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    background: 'var(--error)',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    minWidth: '16px',
    height: '16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
  },
  
  actions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginLeft: '20px',
  },
  
  themeBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'transparent',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    fontSize: '16px',
  },
  
  userDropdown: {
    position: 'relative',
  },
  
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    padding: '4px 8px 4px 4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  
  userText: {
    color: 'var(--text-primary)',
    fontWeight: 600,
    fontSize: '14px',
  },
  
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    width: '280px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    padding: '16px',
    zIndex: 1001,
    animation: 'slideDown 0.2s ease',
  },
  
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '16px',
    marginBottom: '12px',
    borderBottom: '1px solid var(--border)',
  },
  
  dropdownAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  
  dropdownName: {
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    fontSize: '15px',
  },
  
  dropdownEmail: {
    color: 'var(--text-secondary)',
    fontSize: '13px',
    marginTop: '2px',
  },
  
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--error)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  
  mobileMenuButton: {
    display: 'none',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    fontSize: '18px',
  },
  
  mobileOverlay: {
    position: 'fixed',
    top: '116px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
  },
  
  mobileMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '320px',
    height: '100%',
    background: 'var(--surface)',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  
  mobileMenuHeader: {
    padding: '20px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  mobileUserInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  
  mobileAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  
  mobileUserName: {
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    fontSize: '16px',
  },
  
  mobileUserEmail: {
    color: 'var(--text-secondary)',
    fontSize: '13px',
    marginTop: '2px',
  },
  
  mobileThemeBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  
  mobileNavItems: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'auto',
  },
  
  mobileBadge: {
    marginLeft: 'auto',
    background: 'var(--error)',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '20px',
    height: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 6px',
  },
  
  mobileMenuFooter: {
    padding: '20px',
    borderTop: '1px solid var(--border)',
  },
  
  mobileLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '14px',
    background: 'transparent',
    border: '1px solid var(--error)',
    borderRadius: '8px',
    color: 'var(--error)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'all 0.2s ease',
  },
  
  scrollIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'transparent',
    zIndex: 1001,
  },
  
  scrollProgress: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
    transition: 'width 0.1s ease',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .mobileMenuButton {
      display: flex !important;
    }
    
    .actions {
      display: none !important;
    }
    
    .nav-link span {
      display: none !important;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .nav-link span {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);