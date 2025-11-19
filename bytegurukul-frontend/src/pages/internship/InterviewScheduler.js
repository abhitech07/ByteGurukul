// src/pages/internship/InterviewScheduler.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mentorSlots = [
  {
    mentor: "Ravi Kumar",
    role: "Senior Software Engineer - Google",
    date: "2025-02-19",
    slots: ["10:00 AM", "11:30 AM", "03:00 PM"],
  },
  {
    mentor: "Aditi Verma",
    role: "Cyber Security Expert - Deloitte",
    date: "2025-02-20",
    slots: ["09:30 AM", "01:00 PM", "04:30 PM"],
  },
  {
    mentor: "Dr. Ankit Sharma",
    role: "Data Scientist - Microsoft",
    date: "2025-02-21",
    slots: ["12:00 PM", "02:30 PM"],
  },
];

function InterviewScheduler() {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const confirmSlot = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    navigate("/internship/interview-confirmation", { state: selectedSlot });
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Book Your Interview Slot</h1>
        <p style={styles.subtitle}>
          Choose a mentor & time slot for your internship interview
        </p>
      </div>

      <div style={styles.grid}>
        {mentorSlots.map((mentor, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.mentorBlock}>
              <h2 style={styles.mentorName}>{mentor.mentor}</h2>
              <p style={styles.role}>{mentor.role}</p>
              <p style={styles.date}>📅 {mentor.date}</p>
            </div>

            <div style={styles.slotGrid}>
              {mentor.slots.map((slot) => {
                const isActive =
                  selectedSlot &&
                  selectedSlot.mentor === mentor.mentor &&
                  selectedSlot.slot === slot;

                return (
                  <div
                    key={slot}
                    onClick={() =>
                      setSelectedSlot({
                        mentor: mentor.mentor,
                        role: mentor.role,
                        date: mentor.date,
                        slot,
                      })
                    }
                    style={{
                      ...styles.slotCard,
                      ...(isActive ? styles.slotActive : {}),
                    }}
                  >
                    ⏰ {slot}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button style={styles.confirmBtn} onClick={confirmSlot}>
        Confirm Interview Slot →
      </button>
    </div>
  );
}

/* -------------------- STYLES -------------------- */
const styles = {
  page: {
    padding: "40px 20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
    fontFamily: "Poppins",
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  subtitle: {
    fontSize: 16,
    color: "var(--text-secondary)",
    marginTop: 6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 20,
    marginBottom: 40,
  },

  card: {
    background: "var(--surface)",
    padding: 25,
    borderRadius: 14,
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
  },
  mentorBlock: {
    marginBottom: 15,
  },
  mentorName: {
    fontSize: 20,
    fontWeight: 700,
  },
  role: {
    color: "var(--text-secondary)",
    marginBottom: 5,
  },
  date: {
    fontWeight: 600,
    color: "var(--primary)",
  },

  slotGrid: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
  },

  slotCard: {
    padding: "10px 15px",
    background: "#eef2ff",
    borderRadius: 10,
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s",
    fontWeight: 600,
    border: "2px solid transparent",
  },

  slotActive: {
    background: "var(--primary)",
    color: "white",
    borderColor: "var(--primary-dark)",
    transform: "scale(1.05)",
  },

  confirmBtn: {
    padding: "14px 20px",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    border: "none",
    color: "white",
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 10,
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
  },
};

export default InterviewScheduler;