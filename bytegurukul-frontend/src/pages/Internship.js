// src/pages/student/Internship.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Internship() {
  const navigate = useNavigate();
  const internships = [
    {
      title: "Android Development",
      category: "Mobile Development",
      duration: "3 months",
      level: "Beginner to Advanced",
      skills: ["Java", "Kotlin", "Android Studio", "Firebase"],
      projects: "5 Real Projects",
      stipend: "Unpaid + Certificate",
      icon: "📱",
    },
    {
      title: "Cyber Security",
      category: "Security",
      duration: "4 months",
      level: "Intermediate",
      skills: ["Network Security", "Ethical Hacking", "Cryptography", "Pen-Testing"],
      projects: "Security Audits",
      stipend: "Unpaid + Certificate",
      icon: "🛡️",
    },
    {
      title: "Python Development",
      category: "Backend Development",
      duration: "3 months",
      level: "Beginner Friendly",
      skills: ["Python", "Django", "Flask", "REST APIs"],
      projects: "4 Backend Projects",
      stipend: "Unpaid + Certificate",
      icon: "🐍",
    },
    {
      title: "Web Development",
      category: "Full Stack",
      duration: "4 months",
      level: "Beginner to Advanced",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      projects: "6 Full Stack Projects",
      stipend: "Unpaid + Certificate",
      icon: "💻",
    },
    {
      title: "Data Analyst",
      category: "Data Science",
      duration: "3 months",
      level: "Intermediate",
      skills: ["Python", "SQL", "Excel", "Visualization"],
      projects: "Real Data Analysis",
      stipend: "Unpaid + Certificate",
      icon: "📊",
    },
    {
      title: "UI/UX Design",
      category: "Design",
      duration: "2 months",
      level: "Beginner Friendly",
      skills: ["Figma", "Wireframes", "Prototyping"],
      projects: "3 Design Projects",
      stipend: "Unpaid + Certificate",
      icon: "🎨",
    },
  ];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Internship Programs</h1>
        <p style={styles.subtitle}>
          Gain real-world experience with our industry-focused internship tracks.
        </p>
      </div>

      {/* INTERNSHIP GRID */}
      <div style={styles.grid}>
        {internships.map((intern, i) => (
          <div key={i} className="internship-card" style={styles.card}>
            {/* Header */}
            <div style={styles.cardHeader}>
              <div style={styles.icon}>{intern.icon}</div>
              <div>
                <h3 style={styles.cardTitle}>{intern.title}</h3>
                <div style={styles.category}>{intern.category}</div>
              </div>
            </div>

            {/* Details */}
            <div style={styles.details}>
              <Detail label="Duration" value={intern.duration} />
              <Detail label="Level" value={intern.level} />
              <Detail label="Projects" value={intern.projects} />
              <Detail label="Stipend" value={intern.stipend} />
            </div>

            {/* Skills */}
            <div>
              <h4 style={styles.skillsTitle}>Skills You'll Learn:</h4>
              <div style={styles.skillsList}>
                {intern.skills.map((s, index) => (
                  <span key={index} style={styles.skillTag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
            className="apply-btn"
             style={styles.applyButton}
             onClick={() =>
               navigate("/internship/apply", { state: { internship: intern } })
              }
                 >
                 Apply Now
               </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Component for details */
function Detail({ label, value }) {
  return (
    <div style={styles.detailItem}>
      <span style={styles.detailLabel}>{label}:</span>
      <span style={styles.detailValue}>{value}</span>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    padding: "40px 20px",
    minHeight: "100vh",
    background: "var(--background)",
    color: "var(--text-primary)",
  },

  header: { textAlign: "center", marginBottom: 50 },
  title: { fontSize: 42, fontWeight: 700, color: "var(--primary)" },
  subtitle: {
    fontSize: 18,
    color: "var(--text-secondary)",
    maxWidth: 600,
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 30,
    maxWidth: 1300,
    margin: "0 auto",
  },

  /* Card */
  card: {
    background: "var(--surface)",
    padding: 25,
    borderRadius: 15,
    boxShadow: "var(--shadow)",
    border: "1px solid var(--border)",
    transition: "0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    borderBottom: "2px solid var(--border)",
    paddingBottom: 15,
  },

  icon: { fontSize: 40 },
  cardTitle: { fontSize: 22, fontWeight: 700, margin: 0 },
  category: {
    fontSize: 13,
    background: "var(--hover-bg)",
    padding: "4px 12px",
    borderRadius: 20,
    color: "var(--text-secondary)",
    marginTop: 4,
  },

  /* Detail Items */
  details: { display: "flex", flexDirection: "column", gap: 10 },

  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
  },
  detailLabel: { color: "var(--text-secondary)" },
  detailValue: { fontWeight: 600, color: "var(--text-primary)" },

  /* Skills */
  skillsTitle: { fontSize: 16, marginBottom: 12, fontWeight: 600 },
  skillsList: { display: "flex", gap: 8, flexWrap: "wrap" },

  skillTag: {
    background: "var(--primary-bg, #dbeafe)",
    padding: "6px 12px",
    borderRadius: 15,
    color: "var(--primary)",
    fontSize: 12,
    fontWeight: 500,
  },

  /* Apply button */
  applyButton: {
    marginTop: "auto",
    background: "var(--primary)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
    transition: "0.3s",
  },
};

/* Inject hover styles */
const css = `
.internship-card:hover {
  transform: translateY(-6px);
  box-shadow: rgba(0,0,0,0.15) 0px 12px 25px;
}
.apply-btn:hover {
  background: var(--primary-dark);
}
`;
const sheet = document.createElement("style");
sheet.innerHTML = css;
document.head.appendChild(sheet);

export default Internship;