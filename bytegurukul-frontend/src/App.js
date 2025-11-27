import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CourseProvider } from './contexts/CourseContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

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
import AdminApprovals from './pages/AdminApprovals';
import PYQPapers from './pages/PYQPapers'; 
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import StudentOrders from './pages/StudentOrders';
import AuthSuccess from './pages/AuthSuccess'; 

// ✅ IMPORT FORGOT PASSWORD PAGES
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminInstructors from './pages/AdminInstructors';
import AdminSettings from './pages/AdminSettings';
import AdminInterviews from "./pages/AdminInterviews"; 
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AdminPYQ from './pages/AdminPYQ'; 

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
                    <Route path="/pyq-papers" element={<PYQPapers />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetail />} />
                    
                    <Route path="/learn/:courseId" element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']}>
                        <LearningPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* ✅ FORGOT PASSWORD ROUTES ADDED */}
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />

                    {/* Social Login Handler Route */}
                    <Route path="/auth-success" element={<AuthSuccess />} />

                    {/* Student Protected Routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']}>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/orders" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <StudentOrders />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/notifications" element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']}>
                        <Notifications />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/certificates" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <Certificates />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/profile" element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']}>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/progress" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <ProgressAnalytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/wishlist" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <Wishlist />
                      </ProtectedRoute>
                    } />
                    <Route path="/cart" element={<Cart />} />
                    
                    <Route path="/checkout" element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']}>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/order-success" element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']}>
                        <OrderSuccess />
                      </ProtectedRoute>
                    } />

                    {/* Internship Routes */}
                    <Route path="/internship" element={<InternshipHome />} />
                    <Route path="/internship/apply/:id" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InternshipApply />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/status" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InternshipStatus />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/application-success" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InternshipApplicationSuccess />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/interview" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InterviewScheduler />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/interview-confirmation" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InterviewConfirmation />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/dashboard" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InternshipDashboardStudent />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/chat" element={
                      <ProtectedRoute allowedRoles={['Student', 'Admin']}>
                        <RecruiterChat />
                      </ProtectedRoute>
                    } />
                    <Route path="/internship/tasks" element={
                      <ProtectedRoute allowedRoles={['Student']}>
                        <InternshipTasks />
                      </ProtectedRoute>
                    } />

                    {/* Instructor Routes */}
                    <Route path="/instructor/courses" element={
                      <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                        <InstructorCourses />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/courses/create" element={
                      <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                        <InstructorCreateCourse />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/students" element={
                      <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                        <InstructorStudents />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/analytics" element={
                      <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                        <InstructorAnalytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/earnings" element={
                      <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                        <InstructorEarnings />
                      </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin-dashboard" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/users" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminUsers />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/courses" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminCourses />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/instructors" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminInstructors />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/settings" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminSettings />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/analytics" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminAnalytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/interviews" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminInterviews />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/reports" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminReports />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/approvals" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminApprovals />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/pyq" element={
                      <ProtectedRoute allowedRoles={['Admin']}>
                        <AdminPYQ />
                      </ProtectedRoute>
                    } />
                    
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