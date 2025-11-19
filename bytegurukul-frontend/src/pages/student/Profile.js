// src/pages/student/Profile.js
import React, { useState } from 'react';
import StudentNavbar from '../../components/student/StudentNavbar';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth(); // assume context offers updateProfile
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // call context update if exists
    if (updateProfile) {
      updateProfile({ ...form, avatar: preview });
    } else {
      alert('Profile saved locally (demo).');
    }
  };

  return (
    <>
      <StudentNavbar />
      <div style={styles.page}>
        <h1>My Profile</h1>
        <div style={styles.card}>
          <form onSubmit={handleSave} style={styles.form}>
            <div style={styles.avatarSection}>
              <div style={styles.avatarWrap}>
                <img src={preview || '/avatar-placeholder.png'} alt="avatar" style={styles.avatarImg} />
              </div>
              <div>
                <label style={styles.uploadLabel}>
                  Upload Avatar
                  <input type="file" accept="image/*" onChange={handleAvatar} style={{display:'none'}} />
                </label>
                <div style={{marginTop:8, color:'var(--text-secondary)'}}>Max 2MB. JPEG/PNG.</div>
              </div>
            </div>

            <label style={styles.label}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={styles.input} required />

            <label style={styles.label}>Email</label>
            <input name="email" value={form.email} onChange={handleChange} style={styles.input} required />

            <label style={styles.label}>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} style={{...styles.input, height:100}} />

            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button type="submit" style={styles.saveBtn}>Save Profile</button>
              <button type="button" onClick={() => { setForm({ name: user?.name||'', email:user?.email||'', bio:user?.bio||'' }); setPreview(user?.avatar||null); }} style={styles.ghostBtn}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: { padding: '12px 20px', maxWidth: 800, margin: '8px auto' },
  card: { padding:18, borderRadius:12, background:'var(--surface)', border:'1px solid var(--border)' },
  form: { display:'flex', flexDirection:'column', gap:10 },
  avatarSection: { display:'flex', gap:12, alignItems:'center' },
  avatarWrap: { width:84, height:84, borderRadius:12, overflow:'hidden', border:'1px solid var(--border)' },
  avatarImg: { width:'100%', height:'100%', objectFit:'cover' },
  uploadLabel: { display:'inline-block', padding:'8px 12px', borderRadius:8, background:'var(--primary)', color:'white', cursor:'pointer' },
  label: { fontWeight:600, color:'var(--text-primary)' },
  input: { padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', background:'transparent' },
  saveBtn: { background:'var(--primary)', color:'white', padding:'10px 14px', borderRadius:8, border:'none', cursor:'pointer' },
  ghostBtn: { background:'transparent', border:'1px solid var(--border)', padding:'10px 14px', borderRadius:8, cursor:'pointer' }
};
