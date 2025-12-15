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
  
  // 1. DEFINE CONFIG
  const firebaseConfig = window.__firebase_config ? JSON.parse(window.__firebase_config) : {
    apiKey: "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV", 
    authDomain: "mock-project.firebaseapp.com",
    projectId: "mock-project",
  };

  // 2. CHECK IF WE ARE IN MOCK MODE
  const isMockMode = firebaseConfig.apiKey.includes("MOCK-API-KEY");

  let app;
  let auth = null;

  // 3. ONLY INITIALIZE FIREBASE IF KEY IS REAL
  try {
    if (!isMockMode) {
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      auth = getAuth(app);
    } else {
      // Mock auth object to prevent crashes
      auth = { currentUser: null };
      console.log("Running in Mock Mode (Firebase disabled to prevent API Key errors)");
    }
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
    auth = { currentUser: null }; 
  }

  // Load user from localStorage & Firebase on app start
  useEffect(() => {
    const initAuth = async () => {
      // 1. Firebase Auth Check (SKIP IF MOCK MODE)
      if (!isMockMode && auth) {
        try {
          if (window.__initial_auth_token && auth.currentUser === null) {
              await signInWithCustomToken(auth, window.__initial_auth_token);
          } else if (auth.currentUser === null) {
              await signInAnonymously(auth);
          }
        } catch (e) {
          console.warn("Firebase auth skipped:", e.code);
        }
      }

      // 2. Backend Auth Check (localStorage)
      try {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
          
          const publicPaths = ["/", "/login", "/signup", "/forgot", "/auth-success"];
          const currentPath = window.location.pathname;

          // Only redirect if the user is currently on a public page
          if (publicPaths.includes(currentPath)) {
            const role = (storedUser.role || "").toLowerCase();
            
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else if (role === "instructor") {
                navigate("/instructor/courses");
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
    
    // Only subscribe to listener if NOT in mock mode
    let unsubscribe = () => {};
    if (!isMockMode && auth && auth.onAuthStateChanged) {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // Connected
            }
        });
    }
    
    return () => unsubscribe();
  }, [auth, isMockMode]); // Added isMockMode to dependencies

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      if (response.success || response.token) { // Check for token too
        const userData = response.user || response.data?.user || response; 
        
        localStorage.removeItem('user');
        
        if (response.token || response.data?.token) {
            localStorage.setItem('token', response.token || response.data?.token);
            localStorage.setItem('user', JSON.stringify(userData));
        }

        setUser(userData);

        // Explicit Navigation after Login
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

  // SIGNUP
  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      
      if (response.success) {
        navigate("/login"); 
      }
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // LOGOUT
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