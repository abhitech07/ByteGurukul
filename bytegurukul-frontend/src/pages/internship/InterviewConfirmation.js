// src/pages/internship/InterviewConfirmation.js
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * InterviewConfirmation
 * Expects location.state = { mentor, role, date, slot }
 * Features:
 * - Download .ics (calendar)
 * - Add-to-Google-Calendar link
 * - Copy details
 * - Print / Save as PDF
 * - Download simple .eml (email draft)
 */
export default function InterviewConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state || {
    mentor: "Unknown",
    role: "Mentor",
    date: new Date().toISOString().slice(0, 10),
    slot: "10:00 AM",
  };

  // parse date + time to a JS Date (assumes local timezone)
  const startEnd = useMemo(() => {
    // booking.date: YYYY-MM-DD, booking.slot e.g. "10:00 AM"
    const [time, modifier] = booking.slot.split(" ");
    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr || "0", 10);
    if (modifier?.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;

    const start = new Date(`${booking.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // default 30 min slot
    return { start, end };
  }, [booking.date, booking.slot]);

  const fmtLocal = (d) =>
    d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  // generate ICS content (RFC 5545 - minimal)
  const generateICS = () => {
    const pad = (n) => String(n).padStart(2, "0");
    const toUTCStringICS = (d) => {
      const y = d.getUTCFullYear();
      const m = pad(d.getUTCMonth() + 1);
      const day = pad(d.getUTCDate());
      const hh = pad(d.getUTCHours());
      const mm = pad(d.getUTCMinutes());
      const ss = pad(d.getUTCSeconds());
      return `${y}${m}${day}T${hh}${mm}${ss}Z`;
    };

    const uid = `bytegurukul-${booking.date.replace(/-/g, "")}-${booking.slot.replace(/\s/g, "")}@bytegurukul`;
    const summary = `Interview: ${booking.mentor} — ${booking.role}`;
    const description = `Interview with ${booking.mentor} (${booking.role}) scheduled at ${booking.slot} on ${booking.date}.`;
    const location = "Online / ByteGurukul";

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ByteGurukul//InterviewScheduler//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${toUTCStringICS(new Date())}`,
      `DTSTART:${toUTCStringICS(startEnd.start)}`,
      `DTEND:${toUTCStringICS(startEnd.end)}`,
      `SUMMARY:${escapeICSText(summary)}`,
      `DESCRIPTION:${escapeICSText(description)}`,
      `LOCATION:${escapeICSText(location)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return icsLines;
  };

  const escapeICSText = (s) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

  const downloadICS = () => {
    const blob = new Blob([generateICS()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${booking.mentor.replace(/\s+/g, "_")}_${booking.date}_${booking.slot.replace(/\s+/g, "")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const googleCalendarLink = () => {
    // https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSSZ/...
    const fmt = (d) =>
      d.toISOString().replace(/-|:|\.\d+/g, "");
    const text = encodeURIComponent(`Interview: ${booking.mentor} — ${booking.role}`);
    const details = encodeURIComponent(`Interview with ${booking.mentor} (${booking.role})`);
    const dates = `${fmt(startEnd.start)}/${fmt(startEnd.end)}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${encodeURIComponent("Online / ByteGurukul")}`;
  };

  const copyDetails = async () => {
    const text = `Interview booked with ${booking.mentor} (${booking.role}) on ${fmtLocal(startEnd.start)} — ${booking.slot}.`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied booking details to clipboard.");
    } catch {
      alert("Copy failed. Please select & copy manually.");
    }
  };

  const printConfirmation = () => {
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) {
      return alert("Popup blocked. Allow popups to preview/print.");
    }
    const html = `
      <html>
        <head>
          <title>Interview Confirmation - ${booking.mentor}</title>
          <style>
            body { font-family: Poppins, Arial, sans-serif; padding: 24px; color: var(--text-primary,#111); }
            .card { border-radius: 8px; padding: 20px; border: 1px solid #e6e6e6; }
            h1 { margin: 0 0 10px 0; font-size: 20px; }
            p { margin: 6px 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Interview Confirmation</h1>
            <p><strong>Mentor:</strong> ${booking.mentor}</p>
            <p><strong>Role:</strong> ${booking.role}</p>
            <p><strong>Date & Time:</strong> ${fmtLocal(startEnd.start)}</p>
            <p><strong>Duration:</strong> 30 minutes</p>
            <p>Thank you for booking — ByteGurukul</p>
          </div>
        </body>
      </html>
    `;
    w.document.write(html);
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 300);
  };

  const downloadEmailDraft = () => {
    const subject = `Interview Scheduled with ${booking.mentor} — ${booking.date} ${booking.slot}`;
    const body = `Hi,\n\nMy interview with ${booking.mentor} (${booking.role}) is scheduled on ${fmtLocal(startEnd.start)}. Please find details below:\n\nMentor: ${booking.mentor}\nRole: ${booking.role}\nDate & Time: ${fmtLocal(startEnd.start)}\nDuration: 30 minutes\n\nRegards,\n${/* fallback user name */ ""}`;
    // create a simple .eml file (basic)
    const eml = [
      `Subject: ${subject}`,
      `To: ${encodeURIComponent("mentor@example.com")}`,
      "",
      body,
    ].join("\r\n");

    const blob = new Blob([eml], { type: "message/rfc822" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interview_${booking.mentor.replace(/\s+/g, "_")}.eml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h2 style={styles.title}>Interview Confirmed ✅</h2>
          <p style={styles.subtitle}>
            Your interview has been scheduled. Save to calendar or share details.
          </p>

          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>Mentor</div>
            <div style={styles.infoValue}>{booking.mentor}</div>
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>Role</div>
            <div style={styles.infoValue}>{booking.role}</div>
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>When</div>
            <div style={styles.infoValue}>{fmtLocal(startEnd.start)}</div>
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>Duration</div>
            <div style={styles.infoValue}>30 minutes</div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={styles.btnPrimary} onClick={downloadICS}>
              ⬇ Download .ics
            </button>

            <a href={googleCalendarLink()} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button style={styles.btnAlt}>Add to Google Calendar</button>
            </a>

            <button style={styles.btnGhost} onClick={copyDetails}>
              Copy Details
            </button>

            <button style={styles.btnGhost} onClick={downloadEmailDraft}>
              Download Email
            </button>

            <button style={styles.btnGhost} onClick={printConfirmation}>
              Print / Save PDF
            </button>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button
              style={styles.btnLink}
              onClick={() => {
                // navigate to internship page or dashboard
                navigate("/internship");
              }}
            >
              ← Back to Internships
            </button>

            <button
              style={{ ...styles.btnLink, color: "var(--primary)" }}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard →
            </button>
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryTitle}>Summary</div>
            <div style={styles.summaryItem}>
              <div style={styles.sumLabel}>When</div>
              <div style={styles.sumValue}>{fmtLocal(startEnd.start)}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.sumLabel}>Mentor</div>
              <div style={styles.sumValue}>{booking.mentor}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.sumLabel}>Role</div>
              <div style={styles.sumValue}>{booking.role}</div>
            </div>
            <div style={{ marginTop: 12 }}>
              <small style={{ color: "var(--text-secondary, #64748b)" }}>
                Tip: use the ".ics" file to add the interview to Outlook/Apple Calendar.
              </small>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h4 style={{ margin: "0 0 8px 0" }}>Share</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `Interview scheduled with ${booking.mentor}`
                )}&body=${encodeURIComponent(
                  `Hi,\n\nI have an interview with ${booking.mentor} (${booking.role}) on ${fmtLocal(
                    startEnd.start
                  )}.\n\nRegards.`
                )}`}
                style={{ textDecoration: "none" }}
              >
                <div style={styles.shareBox}>✉ Email</div>
              </a>

              <button
                style={styles.shareBox}
                onClick={() => {
                  // open whatsapp share (mobile friendly)
                  const msg = encodeURIComponent(
                    `Interview with ${booking.mentor} on ${fmtLocal(startEnd.start)}`
                  );
                  window.open(`https://wa.me/?text=${msg}`, "_blank");
                }}
              >
                💬 WhatsApp
              </button>

              <button
                style={styles.shareBox}
                onClick={() => {
                  const text = `Interview: ${booking.mentor} — ${booking.role} on ${fmtLocal(startEnd.start)}`;
                  navigator.clipboard?.writeText(text).then(() => alert("Copied share text."));
                }}
              >
                🔗 Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  page: {
    padding: 20,
    fontFamily: "Poppins, Arial, sans-serif",
    background: "linear-gradient(180deg,#f8fafc,#eef2ff)",
    minHeight: "100vh",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 20,
    alignItems: "start",
    maxWidth: 1100,
    margin: "0 auto",
  },
  left: {
    background: "white",
    padding: 22,
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(2,6,23,0.06)",
  },
  right: {
    // right column styles
  },
  title: { margin: 0, fontSize: 20, fontWeight: 700 },
  subtitle: { marginTop: 6, color: "var(--text-secondary,#6b7280)" },

  infoRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px dashed #f1f5f9" },
  infoLabel: { color: "var(--text-secondary,#64748b)" },
  infoValue: { fontWeight: 700 },

  btnPrimary: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  btnAlt: {
    background: "#f1f5f9",
    color: "var(--text-primary,#111827)",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  btnGhost: {
    background: "transparent",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  btnLink: {
    background: "transparent",
    border: "none",
    color: "var(--text-secondary,#6b7280)",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
  },

  summaryCard: {
    background: "white",
    padding: 18,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
  },
  summaryTitle: { fontSize: 14, color: "var(--text-secondary,#64748b)", marginBottom: 8 },
  summaryItem: { display: "flex", justifyContent: "space-between", marginTop: 8 },
  sumLabel: { color: "var(--text-secondary,#64748b)" },
  sumValue: { fontWeight: 700 },

  shareBox: {
    borderRadius: 10,
    background: "white",
    padding: "8px 12px",
    boxShadow: "0 6px 18px rgba(2,6,23,0.04)",
    cursor: "pointer",
    border: "1px solid #eef2ff",
  },
};