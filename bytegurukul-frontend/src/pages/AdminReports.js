// src/pages/AdminReports.js
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { utils, writeFile } from 'xlsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../contexts/ThemeContext';
import AdminNavbar from '../components/admin/AdminNavbar';

const mockMonthly = {
  users: [
    { month: 'Jan', value: 520 },
    { month: 'Feb', value: 640 },
    { month: 'Mar', value: 780 },
    { month: 'Apr', value: 910 },
    { month: 'May', value: 1000 },
    { month: 'Jun', value: 1140 },
    { month: 'Jul', value: 1270 },
    { month: 'Aug', value: 1380 },
    { month: 'Sep', value: 1485 },
    { month: 'Oct', value: 1570 },
    { month: 'Nov', value: 1660 },
    { month: 'Dec', value: 1745 },
  ],
  courses: [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 15 },
    { month: 'Mar', value: 18 },
    { month: 'Apr', value: 22 },
    { month: 'May', value: 25 },
    { month: 'Jun', value: 28 },
    { month: 'Jul', value: 31 },
    { month: 'Aug', value: 34 },
    { month: 'Sep', value: 38 },
    { month: 'Oct', value: 41 },
    { month: 'Nov', value: 45 },
    { month: 'Dec', value: 48 },
  ],
  revenue: [
    { month: 'Jan', value: 2400 },
    { month: 'Feb', value: 3200 },
    { month: 'Mar', value: 4100 },
    { month: 'Apr', value: 5600 },
    { month: 'May', value: 6900 },
    { month: 'Jun', value: 8200 },
    { month: 'Jul', value: 9400 },
    { month: 'Aug', value: 10350 },
    { month: 'Sep', value: 11500 },
    { month: 'Oct', value: 12400 },
    { month: 'Nov', value: 13500 },
    { month: 'Dec', value: 14800 },
  ],
};

function AdminReports() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? '#0f172a' : '#f8fafc',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#f8fafc' : '#1e293b',
    secondary: isDark ? '#94a3b8' : '#475569',
    border: isDark ? '#334155' : '#cbd5e1',
    accentBlue: '#2563eb',
    accentPurple: '#9333ea',
    accentGreen: '#16a34a',
  };

  const totals = useMemo(() => {
    const totalUsers = mockMonthly.users.at(-1).value;
    const totalCourses = mockMonthly.courses.reduce((s, c) => s + c.value, 0);
    const totalRevenue = mockMonthly.revenue.reduce((s, r) => s + r.value, 0);
    return { totalUsers, totalCourses, totalRevenue };
  }, []);

  // 📤 Export Functions
  const exportToExcel = (data, name) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, `${name}.xlsx`);
    toast.success(`${name} report exported`);
  };

  const exportAll = () => {
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(mockMonthly.users), 'Users');
    utils.book_append_sheet(wb, utils.json_to_sheet(mockMonthly.courses), 'Courses');
    utils.book_append_sheet(wb, utils.json_to_sheet(mockMonthly.revenue), 'Revenue');
    writeFile(wb, 'ByteGurukul_Reports.xlsx');
    toast.success('All reports exported successfully!');
  };

  const handlePrint = () => window.print();

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: '100vh',
    
        fontFamily: "'Poppins', sans-serif",
        transition: 'all 0.3s ease',
      }}
    >
      <AdminNavbar />
      <ToastContainer position="bottom-right" />

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>📊 Admin Reports</h1>
          <p style={{ color: colors.secondary }}>Monthly data overview & exports</p>
        </div>
        <div style={styles.headerActions}>
          <button
            style={{ ...styles.btnGhost, color: colors.accentBlue }}
            onClick={() => (window.location.href = '/dashboard')}
          >
            ← Dashboard
          </button>
          <button
            style={{
              ...styles.btn,
              background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentPurple})`,
            }}
            onClick={exportAll}
          >
            Export All
          </button>
          <button style={styles.btnAlt} onClick={handlePrint}>
            🖨️ Print / PDF
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <SummaryCard
          title="Total Users"
          value={totals.totalUsers.toLocaleString()}
          color={colors.accentBlue}
          sub={`Last month: ${mockMonthly.users[mockMonthly.users.length - 2].value}`}
          isDark={isDark}
        />
        <SummaryCard
          title="Courses (YTD)"
          value={totals.totalCourses}
          color={colors.accentPurple}
          sub={`New this year: ${mockMonthly.courses.length}`}
          isDark={isDark}
        />
        <SummaryCard
          title="Revenue (YTD)"
          value={`₹ ${totals.totalRevenue.toLocaleString()}`}
          color={colors.accentGreen}
          sub={`Avg: ₹ ${Math.round(totals.totalRevenue / 12)}/mo`}
          isDark={isDark}
        />
      </div>

      {/* USERS CHART */}
      <ReportSection
        title="Monthly Users Growth"
        color={colors.accentBlue}
        data={mockMonthly.users}
        onExport={() => exportToExcel(mockMonthly.users, 'users_monthly')}
        chart={
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMonthly.users}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.secondary} />
              <YAxis stroke={colors.secondary} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={colors.accentBlue} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        }
      />

      {/* COURSES CHART */}
      <ReportSection
        title="Monthly Course Additions"
        color={colors.accentPurple}
        data={mockMonthly.courses}
        onExport={() => exportToExcel(mockMonthly.courses, 'courses_monthly')}
        chart={
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockMonthly.courses}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.secondary} />
              <YAxis stroke={colors.secondary} />
              <Tooltip />
              <Bar dataKey="value" fill={colors.accentPurple} />
            </BarChart>
          </ResponsiveContainer>
        }
      />

      {/* REVENUE CHART */}
      <ReportSection
        title="Monthly Revenue Growth"
        color={colors.accentGreen}
        data={mockMonthly.revenue}
        onExport={() => exportToExcel(mockMonthly.revenue, 'revenue_monthly')}
        chart={
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMonthly.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.secondary} />
              <YAxis stroke={colors.secondary} />
              <Tooltip formatter={(v) => `₹ ${v}`} />
              <Line type="monotone" dataKey="value" stroke={colors.accentGreen} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        }
      />

      <footer style={{ textAlign: 'center', marginTop: 25, color: colors.secondary }}>
        Tip: Export reports or use Print → Save as PDF for offline storage.
      </footer>
    </div>
  );
}

/* 📊 Report Section Component */
function ReportSection({ title, color, onExport, chart }) {
  return (
    <section
      style={{
        background: 'white',
        borderRadius: 12,
        padding: 18,
        marginBottom: 18,
        boxShadow: '0 6px 18px rgba(2,6,23,0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color }}>{title}</h3>
        <button
          style={{
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            padding: '6px 12px',
            borderRadius: 8,
            cursor: 'pointer',
          }}
          onClick={onExport}
        >
          Export
        </button>
      </div>
      {chart}
    </section>
  );
}

/* 📈 Summary Card Component */
function SummaryCard({ title, value, sub, color, isDark }) {
  return (
    <div
      style={{
        background: isDark ? '#1e293b' : 'white',
        borderRadius: 12,
        padding: 16,
        boxShadow: isDark
          ? '0 6px 15px rgba(0,0,0,0.4)'
          : '0 6px 15px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ color: isDark ? '#cbd5e1' : '#64748b', fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 6 }}>{value}</div>
      <div style={{ color: isDark ? '#94a3b8' : '#94a3b8', fontSize: 13, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

/* ⚙️ Common Styles */
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerActions: { display: 'flex', gap: 10 },
  btn: {
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  btnAlt: {
    background: '#f3f4f6',
    color: '#111827',
    border: '1px solid #e5e7eb',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  btnGhost: {
    background: 'transparent',
    border: '1px solid transparent',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
  },
};

export default AdminReports;