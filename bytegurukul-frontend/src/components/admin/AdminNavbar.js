// src/components/admin/AdminNavbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaHome, FaUser } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

function AdminNavbar() {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin-dashboard", icon: "🏠" },
    { label: "Users", path: "/admin/users", icon: "👥" },
    { label: "Courses", path: "/admin/courses", icon: "📚" },
    { label: "Instructors", path: "/admin/instructors", icon: "👨‍🏫" },
    { label: "Reports", path: "/admin/reports", icon: "📊" },
    { label: "Settings", path: "/admin/settings", icon: "⚙️" },
    { label: "Interviews", path: "/admin/interviews", icon: <FaCalendarAlt /> },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/admin-dashboard" style={styles.logo}>
          ByteGurukul <span style={styles.adminText}>Admin</span>
        </Link>
      </div>

      <div style={styles.center}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.link,
              ...(location.pathname === link.path ? styles.activeLink : {}),
            }}
          >
            <span style={styles.icon}>{link.icon}</span> {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'sticky',        // stays visible while scrolling
    top: 0,
    zIndex: 100,
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: 'white',
    padding: '18px 40px',
    display: 'flex',
    justifyContent: 'space-between',
     marginBottom: '8px',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',  // 🔥 subtle elevation
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)', // 👇 defines separation
    backdropFilter: 'blur(12px)', // modern translucent glow
  },
  left: { display: "flex", alignItems: "center", gap: "10px" },
  logo: {
    fontWeight: "700",
    fontSize: "20px",
    color: "white",
    textDecoration: "none",
  },
  adminText: {
    color: "#facc15",
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "5px",
  },
  center: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: '500',
    transition: 'opacity 0.3s ease',
    padding: '8px 12px',
    borderRadius: '6px',
  },
  activeLink: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontWeight: "600",
  },
  icon: {
    fontSize: "16px",
  },
  brand: {
    fontWeight: '700',
    fontSize: '22px',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

// Inject responsive styles
const responsiveStyles = `
  /* Mobile (320px - 768px) */
  @media (max-width: 768px) {
    .admin-navbar {
      padding: 12px 15px !important;
      flex-direction: column !important;
      gap: 15px !important;
    }

    .admin-navbar .left {
      order: 1 !important;
    }

    .admin-navbar .center {
      order: 2 !important;
      flex-direction: column !important;
      gap: 10px !important;
      width: 100% !important;
    }

    .admin-navbar .link {
      padding: 10px 15px !important;
      font-size: 14px !important;
      width: 100% !important;
      text-align: center !important;
    }

    .admin-navbar .logo {
      font-size: 18px !important;
    }

    .admin-navbar .adminText {
      font-size: 14px !important;
    }
  }

  /* Tablet (769px - 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .admin-navbar {
      padding: 15px 20px !important;
    }

    .admin-navbar .center {
      gap: 12px !important;
    }

    .admin-navbar .link {
      padding: 8px 10px !important;
      font-size: 14px !important;
    }
  }

  /* Desktop (1025px - 1440px) */
  @media (min-width: 1025px) and (max-width: 1440px) {
    .admin-navbar {
      padding: 18px 30px !important;
    }
  }

  /* Large Desktop (1441px - 1920px) */
  @media (min-width: 1441px) and (max-width: 1920px) {
    .admin-navbar {
      padding: 20px 40px !important;
    }

    .admin-navbar .link {
      padding: 10px 14px !important;
      font-size: 16px !important;
    }
  }

  /* TV/Ultra-wide (1921px+) */
  @media (min-width: 1921px) {
    .admin-navbar {
      padding: 25px 50px !important;
    }

    .admin-navbar .link {
      padding: 12px 16px !important;
      font-size: 17px !important;
    }

    .admin-navbar .logo {
      font-size: 24px !important;
    }

    .admin-navbar .adminText {
      font-size: 18px !important;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default AdminNavbar;