import api from './api';

// Certificate Services
export const certificateService = {
  getMyCertificates: () => api.get('/certificates/my-certificates'),
  getCertificateById: (id) => api.get(`/certificates/${id}`),
  generateCertificate: (courseId) => api.post('/certificates/generate', { courseId }),
  downloadCertificate: (certificateId) => globalThis.location.href = `${process.env.REACT_APP_API_URL}/certificates/${certificateId}/download`,
  verifyCertificate: (certificateId) => api.get(`/certificates/verify/${certificateId}`),
};

// Task Services
export const taskService = {
  getAllTasks: () => api.get('/tasks'),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// Submission Services
export const submissionService = {
  getMySubmissions: () => api.get('/submissions/my-submissions'),
  getTaskSubmissions: (taskId) => api.get(`/submissions/task/${taskId}`),
  getSubmissionById: (id) => api.get(`/submissions/${id}`),
  submitTask: (formData) => api.post('/submissions', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  gradeSubmission: (id, gradeData) => api.put(`/submissions/${id}`, gradeData),
  deleteSubmission: (id) => api.delete(`/submissions/${id}`),
};

// Progress Services
export const progressService = {
  getCourseProgress: (courseId) => api.get(`/progress/course/${courseId}`),
  getLectureProgress: (lectureId) => api.get(`/progress/lecture/${lectureId}`),
  markLectureComplete: (lectureId) => api.post('/progress/mark-complete', { lectureId }),
  updateLectureProgress: (lectureId, watchedDuration) => api.put(`/progress/${lectureId}`, { watchedDuration }),
  getDashboardOverview: () => api.get('/progress/dashboard/overview'),
};

// Analytics Services
export const analyticsService = {
  getInstructorDashboard: () => api.get('/analytics/instructor/dashboard'),
  getCourseAnalytics: (courseId) => api.get(`/analytics/course/${courseId}`),
  getAdminDashboard: () => api.get('/analytics/admin/dashboard'),
  getStudentProgress: () => api.get('/analytics/student/progress'),
};

// Internship Services
export const internshipService = {
  apply: (formData) => api.post('/internship/apply', formData),
  getApplications: () => api.get('/internship/all'),
  getMyApplications: () => api.get('/internship/my-applications'),
  approveApplication: (appId) => api.put(`/internship/applications/${appId}/approve`, {}),
  rejectApplication: (appId, reason) => api.put(`/internship/applications/${appId}/reject`, { reason }),
};
