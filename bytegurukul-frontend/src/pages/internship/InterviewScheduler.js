import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InternshipNavbar from "../../components/internship/InternshipNavbar";
import { FaCalendarAlt, FaClock, FaVideo, FaCheckCircle } from 'react-icons/fa';

export default function InterviewScheduler() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  // In a real app, you'd pass the Application ID via location.state or params
  // For this demo, we'll find the first 'Approved' application for our test user
  const studentEmail = "student@example.com"; 
  const [targetAppId, setTargetAppId] = useState(null);

  useEffect(() => {
    // Auto-find the application ID to schedule for
    const findApp = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/internship/student/${studentEmail}`);
            const approvedApp = res.data.data.find(app => app.status === 'Approved');
            if (approvedApp) {
                setTargetAppId(approvedApp.id);
            } else {
                alert("No approved applications found to schedule.");
                navigate('/internship/status');
            }
        } catch (err) {
            console.error(err);
        }
    };
    findApp();
  }, [navigate]);

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !targetAppId) return;

    setLoading(true);
    try {
        // Combine date and time
        const dateTime = new Date(`${selectedDate}T${selectedTime}`);

        const res = await axios.post('http://localhost:5000/api/internship/schedule', {
            applicationId: String(targetAppId),
            date: dateTime,
            type: 'Technical Round'
        });

        if (res.data.success) {
            navigate('/internship/status'); // Go back to status to see the update
        }
    } catch (error) {
        alert("Failed to schedule. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
        <InternshipNavbar />
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Schedule Your Interview</h2>
                    <p style={styles.subtitle}>Select a convenient slot for your technical round.</p>
                </div>

                <form onSubmit={handleSchedule} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaCalendarAlt /> Select Date</label>
                        <input 
                            type="date" 
                            style={styles.input} 
                            required 
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaClock /> Select Time</label>
                        <select style={styles.input} required onChange={(e) => setSelectedTime(e.target.value)}>
                            <option value="">-- Choose a Slot --</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="16:00">04:00 PM</option>
                        </select>
                    </div>

                    <div style={styles.infoBox}>
                        <FaVideo style={{color: '#2563eb', marginTop: '3px'}} />
                        <div>
                            <strong>Format:</strong> Video Call (Google Meet)<br/>
                            <span style={{fontSize: '13px', color: '#64748b'}}>Link will be provided upon confirmation.</span>
                        </div>
                    </div>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Confirming...' : 'Confirm Schedule'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

const styles = {
    page: { minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Poppins', sans-serif" },
    container: { padding: '40px 20px', display: 'flex', justifyContent: 'center' },
    card: { background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' },
    header: { textAlign: 'center', marginBottom: '30px' },
    title: { margin: '0 0 10px 0', color: '#1e293b' },
    subtitle: { color: '#64748b', fontSize: '14px', margin: 0 },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '14px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none' },
    infoBox: { background: '#eff6ff', padding: '15px', borderRadius: '8px', display: 'flex', gap: '12px', fontSize: '14px', color: '#1e293b', border: '1px solid #dbeafe' },
    button: { background: '#2563eb', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }
};