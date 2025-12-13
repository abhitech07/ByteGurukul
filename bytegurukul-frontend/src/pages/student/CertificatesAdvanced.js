// src/pages/student/CertificatesAdvanced.js
import React, { useRef, useState, useEffect, Fragment } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import CertificatePrintable from "../../components/certificates/CertificatePrintable";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import api from "../../services/api";

/**
 * Certificates component - fetches from backend
 */
function CertificatesAdvanced() {
  const tempRef = useRef();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch certificates from backend
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await api.get('/certificates/my-certificates');
        if (response.data.success) {
          setCertificates(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load certificates');
        showToast(error, 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCertificates();
    }
  }, [user]);

  // Generate certificate if not already issued
  const handleGenerateCertificate = async (courseId) => {
    try {
      const response = await api.post('/certificates/generate', { courseId });
      if (response.data.success) {
        showToast('Certificate generated successfully!', 'success');
        // Refetch certificates
        const certsResponse = await api.get('/certificates/my-certificates');
        if (certsResponse.data.success) {
          setCertificates(certsResponse.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to generate certificate', 'error');
    }
  };

  const exportAsPDF = async (cert) => {
    // Create temporary hidden mount node
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-2000px";
    wrapper.style.top = "0px";
    wrapper.style.zIndex = "-999";
    document.body.appendChild(wrapper);

    // Render certificate inside wrapper
    const { render, unmountComponentAtNode } = await import("react-dom");

    render(<CertificatePrintable certificate={cert} ref={tempRef} />, wrapper);

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "pt", "a4");

        const w = pdf.internal.pageSize.getWidth();
        const h = pdf.internal.pageSize.getHeight();

        const props = pdf.getImageProperties(imgData);
        const ratio = Math.min(w / props.width, h / props.height);

        const imgW = props.width * ratio;
        const imgH = props.height * ratio;

        const x = (w - imgW) / 2;
        const y = (h - imgH) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgW, imgH);
        pdf.save(`${cert.id}.pdf`);
      } catch (err) {
        console.error(err);
        alert("PDF export failed. See console.");
      } finally {
        unmountComponentAtNode(wrapper);
        document.body.removeChild(wrapper);
      }
    }, 300);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Certificates</h1>
          <p style={styles.subtitle}>Your earned certificates with verification and PDF export</p>
        </div>
        <Link to="/dashboard" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>

      <div>
      {/* Loading State */}
      {loading && (
        <div style={styles.centeredMessage}>
          <p>Loading certificates...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={styles.centeredMessage}>
          <p style={{ color: '#e74c3c' }}>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && certificates.length === 0 && (
        <div style={styles.centeredMessage}>
          <p>No certificates yet. Complete courses to earn certificates!</p>
        </div>
      )}

      {/* Grid */}
      {!loading && certificates.length > 0 && (
        <div style={styles.grid}>
          {certificates.map((cert) => (
            <div key={cert.id} style={styles.card}>
              <div style={styles.topRow}>
                <div>
                  <div style={styles.organization}>ByteGurukul</div>
                  <div style={styles.name}>{cert.User?.name || 'Student'}</div>
                  <div style={styles.course}>{cert.Course?.title || 'Course'}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <QRCodeSVG value={`${process.env.REACT_APP_API_URL}/certificates/verify/${cert.id}`} size={90} />
                  <div style={styles.scanLabel}>Scan to verify</div>
                </div>
              </div>

              <div style={styles.meta}>
                <Fragment>
                  <span>Certificate ID: {cert.certificateNumber}</span>
                  <span>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</span>
                </Fragment>
              </div>

              {/* Buttons */}
            <div style={styles.buttonRow}>
              <button
                style={styles.primaryBtn}
                onClick={() => {
                  // Download from backend
                  window.location.href = `${process.env.REACT_APP_API_URL}/certificates/${cert.id}/download`;
                }}
              >
                ⬇ Download PDF
              </button>

              <a
                href={`${process.env.REACT_APP_API_URL}/certificates/verify/${cert.id}`}
                target="_blank"
                rel="noreferrer"
                style={styles.ghostBtn}
              >
                🔗 Open Verification
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

/* =======================
      STYLES
======================= */
const styles = {
  page: {
    padding: 20,
    fontFamily: "Poppins, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  title: { fontSize: 22, fontWeight: 700 },
  subtitle: { color: "#64748b" },

  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gap: 14,
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
  },

  card: {
    background: "white",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  organization: { fontSize: 12, color: "#6b7280" },
  name: { fontSize: 18, fontWeight: 700 },
  course: { marginTop: 4, color: "#374151" },

  scanLabel: { fontSize: 11, color: "#6b7280", marginTop: 4 },

  buttonRow: { display: "flex", gap: 8, marginTop: 16 },

  primaryBtn: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  ghostBtn: {
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    color: "#374151",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default CertificatesAdvanced;