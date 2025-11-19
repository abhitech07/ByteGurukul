import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CourseProvider } from './contexts/CourseContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import InternshipHome from "./pages/internship/InternshipHome";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import InternshipStatus from "./pages/internship/InternshipStatus";
import InstructorCourses from "./pages/InstructorCourses";
import InternshipApplicationSuccess from "./pages/internship/InternshipApplicationSuccess";
import Notifications from './pages/student/Notifications';
import Certificates from './pages/student/CertificatesAdvanced';
import Profile from './pages/student/Profile';
import ProgressAnalytics from './pages/student/ProgressAnalytics';
import Wishlist from './pages/student/Wishlist';
import InternshipApply from "./pages/internship/InternshipApply";
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import Internship from './pages/Internship';
import InterviewScheduler from "./pages/internship/InterviewScheduler";
import AdminReports from './pages/AdminReports';
import InternshipDashboardStudent from "./pages/internship/InternshipDashboardStudent";
import RecruiterChat from "./pages/internship/RecruiterChat";
import InternshipTasks from "./pages/internship/InternshipTasks";
import InternshipOffer from "./pages/internship/InternshipOffer"; // optional route for direct preview
import Projects from './pages/Projects';
import AdminInstructors from './pages/AdminInstructors';
import Login from './pages/Login';
import StudentOrders from './pages/StudentOrders';
import InterviewConfirmation from "./pages/internship/InterviewConfirmation";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import InstructorCreateCourse from "./pages/InstructorCreateCourse";
import InstructorStudents from "./pages/InstructorStudents";
import InstructorAnalytics from "./pages/InstructorAnalytics";
import InstructorEarnings from "./pages/InstructorEarnings";
import CourseDetail from './pages/CourseDetail';
import LearningPage from './pages/LearningPage';
import './App.css';

function App() {
  return (
    <Router> {/* ✅ Router must wrap everything */}
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider> {/* ✅ AuthProvider now inside Router */}
            <CartProvider>
              <CourseProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetail />} />
                    <Route path="/learn/:courseId" element={<LearningPage />} />
                    <Route path="/internship" element={<Internship />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/internship" element={<InternshipHome />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/internship/apply" element={<InternshipApply />} />
                    <Route path="/internship/scheduler" element={<InterviewScheduler />} />
                    <Route path="/internship/status" element={<InternshipStatus />} />
                    <Route path="/student/orders" element={<StudentOrders />} />
                    <Route path="/instructor/courses/create" element={<InstructorCreateCourse />} />
                    <Route path="/instructor/students" element={<InstructorStudents />} />
                    <Route path="/internship/interview" element={<InterviewScheduler />} />
                    <Route path="/internship" element={<InternshipDashboardStudent />} />
                    <Route path="/internship/interview" element={<InterviewScheduler />} />
                    <Route path="/internship/application-success" element={<InternshipApplicationSuccess />} />
                    <Route path="/internship/chat" element={<RecruiterChat />} />
                    <Route path="/internship/tasks" element={<InternshipTasks />} />
                    <Route path="/internship/offers" element={<InternshipDashboardStudent />} /> {/* or separate offers page */}
                    <Route path="/instructor/analytics" element={<InstructorAnalytics />} />
                    <Route path="/instructor/courses" element={<InstructorCourses />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/student/notifications" element={<Notifications />} />
                    <Route path="/student/certificates" element={<Certificates />} />
                    <Route path="/student/profile" element={<Profile />} />
                    <Route path="/student/progress" element={<ProgressAnalytics />} />
                    <Route path="/student/wishlist" element={<Wishlist />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/instructors" element={<AdminInstructors />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/instructor/earnings" element={<InstructorEarnings />} />
                    <Route path="/admin/reports" element={<AdminReports />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/internship/interview-confirmation" element={<InterviewConfirmation />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
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