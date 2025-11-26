import React, { useEffect } from "react";

// Inline SVG Icons to replace react-icons dependency completely
const LinkedInIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-24.4 8.6-44.5 23.6-61.4-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 37 25.8 61.4 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const EnvelopeIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
  </svg>
);

function Footer() {
  // Inject styles once on mount
  useEffect(() => {
    const styleId = "bytegurukul-footer-styles";
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.innerText = hoverStyles;
      document.head.appendChild(styleSheet);
    }
  }, []);

  return (
    <footer style={styles.footer} className="bytegurukul-footer">
      <div style={styles.container}>
        {/* Left Section: Brand & Social */}
        <div style={styles.brandSection}>
          <h2 style={styles.brand}>ByteGurukul</h2>
          <p style={styles.desc}>
            Empowering AKTU students with accessible, high-quality learning resources,
            hands-on projects, and professional growth opportunities.
          </p>
          <div style={styles.socialIcons}>
            <a
              href="https://linkedin.com/in/abhitech07"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.iconLink}
              className="footer-icon"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/abhitech07"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.iconLink}
              className="footer-icon"
            >
              <GithubIcon />
            </a>
            <a
              href="mailto:abhijeet.kr.pandey.07@gmail.com"
              style={styles.iconLink}
              className="footer-icon"
            >
              <EnvelopeIcon />
            </a>
          </div>
        </div>

        {/* Middle Section: Quick Links */}
        <div style={styles.linkSection}>
          <h4 style={styles.heading}>Quick Links</h4>
          {[
            { label: "Courses", href: "/courses" },
            { label: "Resources", href: "/resources" },
            { label: "Projects", href: "/projects" },
            { label: "Internship", href: "/internship" },
          ].map((link) => (
            <a key={link.label} href={link.href} style={styles.link} className="footer-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section: Support */}
        <div style={styles.linkSection}>
          <h4 style={styles.heading}>Support</h4>
          {[
            { label: "Help Center", href: "/help" },
            { label: "Contact Us", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms & Conditions", href: "/terms" },
          ].map((link) => (
            <a key={link.label} href={link.href} style={styles.link} className="footer-link">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <p style={styles.copyText}>
          © 2025 <strong>ByteGurukul</strong> — Designed with ❤️ by Abhijeet Kumar Pandey
        </p>
      </div>
    </footer>
  );
}

/* 🎨 Modern Footer Styles */
const styles = {
  footer: {
    background: "linear-gradient(135deg, #1e3a8a, #6d28d9)",
    color: "white",
    padding: "60px 20px 20px",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
    position: "relative",
    zIndex: 10,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "40px",
  },
  brandSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  brand: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "0.5px",
  },
  desc: {
    color: "#e0e7ff",
    fontSize: "15px",
    lineHeight: "1.6",
    maxWidth: "360px",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  iconLink: {
    color: "#e0e7ff",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  linkSection: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#fff",
    position: "relative",
  },
  link: {
    color: "#dbeafe",
    textDecoration: "none",
    fontSize: "15px",
    transition: "all 0.3s ease",
    width: "fit-content",
  },
  bottomBar: {
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,0.15)",
    marginTop: "50px",
    paddingTop: "25px",
  },
  copyText: {
    fontSize: "14px",
    color: "#cbd5e1",
  },
};

/* ✨ Scoped Hover Animations */
const hoverStyles = `
  /* Target only footer links to prevent global pollution */
  .bytegurukul-footer .footer-link:hover {
    color: #ffffff !important;
    transform: translateX(5px); /* Moves text slightly right */
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
  }

  .bytegurukul-footer .footer-icon:hover {
    color: #ffffff !important;
    transform: translateY(-3px) scale(1.1);
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }
  
  /* 🛑 FIX: Ensure text remains white on click/focus */
  .bytegurukul-footer a:active, 
  .bytegurukul-footer a:focus {
    background-color: transparent !important;
    color: #ffffff !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

export default Footer;