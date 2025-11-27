import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have a context method or manually save

function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // 1. Save Token
      localStorage.setItem('token', token);
      
      // 2. Fetch User Details (Optional: You might want to call /api/auth/me here to get user data)
      // For now, we just assume success and redirect
      
      // 3. Redirect to Dashboard
      navigate('/dashboard');
      
      // Optional: Reload page to update AuthContext state if it reads from localStorage on mount
      window.location.reload();
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center',
      fontSize: '24px'
    }}>
      Logging you in... 🚀
    </div>
  );
}

export default AuthSuccess;