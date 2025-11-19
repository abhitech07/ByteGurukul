import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaLaptopCode,
  FaFileAlt,
  FaUsers,
  FaLock,
  FaDatabase,
  FaUserGraduate,
  FaBook,
  FaTrophy,
  FaArrowUp,
} from "react-icons/fa";
import { ReactTyped } from "react-typed";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            Welcome to <span style={{ color: "#f1f5ff" }}>ByteGurukul</span>
          </h1>
          <h3 style={styles.heroTagline}>
            <ReactTyped
              strings={[
                "Learn. Build. Excel.",
                "Empowering AKTU Students.",
                "Learn Smart — Learn Secure.",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
          </h3>
          <p style={styles.heroSubtitle}>
            Your complete learning platform for <strong>AKTU B.Tech</strong> &{" "}
            <strong>M.Tech</strong> Computer Science. Access courses, projects,
            internships, and previous year questions — all in one place.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/courses" style={styles.primaryButton}>
              Explore Courses
            </Link>
            <Link to="/signup" style={styles.secondaryButton}>
              Sign Up Free
            </Link>
          </div>
        </div>

        <div style={styles.heroRight}>
          <img
            src="/hero-learning.png"
            alt="Learning Illustration"
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* QUICK STATS */}
      <section style={styles.statsSection} data-aos="fade-up">
        <div style={styles.statCard}>
          <FaUsers style={styles.statIcon} />
          <h3 style={styles.statNumber}>1,200+</h3>
          <p style={styles.statText}>Active Students</p>
        </div>
        <div style={styles.statCard}>
          <FaBookOpen style={styles.statIcon} />
          <h3 style={styles.statNumber}>50+</h3>
          <p style={styles.statText}>Courses & Notes</p>
        </div>
        <div style={styles.statCard}>
          <FaLaptopCode style={styles.statIcon} />
          <h3 style={styles.statNumber}>80+</h3>
          <p style={styles.statText}>Live Projects</p>
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section style={styles.categorySection} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>Explore Our Top Categories</h2>
        <div style={styles.categoryGrid}>
          <div style={styles.categoryCard}>
            <FaLaptopCode style={styles.categoryIcon} />
            <h3>Web Development</h3>
            <p>Learn HTML, CSS, JS, and frameworks like React.</p>
          </div>
          <div style={styles.categoryCard}>
            <FaLock style={styles.categoryIcon} />
            <h3>Cyber Security</h3>
            <p>Understand attacks, defenses, and ethical hacking.</p>
          </div>
          <div style={styles.categoryCard}>
            <FaDatabase style={styles.categoryIcon} />
            <h3>Data Science</h3>
            <p>Master Python, Machine Learning, and AI projects.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BYTEGURUKUL */}
      <section style={styles.features} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>Why Choose ByteGurukul?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <FaBookOpen style={{ fontSize: "60px", color: "#2563eb" }} />
            <h3 style={styles.featureTitle}>Study Resources</h3>
            <p style={styles.featureDesc}>
              Download notes, books, and presentations for all CS courses.
            </p>
          </div>
          <div style={styles.featureCard}>
            <FaLaptopCode style={{ fontSize: "60px", color: "#7c3aed" }} />
            <h3 style={styles.featureTitle}>Domain Projects</h3>
            <p style={styles.featureDesc}>
              Purchase ready-to-use projects categorized by domains.
            </p>
          </div>
          <div style={styles.featureCard}>
            <FaFileAlt style={{ fontSize: "60px", color: "#2563eb" }} />
            <h3 style={styles.featureTitle}>PYQ Papers</h3>
            <p style={styles.featureDesc}>
              Access previous year question papers with solutions.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.testimonials} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>What Students Say</h2>
        <Slider {...sliderSettings}>
          <div style={styles.testimonialCard}>
            <p>
              “ByteGurukul helped me understand Cyber Security in simple
              terms.”
            </p>
            <h4>- Priya Sharma, AKTU</h4>
          </div>
          <div style={styles.testimonialCard}>
            <p>“I built my final-year project using their resources!”</p>
            <h4>- Rohit Verma, M.Tech Student</h4>
          </div>
          <div style={styles.testimonialCard}>
            <p>“One-stop solution for all study and project needs!”</p>
            <h4>- Aditi Singh, CSE Department</h4>
          </div>
        </Slider>
      </section>

      {/* ABOUT SECTION */}
      <section style={styles.about} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>About the Creator</h2>
        <div style={styles.aboutContainer}>
          <img
            src="/abhijeet.jpg"
            alt="Abhijeet Kumar Pandey"
            style={styles.aboutImage}
          />
          <div style={styles.aboutContent}>
            <h3 style={styles.aboutName}>Abhijeet Kumar Pandey</h3>
            <p style={styles.aboutRole}>Cyber Security Analyst | M.Tech (CSE)</p>
            <p style={styles.aboutBio}>
              I’m passionate about technology, cybersecurity, and education.
              ByteGurukul is my initiative to make learning accessible for AKTU
              B.Tech & M.Tech students — providing quality study materials,
              projects, and guidance for everyone who dreams big.
            </p>
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section style={styles.journey} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>How ByteGurukul Works</h2>
        <div style={styles.journeySteps}>
          <div>
            <FaUserGraduate style={styles.journeyIcon} />
            <h3>1. Create an Account</h3>
            <p>Sign up for free to access courses and resources.</p>
          </div>
          <div>
            <FaBook style={styles.journeyIcon} />
            <h3>2. Learn from Courses</h3>
            <p>Study using high-quality notes, videos, and projects.</p>
          </div>
          <div>
            <FaTrophy style={styles.journeyIcon} />
            <h3>3. Get Certified</h3>
            <p>Complete projects and earn ByteGurukul certification.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Join ByteGurukul Today!</h2>
        <p style={styles.ctaText}>
          Learn, collaborate, and grow with thousands of AKTU students.
        </p>
        <Link to="/signup" style={styles.ctaButton}>
          Get Started Now
        </Link>
      </section>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <button onClick={scrollToTop} style={styles.scrollButton}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

/* ---------------------------- STYLES ---------------------------- */
const styles = {
  container: {
    backgroundColor: "#f3f4f6",
    color: "#1e293b",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "100px 40px",
    background: "linear-gradient(135deg, #1e3a8a, #6d28d9)",
    color: "white",
  },
  heroLeft: { flex: 1, paddingRight: "40px" },
  heroRight: { flex: 1, display: "flex", justifyContent: "center" },
  heroImage: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
  },
  heroTitle: { fontSize: "52px", marginBottom: "10px", fontWeight: "800" },
  heroTagline: { fontSize: "22px", fontWeight: "600", color: "#fde047" },
  heroSubtitle: {
    fontSize: "18px",
    marginBottom: "40px",
    opacity: "0.95",
    lineHeight: 1.6,
  },

  /* 🌟 Updated Button Styles */
  heroButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "25px",
  },
  primaryButton: {
    padding: "14px 38px",
    background: "linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)",
    color: "#1e3a8a",
    borderRadius: "40px",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(255,255,255,0.3)",
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    padding: "14px 38px",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    borderRadius: "40px",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },

  /* Other section styles unchanged */
  statsSection: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "40px",
    padding: "60px 20px",
  },
  statCard: {
    textAlign: "center",
    width: "200px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  statIcon: { fontSize: "40px", color: "#2563eb" },
  statNumber: { fontSize: "28px", fontWeight: "700", color: "#1e3a8a" },
  statText: { color: "#475569" },

  categorySection: {
    padding: "80px 20px",
    background: "#f8fafc",
    textAlign: "center",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "38px",
    marginBottom: "50px",
    color: "#1e293b",
    fontWeight: "700",
  },
  categoryGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  categoryCard: {
    background: "#ffffff",
    width: "300px",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    color: "#1e293b",
  },
  categoryIcon: { fontSize: "45px", color: "#7c3aed" },

  features: {
    padding: "100px 20px",
    background: "linear-gradient(180deg, #f9fafb 0%, #e0e7ff 100%)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureCard: {
    background: "#fff",
    padding: "45px 35px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.15)",
    textAlign: "center",
  },

  testimonials: {
    padding: "100px 20px",
    backgroundColor: "#f8fafc",
    textAlign: "center",
  },
  testimonialCard: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    margin: "0 auto",
    color: "#1e293b",
  },

  about: {
    padding: "100px 20px",
    background: "linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)",
    textAlign: "center",
  },
  aboutImage: {
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  aboutContent: { maxWidth: "550px", margin: "auto" },
  aboutName: { fontSize: "28px", color: "#1e3a8a" },
  aboutRole: { fontSize: "18px", color: "#9333ea", marginBottom: "20px" },
  aboutBio: { fontSize: "16px", color: "#334155" },

  journey: {
    padding: "100px 20px",
    background: "#f9fafb",
    textAlign: "center",
  },
  journeySteps: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
  },
  journeyIcon: { fontSize: "50px", color: "#2563eb" },

  ctaSection: {
    padding: "80px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1e40af, #7c3aed)",
    color: "white",
  },
  ctaTitle: { fontSize: "38px", marginBottom: "20px" },
  ctaText: { fontSize: "18px", marginBottom: "30px" },
  ctaButton: {
    backgroundColor: "white",
    color: "#1e3a8a",
    padding: "12px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
  },

  scrollButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "12px",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
  },
};

/* Hover animations */
const hoverStyles = `
  a:hover {
    transform: translateY(-2px);
  }

  a[href="/courses"]:hover {
    background: linear-gradient(90deg, #e0e7ff, #ffffff);
    color: #1e40af;
    box-shadow: 0 8px 18px rgba(255,255,255,0.4);
  }

  a[href="/signup"]:hover {
    background-color: #ffffff;
    color: #1e3a8a;
    border-color: #ffffff;
    box-shadow: 0 8px 18px rgba(255,255,255,0.4);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Home;