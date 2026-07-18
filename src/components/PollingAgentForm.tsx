import { useEffect, useState } from "react";

import type { PollingAgent } from "../types/pollingAgent";
import type { PollingStation } from "../types/pollingStation";

import { getPollingStations } from "../services/pollingStationService";

type Props = {
  agent?: PollingAgent | null;

  onSave: (
    agent: Omit<PollingAgent, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;

  onCancel: () => void;
};

export default function PollingAgentForm({ agent, onSave, onCancel }: Props) {
  const [saving, setSaving] = useState(false);

  const [stations, setStations] = useState<PollingStation[]>([]);

  const [form, setForm] = useState({
    polling_station_id: 0,

    full_name: "",

    phone: "",

    national_id: "",

    role: "Agent",

    status: "Assigned",

    check_in_time: "",

    check_out_time: "",

    notes: "",
  });

  useEffect(() => {
    loadStations();
  }, []);

  useEffect(() => {
    if (!agent) return;

    setForm({
      polling_station_id: agent.polling_station_id,

      full_name: agent.full_name,

      phone: agent.phone,

      national_id: agent.national_id ?? "",

      role: agent.role,

      status: agent.status,

      check_in_time: agent.check_in_time ?? "",

      check_out_time: agent.check_out_time ?? "",

      notes: agent.notes ?? "",
    });
  }, [agent]);

  async function loadStations() {
    const data = await getPollingStations();

    setStations(data);
  }

  function update(field: keyof typeof form, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.full_name.trim()) {
      alert("Agent name is required.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    if (!form.polling_station_id) {
      alert("Select a polling station.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        ...form,
        national_id: form.national_id || null,
        notes: form.notes || null,
        check_in_time: form.check_in_time || null,
        check_out_time: form.check_out_time || null,
      });

      onCancel();
    } catch (error) {
      console.error(error);

      alert("Unable to save polling agent.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>{agent ? "✏️ Edit Polling Agent" : "👤 Add Polling Agent"}</h2>

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
              <label>Full Name</label>

              <input
                style={inputStyle}
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Phone Number</label>

              <input
                style={inputStyle}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>National ID</label>

              <input
                style={inputStyle}
                value={form.national_id}
                onChange={(e) => update("national_id", e.target.value)}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Role</label>

              <select
                style={inputStyle}
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              >
                <option>Agent</option>
                <option>Chief Agent</option>
                <option>Supervisor</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Status</label>

              <select
                style={inputStyle}
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option>Assigned</option>
                <option>Checked In</option>
                <option>Checked Out</option>
                <option>Absent</option>
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Check In Time</label>

              <input
                type="datetime-local"
                style={inputStyle}
                value={form.check_in_time}
                onChange={(e) => update("check_in_time", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Check Out Time</label>

              <input
                type="datetime-local"
                style={inputStyle}
                value={form.check_out_time}
                onChange={(e) => update("check_out_time", e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
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
              {saving ? "Saving..." : agent ? "Update Agent" : "Save Agent"}
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
