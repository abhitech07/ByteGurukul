import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  // Destructure updateQuantity from useCart
  const { cart, removeFromCart, getCartTotal, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Add some awesome projects to get started!</p>
          <Link to="/projects">
            <button style={styles.shopButton}>Browse Projects</button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const platformFee = 99;
  const gst = Math.round((subtotal + platformFee) * 0.18);
  const total = subtotal + platformFee + gst;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <p style={styles.subtitle}>{cart.length} project(s) in your cart</p>
      </div>

      <div style={styles.cartLayout}>
        {/* Cart Items */}
        <div style={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.itemImage}>
                <span style={styles.itemIcon}>{item.icon}</span>
              </div>
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemDomain}>{item.domain}</p>
                <div style={styles.techTags}>
                  {item.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} style={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* Advanced Feature: Quantity Control */}
              <div style={styles.itemPrice}>
                <div style={styles.quantityControl}>
                  <label style={styles.quantityLabel}>Qty:</label>
                  <select 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    style={styles.quantitySelect}
                  >
                    {[1, 2, 3, 4, 5].map(q => ( // Allow up to 5 items
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
                {/* Display total price for the item(s) */}
                <div style={styles.price}>₹{item.price * item.quantity}</div> 
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          
          <div style={styles.summaryDetails}>
            <div style={styles.summaryRow}>
              {/* Updated item count in summary */}
              <span>Subtotal ({cart.reduce((count, item) => count + item.quantity, 0)} items):</span> 
              <span>₹{subtotal}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Platform Fee:</span>
              <span>₹{platformFee}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>GST (18%):</span>
              <span>₹{gst}</span>
            </div>
            <div style={styles.summaryDivider}></div>
            <div style={styles.summaryRow}>
              <strong>Total:</strong>
              <strong style={styles.totalPrice}>
                ₹{total}
              </strong>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            style={styles.checkoutButton}
          >
            Proceed to Checkout
          </button>

          <button 
            onClick={clearCart}
            style={styles.clearCartButton}
          >
            Clear Cart
          </button>

          <div style={styles.secureCheckout}>
            <span style={styles.lockIcon}>🔒</span>
            Secure checkout guaranteed
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
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'var(--surface)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  emptyTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    marginBottom: '10px'
  },
  emptyText: {
    color: 'var(--text-secondary)',
    marginBottom: '30px'
  },
  shopButton: {
    padding: '12px 30px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  cartLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'start'
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  cartItem: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  itemImage: {
    flexShrink: 0
  },
  itemIcon: {
    fontSize: '40px'
  },
  itemDetails: {
    flex: 1
  },
  itemTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    margin: '0 0 8px 0',
    fontWeight: '600'
  },
  itemDomain: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    marginBottom: '10px'
  },
  techTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  techTag: {
    backgroundColor: 'var(--primary-bg, #dbeafe)',
    color: 'var(--primary)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  itemPrice: {
    textAlign: 'right'
  },
  price: {
    color: 'var(--success)',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  // NEW STYLES FOR QUANTITY CONTROL
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    justifyContent: 'flex-end'
  },
  quantityLabel: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  quantitySelect: {
    padding: '5px 10px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none'
  },
  // END NEW STYLES
  removeButton: {
    padding: '8px 16px',
    border: '2px solid var(--error)',
    backgroundColor: 'transparent',
    color: 'var(--error)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  orderSummary: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    position: 'sticky',
    top: '20px'
  },
  summaryTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  summaryDetails: {
    marginBottom: '25px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: 'var(--border)',
    margin: '15px 0'
  },
  totalPrice: {
    color: 'var(--success)',
    fontSize: '18px'
  },
  checkoutButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'background-color 0.3s ease'
  },
  clearCartButton: {
    width: '100%',
    padding: '12px',
    border: '2px solid var(--border)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.3s ease'
  },
  secureCheckout: {
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

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .cart-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    
    .remove-button:hover {
      background-color: var(--error);
      color: white;
    }
    
    .checkout-button:hover {
      background-color: var(--success-dark, #047857);
    }
    
    .clear-cart-button:hover {
      background-color: var(--hover-bg);
    }
    
    .shop-button:hover {
      background-color: var(--primary-dark);
    }
    
    .quantity-select:focus {
      border-color: var(--primary);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Cart;