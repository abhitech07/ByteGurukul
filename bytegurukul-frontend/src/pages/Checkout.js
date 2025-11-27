import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService'; // IMPORT ADDED
import { FaCreditCard, FaWallet, FaUniversity, FaLock, FaCheckCircle, FaUserCircle, FaShoppingBag } from 'react-icons/fa';

function Checkout() {
  // Note: Added clearCart from context to empty cart after purchase
  const { cart, getCartTotal, clearCart } = useCart(); 
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal; 

  const paymentOptions = [
    { value: 'card', label: 'Credit/Debit Card', icon: FaCreditCard },
    { value: 'upi', label: 'UPI Payment', icon: FaWallet },
    { value: 'netbanking', label: 'Net Banking', icon: FaUniversity },
    { value: 'wallet', label: 'Digital Wallet', icon: FaShoppingBag },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // --- MODIFIED HANDLE ORDER FUNCTION ---
  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      // Process each item in the cart
      // (Backend currently handles 1 course at a time, so we loop)
      for (const item of cart) {
          
        // 1. Create Order
        const response = await studentService.createOrder(item.id);
        
        if (response.success && response.order) {
            const { order } = response;

            // Check if it is a Mock Order (No Razorpay ID)
            if (order.isMock) {
                console.log(`Processing Mock Payment for ${item.title}...`);
                
                const verifyData = {
                    razorpay_order_id: order.id,
                    razorpay_payment_id: "mock_pay_" + Date.now(),
                    razorpay_signature: "mock_sig",
                    courseId: item.id,
                    isMock: true
                };
                
                // 2. Verify & Enroll
                await studentService.verifyOrder(verifyData);
            } else {
                // Real Razorpay logic would go here in future
                alert("Razorpay ID not found. Using backend Mock mode.");
            }
        }
      }

      // Order Complete
      setIsProcessing(false);
      
      // Clear Cart locally
      if(clearCart) clearCart(); 

      // Redirect
      const dummyOrderData = {
        id: "ORDER-" + Date.now(),
        total: total,
        date: new Date().toLocaleDateString()
      };
      navigate('/order-success', { state: { order: dummyOrderData } });

    } catch (error) {
      console.error("Payment Failed:", error);
      setIsProcessing(false);
      alert(error.message || "Something went wrong during checkout.");
    }
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
        <p style={styles.subtitle}>Finalize your order and complete the payment</p>
      </div>

      <div style={styles.checkoutLayout}>
        
        {/* LEFT COLUMN: Order Summary */}
        <div style={styles.orderSection}>
          <h3 style={styles.sectionTitle}>Order Summary ({cart.length} Items)</h3>
          
          <div style={styles.orderItems}>
            {cart.map((item) => (
              <div key={item.id} style={styles.orderItem}>
                <span style={styles.itemIcon}>{item.icon}</span>
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemName}>{item.title}</h4>
                  <span style={styles.itemDomain}>{item.domain}</span>
                </div>
                <span style={styles.itemPrice}>{formatCurrency(item.price * (item.quantity || 1))}</span>
              </div>
            ))}
          </div>

          <div style={styles.orderTotal}>
            
            <div style={styles.totalRowFinal}>
              <strong style={{fontSize: '24px'}}>Total Payable:</strong>
              <strong style={styles.finalTotal}>
                {formatCurrency(total)}
              </strong>
            </div>
            
            <div style={styles.securityNoteBottom}>
              <FaCheckCircle style={{marginRight: 8}}/>
              Includes lifetime access to source code & documentation.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment & Billing */}
        <div style={styles.paymentSection}>
          
          {/* Billing Information */}
          <div style={styles.userInfo}>
            <h4 style={styles.infoTitle}><FaUserCircle style={{marginRight: 8}}/> Billing Information</h4>
            <div style={styles.infoRow}>
              <strong>Name:</strong> <span>{user?.name || 'Guest User'}</span>
            </div>
            <div style={styles.infoRow}>
              <strong>Email:</strong> <span>{user?.email || 'Not provided'}</span>
            </div>
            <div style={styles.infoRow}>
              <strong>Delivery:</strong> <span>Instant Digital Delivery</span>
            </div>
          </div>

          <h3 style={styles.sectionTitle}>Choose Payment Method</h3>
          
          <div style={styles.paymentMethods}>
            {paymentOptions.map(option => (
                <label key={option.value} 
                       className="payment-option"
                       style={{
                           ...styles.paymentOption,
                           borderColor: paymentMethod === option.value ? 'var(--primary)' : 'var(--border)',
                           backgroundColor: paymentMethod === option.value ? 'var(--primary-bg, #f0f9ff)' : 'var(--surface)'
                        }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={styles.radio}
                  />
                  <span style={styles.paymentLabel}>
                    <option.icon style={styles.paymentIcon} />
                    {option.label}
                  </span>
                </label>
            ))}
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="place-order-button"
            style={{
              ...styles.placeOrderButton,
              ...(isProcessing ? styles.processingButton : {})
            }}
          >
            {isProcessing ? 'Processing Payment...' : `Confirm & Pay ${formatCurrency(total)}`}
          </button>

          <div style={styles.securityNote}>
            <FaLock style={{marginRight: 8}}/>
            Your connection is secure and encrypted.
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
    gridTemplateColumns: '1.2fr 1fr', 
    gap: '50px',
    maxWidth: '1100px',
    margin: '0 auto',
    alignItems: 'start'
  },
  orderSection: {
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid #dbeafe'
  },
  paymentSection: {
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid #dbeafe',
    position: 'sticky',
    top: '100px'
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: '700'
  },
  orderItems: {
    marginBottom: '25px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '15px'
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px 0',
    borderTop: '1px dashed #f1f5f9'
  },
  itemIcon: {
    fontSize: '22px',
    flexShrink: 0
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    margin: '0 0 4px 0',
    fontWeight: '600'
  },
  itemDomain: {
    color: 'var(--text-secondary)',
    fontSize: '13px'
  },
  itemPrice: {
    color: 'var(--success)',
    fontWeight: '700',
    fontSize: '18px'
  },
  orderTotal: {
    paddingTop: '20px'
  },
  totalRowFinal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    color: 'var(--text-primary)'
  },
  finalTotal: {
    color: 'var(--success)',
    fontSize: '32px'
  },
  paymentMethods: {
    marginBottom: '30px'
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    border: '2px solid var(--border)',
    borderRadius: '12px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'var(--text-primary)',
  },
  radio: {
    marginRight: '15px'
  },
  paymentLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '600',
    fontSize: '16px'
  },
  paymentIcon: {
    fontSize: '22px',
    color: 'var(--primary)'
  },
  userInfo: {
    backgroundColor: '#f1f5f9',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)'
  },
  infoTitle: {
    color: 'var(--primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center'
  },
  infoRow: {
    marginBottom: '8px',
    fontSize: '15px',
    color: 'var(--text-secondary)',
    display: 'flex',
    justifyContent: 'space-between'
  },
  placeOrderButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(90deg, #16a34a, #059669)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: '800',
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.4)'
  },
  processingButton: {
    backgroundColor: 'var(--text-muted)',
    background: 'var(--text-muted)',
    cursor: 'not-allowed',
    opacity: 0.8
  },
  securityNote: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500'
  },
  securityNoteBottom: {
    textAlign: 'center',
    color: 'var(--success)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    marginTop: '20px'
  }
};

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
      background: linear-gradient(90deg, #059669, #16a34a);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(22, 163, 74, 0.6);
    }
    
    .place-order-button:not(:disabled):active {
        transform: translateY(0);
        box-shadow: none;
    }
  }
  
  @media (max-width: 900px) {
    ${styles.checkoutLayout.gridTemplateColumns} {
      grid-template-columns: 1fr;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = interactiveStyle;
document.head.appendChild(styleSheet);

export default Checkout;