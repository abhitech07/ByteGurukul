import React from "react";
import {
  FaBookOpen,
  FaFileAlt,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";

function Resources() {
  const resources = [
    {
      icon: <FaBookOpen />,
      title: "Lecture Notes",
      desc: "Download well-structured notes for AKTU B.Tech & M.Tech Computer Science subjects.",
      link: "#",
      color: "#3b82f6",
    },
    {
      icon: <FaFileAlt />,
      title: "Previous Year Papers (PYQs)",
      desc: "Access solved PYQs to prepare smarter for semester and university exams.",
      link: "#",
      color: "#9333ea",
    },
    {
      icon: <FaLaptopCode />,
      title: "Projects & Source Code",
      desc: "Explore real-world ready projects across web, AI, and cybersecurity domains.",
      link: "#",
      color: "#10b981",
    },
    {
      icon: <FaCloudDownloadAlt />,
      title: "E-books & PDFs",
      desc: "Download important textbooks and research materials in PDF format.",
      link: "#",
      color: "#f59e0b",
    },
    {
      icon: <FaExternalLinkAlt />,
      title: "Useful Tools & Websites",
      desc: "Explore handpicked developer tools, APIs, and learning platforms.",
      link: "#",
      color: "#ef4444",
    },
  ];

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>ByteGurukul Resources 📚</h1>
        <p style={styles.heroSubtitle}>
          Your one-stop digital library for learning, projects, and preparation.
        </p>
      </section>

      <section style={styles.resourcesSection}>
        <div style={styles.resourcesGrid}>
          {resources.map((res, index) => (
            <div key={index} style={styles.resourceCard}>
              <div
                style={{
                  ...styles.iconCircle,
                  backgroundColor: res.color,
                }}
              >
                {res.icon}
              </div>
              <h3 style={styles.resourceTitle}>{res.title}</h3>
              <p style={styles.resourceDesc}>{res.desc}</p>
              <a href={res.link} style={styles.resourceButton}>
                Access Resource
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* 🎨 Modern ByteGurukul Style */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #9333ea)",
    padding: "60px 30px",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#dbeafe",
    opacity: 0.9,
  },
  resourcesSection: {
    display: "flex",
    justifyContent: "center",
  },
  resourcesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
  },
  resourceCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(14px)",
    borderRadius: "16px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  iconCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "28px",
    color: "white",
  },
  resourceTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  resourceDesc: {
    fontSize: "15px",
    color: "#f1f5f9",
    marginBottom: "20px",
    minHeight: "70px",
  },
  resourceButton: {
    background: "linear-gradient(90deg, #60a5fa, #7c3aed)",
    padding: "10px 20px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s ease",
  },
};

/* Hover Effects */
const hoverStyles = `
  .resourceCard:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(96,165,250,0.3);
  }
  a:hover {
    opacity: 0.9;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Resources;
