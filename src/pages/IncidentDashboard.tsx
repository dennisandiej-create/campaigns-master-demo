import { useEffect, useMemo, useState } from "react";

import type { IncidentReport } from "../types/incidentReport";

import {
  getIncidentReports,
  addIncidentReport,
  updateIncidentReport,
  deleteIncidentReport,
} from "../services/incidentReportService";

import IncidentReportForm from "../components/IncidentReportForm";

export default function IncidentDashboard() {
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingIncident, setEditingIncident] = useState<IncidentReport | null>(
    null,
  );

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    try {
      setLoading(true);

      const data = await getIncidentReports();

      setIncidents(data);
    } catch (error) {
      console.error(error);

      alert("Unable to load incident reports.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(report: Omit<IncidentReport, "id" | "created_at">) {
    try {
      if (editingIncident) {
        await updateIncidentReport(editingIncident.id, report);
      } else {
        await addIncidentReport(report);
      }

      setShowForm(false);

      setEditingIncident(null);

      await loadIncidents();
    } catch (error) {
      console.error(error);

      alert("Unable to save incident.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this incident?")) {
      return;
    }

    try {
      await deleteIncidentReport(id);

      await loadIncidents();
    } catch (error) {
      console.error(error);

      alert("Unable to delete incident.");
    }
  }

  const filteredIncidents = useMemo(() => {
    const text = search.toLowerCase();

    return incidents.filter((incident) => {
      return (
        incident.incident_type.toLowerCase().includes(text) ||
        incident.description.toLowerCase().includes(text) ||
        incident.status.toLowerCase().includes(text) ||
        incident.severity.toLowerCase().includes(text)
      );
    });
  }, [incidents, search]);

  const openIncidents = incidents.filter((i) => i.status === "Open").length;

  const investigating = incidents.filter(
    (i) => i.status === "Investigating",
  ).length;

  const resolved = incidents.filter((i) => i.status === "Resolved").length;

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
        <h1>🚨 Incident Dashboard</h1>

        <button
          onClick={() => {
            setEditingIncident(null);
            setShowForm(true);
          }}
        >
          + Report Incident
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <StatCard title="Open" value={openIncidents} color="#dc2626" />

        <StatCard title="Investigating" value={investigating} color="#f59e0b" />

        <StatCard title="Resolved" value={resolved} color="#16a34a" />

        <StatCard
          title="Total Incidents"
          value={incidents.length}
          color="#2563eb"
        />
      </div>

      <input
        type="text"
        placeholder="Search incidents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: 320,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          marginBottom: 20,
        }}
      />

      {showForm && (
        <IncidentReportForm
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingIncident(null);
          }}
        />
      )}

      {loading ? (
        <p>Loading incidents...</p>
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
              <th style={thStyle}>Incident</th>
              <th style={thStyle}>Severity</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Reported</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredIncidents.map((incident) => (
              <tr
                key={incident.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={tdStyle}>
                  <strong>{incident.incident_type}</strong>

                  <br />

                  <small>{incident.description}</small>
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      color: "#ffffff",
                      background:
                        incident.severity === "Critical"
                          ? "#991b1b"
                          : incident.severity === "High"
                            ? "#dc2626"
                            : incident.severity === "Medium"
                              ? "#f59e0b"
                              : "#16a34a",
                    }}
                  >
                    {incident.severity}
                  </span>
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      color: "#ffffff",
                      background:
                        incident.status === "Resolved"
                          ? "#16a34a"
                          : incident.status === "Investigating"
                            ? "#f59e0b"
                            : "#dc2626",
                    }}
                  >
                    {incident.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  {new Date(incident.reported_at).toLocaleString()}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() => {
                      setEditingIncident(incident);
                      setShowForm(true);
                    }}
                    style={{ marginRight: 8 }}
                  >
                    ✏️ Edit
                  </button>

                  <button onClick={() => handleDelete(incident.id)}>
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
  value: number;
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
