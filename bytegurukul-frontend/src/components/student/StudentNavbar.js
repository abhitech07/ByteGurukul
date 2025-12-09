// src/components/student/StudentNavbar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Home, 
  Bell, 
  Award, 
  User, 
  TrendingUp, 
  Heart, 
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';

export default function StudentNavbar() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

  // Navigation items with icons
  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/student/notifications", label: "Notifications", icon: Bell, badge: 3 },
    { path: "/student/certificates", label: "Certificates", icon: Award },
    { path: "/student/profile", label: "Profile", icon: User },
    { path: "/student/progress", label: "Progress", icon: TrendingUp },
    { path: "/student/wishlist", label: "Wishlist", icon: Heart },
    { path: "/student/orders", label: "Orders", icon: ShoppingBag },
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
    '&:hover': {
      background: 'var(--hover-bg, rgba(37,99,235,0.05))',
      transform: 'translateY(-1px)',
    }
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
                <item.icon size={18} />
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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Actions (Desktop) */}
          <div style={styles.actions}>
            <button
              style={styles.themeBtn}
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
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
                <ChevronDown size={16} style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s'
                }} />
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
                    <LogOut size={16} />
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
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div style={styles.mobileNavItems}>
                {navItems.map((item) => (
                  <NavLink 
                    key={item.path}
                    to={item.path}
                    style={mobileLinkStyle}
                  >
                    <item.icon size={20} />
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
                  <LogOut size={20} />
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
          .nav-link svg {
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
    '&:hover': {
      background: 'var(--hover-bg)',
      transform: 'scale(1.05)',
    },
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
    '&:hover': {
      background: 'var(--hover-bg)',
    },
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
    '&:hover': {
      background: 'rgba(239,68,68,0.1)',
    },
  },
  
  mobileMenuButton: {
    display: 'none',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'var(--hover-bg)',
    },
  },
  
  mobileOverlay: {
    position: 'fixed',
    top: '116px', // Top navbar height + this navbar height
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--overlay)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
    animation: 'fadeIn 0.2s ease',
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
    padding: '8px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    '&:hover': {
      background: 'rgba(239,68,68,0.1)',
    },
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

// Media queries
const mediaQueries = {
  desktop: '@media (min-width: 1025px)',
  tablet: '@media (max-width: 1024px) and (min-width: 769px)',
  mobile: '@media (max-width: 768px)',
};

// Apply responsive styles
Object.assign(styles.desktopLinks, {
  [mediaQueries.tablet]: {
    gap: '2px',
  },
  [mediaQueries.mobile]: {
    display: 'none',
  },
});

Object.assign(styles.mobileMenuButton, {
  [mediaQueries.mobile]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Object.assign(styles.actions, {
  [mediaQueries.mobile]: {
    display: 'none',
  },
});