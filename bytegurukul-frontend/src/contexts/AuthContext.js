import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("bytegurukul_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔹 Mock database
  const mockUsers = [
    {
      name: "Admin User",
      email: "admin@bytegurukul.com",
      password: "Admin@123",
      role: "admin",
      designation: "Platform Administrator",
    },
    {
      name: "Abhijeet Kumar Pandey",
      email: "student@bytegurukul.com",
      password: "Student@123",
      role: "student",
      designation: "M.Tech CSE Student",
    },
    {
      name: "Swastika Srivastav",
      email: "instructor@bytegurukul.com",
      password: "Instructor@123",
      role: "instructor",
      designation: "Course Instructor - Big Data Analytics",
    },
  ];

  // 🔹 LOGIN
  const login = async (email, password) => {
    const foundUser = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!foundUser) throw new Error("Invalid email or password");

    // Save full user details
    setUser(foundUser);
    localStorage.setItem("bytegurukul_user", JSON.stringify(foundUser));

    // Redirect based on role
    if (foundUser.role === "admin") navigate("/admin-dashboard");
    else if (foundUser.role === "instructor") navigate("/instructor-dashboard");
    else navigate("/dashboard");
  };

  // 🔹 SIGNUP
  const register = async (formData) => {
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role || "student",
      designation: "Registered Student",
    };

    setUser(newUser);
    localStorage.setItem("bytegurukul_user", JSON.stringify(newUser));
    navigate("/dashboard");
  };

  // 🔹 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("bytegurukul_user");
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