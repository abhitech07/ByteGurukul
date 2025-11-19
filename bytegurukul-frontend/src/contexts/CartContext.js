import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load cart and orders from localStorage on app start
  useEffect(() => {
    const savedCart = localStorage.getItem('bytegurukul_cart');
    const savedOrders = localStorage.getItem('bytegurukul_orders');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to localStorage whenever cart or orders change
  useEffect(() => {
    localStorage.setItem('bytegurukul_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bytegurukul_orders', JSON.stringify(orders));
  }, [orders]);

  // Add project to cart (Updated logic to handle existing items)
  const addToCart = (project) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === project.id);
      if (existingItem) {
        // New enhancement: Increment quantity if item is added again
        return prevCart.map(item =>
          item.id === project.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...project, quantity: 1 }];
    });
  };

  // Remove project from cart
  const removeFromCart = (projectId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== projectId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // NEW FEATURE: Update project quantity in cart
  const updateQuantity = (projectId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === projectId
          ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
          : item
      )
    );
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart items count
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Create order (checkout)
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cart],
      total: getCartTotal(),
      status: 'completed',
      paymentMethod: orderData.paymentMethod,
      ...orderData
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart(); // Clear cart after successful order
    
    return newOrder;
  };

  // Check if project is in cart
  const isInCart = (projectId) => {
    return cart.some(item => item.id === projectId);
  };

  const value = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity, // ADDED
    getCartTotal,
    getCartItemsCount,
    createOrder,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}