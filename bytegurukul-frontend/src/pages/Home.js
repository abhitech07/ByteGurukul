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
import api from "../services/api"; // Ensure you have this service or use axios directly

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="zoom-in"
    >
      <Icon style={{ fontSize: "50px", color, marginBottom: "15px" }} />
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
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 30;
    
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
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} style={styles.floatingCanvas} />;
};

// --- ADVANCED FEATURE 1: Instant Search Component ---
const DynamicSearchBar = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // FIXED: Fetch real search results from backend API
  useEffect(() => {
    const fetchResults = async () => {
        if (searchQuery.length > 2) {
            setIsSearching(true);
            try {
                // Assuming you have an API setup
                // If not, this catch block will handle it gracefully
                const response = await api.get(`/courses?search=${searchQuery}`);
                if (response && response.data) {
                    setSearchResults(response.data.slice(0, 5));
                }
            } catch (error) {
                // Fallback mock data if API fails (for demo purposes)
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

    const timer = setTimeout(fetchResults, 400); // Debounce
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
      >
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="🔍 Search courses, notes & projects..."
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
        <div style={styles.searchResultsDropdown}>
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
  const [isPaused, setIsPaused] = useState(false); // FIXED: Added pause state
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
        breakpoint: 1024, 
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
          dots: false // Hide dots on mobile
        } 
      }
    ]
  };

  // Auto-rotate filter - FIXED: Pauses when hovered
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
        onMouseEnter={() => setIsPaused(true)} // Pause on hover
        onMouseLeave={() => setIsPaused(false)}
    >
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Featured Courses</h2>
        <p style={styles.sectionSubtitle}>Auto-rotating every 5 seconds • Hover to pause</p>
      </div>
      
      {/* Filter Tabs with Animation */}
      <div style={styles.filterTabs}>
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
          >
            {cat}
            {filter === cat && <span style={styles.activeDot}>●</span>}
          </button>
        ))}
      </div>

      {/* Animated Course Count */}
      <div style={styles.courseCount}>
        Showing {filteredCourses.length} of {courses.length} courses
      </div>

      {/* Enhanced Carousel */}
      <div style={{ position: 'relative', marginTop: '40px' }} className="course-slider-container">
        <Slider {...sliderSettings}>
          {filteredCourses.map((course, index) => (
            <div key={course.id} style={{ padding: "20px 10px" }}>
              <div 
                style={{
                  ...styles.courseCard,
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(0.95)',
                  opacity: activeIndex === index ? 1 : 0.8,
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
                }}>
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
                
                <div style={styles.courseMeta}>
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
                
                <button style={styles.viewCourseButton}>
                  View Course →
                </button>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Manual Controls */}
        <div style={styles.carouselControls}>
          <button 
            onClick={() => sliderRef.current?.slickPrev()}
            style={styles.controlButton}
          >
            ◀
          </button>
          <button 
            onClick={() => sliderRef.current?.slickNext()}
            style={styles.controlButton}
          >
            ▶
          </button>
        </div>
      </div>
      
      {/* Progress Indicator */}
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
    <div style={styles.progressBarContainer}>
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
      offset: 100
    });
    
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
    <div style={styles.container}>
      {/* Mouse Trailer Effect */}
      <div 
        style={{
          ...styles.mouseTrailer,
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      {/* HERO SECTION with Floating Background */}
      {/* ADDED CLASSNAME hero-section for Mobile Responsiveness */}
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
              <div style={styles.trustItem}>
                <FaUsers style={{ color: '#10B981' }} />
                <span>1,200+ Active Students</span>
              </div>
              <div style={styles.trustItem}>
                <FaStar style={{ color: '#FBBF24' }} />
                <span>4.8/5 Average Rating</span>
              </div>
              <div style={styles.trustItem}>
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

      {/* QUICK STATS - Using Animated Component */}
      <section style={styles.statsSection} data-aos="fade-up">
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
      <section style={styles.trustSection} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Built for AKTU Students, By Experts</h2>
          <p style={styles.sectionSubtitle}>Everything you need to excel in your CS journey</p>
        </div>
        <div style={styles.trustGrid}>
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
            >
              <item.icon style={{ fontSize: "48px", color: item.color, marginBottom: "20px" }} />
              <h3 style={styles.trustCardTitle}>{item.title}</h3>
              <p style={styles.trustCardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* FEATURED COURSES (Enhanced Carousel) */}
      <FeaturedCourses />

      {/* LEARNING PATH PROGRESS */}
      <section style={styles.progressSection} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Your Learning Journey</h2>
          <p style={styles.sectionSubtitle}>Track progress across different skill domains</p>
        </div>
        <div style={styles.progressGrid}>
          <ProgressBar percentage={85} label="Web Development" />
          <ProgressBar percentage={70} label="Data Structures" />
          <ProgressBar percentage={60} label="Cyber Security" />
          <ProgressBar percentage={45} label="Machine Learning" />
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section style={styles.categorySection} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Explore Categories</h2>
          <p style={styles.sectionSubtitle}>Specialized paths for every interest</p>
        </div>
        <div style={styles.categoryGrid}>
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
              <div style={styles.categoryHover}>Explore →</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE BYTEGURUKUL */}
      <section style={styles.features} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Why Choose ByteGurukul?</h2>
          <p style={styles.sectionSubtitle}>Comprehensive platform for complete CS education</p>
        </div>
        <div style={styles.featuresGrid}>
          <Link to="/pyq-papers" style={styles.featureLink}>
            <div style={styles.featureCard}>
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
          
          <div style={styles.featureCard}>
            <div style={styles.featureIconContainer}>
              <FaBookOpen style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Study Resources</h3>
            <p style={styles.featureDesc}>
              Download notes, books, and presentations for all CS courses.
            </p>
            <div style={styles.featureStats}>1000+ Resources</div>
          </div>
          
          <div style={styles.featureCard}>
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
      <section style={styles.newsletterSection} data-aos="fade-up">
        <div style={styles.newsletterContent}>
          <FaEnvelope style={styles.newsletterIcon} />
          <h2 style={styles.newsletterTitle}>Stay Ahead of the Curve</h2>
          <p style={styles.newsletterText}>
            Get the latest course updates, internship alerts, and tech news delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.newsletterInput}
              required
            />
            <button type="submit" style={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
          <p style={styles.newsletterDisclaimer}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
      
      {/* ABOUT SECTION */}
      <section style={styles.about} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>About the Creator</h2>
          <p style={styles.sectionSubtitle}>Passionate educator building the future of CS learning</p>
        </div>
        <div style={styles.aboutContainer}>
          <div style={styles.aboutImageContainer}>
            <img
              src="/abhijeet.jpg"
              alt="Abhijeet Kumar Pandey"
              style={styles.aboutImage}
              className="about-image"
            />
            <div style={styles.aboutBadge}>Creator</div>
          </div>
          <div style={styles.aboutContent}>
            <h3 style={styles.aboutName}>Abhijeet Kumar Pandey</h3>
            <p style={styles.aboutRole}>Cyber Security Analyst | M.Tech (CSE)</p>
            <p style={styles.aboutBio}>
              I'm passionate about technology, cybersecurity, and education.
              ByteGurukul is my initiative to make learning accessible for AKTU
              B.Tech & M.Tech students — providing quality study materials,
              projects, and guidance for everyone who dreams big.
            </p>
            <div style={styles.aboutStats}>
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
      <section style={styles.ctaSection} data-aos="fade-up">
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Start Your Learning Journey Today!</h2>
          <p style={styles.ctaText}>
            Join thousands of AKTU students who are already advancing their careers with ByteGurukul.
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/signup" style={styles.ctaPrimaryButton}>
              Get Started Free
            </Link>
            <Link to="/courses" style={styles.ctaSecondaryButton}>
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

      {/* FIXED: Added responsive media queries using standard <style> tag
         This overrides the inline JS styles on smaller screens.
      */}
      <style>
        {`
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
          
          .floating-image {
            animation: float 6s ease-in-out infinite;
          }
          
          .course-card:hover {
            transform: translateY(-10px) scale(1.03) !important;
            transition: all 0.3s ease !important;
          }
          
          .category-card:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15) !important;
          }
          
          .search-result-item {
            animation: slideIn 0.3s ease-out forwards;
            opacity: 0;
          }
          
          .scroll-button {
            animation: pulse 2s infinite;
          }
          
          .about-image {
            transition: transform 0.5s ease;
          }
          
          .about-image:hover {
            transform: scale(1.05);
          }

          /* --- RESPONSIVE OVERRIDES FOR HERO SECTION --- */
          @media (max-width: 768px) {
            .hero-section {
               padding: 60px 20px !important;
               flex-direction: column;
            }
            .hero-content {
               flex-direction: column-reverse; /* Put image on top or bottom, adjust as preferred */
               text-align: center;
            }
            .hero-left {
               padding-right: 0 !important;
               min-width: 100% !important;
            }
            .hero-right {
               margin-bottom: 40px;
               width: 100%;
            }
            .hero-title {
               fontSize: 36px !important;
               line-height: 1.3 !important;
            }
            .hero-tagline {
               fontSize: 20px !important;
               min-height: 60px; /* Prevent jump when typing */
            }
            .hero-subtitle {
               fontSize: 16px !important;
               margin-bottom: 30px !important;
            }
            .hero-search-wrapper {
               margin: 0 auto 30px auto !important;
            }
            .hero-buttons {
               justify-content: center;
            }
            .hero-trust {
               justify-content: center;
            }
            .hero-img-container img {
               max-width: 100% !important;
            }
            .floating-el {
               display: none; /* Hide floating elements on mobile to reduce clutter */
            }
          }
        `}
      </style>
    </div>
  );
}

/* ---------------------------- ENHANCED STYLES ---------------------------- */
const styles = {
  container: {
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: "hidden",
    position: "relative",
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
    transition: "left 0.1s ease-out, top 0.1s ease-out",
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
    padding: "120px 40px",
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
  },
  heroLeft: {
    flex: 1,
    paddingRight: "60px",
    minWidth: "300px",
  },
  heroRight: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImageContainer: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "24px",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.3)",
    border: "8px solid rgba(255, 255, 255, 0.1)",
  },
  floatingElement1: {
    position: "absolute",
    top: "-20px",
    right: "-20px",
    fontSize: "40px",
    animation: "float 4s ease-in-out infinite",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },
  floatingElement2: {
    position: "absolute",
    bottom: "40px",
    left: "-40px",
    fontSize: "32px",
    animation: "float 5s ease-in-out infinite 1s",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },
  floatingElement3: {
    position: "absolute",
    top: "40px",
    right: "60px",
    fontSize: "28px",
    animation: "float 6s ease-in-out infinite 2s",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },

  badge: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "10px 20px",
    borderRadius: "50px",
    marginBottom: "30px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },

  gradientText: {
    background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroTitle: {
    fontSize: "64px",
    fontWeight: "800",
    marginBottom: "20px",
    lineHeight: "1.2",
  },

  heroTagline: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#C7D2FE",
    minHeight: "40px",
  },

  heroSubtitle: {
    fontSize: "18px",
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
  },
  searchContainer: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
  },
  searchIcon: {
    padding: "0 20px",
    color: "#64748B",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: "20px 10px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    color: "#1E293B",
    backgroundColor: "transparent",
  },
  searchButton: {
    padding: "0 30px",
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
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
  },
  courseMeta: {
    display: "flex",
    gap: "15px",
    fontSize: "13px",
    color: "#64748B",
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
  searchAll: {
    padding: "15px 20px",
    backgroundColor: "#F8FAFC",
    textAlign: "center",
  },
  searchAllLink: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },

  // Hero Buttons
  heroButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "18px 36px",
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
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "18px 36px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },

  trustIndicators: {
    display: "flex",
    gap: "30px",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    padding: "80px 40px",
    backgroundColor: "white",
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
    fontSize: "48px",
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
  },
  sectionTitle: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "16px",
    color: "#1E293B",
    background: "linear-gradient(135deg, #1E293B 0%, #475569 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  sectionSubtitle: {
    fontSize: "18px",
    color: "#64748B",
    maxWidth: "600px",
    margin: "0 auto",
  },

  // Trust Section
  trustSection: {
    padding: "100px 40px",
    backgroundColor: "#F8FAFC",
  },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
  },

  // Featured Courses
  categorySection: {
    padding: "100px 40px",
    backgroundColor: "white",
  },
  filterTabs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterTab: {
    padding: "12px 24px",
    borderRadius: "50px",
    border: "2px solid",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
    padding: "80px 40px",
    backgroundColor: "#F8FAFC",
  },
  progressGrid: {
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
    padding: "100px 40px",
    background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureLink: {
    textDecoration: "none",
    color: "inherit",
  },
  featureCard: {
    backgroundColor: "white",
    padding: "40px 30px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    transition: "all 0.4s ease",
    border: "2px solid transparent",
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
    padding: "100px 40px",
    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    textAlign: "center",
    color: "white",
  },
  newsletterContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  newsletterIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  newsletterTitle: {
    fontSize: "36px",
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
  },
  newsletterInput: {
    flex: 1,
    padding: "18px 20px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
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
  },
  newsletterDisclaimer: {
    fontSize: "14px",
    opacity: 0.8,
  },

  // About
  about: {
    padding: "100px 40px",
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
  },
  aboutImage: {
    width: "280px",
    height: "280px",
    borderRadius: "24px",
    objectFit: "cover",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
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
    minWidth: "300px",
    textAlign: "left",
  },
  aboutName: {
    fontSize: "32px",
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
    padding: "100px 40px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
    color: "white",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "20px",
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

// Add hover effects via JS
Object.assign(styles, {
  searchButtonHover: {
    backgroundColor: "#4338CA",
  },
  primaryButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 15px 30px rgba(79, 70, 229, 0.4)",
  },
  secondaryButtonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  viewCourseButtonHover: {
    backgroundColor: "#4F46E5",
    color: "white",
  },
  controlButtonHover: {
    backgroundColor: "#4F46E5",
    color: "white",
    borderColor: "#4F46E5",
  },
  categoryCardHover: {
    ".categoryHover": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  featureCardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(79, 70, 229, 0.15)",
    borderColor: "#4F46E5",
  },
  newsletterButtonHover: {
    backgroundColor: "#0F172A",
  },
  ctaPrimaryButtonHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 15px 30px rgba(255, 255, 255, 0.3)",
  },
  ctaSecondaryButtonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  scrollButtonHover: {
    transform: "scale(1.1)",
  },
});

export default Home;