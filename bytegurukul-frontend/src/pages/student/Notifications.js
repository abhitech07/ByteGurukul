// src/pages/student/Notifications.js
import React, { useState } from 'react';
import StudentNavbar from '../../components/student/StudentNavbar';
import { useAuth } from '../../contexts/AuthContext';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New assignment: DSA Lab', body: 'Assignment posted for Data Structures', time: '2h ago', read: false },
    { id: 2, title: 'Project Approved', body: 'Your project purchase has been approved', time: '1d ago', read: true },
    { id: 3, title: 'Live class tomorrow', body: 'React session at 10:00 AM', time: '2d ago', read: false },
  ]);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const toggleRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  const clearAll = () => {
    if (window.confirm('Clear all notifications?')) setNotifications([]);
  };

  return (
    <>
      <StudentNavbar />
      <div style={styles.page}>
        <div style={styles.header}>
          <h1>Notifications</h1>
          <div>
            <button onClick={markAllRead} style={styles.btnSmall}>Mark all read</button>
            <button onClick={clearAll} style={{...styles.btnSmall, marginLeft:8}}>Clear</button>
          </div>
        </div>

        <div style={styles.list}>
          {notifications.length === 0 ? (
            <div style={styles.empty}>You're all caught up 🎉</div>
          ) : notifications.map(n => (
            <div key={n.id} style={{...styles.item, background: n.read ? 'transparent' : 'var(--hover-bg, rgba(37,99,235,0.06))'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <strong style={{color:'var(--text-primary)'}}>{n.title}</strong>
                  <small style={{color:'var(--text-secondary)'}}>{n.time}</small>
                </div>
                <div style={{color:'var(--text-secondary)', marginTop:6}}>{n.body}</div>
              </div>
              <div style={{marginLeft:12, display:'flex', flexDirection:'column', gap:6}}>
                <button onClick={() => toggleRead(n.id)} style={styles.iconBtn}>{n.read ? 'Mark unread' : 'Mark read'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: { padding: '12px 20px', maxWidth: 1000, margin: '8px auto' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 12 },
  btnSmall: { padding: '8px 10px', borderRadius:8, border:'1px solid var(--border)', background:'var(--surface)', cursor:'pointer' },
  list: { display:'flex', flexDirection:'column', gap:10 },
  item: { padding: 14, borderRadius: 10, border: '1px solid var(--border)', display:'flex', gap:12, alignItems:'center' },
  iconBtn: { padding:'6px 8px', borderRadius:8, border:'none', background:'var(--primary)', color:'white', cursor:'pointer' },
  empty: { padding: 30, textAlign:'center', color:'var(--text-secondary)', border:'1px dashed var(--border)', borderRadius:10, background:'var(--surface)' }
};
