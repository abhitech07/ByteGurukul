import React from 'react';
import { useToast } from '../../contexts/ToastContext';

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div style={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            ...styles.toast,
            ...styles[toast.type]
          }}
        >
          <span style={styles.icon}>
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'warning' && '⚠️'}
            {toast.type === 'info' && 'ℹ️'}
          </span>
          <span style={styles.message}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={styles.closeButton}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  toast: {
    padding: '12px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    boxShadow: 'var(--shadow-lg)',
    animation: 'slideIn 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '300px'
  },
  success: {
    backgroundColor: 'var(--success)'
  },
  error: {
    backgroundColor: 'var(--error)'
  },
  warning: {
    backgroundColor: 'var(--warning)'
  },
  info: {
    backgroundColor: 'var(--primary)'
  },
  icon: {
    fontSize: '16px'
  },
  message: {
    flex: 1
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ToastContainer;