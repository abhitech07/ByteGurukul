// src/pages/internship/RecruiterChat.js
import React, { useState, useRef, useEffect } from "react";
import InternshipNavbar from "../../components/internship/InternshipNavbar";
import { Link } from "react-router-dom";

export default function RecruiterChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "recruiter", text: "Hi Abhijeet — thanks for applying. Do you have time for a quick chat?" },
  ]);
  const [text, setText] = useState("");
  const bottomRef = useRef();

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), sender: "you", text }]);
    setText("");
    // mock auto reply
    setTimeout(() => setMessages((m) => [...m, { id: Date.now() + 1, sender: "recruiter", text: "Thanks — we'll review and get back to you." }]), 800);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f6f9fc" }}>
      <InternshipNavbar />
      <div style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Recruiter Chat</h2>
          <Link to="/internship/status" style={{ color: "#2563eb" }}>← Applications</Link>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: "white", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(2,6,23,0.04)", display: "flex", flexDirection: "column", height: "60vh" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
              {messages.map((m) => (
                <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "you" ? "flex-end" : "flex-start", marginBottom: 8 }}>
                  <div style={{ background: m.sender === "you" ? "#2563eb" : "#f1f5f9", color: m.sender === "you" ? "white" : "#0f172a", padding: "8px 12px", borderRadius: 12, maxWidth: "70%" }}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #e6eef8" }} />
              <button onClick={send} style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 14px", borderRadius: 8 }}>Send</button>
            </div>
          </div>

          <div style={{ width: 260 }}>
            <div style={{ background: "white", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
              <h4 style={{ marginTop: 0 }}>Recruiter</h4>
              <div style={{ color: "#64748b" }}>Rajesh Sharma</div>
              <div style={{ marginTop: 12 }}>
                <button style={{ background: "#059669", color: "white", padding: "8px 12px", borderRadius: 8, border: "none" }} onClick={() => alert("Call (mock)")}>Call</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}