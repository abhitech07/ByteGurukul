import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
// FIX: We rely on AuthProvider and useAuth hook
import { AuthProvider, useAuth } from './contexts/AuthContext'; 
import { CartProvider } from './contexts/CartContext';
import { CourseProvider } from './contexts/CourseContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import ToastContainer from './components/common/ToastContainer';

// Public Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import PYQPapers from './pages/PYQPapers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; 
import AuthSuccess from './pages/AuthSuccess';

// Utility Pages
import Contact from './pages/Contact';
import Help from './pages/Help';
import HelpCenter from './pages/Help'; 
import PrivacyPolicy from './pages/Privacy'; 
import TermsAndConditions from './pages/Terms'; 

// Student Pages (Importing specific files found in src/pages/student/)
import StudentDashboard from './pages/StudentDashboard';
import StudentOrders from './pages/StudentOrders';
import Notifications from './pages/student/Notifications'; 
import Certificates from './pages/student/CertificatesAdvanced'; 
import Profile from './pages/student/Profile'; 
import ProgressAnalytics from './pages/student/ProgressAnalytics'; 
import Wishlist from './pages/student/Wishlist'; 
import LearningPage from './pages/LearningPage'; 

// Instructor Pages
import InstructorDashboard from './pages/InstructorDashboard';
import InstructorCourses from './pages/InstructorCourses';
import InstructorCreateCourse from './pages/InstructorCreateCourse';
import InstructorStudents from './pages/InstructorStudents';
import InstructorEarnings from './pages/InstructorEarnings';
import InstructorAnalytics from './pages/InstructorAnalytics';
import RecruiterDashboard from './pages/RecruiterDashboard';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminInstructors from './pages/AdminInstructors';
import AdminPYQ from './pages/AdminPYQ';
import AdminApprovals from './pages/AdminApprovals';
import AdminInterviews from './pages/AdminInterviews';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';

// Internship Pages (Imports based on previous file list)
import InternshipHome from "./pages/internship/InternshipHome";
import InternshipApply from "./pages/internship/InternshipApply";
import InternshipStatus from "./pages/internship/InternshipStatus";
import InternshipApplicationSuccess from "./pages/internship/InternshipApplicationSuccess";
import InterviewScheduler from "./pages/internship/InterviewScheduler";
import InterviewConfirmation from "./pages/internship/InterviewConfirmation";
import InternshipDashboardStudent from "./pages/internship/InternshipDashboardStudent";
import RecruiterChat from "./pages/internship/RecruiterChat";
import InternshipTasks from "./pages/internship/InternshipTasks";
import InternshipOffer from "./pages/internship/InternshipOffer";


// ------------------------------------------------------------------
// NEW COMPONENT: Encapsulates all logic that requires AuthContext
// This component is rendered *inside* the <AuthProvider> tree below.
// ------------------------------------------------------------------
function RootContent() {
  // FIX: useAuth is called successfully here because RootContent is 
  // nested within <AuthProvider>
  const { isAuthenticated, user } = useAuth(); 

  // Helper function for redirection after successful auth (to default dashboard based on role)
  const renderDashboardRedirect = () => {
    if (!isAuthenticated || !user || !user.role) {
      // If not authenticated or role is missing, redirect to login
      return <Navigate to="/login" replace />;
    }
    
    // Role-based redirection logic 
    switch (user.role) {
      case 'Admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'Instructor':
        return <Navigate to="/instructor/courses" replace />;
      case 'Student':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <div className="App">
        <ToastContainer />
        <Layout> 
            <Routes>
                {/* =========================================================================
                  PUBLIC ROUTES - Accessible by everyone
                  ========================================================================= */}
                
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/internship" element={<InternshipHome />} /> 
                <Route path="/projects" element={<Projects />} />
                <Route path="/resources" element={<Resources />} /> 
                <Route path="/pyq-papers" element={<PYQPapers />} />
                
                {/* Shopping Pages */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />


                {/* Utility Pages */}
                <Route path="/help" element={<HelpCenter />} /> 
                <Route path="/contact" element={<Contact />} /> 
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} /> 
                <Route path="/faq" element={<Help />} /> 
                

                {/* Authentication & Redirection */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<ForgotPassword />} /> 
                <Route path="/reset-password/:token" element={<ResetPassword />} /> 
                <Route path="/auth-success" element={<AuthSuccess />} />
                
                {/* POST-LOGIN REDIRECTION */}
                <Route path="/dashboard-redirect" element={renderDashboardRedirect()} />
                
                
                {/* =========================================================================
                  PROTECTED ROUTES
                  ========================================================================= */}
                
                {/* Dashboard Redirect */}
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']} element={<StudentDashboard />} />} />


                {/* STUDENT ROUTES */}
                <Route path="/student/orders" element={<ProtectedRoute allowedRoles={['Student']} element={<StudentOrders />} />} />
                <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin']} element={<Profile />} />} />
                <Route path="/student/progress" element={<ProtectedRoute allowedRoles={['Student']} element={<ProgressAnalytics />} />} />
                <Route path="/student/certificates" element={<ProtectedRoute allowedRoles={['Student']} element={<Certificates />} />} />
                <Route path="/student/wishlist" element={<ProtectedRoute allowedRoles={['Student']} element={<Wishlist />} />} />
                <Route path="/student/notifications" element={<ProtectedRoute allowedRoles={['Student']} element={<Notifications />} />} />
                <Route path="/learning/:courseId" element={<ProtectedRoute allowedRoles={['Student']} element={<LearningPage />} />} />

                
                {/* INTERNSHIP ROUTES (Student Protected) */}
                <Route path="/internship/apply/:id" element={<ProtectedRoute allowedRoles={['Student']} element={<InternshipApply />} />} />
                <Route path="/internship/status" element={<ProtectedRoute allowedRoles={['Student']} element={<InternshipStatus />} />} />
                <Route path="/internship/application-success" element={<ProtectedRoute allowedRoles={['Student']} element={<InternshipApplicationSuccess />} />} />
                <Route path="/internship/scheduler" element={<ProtectedRoute allowedRoles={['Student']} element={<InterviewScheduler />} />} />
                <Route path="/internship/confirmation" element={<ProtectedRoute allowedRoles={['Student']} element={<InterviewConfirmation />} />} />
                <Route path="/internship/dashboard" element={<ProtectedRoute allowedRoles={['Student']} element={<InternshipDashboardStudent />} />} />
                <Route path="/internship/chat" element={<ProtectedRoute allowedRoles={['Student', 'Admin']} element={<RecruiterChat />} />} />
                <Route path="/internship/tasks" element={<ProtectedRoute allowedRoles={['Student']} element={<InternshipTasks />} />} />
                <Route path="/internship/offer/:id" element={<ProtectedRoute allowedRoles={['Student']} element={<InternshipOffer />} />} />


                {/* INSTRUCTOR ROUTES - Role: Instructor, Admin */}
                <Route path="/instructor-dashboard" element={<ProtectedRoute allowedRoles={['Instructor', 'Admin']} element={<InstructorDashboard />} />} />
                <Route path="/instructor/courses" element={<ProtectedRoute allowedRoles={['Instructor', 'Admin']} element={<InstructorCourses />} />} />
                <Route path="/instructor/create-course" element={<ProtectedRoute allowedRoles={['Instructor', 'Admin']} element={<InstructorCreateCourse />} />} />
                <Route path="/instructor/students" element={<ProtectedRoute allowedRoles={['Instructor', 'Admin']} element={<InstructorStudents />} />} />
                <Route path="/instructor/earnings" element={<ProtectedRoute allowedRoles={['Instructor', 'Admin']} element={<InstructorEarnings />} />} />
                <Route path="/instructor/analytics" element={<ProtectedRoute allowedRoles={['Instructor', 'Admin']} element={<InstructorAnalytics />} />} />


                {/* ADMIN ROUTES - Role: Admin */}
                <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminDashboard />} />} />
                <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminUsers />} />} />
                <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminCourses />} />} />
                <Route path="/admin/instructors" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminInstructors />} />} />
                <Route path="/admin/pyq" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminPYQ />} />} />
                <Route path="/admin/approvals" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminApprovals />} />} />
                <Route path="/admin/interviews" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminInterviews />} />} />
                <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminAnalytics />} />} />
                <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminReports />} />} />
                <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['Admin']} element={<AdminSettings />} />} />
                <Route path="/recruiter-dashboard" element={<ProtectedRoute allowedRoles={['Recruiter', 'Admin']} element={<RecruiterDashboard />} /> } 
/>
                {/* Catch-all route for 404 */}
                <Route path="*" element={<div>404: Page Not Found</div>} />
            </Routes>
        </Layout>
    </div>
  );
}
// ------------------------------------------------------------------


// App is now only responsible for setting up the Context Providers
export default function App() {
  // The outer wrapper for Contexts 
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          {/* AuthProvider wraps the content component */}
          <AuthProvider>
            <CartProvider>
              <CourseProvider>
                <RootContent />
              </CourseProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}