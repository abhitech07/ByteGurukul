import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CourseProvider } from './contexts/CourseContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/common/Layout';

// Page Imports
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LearningPage from './pages/LearningPage';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import StudentOrders from './pages/StudentOrders';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminInstructors from './pages/AdminInstructors';
import AdminSettings from './pages/AdminSettings';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AdminApprovals from './pages/AdminApprovals'; // <--- NEW IMPORT

// Instructor Pages
import InstructorCourses from "./pages/InstructorCourses";
import InstructorCreateCourse from "./pages/InstructorCreateCourse";
import InstructorStudents from "./pages/InstructorStudents";
import InstructorAnalytics from "./pages/InstructorAnalytics";
import InstructorEarnings from "./pages/InstructorEarnings";

// Student Pages
import Notifications from './pages/student/Notifications';
import Certificates from './pages/student/CertificatesAdvanced';
import Profile from './pages/student/Profile';
import ProgressAnalytics from './pages/student/ProgressAnalytics';
import Wishlist from './pages/student/Wishlist';

// Internship Pages
import Internship from './pages/Internship';
import InternshipHome from "./pages/internship/InternshipHome";
import InternshipApply from "./pages/internship/InternshipApply";
import InternshipStatus from "./pages/internship/InternshipStatus";
import InternshipApplicationSuccess from "./pages/internship/InternshipApplicationSuccess";
import InterviewScheduler from "./pages/internship/InterviewScheduler";
import InterviewConfirmation from "./pages/internship/InterviewConfirmation";
import InternshipDashboardStudent from "./pages/internship/InternshipDashboardStudent";
import RecruiterChat from "./pages/internship/RecruiterChat";
import InternshipTasks from "./pages/internship/InternshipTasks";

import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <CourseProvider>
                <Layout>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetail />} />
                    <Route path="/learn/:courseId" element={<LearningPage />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Student Protected Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/student/orders" element={<StudentOrders />} />
                    <Route path="/student/notifications" element={<Notifications />} />
                    <Route path="/student/certificates" element={<Certificates />} />
                    <Route path="/student/profile" element={<Profile />} />
                    <Route path="/student/progress" element={<ProgressAnalytics />} />
                    <Route path="/student/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />

                    {/* Internship Routes */}
                    <Route path="/internship" element={<InternshipHome />} />
                    {/* 👇 UPDATED ROUTE: Added /:id parameter to fix "required fields" error */}
                    <Route path="/internship/apply/:id" element={<InternshipApply />} />
                    <Route path="/internship/status" element={<InternshipStatus />} />
                    <Route path="/internship/application-success" element={<InternshipApplicationSuccess />} />
                    <Route path="/internship/interview" element={<InterviewScheduler />} />
                    <Route path="/internship/interview-confirmation" element={<InterviewConfirmation />} />
                    <Route path="/internship/dashboard" element={<InternshipDashboardStudent />} />
                    <Route path="/internship/chat" element={<RecruiterChat />} />
                    <Route path="/internship/tasks" element={<InternshipTasks />} />

                    {/* Instructor Routes */}
                    <Route path="/instructor/courses" element={<InstructorCourses />} />
                    <Route path="/instructor/courses/create" element={<InstructorCreateCourse />} />
                    <Route path="/instructor/students" element={<InstructorStudents />} />
                    <Route path="/instructor/analytics" element={<InstructorAnalytics />} />
                    <Route path="/instructor/earnings" element={<InstructorEarnings />} />

                    {/* Admin Routes */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/instructors" element={<AdminInstructors />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/reports" element={<AdminReports />} />
                    {/* 👇 NEW ROUTE: For managing student applications */}
                    <Route path="/admin/approvals" element={<AdminApprovals />} />
                  </Routes>
                </Layout>
              </CourseProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;