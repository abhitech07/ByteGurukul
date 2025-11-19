// src/components/certificates/CertificatePrintable.js
import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";


/**
 * CertificatePrintable
 * - forwardRef so html2canvas can capture it
 * - uses inline styles tuned for A4 export
 *
 * certificate: {
 *   id, name, course, instructor, dateIssued, grade, organization, verifyUrl
 * }
 */
const CertificatePrintable = forwardRef(({ certificate }, ref) => {
  const {
    id,
    name,
    course,
    instructor,
    dateIssued,
    grade,
    organization = "ByteGurukul",
    verifyUrl,
  } = certificate;

  const a4Width = 210; // mm
  const a4Height = 297; // mm

  return (
    <div
      ref={ref}
      id="certificate-printable"
      style={{
        width: "1100px", // large pixel width for better PDF resolution
        height: "780px",
        padding: 40,
        boxSizing: "border-box",
        background:
          "linear-gradient(90deg,#fff,#f8fafc)",
        border: "12px solid #111827",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Poppins', sans-serif",
        color: "#111827",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "#4b5563" }}>{organization}</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Certificate of Completion</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Certificate ID</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{id}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ textAlign: "center", padding: "20px 40px" }}>
        <div style={{ fontSize: 18, color: "#6b7280" }}>This is awarded to</div>
        <div style={{ fontSize: 36, fontWeight: 800, marginTop: 12 }}>{name}</div>

        <div style={{ fontSize: 16, color: "#374151", marginTop: 18 }}>
          For successfully completing the course
        </div>

        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{course}</div>

        <div style={{ marginTop: 18, fontSize: 14, color: "#6b7280" }}>
          Instructor: <strong style={{ color: "#111827" }}>{instructor}</strong>
          {" • "}
          Issued on: <strong style={{ color: "#111827" }}>{dateIssued}</strong>
        </div>

        {grade && (
          <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, color: "#065f46" }}>
            Grade: {grade}
          </div>
        )}
      </div>

      {/* Footer: signatures + QR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ height: 2, width: 150, background: "#111827", marginBottom: 6 }} />
            <div style={{ fontSize: 13, fontWeight: 700 }}>Registrar</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{organization}</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ height: 2, width: 150, background: "#111827", marginBottom: 6 }} />
            <div style={{ fontSize: 13, fontWeight: 700 }}>Instructor</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{instructor}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: 6 }}>
            <QRCodeSVG
              value={certificate.verifyUrl} size={90} />
              size={96}
              level="H"
            />
          </div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>Scan to verify</div>
        </div>
      </div>
    </div>
  );
});

export default CertificatePrintable;