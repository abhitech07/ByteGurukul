import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { authService } from "../services/authService"; 
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); 
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
      // 1. Firebase Auth Check
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
          
          // --- FIX: Use 'storedUser' variable, NOT 'user' state ---
          const publicPaths = ["/", "/login", "/signup", "/forgot", "/auth-success"];
          const currentPath = window.location.pathname;

          // Only redirect if the user is currently on a public page
          if (publicPaths.includes(currentPath)) {
            const role = (storedUser.role || "").toLowerCase(); // FIXED: Check storedUser.role
            
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else if (role === "instructor") {
                navigate("/instructor/courses"); // Fixed path to match your routes
            } else {
                navigate("/dashboard");
            }
          }
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
                // Connected
            }
        });
    }
    
    return () => unsubscribe();
  }, [auth, firebaseConfig.apiKey]); // Removed 'navigate' to prevent loops

  // 隼 LOGIN
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      if (response.success) {
        const userData = response.user; 
        
        localStorage.removeItem('user');
        // Save to local storage manually to ensure persistence before navigation
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(userData));
        }

        setUser(userData);

        const role = (userData?.role || "").toLowerCase();

        if (role === "admin") {
            navigate("/admin-dashboard", { replace: true });
        } else if (role === "instructor") {
             navigate("/instructor/courses", { replace: true });
        } else {
             navigate("/dashboard", { replace: true });
        }
      } 
      return response;
    } catch (error) {
      console.log('Login error:', error); 
      throw error;
    }
  };

  // 隼 SIGNUP
  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      
      if (response.success) {
        // Automatically login after signup is usually better UX, 
        // but if your flow requires login page, navigate("/login")
        navigate("/login"); 
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