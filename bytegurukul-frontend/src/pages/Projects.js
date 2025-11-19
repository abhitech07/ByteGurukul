import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const { addToCart, isInCart, getCartItemsCount } = useCart();

  const projects = [
    {
      id: '1',
      title: 'E-Commerce Website',
      domain: 'Web Development',
      price: 49,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      description: 'Full-stack e-commerce platform with payment integration, admin panel, and inventory management',
      icon: '🛒',
      features: ['Payment Integration', 'Admin Dashboard', 'User Authentication', 'Product Reviews']
    },
    {
      id: '2',
      title: 'Weather App',
      domain: 'Mobile Development',
      price: 49,
      technologies: ['Android', 'Kotlin', 'API Integration'],
      description: 'Real-time weather application with location services and 7-day forecast',
      icon: '🌤️',
      features: ['Location Services', '7-Day Forecast', 'Weather Alerts']
    },
    {
      id: '3',
      title: 'Student Management System',
      domain: 'Desktop Application',
      price: 49,
      technologies: ['Java', 'MySQL', 'Swing'],
      description: 'Complete student record management system with attendance and grade tracking',
      icon: '🎓',
      features: ['Student Records', 'Attendance System', 'Grade Management']
    },
    {
      id: '4',
      title: 'Chat Application',
      domain: 'Web Development',
      price: 49,
      technologies: ['React', 'Socket.io', 'Express'],
      description: 'Real-time chat application with multiple rooms, file sharing, and emoji support',
      icon: '💬',
      features: ['Real-time Chat', 'File Sharing', 'Multiple Rooms']
    },
    {
      id: '5',
      title: 'Expense Tracker',
      domain: 'Mobile Development',
      price: 49,
      technologies: ['Flutter', 'Firebase', 'Charts'],
      description: 'Personal finance management app with analytics and budget planning',
      icon: '💰',
      features: ['Expense Analytics', 'Budget Planning', 'Reports']
    },
    {
      id: '6',
      title: 'Library Management',
      domain: 'Web Development',
      price: 49,
      technologies: ['PHP', 'MySQL', 'Bootstrap'],
      description: 'Digital library system with book tracking, member management, and fine calculation',
      icon: '📖',
      features: ['Book Tracking', 'Member Management', 'Fine System']
    }
  ];

  // Filter projects based on search and domain
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || project.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const domains = ['all', ...new Set(projects.map(project => project.domain))];

  const handleAddToCart = (project) => {
    addToCart(project);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Domain Projects</h1>
        <p style={styles.subtitle}>Ready-to-implement projects with source code and documentation</p>
      </div>

      {/* Cart Indicator */}
      <div style={styles.cartIndicator}>
        <Link to="/cart" style={styles.cartLink}>
          <span style={styles.cartIcon}>🛒</span>
          <span style={styles.cartCount}>{getCartItemsCount()} items</span>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>
        
        <select 
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={styles.filterSelect}
        >
          {domains.map(domain => (
            <option key={domain} value={domain}>
              {domain === 'all' ? 'All Domains' : domain}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div style={styles.resultsInfo}>
        <p>Showing {filteredProjects.length} of {projects.length} projects</p>
      </div>

      {/* Projects Grid */}
      <div style={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <div key={project.id} style={styles.projectCard}>
            <div style={styles.cardHeader}>
              <div style={styles.icon}>{project.icon}</div>
              <div style={styles.projectInfo}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <span style={styles.domain}>{project.domain}</span>
              </div>
              <div style={styles.price}>₹{project.price}</div>
            </div>

            <p style={styles.description}>{project.description}</p>

            <div style={styles.techStack}>
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} style={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>

            <div style={styles.features}>
              <strong>Includes:</strong>
              <ul style={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div style={styles.projectDetails}>
            </div>

            <div style={styles.actions}>
              <button style={styles.demoButton}>View Demo</button>
              {isInCart(project.id) ? (
                <button style={styles.addedButton} disabled>
                  ✓ Added to Cart
                </button>
              ) : (
                <button 
                  style={styles.addToCartButton}
                  onClick={() => handleAddToCart(project)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div style={styles.noResults}>
          <h3>No projects found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    color: 'var(--primary)',
    fontSize: '42px',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '18px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  cartIndicator: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '25px',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1000
  },
  cartLink: {
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  cartIcon: {
    fontSize: '18px'
  },
  searchSection: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  searchBox: {
    position: 'relative',
    width: '400px',
    maxWidth: '100%'
  },
  searchInput: {
    width: '100%',
    padding: '12px 45px 12px 15px',
    border: '2px solid var(--border)',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)'
  },
  searchIcon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: 'var(--text-secondary)'
  },
  filterSelect: {
    padding: '12px 15px',
    border: '2px solid var(--border)',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)',
    minWidth: '150px'
  },
  resultsInfo: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'var(--text-secondary)'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
    maxWidth: '1300px',
    margin: '0 auto'
  },
  projectCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '15px'
  },
  icon: {
    fontSize: '30px',
    marginTop: '5px'
  },
  projectInfo: {
    flex: 1
  },
  projectTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    margin: '0 0 8px 0',
    fontWeight: 'bold'
  },
  domain: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    backgroundColor: 'var(--hover-bg)',
    padding: '3px 10px',
    borderRadius: '12px'
  },
  price: {
    color: 'var(--success)',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  techTag: {
    backgroundColor: 'var(--primary-bg, #dbeafe)',
    color: 'var(--primary)',
    padding: '5px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  features: {
    fontSize: '14px',
    color: 'var(--text-primary)'
  },
  featuresList: {
    margin: '8px 0 0 0',
    paddingLeft: '20px',
    color: 'var(--text-secondary)'
  },
  projectDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  detail: {
    display: 'flex',
    gap: '5px'
  },
  beginner: {
    color: 'var(--success)',
    fontWeight: '600'
  },
  intermediate: {
    color: 'var(--warning)',
    fontWeight: '600'
  },
  advanced: {
    color: 'var(--error)',
    fontWeight: '600'
  },
  actions: {
    display: 'flex',
    gap: '10px'
  },
  demoButton: {
    flex: 1,
    padding: '10px',
    border: '2px solid var(--primary)',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  addToCartButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  addedButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed',
    fontWeight: '600'
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-secondary)'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .demo-button:hover {
      background-color: var(--primary);
      color: white;
    }
    
    .add-to-cart-button:hover {
      background-color: var(--primary-dark);
    }
    
    .cart-indicator:hover {
      transform: scale(1.05);
    }
    
    .search-input:focus {
      border-color: var(--primary);
    }
    
    .filter-select:focus {
      border-color: var(--primary);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Projects;