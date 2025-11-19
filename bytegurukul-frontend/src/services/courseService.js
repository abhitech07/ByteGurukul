import api from './api';

export const courseService = {
  // Get all courses with filters
  getAllCourses: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/courses?${params.toString()}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get single course by ID
  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create new course (for instructors)
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update course
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete course
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Enroll in course
  enrollCourse: async (courseId) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};