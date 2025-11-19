import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function OrderSuccess() {
  const location = useLocation();
  const { user } = useAuth();
  const order = location.state?.order;

  // Mock order data if not passed
  const mockOrder = {
    id: 'BG' + Date.now(),
    date: new Date().toISOString(),
    total: 4597,
    items: [
      { title: 'E-Commerce Website', domain: 'Web Development', price: 2499, icon: '🛒' },
      { title: 'Weather App', domain: 'Mobile Development', price: 999, icon: '🌤️' }
    ]
  };

  const displayOrder = order || mockOrder;

  return (
    <div style={styles.container}>
      <div style={styles.successCard}>
        {/* Success Icon */}
        <div style={styles.successIcon}>🎉</div>
        
        {/* Success Message */}
        <h1 style={styles.successTitle}>Order Successful!</h1>
        <p style={styles.successMessage}>
          Thank you for your purchase, {user?.name || 'Student'}! Your projects are ready for download.
        </p>

        {/* Order Details */}
        <div style={styles.orderDetails}>
          <div style={styles.detailRow}>
            <span>Order ID:</span>
            <strong>{displayOrder.id}</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Order Date:</span>
            <span>{new Date(displayOrder.date).toLocaleDateString()}</span>
          </div>
          <div style={styles.detailRow}>
            <span>Total Amount:</span>
            <strong style={styles.totalAmount}>₹{displayOrder.total}</strong>
          </div>
        </div>

        {/* Purchased Items */}
        <div style={styles.itemsSection}>
          <h3 style={styles.itemsTitle}>Purchased Projects</h3>
          <div style={styles.itemsList}>
            {(displayOrder.items || []).map((item, index) => (
              <div key={index} style={styles.itemCard}>
                <span style={styles.itemIcon}>{item.icon}</span>
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemName}>{item.title}</h4>
                  <span style={styles.itemDomain}>{item.domain}</span>
                </div>
                <div style={styles.itemActions}>
                  <button style={styles.downloadButton}>
                    📥 Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div style={styles.nextSteps}>
          <h3 style={styles.stepsTitle}>What's Next?</h3>
          <div style={styles.stepsList}>
            <div style={styles.step}>
              <span style={styles.stepIcon}>1</span>
              <div>
                <strong>Download your projects</strong>
                <p>Access source code and documentation</p>
              </div>
            </div>
            <div style={styles.step}>
              <span style={styles.stepIcon}>2</span>
              <div>
                <strong>Set up the projects</strong>
                <p>Follow the installation guide</p>
              </div>
            </div>
            <div style={styles.step}>
              <span style={styles.stepIcon}>3</span>
              <div>
                <strong>Start learning & customizing</strong>
                <p>Modify and enhance the projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <Link to="/dashboard">
            <button style={styles.dashboardButton}>
              Go to Dashboard
            </button>
          </Link>
          <Link to="/projects">
            <button style={styles.continueButton}>
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Support Info */}
        <div style={styles.supportInfo}>
          <p>Need help? <Link to="/contact" style={styles.supportLink}>Contact support</Link></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: 'var(--background)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  successCard: {
    backgroundColor: 'var(--surface)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    color: 'var(--text-primary)'
  },
  successIcon: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  successTitle: {
    color: 'var(--success)',
    fontSize: '32px',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  successMessage: {
    color: 'var(--text-secondary)',
    fontSize: '16px',
    marginBottom: '30px',
    lineHeight: '1.5'
  },
  orderDetails: {
    backgroundColor: 'var(--hover-bg)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'left'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  totalAmount: {
    color: 'var(--success)',
    fontSize: '18px'
  },
  itemsSection: {
    marginBottom: '30px',
    textAlign: 'left'
  },
  itemsTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  itemCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'var(--hover-bg)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  itemIcon: {
    fontSize: '24px'
  },
  itemInfo: {
    flex: 1,
    textAlign: 'left'
  },
  itemName: {
    color: 'var(--text-primary)',
    fontSize: '14px',
    margin: '0 0 5px 0',
    fontWeight: '500'
  },
  itemDomain: {
    color: 'var(--text-secondary)',
    fontSize: '12px'
  },
  itemActions: {
    flexShrink: 0
  },
  downloadButton: {
    padding: '8px 16px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  nextSteps: {
    marginBottom: '30px',
    textAlign: 'left'
  },
  stepsTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  stepIcon: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    flexShrink: 0
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  dashboardButton: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '150px',
    transition: 'background-color 0.3s ease'
  },
  continueButton: {
    padding: '12px 24px',
    border: '2px solid var(--primary)',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '150px',
    transition: 'all 0.3s ease'
  },
  supportInfo: {
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  supportLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .dashboard-button:hover {
      background-color: var(--primary-dark);
    }
    
    .continue-button:hover {
      background-color: var(--primary);
      color: white;
    }
    
    .download-button:hover {
      background-color: var(--primary-dark);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default OrderSuccess;