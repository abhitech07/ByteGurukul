import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, getCartTotal, createOrder, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const platformFee = 99;
  const gst = Math.round((subtotal + platformFee) * 0.18);
  const total = subtotal + platformFee + gst;

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        user: user,
        paymentMethod: paymentMethod,
        shippingAddress: 'Digital Delivery'
      };

      const order = createOrder(orderData);
      setIsProcessing(false);
      navigate('/order-success', { state: { order } });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Add some projects before checkout</p>
          <button 
            onClick={() => navigate('/projects')}
            style={styles.continueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Checkout</h1>
        <p style={styles.subtitle}>Complete your purchase</p>
      </div>

      <div style={styles.checkoutLayout}>
        {/* Order Summary */}
        <div style={styles.orderSection}>
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          <div style={styles.orderItems}>
            {cart.map((item) => (
              <div key={item.id} style={styles.orderItem}>
                <span style={styles.itemIcon}>{item.icon}</span>
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemName}>{item.title}</h4>
                  <span style={styles.itemDomain}>{item.domain}</span>
                </div>
                <span style={styles.itemPrice}>₹{item.price}</span>
              </div>
            ))}
          </div>

          <div style={styles.orderTotal}>
            <div style={styles.totalRow}>
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Platform Fee:</span>
              <span>₹{platformFee}</span>
            </div>
            <div style={styles.totalRow}>
              <span>GST (18%):</span>
              <span>₹{gst}</span>
            </div>
            <div style={styles.totalDivider}></div>
            <div style={styles.totalRow}>
              <strong>Total Amount:</strong>
              <strong style={styles.finalTotal}>₹{total}</strong>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div style={styles.paymentSection}>
          <h3 style={styles.sectionTitle}>Payment Method</h3>
          
          <div style={styles.paymentMethods}>
            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>
                <span style={styles.paymentIcon}>💳</span>
                Credit/Debit Card
              </span>
            </label>

            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>
                <span style={styles.paymentIcon}>📱</span>
                UPI Payment
              </span>
            </label>

            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === 'netbanking'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>
                <span style={styles.paymentIcon}>🏦</span>
                Net Banking
              </span>
            </label>

            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>
                <span style={styles.paymentIcon}>👛</span>
                Digital Wallet
              </span>
            </label>
          </div>

          {/* User Info */}
          <div style={styles.userInfo}>
            <h4 style={styles.infoTitle}>Billing Information</h4>
            <div style={styles.infoRow}>
              <strong>Name:</strong> {user?.name || 'Guest User'}
            </div>
            <div style={styles.infoRow}>
              <strong>Email:</strong> {user?.email || 'Not provided'}
            </div>
            <div style={styles.infoRow}>
              <strong>Delivery:</strong> Digital (Source code & documentation)
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            style={{
              ...styles.placeOrderButton,
              ...(isProcessing ? styles.processingButton : {})
            }}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ₹${total}`}
          </button>

          <div style={styles.securityNote}>
            <span style={styles.lockIcon}>🔒</span>
            Your payment is secure and encrypted
          </div>
        </div>
      </div>
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
    fontSize: '36px',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '16px'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--text-primary)'
  },
  continueShopping: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
  },
  checkoutLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
    alignItems: 'start'
  },
  orderSection: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  paymentSection: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    position: 'sticky',
    top: '20px'
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  orderItems: {
    marginBottom: '25px'
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 0',
    borderBottom: '1px solid var(--border)'
  },
  itemIcon: {
    fontSize: '24px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    margin: '0 0 5px 0',
    fontWeight: '500'
  },
  itemDomain: {
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  itemPrice: {
    color: 'var(--success)',
    fontWeight: '600'
  },
  orderTotal: {
    borderTop: '2px solid var(--border)',
    paddingTop: '20px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  totalDivider: {
    height: '1px',
    backgroundColor: 'var(--border)',
    margin: '15px 0'
  },
  finalTotal: {
    color: 'var(--success)',
    fontSize: '18px'
  },
  paymentMethods: {
    marginBottom: '25px'
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    border: '2px solid var(--border)',
    borderRadius: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    color: 'var(--text-primary)'
  },
  radio: {
    marginRight: '15px'
  },
  paymentLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '500'
  },
  paymentIcon: {
    fontSize: '20px'
  },
  userInfo: {
    backgroundColor: 'var(--hover-bg)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '25px',
    color: 'var(--text-primary)'
  },
  infoTitle: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  infoRow: {
    marginBottom: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  placeOrderButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'background-color 0.3s ease'
  },
  processingButton: {
    backgroundColor: 'var(--text-secondary)',
    cursor: 'not-allowed'
  },
  securityNote: {
    textAlign: 'center',
    color: 'var(--success)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  lockIcon: {
    fontSize: '16px'
  }
};

// Add hover and focus styles
const interactiveStyle = `
  @media (hover: hover) {
    .payment-option:hover {
      border-color: var(--primary);
    }
    
    .payment-option:has(input:checked) {
      border-color: var(--primary);
      background-color: var(--primary-bg, #f0f9ff);
    }
    
    .place-order-button:not(:disabled):hover {
      background-color: var(--success-dark, #047857);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = interactiveStyle;
document.head.appendChild(styleSheet);

export default Checkout;