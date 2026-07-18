import { useEffect, useState } from "react";

import type { TurnoutReport } from "../types/turnoutReport";
import type { PollingStation } from "../types/pollingStation";
import type { PollingAgent } from "../types/pollingAgent";

import { getPollingStations } from "../services/pollingStationService";
import { getPollingAgents } from "../services/pollingAgentService";

type Props = {
  onSave: (report: Omit<TurnoutReport, "id" | "created_at">) => Promise<void>;

  onCancel: () => void;
};

export default function TurnoutReportForm({ onSave, onCancel }: Props) {
  const [saving, setSaving] = useState(false);

  const [stations, setStations] = useState<PollingStation[]>([]);

  const [agents, setAgents] = useState<PollingAgent[]>([]);

  const [form, setForm] = useState({
    polling_station_id: 0,

    polling_agent_id: null as number | null,

    report_time: new Date().toISOString().slice(0, 16),

    voters_processed: 0,

    turnout_percent: 0,

    notes: "",
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
      alert("Select a polling station.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        ...form,
        notes: form.notes || null,
      });

      onCancel();
    } catch (err) {
      console.error(err);

      alert("Unable to save turnout report.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>📊 New Turnout Report</h2>

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
              <label>Report Time</label>

              <input
                type="datetime-local"
                style={inputStyle}
                value={form.report_time}
                onChange={(e) => update("report_time", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Voters Processed</label>

              <input
                type="number"
                style={inputStyle}
                value={form.voters_processed}
                onChange={(e) =>
                  update("voters_processed", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Turnout Percentage</label>

              <input
                type="number"
                min={0}
                max={100}
                step="0.01"
                style={inputStyle}
                value={form.turnout_percent}
                onChange={(e) =>
                  update("turnout_percent", Number(e.target.value))
                }
              />
            </div>

            <div style={fieldStyle}>
              <label>Notes</label>

              <textarea
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
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
              {saving ? "Saving..." : "Save Turnout Report"}
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
  width: 800,
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
