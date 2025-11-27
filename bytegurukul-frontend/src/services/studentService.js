import api from './api';

export const studentService = {
  // Order Create karna
  createOrder: async (courseId) => {
    try {
      const response = await api.post('/student/order/create', { courseId });
      return response; // Returns { success: true, order: {...} }
    } catch (error) {
      throw error;
    }
  },

  // Payment Verify aur Enrollment Confirm karna
  verifyOrder: async (paymentData) => {
    try {
      const response = await api.post('/student/order/verify', paymentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // User ke enrolled courses lana
  getMyLearnings: async () => {
    try {
      const response = await api.get('/student/my-learnings');
      return response;
    } catch (error) {
      throw error;
    }
  }
};