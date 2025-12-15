import { FaMobile } from 'react-icons/fa';
import { FaCloud } from 'react-icons/fa';
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaLaptopCode,
  FaFileAlt,
  FaUsers,
  FaLock,
  FaDatabase,
  FaUserGraduate,
  FaTrophy,
  FaArrowUp,
  FaSearch,
  FaCertificate,
  FaBriefcase,
  FaChalkboardTeacher,
  FaEnvelope,
  FaStar,
  FaPlay,
  FaRegClock,
  FaChartLine
} from "react-icons/fa";
import { ReactTyped } from "react-typed";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../services/api"; 

// --- CUSTOM HOOK: Number Counter Animation ---
export const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValue = parseInt(String(end).replace(/,/g, "").replace(/\+/g, ""), 10) || 0;
    if (endValue === 0) return;

    const totalFrames = Math.round(duration / 16);
    const increment = endValue / totalFrames;
    
    let frame = 0;
    const counter = () => {
      frame++;
      const currentCount = Math.min(Math.floor(increment * frame), endValue);
      setCount(currentCount);
      if (frame < totalFrames) {
        requestAnimationFrame(counter);
      }
    };
    
    requestAnimationFrame(counter);
  }, [end, duration]);

  return count;
};

// --- COMPONENT: Animated Stat Card ---
const AnimatedStatCard = ({ icon: Icon, number, text, color }) => {
  const animatedNumber = useCounter(number);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.statCard,
        transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 8px 25px rgba(0,0,0,0.1)',
        borderLeft: `5px solid ${color}`
      }}
      className="stat-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="zoom-in"
    >
      <Icon style={{ fontSize: "50px", color, marginBottom: "15px" }} className="stat-icon"/>
      <h3 style={styles.statNumber}>
        {animatedNumber}{number.includes("+") ? "+" : ""}
      </h3>
      <p style={styles.statText}>{text}</p>
    </div>
  );
};

// --- Floating Particle Background Animation ---
const FloatingBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Improved resize handler
    const setDimensions = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    setDimensions();
    
    const particles = [];
    // Adjust particle count based on screen width for performance
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(79, 70, 229, ${Math.random() * 0.3})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('resize', setDimensions);
    return () => window.removeEventListener('resize', setDimensions);
  }, []);
  
  return <canvas ref={canvasRef} style={styles.floatingCanvas} />;
};

// --- ADVANCED FEATURE 1: Instant Search Component ---
const DynamicSearchBar = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
        if (searchQuery.length > 2) {
            setIsSearching(true);
            try {
                const response = await api.get(`/courses?search=${searchQuery}`);
                if (response && response.data) {
                    setSearchResults(response.data.slice(0, 5));
                }
            } catch (error) {
                const MOCK_RESULTS = [
                    { id: 1, title: "Web Development Bootcamp", category: "Web Dev", rating: 4.8 },
                    { id: 2, title: "Python for Data Science", category: "Data Science", rating: 4.7 }
                ].filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
                setSearchResults(MOCK_RESULTS);
            }
        } else {
            setSearchResults([]);
        }
    };

    const timer = setTimeout(fetchResults, 400); 
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleResultClick = (courseId) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div style={styles.searchWrapper} data-aos="fade-up" data-aos-delay="600" className="hero-search-wrapper">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.length > 0) {
            navigate(`/courses?search=${searchQuery}`);
          }
        }} 
        style={styles.searchContainer}
        className="search-form-container"
      >
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          className="hero-search-input"
          onFocus={() => setIsSearching(true)}
          onBlur={() => setTimeout(() => setIsSearching(false), 200)}
        />
        <button type="submit" style={styles.searchButton} className="hero-search-btn">
          Search
        </button>
      </form>
      
      {searchResults.length > 0 && isSearching && (
        <div style={styles.searchResultsDropdown} className="search-results-dropdown">
          {searchResults.map((course, index) => (
            <div 
              key={course.id} 
              style={{
                ...styles.searchResultItem,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleResultClick(course.id)}
              className="search-result-item"
            >
              <div style={styles.courseIcon}>📚</div>
              <div style={styles.courseInfo}>
                <div style={styles.courseName}>{course.title}</div>
                <div style={styles.courseMeta}>
                  <span style={styles.courseCategory}>{course.category}</span>
                  <span style={styles.courseRating}>
                    <FaStar style={{ color: '#fbbf24', marginRight: '4px' }} />
                    {course.rating || '4.5'}
                  </span>
                </div>
              </div>
              <FaPlay style={styles.resultArrow} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- ADVANCED FEATURE 2: 3D Rotating Course Carousel ---
const FeaturedCourses = () => {
  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  const courses = [
    { 
      id: 1, 
      title: "Full Stack Web Dev", 
      category: "Web Dev", 
      image: "💻",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.9,
      color: "#3B82F6"
    },
    { 
      id: 2, 
      title: "Data Science Mastery", 
      category: "Data Science", 
      image: "📊",
      duration: "16 weeks",
      level: "Intermediate",
      rating: 4.8,
      color: "#8B5CF6"
    },
    { 
      id: 3, 
      title: "Cyber Security Pro", 
      category: "Security", 
      image: "🛡️",
      duration: "14 weeks",
      level: "Advanced",
      rating: 4.7,
      color: "#10B981"
    },
    { 
      id: 4, 
      title: "Machine Learning A-Z", 
      category: "Data Science", 
      image: "🤖",
      duration: "18 weeks",
      level: "Intermediate",
      rating: 4.9,
      color: "#EF4444"
    },
    { 
      id: 5, 
      title: "Mobile App Development", 
      category: "Web Dev", 
      image: "📱",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.6,
      color: "#F59E0B"
    },
    { 
      id: 6, 
      title: "Cloud & DevOps", 
      category: "Infrastructure", 
      image: "☁️",
      duration: "15 weeks",
      level: "Intermediate",
      rating: 4.7,
      color: "#06B6D4"
    },
  ];

  const categories = ["All", "Web Dev", "Data Science", "Security", "Infrastructure"];

  const filteredCourses = useMemo(() => {
    if (filter === "All") return courses;
    return courses.filter(c => c.category === filter);
  }, [filter]);

  const sliderSettings = {
    ref: sliderRef,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      { 
        breakpoint: 1200, 
        settings: { 
          slidesToShow: 2,
          centerMode: false
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1,
          centerMode: false,
          dots: false 
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 1,
          centerMode: false,
          dots: false,
          arrows: false
        } 
      }
    ]
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const currentIndex = categories.indexOf(filter);
      const nextIndex = (currentIndex + 1) % categories.length;
      setFilter(categories[nextIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [filter, isPaused]);

  return (
    <section 
        style={styles.categorySection} 
        data-aos="fade-up" 
        data-aos-delay="200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="featured-section"
    >
      <div style={styles.sectionHeader} className="section-header">
        <h2 style={styles.sectionTitle} className="section-title">Featured Courses</h2>
        <p style={styles.sectionSubtitle} className="section-subtitle">Auto-rotating every 5 seconds • Hover to pause</p>
      </div>
      
      <div style={styles.filterTabs} className="filter-tabs">
        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              ...styles.filterTab,
              background: filter === cat 
                ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' 
                : 'transparent',
              color: filter === cat ? 'white' : '#6B7280',
              borderColor: filter === cat ? '#4F46E5' : '#E5E7EB',
              animation: filter === cat ? 'pulse 2s infinite' : 'none'
            }}
            className="filter-tab"
          >
            {cat}
            {filter === cat && <span style={styles.activeDot}>●</span>}
          </button>
        ))}
      </div>

      <div style={styles.courseCount}>
        Showing {filteredCourses.length} of {courses.length} courses
      </div>

      <div style={{ position: 'relative', marginTop: '40px' }} className="course-slider-container">
        <Slider {...sliderSettings}>
          {filteredCourses.map((course, index) => (
            <div key={course.id} style={{ padding: "20px 10px" }} className="slick-slide-inner">
              <div 
                style={{
                  ...styles.courseCard,
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  opacity: activeIndex === index ? 1 : 0.9,
                  borderTop: `4px solid ${course.color}`,
                  boxShadow: activeIndex === index 
                    ? `0 20px 40px ${course.color}40`
                    : '0 8px 25px rgba(0,0,0,0.1)',
                }}
                className="course-card"
              >
                <div style={styles.courseBadge}>🔥 Trending</div>
                <div style={{ 
                  fontSize: "60px", 
                  marginBottom: "15px",
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                }} className="course-emoji">
                  {course.image}
                </div>
                <h3 style={styles.courseTitle}>{course.title}</h3>
                <span style={{ 
                  ...styles.categoryBadge,
                  backgroundColor: `${course.color}20`,
                  color: course.color
                }}>
                  {course.category}
                </span>
                
                <div style={styles.courseMeta} className="course-meta">
                  <span style={styles.metaItem}>
                    <FaRegClock style={{ marginRight: '5px' }} />
                    {course.duration}
                  </span>
                  <span style={styles.metaItem}>
                    <FaUserGraduate style={{ marginRight: '5px' }} />
                    {course.level}
                  </span>
                  <span style={styles.metaItem}>
                    <FaStar style={{ color: '#FBBF24', marginRight: '5px' }} />
                    {course.rating}
                  </span>
                </div>
                
                <button style={styles.viewCourseButton} className="view-course-btn">
                  View Course →
                </button>
              </div>
            </div>
          ))}
        </Slider>
        
        <div style={styles.carouselControls} className="carousel-controls">
          <button 
            onClick={() => sliderRef.current?.slickPrev()}
            style={styles.controlButton}
            className="control-btn"
          >
            ◀
          </button>
          <button 
            onClick={() => sliderRef.current?.slickNext()}
            style={styles.controlButton}
            className="control-btn"
          >
            ▶
          </button>
        </div>
      </div>
      
      <div style={styles.progressIndicator}>
        {filteredCourses.map((_, idx) => (
          <div 
            key={idx}
            style={{
              ...styles.progressDot,
              width: activeIndex === idx ? '20px' : '8px',
              backgroundColor: activeIndex === idx ? '#4F46E5' : '#CBD5E1'
            }}
          />
        ))}
      </div>
    </section>
  );
};

// --- Animated Progress Bar Component ---
const ProgressBar = ({ percentage, label }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <div style={styles.progressBarContainer} className="progress-bar-container">
      <div style={styles.progressBarLabel}>
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div style={styles.progressBarTrack}>
        <div 
          style={{
            ...styles.progressBarFill,
            width: `${width}%`,
            background: 'linear-gradient(90deg, #4F46E5, #7C3AED)'
          }}
        />
      </div>
    </div>
  );
};

function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
      offset: 50 // Lower offset for mobile
    });
    
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    
    // Only track mouse on devices that have hover
    const handleMouseMove = (e) => {
       if (window.matchMedia("(hover: hover)").matches) {
           setMousePosition({ x: e.clientX, y: e.clientY });
       }
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`🎉 Thank you for subscribing with ${email}! You'll receive updates soon.`);
      setEmail("");
    }
  };

  return (
    <div style={styles.container} className="home-container">
      {/* Mouse Trailer Effect - Hidden on Touch Devices via CSS */}
      <div 
        style={{
          ...styles.mouseTrailer,
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        className="mouse-trailer"
      />
      
      {/* HERO SECTION */}
      <section style={styles.hero} className="hero-section">
        <FloatingBackground />
        <div style={styles.heroOverlay} />
        
        <div style={styles.heroContent} className="hero-content">
          <div style={styles.heroLeft} className="hero-left">
            
            <h1 style={styles.heroTitle} data-aos="fade-right" data-aos-delay="100" className="hero-title">
              Welcome to <span style={styles.gradientText}>ByteGurukul</span>
            </h1>
            
            <h3 style={styles.heroTagline} data-aos="fade-right" data-aos-delay="200" className="hero-tagline">
              <ReactTyped
                strings={[
                  "Learn. Build. Excel.",
                  "Empowering AKTU Students.",
                  "Learn Smart — Learn Secure.",
                  "Your Path to Tech Excellence."
                ]}
                typeSpeed={50}
                backSpeed={40}
                loop
                showCursor={true}
                cursorChar="|"
              />
            </h3>
            
            <p style={styles.heroSubtitle} data-aos="fade-right" data-aos-delay="300" className="hero-subtitle">
              Your complete learning platform for <strong>AKTU B.Tech</strong> &{" "}
              <strong>M.Tech</strong> Computer Science. Access courses, projects,
              internships, and previous year questions — all in one place.
            </p>
            
            {/* Dynamic Search Bar */}
            <DynamicSearchBar navigate={navigate} />

            <div style={styles.heroButtons} data-aos="fade-up" data-aos-delay="400" className="hero-buttons">
              <Link to="/courses" style={styles.primaryButton} className="hero-btn-primary">
                <FaLaptopCode style={{ marginRight: '10px' }} />
                Explore Courses
              </Link>
              <Link to="/signup" style={styles.secondaryButton} className="hero-btn-secondary">
                <FaUserGraduate style={{ marginRight: '10px' }} />
                Sign Up Free
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div style={styles.trustIndicators} data-aos="fade-up" data-aos-delay="500" className="hero-trust">
              <div style={styles.trustItem} className="trust-item">
                <FaUsers style={{ color: '#10B981' }} />
                <span>1,200+ Active Students</span>
              </div>
              <div style={styles.trustItem} className="trust-item">
                <FaStar style={{ color: '#FBBF24' }} />
                <span>4.8/5 Average Rating</span>
              </div>
              <div style={styles.trustItem} className="trust-item">
                <FaBriefcase style={{ color: '#3B82F6' }} />
                <span>50+ Internship Placements</span>
              </div>
            </div>
          </div>

          <div style={styles.heroRight} data-aos="fade-left" data-aos-delay="300" className="hero-right">
            <div style={styles.heroImageContainer} className="hero-img-container">
              <img
                src="/hero-learning.png"
                alt="Learning Illustration"
                style={styles.heroImage}
                className="floating-image"
              />
              <div style={styles.floatingElement1} className="floating-el">🎯</div>
              <div style={styles.floatingElement2} className="floating-el">🏆</div>
              <div style={styles.floatingElement3} className="floating-el">💡</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section style={styles.statsSection} data-aos="fade-up" className="stats-section">
        <AnimatedStatCard 
          icon={FaUsers} 
          number="1,200+" 
          text="Active Students" 
          color="#3B82F6"
        />
        <AnimatedStatCard 
          icon={FaBookOpen} 
          number="50+" 
          text="Courses & Notes" 
          color="#8B5CF6"
        />
        <AnimatedStatCard 
          icon={FaLaptopCode} 
          number="80+" 
          text="Live Projects" 
          color="#10B981"
        />
        <AnimatedStatCard 
          icon={FaChalkboardTeacher} 
          number="25+" 
          text="Expert Mentors" 
          color="#EF4444"
        />
      </section>

      {/* HIGHLIGHTS/TRUST SECTION */}
      <section style={styles.trustSection} data-aos="fade-up" className="trust-section">
        <div style={styles.sectionHeader} className="section-header">
          <h2 style={styles.sectionTitle} className="section-title">Built for AKTU Students, By Experts</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">Everything you need to excel in your CS journey</p>
        </div>
        <div style={styles.trustGrid} className="trust-grid">
          {[
            { icon: FaCertificate, title: "Verified Certification", desc: "Earn industry-recognized certificates upon course completion.", color: "#3B82F6" },
            { icon: FaBriefcase, title: "Internship Opportunities", desc: "Direct access to hands-on, real-world virtual internships.", color: "#8B5CF6" },
            { icon: FaUsers, title: "Community Support", desc: "24/7 forum access and mentorship from experienced peers.", color: "#10B981" },
            { icon: FaChartLine, title: "Progress Tracking", desc: "Detailed analytics and progress reports for each student.", color: "#F59E0B" },
          ].map((item, index) => (
            <div 
              key={index} 
              style={{
                ...styles.trustCard,
                borderTop: `4px solid ${item.color}`,
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="trust-card"
            >
              <item.icon style={{ fontSize: "48px", color: item.color, marginBottom: "20px" }} />
              <h3 style={styles.trustCardTitle}>{item.title}</h3>
              <p style={styles.trustCardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* FEATURED COURSES */}
      <FeaturedCourses />

      {/* LEARNING PATH PROGRESS */}
      <section style={styles.progressSection} data-aos="fade-up" className="progress-section">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="section-title">Your Learning Journey</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">Track progress across different skill domains</p>
        </div>
        <div style={styles.progressGrid} className="progress-grid">
          <ProgressBar percentage={85} label="Web Development" />
          <ProgressBar percentage={70} label="Data Structures" />
          <ProgressBar percentage={60} label="Cyber Security" />
          <ProgressBar percentage={45} label="Machine Learning" />
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section style={styles.categorySection} data-aos="fade-up" className="category-section">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="section-title">Explore Categories</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">Specialized paths for every interest</p>
        </div>
        <div style={styles.categoryGrid} className="category-grid">
          {[
            { icon: FaLaptopCode, title: "Web Development", courses: 24, color: "#3B82F6" },
            { icon: FaLock, title: "Cyber Security", courses: 18, color: "#10B981" },
            { icon: FaDatabase, title: "Data Science", courses: 22, color: "#8B5CF6" },
            { icon: FaChartLine, title: "AI & Machine Learning", courses: 16, color: "#EF4444" },
            { icon: FaMobile, title: "Mobile Development", courses: 12, color: "#F59E0B" },
            { icon: FaCloud, title: "Cloud Computing", courses: 14, color: "#06B6D4" },
          ].map((cat, index) => (
            <div 
              key={index} 
              style={{
                ...styles.categoryCard,
                background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}10)`,
                border: `2px solid ${cat.color}30`,
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="category-card"
            >
              <cat.icon style={{ fontSize: "48px", color: cat.color, marginBottom: "15px" }} />
              <h3 style={styles.categoryTitle}>{cat.title}</h3>
              <p style={styles.categoryCourses}>{cat.courses} Courses</p>
              <div style={styles.categoryHover} className="category-hover">Explore →</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE BYTEGURUKUL */}
      <section style={styles.features} data-aos="fade-up" className="features-section">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="section-title">Why Choose ByteGurukul?</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">Comprehensive platform for complete CS education</p>
        </div>
        <div style={styles.featuresGrid} className="features-grid">
          <Link to="/pyq-papers" style={styles.featureLink}>
            <div style={styles.featureCard} className="feature-card">
              <div style={styles.featureIconContainer}>
                <FaFileAlt style={styles.featureIcon} />
              </div>
              <h3 style={styles.featureTitle}>PYQ Papers</h3>
              <p style={styles.featureDesc}>
                Access previous year question papers with detailed solutions and explanations.
              </p>
              <div style={styles.featureStats}>500+ Papers</div>
            </div>
          </Link>
          
          <div style={styles.featureCard} className="feature-card">
            <div style={styles.featureIconContainer}>
              <FaBookOpen style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Study Resources</h3>
            <p style={styles.featureDesc}>
              Download notes, books, and presentations for all CS courses.
            </p>
            <div style={styles.featureStats}>1000+ Resources</div>
          </div>
          
          <div style={styles.featureCard} className="feature-card">
            <div style={styles.featureIconContainer}>
              <FaLaptopCode style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Domain Projects</h3>
            <p style={styles.featureDesc}>
              Purchase ready-to-use projects categorized by domains with source code.
            </p>
            <div style={styles.featureStats}>80+ Projects</div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section style={styles.newsletterSection} data-aos="fade-up" className="newsletter-section">
        <div style={styles.newsletterContent} className="newsletter-content">
          <FaEnvelope style={styles.newsletterIcon} />
          <h2 style={styles.newsletterTitle} className="newsletter-title">Stay Ahead of the Curve</h2>
          <p style={styles.newsletterText} className="newsletter-text">
            Get the latest course updates, internship alerts, and tech news delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} style={styles.newsletterForm} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.newsletterInput}
              className="newsletter-input"
              required
            />
            <button type="submit" style={styles.newsletterButton} className="newsletter-btn">
              Subscribe
            </button>
          </form>
          <p style={styles.newsletterDisclaimer}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
      
      {/* ABOUT SECTION */}
      <section style={styles.about} data-aos="fade-up" className="about-section">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="section-title">About the Creator</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">Passionate educator building the future of CS learning</p>
        </div>
        <div style={styles.aboutContainer} className="about-container">
          <div style={styles.aboutImageContainer} className="about-image-wrapper">
            <img
              src="/abhijeet.jpg"
              alt="Abhijeet Kumar Pandey"
              style={styles.aboutImage}
              className="about-image"
            />
            <div style={styles.aboutBadge}>Creator</div>
          </div>
          <div style={styles.aboutContent} className="about-content">
            <h3 style={styles.aboutName} className="about-name">Abhijeet Kumar Pandey</h3>
            <p style={styles.aboutRole}>Cyber Security Analyst | M.Tech (CSE)</p>
            <p style={styles.aboutBio}>
              I'm passionate about technology, cybersecurity, and education.
              ByteGurukul is my initiative to make learning accessible for AKTU
              B.Tech & M.Tech students — providing quality study materials,
              projects, and guidance for everyone who dreams big.
            </p>
            <div style={styles.aboutStats} className="about-stats">
              <div style={styles.stat}>
                <span style={styles.statNumber}>3+</span>
                <span style={styles.statLabel}>Years Experience</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>500+</span>
                <span style={styles.statLabel}>Students Mentored</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>10+</span>
                <span style={styles.statLabel}>Projects Built</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection} data-aos="fade-up" className="cta-section">
        <div style={styles.ctaContent} className="cta-content">
          <h2 style={styles.ctaTitle} className="cta-title">Start Your Learning Journey Today!</h2>
          <p style={styles.ctaText} className="cta-text">
            Join thousands of AKTU students who are already advancing their careers with ByteGurukul.
          </p>
          <div style={styles.ctaButtons} className="cta-buttons">
            <Link to="/signup" style={styles.ctaPrimaryButton} className="cta-btn-primary">
              Get Started Free
            </Link>
            <Link to="/courses" style={styles.ctaSecondaryButton} className="cta-btn-secondary">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <button onClick={scrollToTop} style={styles.scrollButton} className="scroll-button">
          <FaArrowUp />
        </button>
      )}

      {/* GLOBAL RESPONSIVE STYLES INJECTION */}
      <style>
        {`
          /* Animation Keyframes */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* General Classes */
          .floating-image { animation: float 6s ease-in-out infinite; }
          .scroll-button { animation: pulse 2s infinite; }
          .search-result-item { animation: slideIn 0.3s ease-out forwards; opacity: 0; }

          /* Hover Effects (Desktop Only) */
          @media (hover: hover) {
            .course-card:hover { transform: translateY(-10px) scale(1.03) !important; transition: all 0.3s ease !important; }
            .category-card:hover { transform: translateY(-8px) !important; box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15) !important; }
            .category-card:hover .category-hover { opacity: 1 !important; transform: translateY(0) !important; }
            .feature-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15); border-color: #4F46E5 !important; }
            .about-image:hover { transform: scale(1.05); }
            .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(79, 70, 229, 0.4); }
            .hero-btn-secondary:hover { background-color: rgba(255, 255, 255, 0.2) !important; }
          }

          /* --- RESPONSIVE BREAKPOINTS --- */

          /* Mobile (Portrait) - < 480px */
          @media (max-width: 480px) {
             .hero-title { font-size: 32px !important; }
             .hero-tagline { font-size: 20px !important; min-height: 50px; }
             .section-title { font-size: 28px !important; }
             .stat-card { padding: 20px !important; }
             .newsletter-form { flex-direction: column; }
             .newsletter-btn { width: 100%; }
             .hero-buttons { flex-direction: column; width: 100%; }
             .hero-btn-primary, .hero-btn-secondary { width: 100%; justify-content: center; }
             .cta-buttons { flex-direction: column; width: 100%; }
             .cta-btn-primary, .cta-btn-secondary { width: 100%; display: block; box-sizing: border-box; }
          }

          /* Mobile/Tablet - < 768px */
          @media (max-width: 768px) {
            .hero-content { flex-direction: column-reverse; text-align: center; }
            .hero-left { padding-right: 0 !important; }
            .hero-right { margin-bottom: 40px; width: 100%; display: flex; justify-content: center; }
            .hero-search-wrapper { margin: 0 auto 30px auto !important; width: 100%; }
            .hero-trust { justify-content: center; }
            .floating-el { display: none; } /* Hide floating icons on mobile */
            .mouse-trailer { display: none; }
            .about-container { flex-direction: column; text-align: center; }
            .about-content { text-align: center; }
            .about-stats { justify-content: center; }
            .search-form-container { width: 100%; }
            .hero-image { max-width: 100% !important; height: auto; }
          }

          /* Tablet - 769px to 1024px */
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-title { font-size: 48px !important; }
            .stat-card { padding: 30px 15px !important; }
            .trust-grid, .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }

          /* Large Screens / TV - 1441px+ */
          @media (min-width: 1441px) {
            .home-container { max-width: 1920px; margin: 0 auto; box-shadow: 0 0 50px rgba(0,0,0,0.05); }
            .hero-title { font-size: 80px !important; }
            .section-title { font-size: 56px !important; }
            .course-card { padding: 40px 30px !important; }
            .feature-card { padding: 50px 40px !important; }
          }
        `}
      </style>
    </div>
  );
}

/* ---------------------------- STYLES OBJECT ---------------------------- */
const styles = {
  container: {
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflowX: "hidden", // STRICTLY prevents horizontal scroll
    position: "relative",
    width: "100%",
    maxWidth: "100vw", // Ensures it never exceeds viewport width
  },

  // Mouse Trailer
  mouseTrailer: {
    position: "fixed",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%, -50%)",
    transition: "left 0.05s ease-out, top 0.05s ease-out",
  },

  // Floating Background
  floatingCanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  // Hero Section
  hero: {
    position: "relative",
    // Reduced padding for small screens to prevent squeezing
    padding: "clamp(40px, 8vw, 120px) clamp(15px, 5%, 40px)", 
    background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)",
    color: "white",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.2) 0%, transparent 50%)",
    zIndex: 2,
  },
  heroContent: {
    position: "relative",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1400px",
    margin: "0 auto",
    gap: "40px",
    width: "100%", // Ensure content takes full width
  },
  heroLeft: {
    flex: "1 1 500px",
    paddingRight: "0px", // Removed fixed padding that could cause overflow on mobile
    // FIX IS HERE: Changed minWidth from 300px to avoid overflow on small screens
    minWidth: "min(100%, 280px)", 
  },
  heroRight: {
    flex: "1 1 400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%", // Prevent image container from overflowing
  },
  heroImageContainer: {
    position: "relative",
    maxWidth: "100%",
    width: "100%", // Ensure it fits in parent
  },
  heroImage: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "24px",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.3)",
    border: "8px solid rgba(255, 255, 255, 0.1)",
    height: "auto",
  },
  floatingElement1: {
    position: "absolute",
    top: "-20px",
    right: "-20px",
    fontSize: "clamp(24px, 4vw, 40px)",
    animation: "float 4s ease-in-out infinite",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },
  floatingElement2: {
    position: "absolute",
    bottom: "40px",
    left: "-40px",
    fontSize: "clamp(20px, 3vw, 32px)",
    animation: "float 5s ease-in-out infinite 1s",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },
  floatingElement3: {
    position: "absolute",
    top: "40px",
    right: "60px",
    fontSize: "clamp(18px, 3vw, 28px)",
    animation: "float 6s ease-in-out infinite 2s",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },

  gradientText: {
    background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroTitle: {
    fontSize: "clamp(32px, 8vw, 64px)", // Slightly smaller min font size
    fontWeight: "800",
    marginBottom: "20px",
    lineHeight: "1.2",
    wordBreak: "break-word", // FIX: Prevents long words like ByteGurukul from pushing width
  },

  heroTagline: {
    fontSize: "clamp(20px, 3vw, 28px)",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#C7D2FE",
    minHeight: "40px",
  },

  heroSubtitle: {
    fontSize: "clamp(16px, 2vw, 18px)",
    lineHeight: "1.8",
    marginBottom: "40px",
    color: "#E2E8F0",
    maxWidth: "600px",
  },

  // Search Styles
  searchWrapper: {
    position: "relative",
    maxWidth: "700px",
    marginBottom: "40px",
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    width: "100%",
  },
  searchIcon: {
    padding: "0 15px", // Reduced padding
    color: "#64748B",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: "15px 10px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    color: "#1E293B",
    backgroundColor: "transparent",
    minWidth: "0",
  },
  searchButton: {
    padding: "0 20px",
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
  searchResultsDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: "0 0 16px 16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    zIndex: 1000,
    borderTop: "1px solid #E2E8F0",
  },
  searchResultItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    cursor: "pointer",
    borderBottom: "1px solid #F1F5F9",
    transition: "all 0.2s ease",
    opacity: 0,
  },
  courseIcon: {
    fontSize: "24px",
    marginRight: "15px",
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontWeight: "600",
    marginBottom: "4px",
    color: "#1E293B",
    fontSize: "15px",
  },
  courseMeta: {
    display: "flex",
    gap: "10px",
    fontSize: "12px",
    color: "#64748B",
    flexWrap: "wrap",
  },
  courseCategory: {
    backgroundColor: "#F1F5F9",
    padding: "2px 8px",
    borderRadius: "4px",
  },
  courseRating: {
    display: "flex",
    alignItems: "center",
  },
  resultArrow: {
    color: "#CBD5E1",
    fontSize: "14px",
  },

  // Hero Buttons
  heroButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "40px",
    width: "100%", // Added width 100%
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 30px",
    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    color: "white",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
    flex: "1 1 auto", // Allow flex shrink/grow
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 30px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    flex: "1 1 auto",
  },

  trustIndicators: {
    display: "flex",
    gap: "clamp(15px, 3vw, 30px)",
    flexWrap: "wrap",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#C7D2FE",
  },

  // Stats Section
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "30px",
    padding: "clamp(40px, 5vw, 80px) 5%",
    backgroundColor: "white",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  statCard: {
    padding: "40px 30px",
    borderRadius: "16px",
    backgroundColor: "white",
    textAlign: "center",
    transition: "all 0.4s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
  statNumber: {
    fontSize: "clamp(36px, 4vw, 48px)",
    fontWeight: "800",
    margin: "15px 0",
    color: "#1E293B",
  },
  statText: {
    color: "#64748B",
    fontSize: "16px",
    fontWeight: "500",
  },

  // Section Header
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
    padding: "0 20px",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: "800",
    marginBottom: "16px",
    color: "#1E293B",
    background: "linear-gradient(135deg, #1E293B 0%, #475569 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    wordBreak: "break-word",
  },
  sectionSubtitle: {
    fontSize: "clamp(16px, 2vw, 18px)",
    color: "#64748B",
    maxWidth: "600px",
    margin: "0 auto",
  },

  // Trust Section
  trustSection: {
    padding: "clamp(60px, 5vw, 100px) 5%",
    backgroundColor: "#F8FAFC",
  },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  trustCard: {
    padding: "40px 30px",
    borderRadius: "20px",
    backgroundColor: "white",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    transition: "all 0.4s ease",
  },
  trustCardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#1E293B",
  },
  trustCardDesc: {
    color: "#64748B",
    lineHeight: "1.6",
    fontSize: "15px",
  },

  // Featured Courses
  categorySection: {
    padding: "clamp(60px, 5vw, 100px) 5%",
    backgroundColor: "white",
  },
  filterTabs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
    padding: "0 10px",
  },
  filterTab: {
    padding: "10px 20px",
    borderRadius: "50px",
    border: "2px solid",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
  },
  activeDot: {
    fontSize: "8px",
    animation: "pulse 2s infinite",
  },
  courseCount: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: "30px",
    fontSize: "14px",
    fontWeight: "500",
  },
  courseCard: {
    background: "white",
    borderRadius: "20px",
    padding: "30px 25px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden",
    margin: "0 auto",
    maxWidth: "400px", // Limit max width on large screens
    width: "100%",
  },
  courseBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "#EF4444",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  courseTitle: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "15px 0 10px",
    color: "#1E293B",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "6px 15px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  courseMeta: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "20px",
    fontSize: "13px",
    color: "#64748B",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
  },
  viewCourseButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#F1F5F9",
    color: "#4F46E5",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  carouselControls: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  controlButton: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "2px solid #E2E8F0",
    color: "#4F46E5",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  progressIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "40px",
  },
  progressDot: {
    height: "8px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  },

  // Progress Section
  progressSection: {
    padding: "clamp(60px, 5vw, 80px) 5%",
    backgroundColor: "#F8FAFC",
  },
  progressGrid: {
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    width: "100%",
  },
  progressBarContainer: {
    marginBottom: "10px",
  },
  progressBarLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
  },
  progressBarTrack: {
    height: "10px",
    backgroundColor: "#E2E8F0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: "5px",
    transition: "width 1s ease-in-out",
  },

  // Categories
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  categoryCard: {
    padding: "40px 30px",
    borderRadius: "20px",
    textAlign: "center",
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden",
  },
  categoryTitle: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "15px 0 8px",
    color: "#1E293B",
  },
  categoryCourses: {
    color: "#64748B",
    fontSize: "14px",
    marginBottom: "20px",
  },
  categoryHover: {
    opacity: 0,
    transform: "translateY(10px)",
    transition: "all 0.3s ease",
    color: "#4F46E5",
    fontWeight: "600",
    fontSize: "14px",
  },

  // Features
  features: {
    padding: "clamp(60px, 5vw, 100px) 5%",
    background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  featureCard: {
    backgroundColor: "white",
    padding: "40px 30px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    transition: "all 0.4s ease",
    border: "2px solid transparent",
    height: "100%", // Equal height
  },
  featureIconContainer: {
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 25px",
  },
  featureIcon: {
    fontSize: "36px",
    color: "white",
  },
  featureTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#1E293B",
  },
  featureDesc: {
    color: "#64748B",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  featureStats: {
    display: "inline-block",
    padding: "6px 15px",
    backgroundColor: "#F1F5F9",
    color: "#4F46E5",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },

  // Newsletter
  newsletterSection: {
    padding: "clamp(60px, 5vw, 100px) 5%",
    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    textAlign: "center",
    color: "white",
  },
  newsletterContent: {
    maxWidth: "600px",
    margin: "0 auto",
    width: "100%",
  },
  newsletterIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  newsletterTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: "700",
    marginBottom: "15px",
  },
  newsletterText: {
    fontSize: "18px",
    opacity: 0.9,
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  newsletterForm: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    width: "100%",
    flexWrap: "wrap", // Added flexWrap
  },
  newsletterInput: {
    flex: "1 1 200px",
    padding: "18px 20px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    minWidth: "0",
  },
  newsletterButton: {
    padding: "18px 36px",
    backgroundColor: "#1E293B",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    flex: "0 0 auto",
  },
  newsletterDisclaimer: {
    fontSize: "14px",
    opacity: 0.8,
  },

  // About
  about: {
    padding: "clamp(60px, 5vw, 100px) 5%",
    backgroundColor: "white",
  },
  aboutContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "60px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  aboutImageContainer: {
    position: "relative",
    flexShrink: 0,
  },
  aboutImage: {
    width: "280px",
    height: "280px",
    borderRadius: "24px",
    objectFit: "cover",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    maxWidth: "100%",
  },
  aboutBadge: {
    position: "absolute",
    bottom: "-10px",
    right: "-10px",
    backgroundColor: "#4F46E5",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
  },
  aboutContent: {
    flex: 1,
    minWidth: "280px", // Adjusted minWidth
    textAlign: "left",
  },
  aboutName: {
    fontSize: "clamp(24px, 3vw, 32px)",
    fontWeight: "800",
    marginBottom: "8px",
    color: "#1E293B",
  },
  aboutRole: {
    fontSize: "18px",
    color: "#4F46E5",
    marginBottom: "25px",
    fontWeight: "600",
  },
  aboutBio: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.8",
    marginBottom: "30px",
  },
  aboutStats: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  statNumber: {
    display: "block",
    fontSize: "28px",
    fontWeight: "800",
    color: "#4F46E5",
    marginBottom: "5px",
  },
  statLabel: {
    display: "block",
    fontSize: "14px",
    color: "#64748B",
  },

  // CTA
  ctaSection: {
    padding: "clamp(60px, 5vw, 100px) 5%",
    textAlign: "center",
    background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
    color: "white",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  ctaTitle: {
    fontSize: "clamp(32px, 5vw, 48px)",
    fontWeight: "800",
    marginBottom: "20px",
    wordBreak: "break-word",
  },
  ctaText: {
    fontSize: "18px",
    opacity: 0.9,
    marginBottom: "40px",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
  },
  ctaButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaPrimaryButton: {
    padding: "20px 40px",
    backgroundColor: "white",
    color: "#4F46E5",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
    flex: "1 1 auto",
  },
  ctaSecondaryButton: {
    padding: "20px 40px",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    flex: "1 1 auto",
  },

  // Scroll Button
  scrollButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "56px",
    height: "56px",
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
};

export default Home;