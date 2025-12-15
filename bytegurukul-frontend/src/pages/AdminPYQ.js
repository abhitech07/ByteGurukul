import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTrash, FaFilePdf, FaSearch } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext"; // Auth context se token lene ke liye

function AdminPYQ() {
  // --- State Variables ---
  const [papers, setPapers] = useState([]); // Database se aane wale papers
  
  const [formData, setFormData] = useState({
    subject: "",
    year: "",
    branch: "CSE",
    semester: "",
  });
  
  const [file, setFile] = useState(null); // PDF File ke liye
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- 1. Fetch Papers on Load ---
  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/pyq');
      const data = await response.json();
      if (data.success) {
        setPapers(data.data);
      }
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  // --- 2. Handle Input Changes ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // --- 3. Submit Form (Upload) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }

    setIsLoading(true);

    // FormData create kar rahe hain (File + Text)
    const data = new FormData();
    data.append("subject", formData.subject);
    data.append("year", formData.year);
    data.append("branch", formData.branch);
    data.append("semester", formData.semester);
    data.append("file", file); // Multer isse 'file' key se pakdega

    try {
      // Backend API Call
      const response = await fetch('http://localhost:5003/api/pyq', {
        method: 'POST',
        headers: {
          // FormData ke saath 'Content-Type' header mat lagana, browser khud set karega boundary ke saath
          'Authorization': localStorage.getItem('token') || '', 
        },
        body: data 
      });
      
      const result = await response.json();

      if (result.success) {
        alert("PYQ Uploaded Successfully! 🚀");
        // List ko refresh karo
        fetchPapers(); 
        // Form reset karo
        setFormData({ subject: "", year: "", branch: "CSE", semester: "" });
        setFile(null);
        document.getElementById("fileInput").value = ""; 
      } else {
        alert("Upload Failed: " + result.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server Error: Could not upload paper.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. Delete Paper ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    try {
      const response = await fetch(`http://localhost:5003/api/pyq/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token') || '',
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        // UI se bhi hata do bina refresh kiye
        setPapers(papers.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error: Could not delete.");
    }
  };

  // Search Filter Logic
  const filteredPapers = papers.filter(paper => 
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>PYQ Repository 📚</h1>
            <p style={styles.subtitle}>Manage Question Papers (PostgreSQL Linked)</p>
          </div>
          <div style={styles.statsBadge}>
            <span>Total Papers: {papers.length}</span>
          </div>
        </div>

        <div style={styles.gridContainer}>
          
          {/* Left: Upload Form */}
          <div style={styles.formCard}>
            <div style={styles.cardHeader}>
              <FaCloudUploadAlt style={styles.iconLarge} />
              <h3>Upload New Paper</h3>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Subject Name</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. DBMS"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Year</label>
                  <input
                    type="number"
                    name="year"
                    placeholder="2024"
                    value={formData.year}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}th</option>)}
                  </select>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Branch</label>
                <select 
                  name="branch" 
                  value={formData.branch} 
                  onChange={handleInputChange} 
                  style={styles.select}
                >
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="CE">Civil</option>
                </select>
              </div>

              {/* File Upload Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Upload PDF</label>
                <div style={styles.fileUploadWrapper}>
                    <input
                      id="fileInput"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      style={styles.fileInput}
                      required
                    />
                </div>
                <small style={{color: '#64748b', marginTop: '5px', fontSize: '11px'}}>
                    Max size: 5MB (PDF Only)
                </small>
              </div>

              <button type="submit" style={styles.submitBtn} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload Paper"}
              </button>
            </form>
          </div>

          {/* Right: Papers List */}
          <div style={styles.listCard}>
            <div style={styles.listHeader}>
              <h3>Recent Uploads</h3>
              <div style={styles.searchBox}>
                <FaSearch style={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search subject..." 
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeadRow}>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Details</th>
                    <th style={styles.th}>File</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPapers.length > 0 ? (
                    filteredPapers.map((paper) => (
                      <tr key={paper.id} style={styles.tableRow}>
                        <td style={styles.td}>
                          <div style={styles.subjectText}>{paper.subject}</div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.tag}>{paper.branch}</span>
                          <span style={styles.tagOutline}>{paper.year}</span>
                          <span style={styles.tagOutline}>{paper.semester} Sem</span>
                        </td>
                        <td style={styles.td}>
                          <a
                            href={`http://localhost:5003${paper.filePath}`}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.fileLink}
                          >
                            <FaFilePdf style={{marginRight: '5px'}} /> View
                          </a>
                        </td>
                        <td style={styles.td}>
                          <button 
                            onClick={() => handleDelete(paper.id)} 
                            style={styles.deleteBtn}
                            title="Delete Paper"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={styles.emptyState}>No papers found. Upload one!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* Styles - Copy as is */
const styles = {
  pageContainer: { minHeight: "100vh", background: "#f8fafc", padding: "40px 20px", fontFamily: "'Inter', sans-serif" },
  contentWrapper: { maxWidth: "1100px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  title: { fontSize: "26px", fontWeight: "800", color: "#1e293b", background: "linear-gradient(90deg, #2563eb, #9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { color: "#64748b", fontSize: "14px" },
  statsBadge: { background: "#fff", padding: "8px 16px", borderRadius: "50px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", fontWeight: "600", color: "#2563eb", fontSize: "14px" },
  gridContainer: { display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px", alignItems: "start" },
  
  formCard: { background: "white", borderRadius: "16px", padding: "25px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", position: 'sticky', top: '20px' },
  cardHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#334155", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px" },
  iconLarge: { fontSize: "20px", color: "#2563eb" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "flex", gap: "10px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px", width: "100%" },
  label: { fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" },
  input: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", width: "100%", background: "#f8fafc" },
  select: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", width: "100%", background: "#f8fafc" },
  
  fileInput: { fontSize: "13px", color: "#475569" },
  fileUploadWrapper: { padding: "10px", border: "1px dashed #cbd5e1", borderRadius: "8px", background: "#f1f5f9" },
  
  submitBtn: { padding: "12px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #2563eb, #9333ea)", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "10px", transition: "0.2s" },
  
  listCard: { background: "white", borderRadius: "16px", padding: "25px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", minHeight: "500px" },
  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  searchBox: { position: "relative", width: "200px" },
  searchInput: { width: "100%", padding: "8px 10px 8px 30px", borderRadius: "50px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none", background: "#f8fafc" },
  searchIcon: { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "12px" },
  
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeadRow: { borderBottom: "2px solid #f1f5f9" },
  th: { textAlign: "left", padding: "12px", color: "#64748b", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" },
  tableRow: { borderBottom: "1px solid #f1f5f9", transition: "0.2s" },
  td: { padding: "12px", verticalAlign: "middle", fontSize: "14px", color: "#334155" },
  
  subjectText: { fontWeight: "600" },
  tag: { display: "inline-block", padding: "3px 8px", borderRadius: "12px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontSize: "11px", fontWeight: "600", marginRight: "5px" },
  tagOutline: { display: "inline-block", padding: "3px 8px", borderRadius: "12px", border: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", marginRight: "5px" },
  fileLink: { color: "#ef4444", textDecoration: "none", fontWeight: "600", display: 'flex', alignItems: 'center', fontSize: '13px' },
  deleteBtn: { background: "transparent", border: "none", color: "#cbd5e1", cursor: "pointer", fontSize: "15px", padding: "5px", transition: "0.2s" },
  emptyState: { textAlign: 'center', padding: '40px', color: '#94a3b8' }
};

// Inject hover styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  input[type="file"]::file-selector-button {
    border: none;
    background: #e2e8f0;
    padding: 6px 12px;
    border-radius: 6px;
    color: #334155;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;
    font-size: 12px;
    transition: 0.2s;
  }
  input[type="file"]::file-selector-button:hover { background: #cbd5e1; }
  tr:hover { background-color: #f8fafc; }
  button:hover { opacity: 0.9; transform: translateY(-1px); }
  button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .deleteBtn:hover { color: #ef4444 !important; transform: scale(1.1); }
  @media (max-width: 900px) { .gridContainer { grid-template-columns: 1fr; } }
`;
document.head.appendChild(styleSheet);

export default AdminPYQ;