// src/pages/StudentOrders.js
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { downloadInvoicePDF } from "../components/InvoicePrintable";
import { studentService } from "../services/studentService";

function StudentOrders() {
  const { user } = useAuth();
  const { orders: cartOrders = [] } = useCart();

  // PDF reference
  const invoiceRef = useRef();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await studentService.getOrders();
        setOrders(response.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status.toLowerCase() === filter.toLowerCase();
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.billing?.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const formatCurrency = (v, cur = "INR") => {
    try {
      if (cur === "INR") {
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);
      }
      return `${v} ${cur}`;
    } catch {
      return `${v} ${cur}`;
    }
  };

  const handleCancelOrder = (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o)));
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getOrders();
      setOrders(response.data || []);
    } catch (err) {
      console.error('Error refreshing orders:', err);
      setError('Failed to refresh orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Orders</h1>
          <p style={styles.subtitle}>Invoices, order history and downloads</p>
        </div>

        <div style={styles.actions}>
          <Link to="/dashboard" style={styles.btnGhost}>
            ← Dashboard
          </Link>
          <button
            style={styles.btnPrimary}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={styles.controls}>
        <input
          placeholder="Search by order id or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
          <option value="all">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="Refunded">Refunded</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* LOADING/ERROR MESSAGES */}
      {loading && <div style={styles.message}>Loading orders...</div>}
      {error && <div style={styles.error}>{error}</div>}

      {/* GRID */}
      <div style={styles.grid}>
        {/* LEFT — LIST */}
        <div style={styles.listCard}>
          <h3 style={styles.cardTitle}>Orders ({filtered.length})</h3>

          {filtered.length === 0 ? (
            <div style={styles.empty}>No orders found.</div>
          ) : (
            filtered.map((o) => (
              <div key={o.id} style={styles.orderRow}>
                <div>
                  <div style={styles.orderId}>{o.id}</div>
                  <div style={styles.muted}>
                    {o.date} • {o.items.length} item{ o.items.length > 1 ? "s" : "" }
                  </div>
                </div>

                <div style={styles.rightCol}>
                  <div style={styles.amount}>{formatCurrency(o.amount, o.currency)}</div>
                  <div style={styles.status(o.status)}>{o.status}</div>

                  <div style={styles.rowActions}>
                    <button style={styles.actionBtn} onClick={() => setSelectedOrder(o)}>
                      View
                    </button>
                    <button
                      style={styles.actionBtn}
                      onClick={() => downloadInvoicePDF(invoiceRef.current, `${o.id}.pdf`)}
                    >
                      PDF
                    </button>
                    {o.status !== "Cancelled" && o.status !== "Refunded" && (
                      <button style={styles.dangerBtn} onClick={() => handleCancelOrder(o.id)}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT — DETAIL */}
        <div style={styles.detailCard}>
          {selectedOrder ? (
            <div ref={invoiceRef}>
              <div style={styles.detailHeader}>
                <h3>Order {selectedOrder.id}</h3>
                <div style={styles.muted}>{selectedOrder.date}</div>
              </div>

              <div style={styles.section}>
                <strong>Billing</strong>
                <div style={{ marginTop: 8 }}>
                  <div>{selectedOrder.billing?.name}</div>
                  <div style={styles.muted}>{selectedOrder.billing?.email}</div>
                  <div style={styles.muted}>{selectedOrder.billing?.phone}</div>
                  <div style={{ marginTop: 6 }}>{selectedOrder.billing?.address}</div>
                </div>
              </div>

              <div style={styles.section}>
                <strong>Items</strong>
                <table style={styles.table}>
                  <thead>
                    <tr><th>Title</th><th>Qty</th><th>Price</th></tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((it) => (
                      <tr key={it.id}>
                        <td>{it.title}</td>
                        <td style={{ textAlign: "center" }}>{it.qty}</td>
                        <td style={{ textAlign: "right" }}>
                          {formatCurrency(it.price, selectedOrder.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" style={{ textAlign: "right", fontWeight: 700 }}>Total</td>
                      <td style={{ textAlign: "right", fontWeight: 700 }}>
                        {formatCurrency(selectedOrder.amount, selectedOrder.currency)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div style={styles.section}>
                <strong>Payment</strong>
                <div style={{ marginTop: 8 }}>
                  <div>Method: {selectedOrder.payment?.method}</div>
                  <div>Payment ID: {selectedOrder.payment?.id}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  style={styles.btnPrimary}
                  onClick={() => downloadInvoicePDF(invoiceRef.current, `${selectedOrder.id}.pdf`)}
                >
                  Download PDF
                </button>
                <button style={styles.btnGhost} onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.emptyDetail}>
              <p>Select an order to view invoice & details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* styles */
const styles = {
  page: {
    padding: 24,
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(180deg,#f8fafc,#eef2ff)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  title: { fontSize: 22, fontWeight: 700 },
  subtitle: { color: "#64748b", marginTop: 4 },
  actions: { display: "flex", gap: 10 },
  btnPrimary: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  btnGhost: {
    background: "transparent",
    color: "#2563eb",
    border: "1px solid transparent",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    textDecoration: "none",
  },
  controls: { display: "flex", gap: 12, marginBottom: 14 },
  search: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },
  select: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },
  grid: { display: "grid", gridTemplateColumns: "360px 1fr", gap: 16 },
  listCard: {
    background: "white",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
  },
  cardTitle: { marginBottom: 8, fontWeight: 700 },
  empty: { padding: 24, color: "#64748b" },

  orderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 8px",
    borderBottom: "1px solid #f1f5f9",
  },
  orderId: { fontWeight: 700 },
  muted: { color: "#7b8794", fontSize: 13 },

  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "center",
    minWidth: 160,
  },

  amount: { fontWeight: 700 },

  status: (s) => ({
    padding: "6px 10px",
    borderRadius: 12,
    fontSize: 13,
    background:
      s === "Completed"
        ? "#ecfdf5"
        : s === "Refunded"
        ? "#fff7ed"
        : s === "Cancelled"
        ? "#fee2e2"
        : "#eef2ff",
    color:
      s === "Completed"
        ? "#166534"
        : s === "Refunded"
        ? "#92400e"
        : s === "Cancelled"
        ? "#991b1b"
        : "#2563eb",
  }),

  rowActions: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" },

  actionBtn: {
    background: "#f1f5f9",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },

  dangerBtn: {
    background: "#fee2e2",
    border: "1px solid #fca5a5",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },

  detailCard: {
    background: "white",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
  },
  detailHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  section: { marginTop: 12 },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 8,
  },

  emptyDetail: { padding: 24, color: "#64748b" },
  message: {
    padding: "12px 16px",
    background: "#eef2ff",
    color: "#2563eb",
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center"
  },
  error: {
    padding: "12px 16px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center"
  },
};

export default StudentOrders;