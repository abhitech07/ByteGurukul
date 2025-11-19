import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { utils, writeFile } from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorNavbar from "../components/instructor/InstructorNavbar";

function InstructorEarnings() {
  // ---------------- Mock Data --------------------
  const monthlyEarnings = [
    { month: "Jan", amount: 3200 },
    { month: "Feb", amount: 4100 },
    { month: "Mar", amount: 3800 },
    { month: "Apr", amount: 4500 },
    { month: "May", amount: 5200 },
    { month: "Jun", amount: 6100 },
    { month: "Jul", amount: 7000 },
    { month: "Aug", amount: 7800 },
    { month: "Sep", amount: 8100 },
    { month: "Oct", amount: 8900 },
    { month: "Nov", amount: 9600 },
    { month: "Dec", amount: 10400 },
  ];

  const transactions = [
    { id: 1, course: "React Masterclass", amount: 1350, date: "2025-10-01" },
    { id: 2, course: "Node.js Fundamentals", amount: 900, date: "2025-09-22" },
    { id: 3, course: "JavaScript Advanced", amount: 1800, date: "2025-09-10" },
    { id: 4, course: "Database Systems", amount: 750, date: "2025-08-15" },
  ];

  const payoutHistoryMock = [
    { id: 1, amount: 2500, method: "UPI", status: "Completed", date: "2025-09-05" },
    { id: 2, amount: 1800, method: "Bank Transfer", status: "Completed", date: "2025-08-03" },
  ];

  // ---------------- State --------------------
  const [walletBalance] = useState(12850);
  const [pendingPayout] = useState(4100);
  const [nextPayoutDate] = useState("2025-11-05");

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const payoutHistory = payoutHistoryMock;

  // ---------------- Summary Calculations --------------------
  const totals = useMemo(() => {
    const totalEarnings = monthlyEarnings.reduce((s, e) => s + e.amount, 0);
    const avgEarning = Math.round(totalEarnings / monthlyEarnings.length);
    return { totalEarnings, avgEarning };
  }, []);

  // ---------------- Export Functions --------------------
  const exportEarnings = () => {
    const ws = utils.json_to_sheet(monthlyEarnings);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Earnings");
    writeFile(wb, "InstructorEarnings.xlsx");
    toast.success("Earnings report exported!");
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Enter valid amount!");
      return;
    }
    if (withdrawAmount > walletBalance) {
      toast.error("Insufficient balance!");
      return;
    }
    toast.success("Withdrawal request submitted!");
    setWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div style={styles.page}>
      <InstructorNavbar />
      <ToastContainer position="bottom-right" />

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Instructor Earnings 💰</h1>
          <p style={styles.subtitle}>Track earnings, withdrawals & payouts</p>
        </div>
        <button style={styles.exportBtn} onClick={exportEarnings}>
          ⬇️ Export Report
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div style={styles.summaryGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Wallet Balance</h3>
          <p style={styles.cardValue}>₹ {walletBalance.toLocaleString()}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Pending Payout</h3>
          <p style={styles.cardValue}>₹ {pendingPayout.toLocaleString()}</p>
          <small style={styles.cardNote}>Will be auto-paid</small>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Next Payout Date</h3>
          <p style={{ ...styles.cardValue, color: "#f59e0b" }}>{nextPayoutDate}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Earned (YTD)</h3>
          <p style={styles.cardValue}>₹ {totals.totalEarnings.toLocaleString()}</p>
        </div>
      </div>


      {/* WITHDRAW SECTION */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Withdraw Earnings</h2>
          <button style={styles.withdrawBtn} onClick={() => setWithdrawModal(true)}>
            Request Withdrawal
          </button>
        </div>
      </div>


      {/* MONTHLY CHART */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Monthly Earnings Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v) => `₹ ${v}`} />
            <Line type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>


      {/* TRANSACTIONS TABLE */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Transactions</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th>ID</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={styles.tableRow}>
                <td>{tx.id}</td>
                <td>{tx.course}</td>
                <td>₹ {tx.amount.toLocaleString()}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* PAYOUT HISTORY */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Payout History</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th>ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payoutHistory.map((p) => (
              <tr key={p.id} style={styles.tableRow}>
                <td>{p.id}</td>
                <td>₹ {p.amount.toLocaleString()}</td>
                <td>{p.method}</td>
                <td style={{ color: p.status === "Completed" ? "green" : "orange" }}>
                  {p.status}
                </td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WITHDRAW MODAL */}
      {withdrawModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: 10 }}>Withdraw Funds</h2>

            <label>Enter Amount (₹):</label>
            <input
              style={styles.input}
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              placeholder="Amount"
            />

            <div style={styles.modalBtns}>
              <button style={styles.closeBtn} onClick={() => setWithdrawModal(false)}>
                Cancel
              </button>
              <button style={styles.primaryBtn} onClick={handleWithdraw}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* 🎨 Styles */
const styles = {
  page: {
    padding: "40px 20px",
    minHeight: "100vh",
    background: "linear-gradient(145deg,#f8fafc,#eef2ff)",
    fontFamily: "'Poppins', sans-serif",
  },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#1e293b" },
  subtitle: { color: "#475569", marginTop: 4 },
  exportBtn: {
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    padding: "10px 18px",
    color: "white",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 20,
    marginBottom: 30,
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  cardTitle: { fontSize: 14, color: "#64748b" },
  cardValue: { fontSize: 26, fontWeight: "700", marginTop: 6, color: "#16a34a" },
  cardNote: { fontSize: 12, color: "#94a3b8" },

  section: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    marginBottom: 30,
  },
  sectionHeader: { display: "flex", justifyContent: "space-between" },
  sectionTitle: { fontSize: 20, fontWeight: "700" },

  withdrawBtn: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    padding: "8px 16px",
    color: "white",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  table: { width: "100%", borderCollapse: "collapse", marginTop: 10 },
  tableHeaderRow: {
    background: "#f1f5f9",
    textAlign: "left",
    fontWeight: "600",
  },
  tableRow: { borderBottom: "1px solid #e2e8f0" },

  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: 25,
    borderRadius: 12,
    width: 400,
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },
  modalBtns: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  closeBtn: {
    background: "#e5e7eb",
    padding: "8px 15px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  primaryBtn: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    padding: "8px 15px",
    borderRadius: 8,
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default InstructorEarnings;