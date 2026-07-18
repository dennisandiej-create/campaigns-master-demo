import { useEffect, useMemo, useState } from "react";

import type { TurnoutReport } from "../types/turnoutReport";

import {
  getTurnoutReports,
  addTurnoutReport,
  deleteTurnoutReport,
} from "../services/turnoutReportService";

import TurnoutReportForm from "../components/TurnoutReportForm";

export default function TurnoutDashboard() {
  const [reports, setReports] = useState<TurnoutReport[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);

      const data = await getTurnoutReports();

      setReports(data);
    } catch (error) {
      console.error(error);

      alert("Unable to load turnout reports.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(report: Omit<TurnoutReport, "id" | "created_at">) {
    try {
      await addTurnoutReport(report);

      setShowForm(false);

      await loadReports();
    } catch (error) {
      console.error(error);

      alert("Unable to save turnout report.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this turnout report?")) {
      return;
    }

    try {
      await deleteTurnoutReport(id);

      await loadReports();
    } catch (error) {
      console.error(error);

      alert("Unable to delete turnout report.");
    }
  }

  const filteredReports = useMemo(() => {
    const text = search.toLowerCase();

    return reports.filter((report) => {
      return (
        report.notes?.toLowerCase().includes(text) ||
        report.report_time.toLowerCase().includes(text)
      );
    });
  }, [reports, search]);

  const totalVoters = reports.reduce(
    (sum, report) => sum + report.voters_processed,
    0,
  );

  const averageTurnout =
    reports.length === 0
      ? 0
      : reports.reduce(
          (sum, report) => sum + Number(report.turnout_percent),
          0,
        ) / reports.length;

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>📈 Turnout Dashboard</h1>

        <button onClick={() => setShowForm(true)}>+ New Turnout Report</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <StatCard
          title="Total Reports"
          value={reports.length.toString()}
          color="#2563eb"
        />

        <StatCard
          title="Total Voters"
          value={totalVoters.toLocaleString()}
          color="#16a34a"
        />

        <StatCard
          title="Average Turnout"
          value={`${averageTurnout.toFixed(1)}%`}
          color="#f59e0b"
        />
      </div>

      <input
        type="text"
        placeholder="Search reports..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: 320,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #d1d5db",
        }}
      />

      {showForm && (
        <TurnoutReportForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading turnout reports...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#ffffff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          }}
        >
          <thead
            style={{
              background: "#1f2937",
              color: "#ffffff",
            }}
          >
            <tr>
              <th style={thStyle}>Report Time</th>
              <th style={thStyle}>Voters</th>
              <th style={thStyle}>Turnout %</th>
              <th style={thStyle}>Notes</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((report) => (
              <tr
                key={report.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={tdStyle}>
                  {new Date(report.report_time).toLocaleString()}
                </td>

                <td style={tdStyle}>
                  {report.voters_processed.toLocaleString()}
                </td>

                <td style={tdStyle}>
                  {Number(report.turnout_percent).toFixed(2)}%
                </td>

                <td style={tdStyle}>{report.notes || "-"}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleDelete(report.id)}
                    style={{
                      background: "#dc2626",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
  color: string;
};

function StatCard({ title, value, color }: CardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 14,
        padding: 20,
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        borderLeft: `6px solid ${color}`,
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#111827",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
};
