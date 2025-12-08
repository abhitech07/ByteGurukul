import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { authService } from "../services/authService"; 
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); // To check current URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 隼 SECURE FIREBASE INIT
  const firebaseConfig = window.__firebase_config ? JSON.parse(window.__firebase_config) : {
    apiKey: "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV", 
    authDomain: "mock-project.firebaseapp.com",
    projectId: "mock-project",
  };

  let app;
  let auth;
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
    auth = { currentUser: null }; 
  }

  // 隼 Load user from localStorage & Firebase on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (window.__initial_auth_token && auth.currentUser === null) {
           if(firebaseConfig.apiKey !== "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV") {
              await signInWithCustomToken(auth, window.__initial_auth_token);
           }
        } else if (auth.currentUser === null) {
           if(firebaseConfig.apiKey !== "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV") {
              await signInAnonymously(auth);
           }
        }
      } catch (e) {
        console.warn("Firebase auth skipped (using mock/local mode):", e.code);
      }

      // 2. Backend Auth Check (localStorage)
      try {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
          
          // --- FIX START: Only redirect if on a public path ---
          // If the user is already on /admin/users, DO NOT redirect them.
          const publicPaths = ["/", "/login", "/signup"];
          const currentPath = window.location.pathname;

          if (publicPaths.includes(currentPath)) {
            const role = (storedUser.role || "").toLowerCase();
            if (user.role === "admin") navigate("/admin/dashboard");
else if (user.role === "instructor") navigate("/instructor/dashboard");
else navigate("/student/dashboard");

          }
          // --- FIX END ---
          
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem('user'); 
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    let unsubscribe = () => {};
    if (auth.onAuthStateChanged) {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // console.log("Firebase User Connected");
            }
        });
    }
    
    return () => unsubscribe();
    // Removed navigate from dependency array to prevent loops
  }, [auth, firebaseConfig.apiKey]); 

  // 隼 LOGIN (Connects to Backend)
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      console.log('Full Login Response:', response); // DEBUG
      console.log('Response type:', typeof response); // DEBUG
      console.log('Response keys:', Object.keys(response)); // DEBUG

      if (response.success) {
        const userData = response.user; // Use response.user directly

        console.log('Login UserData:', userData); // DEBUG
        console.log('Login Role:', userData?.role); // DEBUG
        console.log('UserData type:', typeof userData); // DEBUG
        console.log('UserData keys:', userData ? Object.keys(userData) : 'null'); // DEBUG

        // CRITICAL: Clear any existing stored user to prevent conflicts
        localStorage.removeItem('user');

        // CRITICAL: Ensure user state is set immediately after success
        setUser(userData);

        // CRITICAL FIX: Ensure role comparison is case-insensitive
        const role = (userData?.role || "").toLowerCase();

        console.log('Role after toLowerCase:', role); // DEBUG
        console.log('Navigating to:', role === "admin" ? "/admin-dashboard" : role === "instructor" ? "/instructor-dashboard" : "/dashboard"); // DEBUG

        if (role === "admin") {
            console.log('Navigating to admin dashboard'); // DEBUG
            alert('Admin detected - navigating to admin dashboard'); // TEMP DEBUG
            navigate("/admin-dashboard", { replace: true });
        }
        else if (role === "instructor") {
             console.log('Navigating to instructor dashboard'); // DEBUG
             alert('Instructor detected - navigating to instructor dashboard'); // TEMP DEBUG
             navigate("/instructor-dashboard", { replace: true });
        }
        else {
             console.log('Navigating to student dashboard'); // DEBUG
             alert('Student detected - navigating to student dashboard'); // TEMP DEBUG
             // Default student dashboard
             navigate("/dashboard", { replace: true });
        }
      } else {
        console.log('Login not successful:', response); // DEBUG
      }
      return response;
    } catch (error) {
      console.log('Login error:', error); // DEBUG
      // Re-throw the error so the Login page can display "Invalid credentials"
      throw error;
    }
  };

  // 隼 SIGNUP (Connects to Backend)
  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      
      if (response.success) {
        const userData = response.data;

        // Manually save session (AuthService does this too, but for surety)
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData));
        }
        
        setUser(userData);
        navigate("/dashboard");
      }
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // 隼 LOGOUT
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}