import api from './api';

export const studentService = {
  // Create Order (Modified for Razorpay)
  createOrder: async (itemId, itemType = 'project') => {
    try {
      // Calls the new Payment Controller we created
      const response = await api.post('/payments/create-order', { itemId, itemType });
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Failed to create order";
    }
  },

  // Verify Payment (Modified for Razorpay Signature)
  verifyOrder: async (paymentData) => {
    try {
      const response = await api.post('/payments/verify', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Payment verification failed";
    }
  },

  // User ke enrolled courses lana (Existing)
  getMyLearnings: async () => {
    try {
      const response = await api.get('/student/my-learnings');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};