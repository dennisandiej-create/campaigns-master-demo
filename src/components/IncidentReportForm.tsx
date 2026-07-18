import { useEffect, useState } from "react";

import type { IncidentReport } from "../types/incidentReport";
import type { PollingStation } from "../types/pollingStation";
import type { PollingAgent } from "../types/pollingAgent";

import { getPollingStations } from "../services/pollingStationService";
import { getPollingAgents } from "../services/pollingAgentService";

type Props = {
  onSave: (report: Omit<IncidentReport, "id" | "created_at">) => Promise<void>;

  onCancel: () => void;
};

export default function IncidentReportForm({ onSave, onCancel }: Props) {
  const [saving, setSaving] = useState(false);

  const [stations, setStations] = useState<PollingStation[]>([]);

  const [agents, setAgents] = useState<PollingAgent[]>([]);

  const [form, setForm] = useState({
    polling_station_id: 0,

    polling_agent_id: null as number | null,

    incident_type: "Security Issue",

    severity: "Medium",

    description: "",

    status: "Open",

    reported_at: new Date().toISOString().slice(0, 16),

    resolved_at: "",

    resolution_notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const stationData = await getPollingStations();

    const agentData = await getPollingAgents();

    setStations(stationData);

    setAgents(agentData);
  }

  function update(field: keyof typeof form, value: string | number | null) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.polling_station_id) {
      alert("Please select a polling station.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter an incident description.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        ...form,
        polling_agent_id: form.polling_agent_id,
        resolved_at: form.resolved_at || null,
        resolution_notes: form.resolution_notes || null,
      });

      onCancel();
    } catch (error) {
      console.error(error);

      alert("Unable to save incident report.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>🚨 Incident Report</h2>

        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Polling Station</label>

              <select
                style={inputStyle}
                value={form.polling_station_id}
                onChange={(e) =>
                  update("polling_station_id", Number(e.target.value))
                }
              >
                <option value={0}>Select Polling Station</option>

                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Polling Agent</label>

              <select
                style={inputStyle}
                value={form.polling_agent_id ?? ""}
                onChange={(e) =>
                  update(
                    "polling_agent_id",
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <option value="">Select Polling Agent</option>

                {agents
                  .filter(
                    (agent) =>
                      !form.polling_station_id ||
                      agent.polling_station_id === form.polling_station_id,
                  )
                  .map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.full_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Incident Type</label>

              <select
                style={inputStyle}
                value={form.incident_type}
                onChange={(e) => update("incident_type", e.target.value)}
              >
                <option>Security Issue</option>
                <option>Violence</option>
                <option>KIEMS Failure</option>
                <option>Missing Ballot Papers</option>
                <option>Missing Election Materials</option>
                <option>Delayed Opening</option>
                <option>Power Failure</option>
                <option>Network Failure</option>
                <option>Voter Intimidation</option>
                <option>Other</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Severity</label>

              <select
                style={inputStyle}
                value={form.severity}
                onChange={(e) => update("severity", e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Status</label>

              <select
                style={inputStyle}
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option>Open</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Reported At</label>

              <input
                type="datetime-local"
                style={inputStyle}
                value={form.reported_at}
                onChange={(e) => update("reported_at", e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <label>Description</label>

            <textarea
              rows={5}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Resolved At</label>

              <input
                type="datetime-local"
                style={inputStyle}
                value={form.resolved_at}
                onChange={(e) => update("resolved_at", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Resolution Notes</label>

              <textarea
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
                value={form.resolution_notes}
                onChange={(e) => update("resolution_notes", e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button type="button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Incident"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: 850,
  maxWidth: "95%",
  maxHeight: "90vh",
  overflowY: "auto",
  background: "#ffffff",
  borderRadius: 16,
  padding: 30,
  boxShadow: "0 20px 50px rgba(0,0,0,.35)",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginTop: 20,
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle: React.CSSProperties = {
  marginTop: 6,
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 15,
  width: "100%",
  boxSizing: "border-box",
};
