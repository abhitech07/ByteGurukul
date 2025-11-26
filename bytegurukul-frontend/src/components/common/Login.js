import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt, FaExclamationCircle } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Attempt to log in
      const res = await login(email, password);
      
      if (res.success) {
        // Redirect based on role
        if (res.user.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (res.user.role === 'instructor') {
            navigate('/instructor/dashboard');
        } else {
            navigate('/student/dashboard');
        }
      } else {
        // Handle explicit failure from API
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Handle network or server errors
      setError(err.response?.data?.message || 'Failed to sign in. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue to ByteGurukul</p>
        </div>

        {error && (
            <div style={styles.errorAlert}>
                <FaExclamationCircle style={{marginRight: '8px'}} />
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                type="email"
                required
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon} />
              <input
                type="password"
                required
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{...styles.button, opacity: loading ? 0.7 : 1}} 
            disabled={loading}
          >
            {loading ? 'Signing In...' : (
                <>
                    Sign In <FaSignInAlt style={{marginLeft: '8px'}} />
                </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p>Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link></p>
          <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '15px',
  },
  errorAlert: {
      backgroundColor: '#fee2e2',
      color: '#ef4444',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      border: '1px solid #fecaca'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    color: '#94a3b8',
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 45px',
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    fontSize: '15px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    background: 'linear-gradient(to right, #2563eb, #3b82f6)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  }
};