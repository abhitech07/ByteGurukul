import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      
      // Check success inside response.data
      if (response.data && response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // ✅ FIX: Return response.data so the component gets { success: true, user: ... }
      // instead of the full Axios object
      return response.data; 
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);

      console.log('AuthService Login Response:', response); 
      
      // Destructure data from the axios response
      const { data } = response; 

      console.log('My jwt token', data.token); 
      console.log('AuthService Response.user:', data.user); 
      console.log('AuthService Response.user.role:', data.user?.role); 

      if (data && data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // ✅ FIX: Return 'data' directly. 
      // This ensures your Login.js receives the object containing { user, role, token }
      return data; 
    } catch (error) {
      throw error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      // ✅ FIX: Return data
      return response.data; 
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user data
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};