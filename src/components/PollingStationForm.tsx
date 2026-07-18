import { useEffect, useState } from "react";
import { getWards } from "../services/wardService";
import type { PollingStation } from "../types/pollingStation";
import type { Ward } from "../types/ward";

type Props = {
  station?: PollingStation | null;

  onSave: (
    station: Omit<PollingStation, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;

  onCancel: () => void;
};

export default function PollingStationForm({
  station,
  onSave,
  onCancel,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [wards, setWards] = useState<Ward[]>([]);

  const [form, setForm] = useState({
    ward_id: 1,

    name: "",

    station_code: "",

    registered_voters: 0,

    target_votes: 0,

    presiding_agent: "",

    phone: "",

    latitude: 0,

    longitude: 0,

    notes: "",
  });

  useEffect(() => {
    loadWards();
  }, []);

  useEffect(() => {
    if (station) {
      setForm({
        ward_id: station.ward_id,

        name: station.name,

        station_code: station.station_code ?? "",

        registered_voters: station.registered_voters,

        target_votes: station.target_votes,

        presiding_agent: station.presiding_agent ?? "",

        phone: station.phone ?? "",

        latitude: station.latitude ?? 0,

        longitude: station.longitude ?? 0,

        notes: station.notes ?? "",
      });
    }
  }, [station]);

  async function loadWards() {
    const data = await getWards();

    setWards(data);
  }

  function update(field: keyof typeof form, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Polling station name is required.");
      return;
    }

    try {
      setSaving(true);

      await onSave(form);

      onCancel();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>
          {station ? "✏️ Edit Polling Station" : "🗳 Add Polling Station"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Ward</label>

              <select
                style={inputStyle}
                value={form.ward_id}
                onChange={(e) => update("ward_id", Number(e.target.value))}
              >
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Polling Station</label>

              <input
                style={inputStyle}
                placeholder="e.g. Westlands Primary"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Station Code</label>

              <input
                style={inputStyle}
                placeholder="e.g. PS001"
                value={form.station_code}
                onChange={(e) => update("station_code", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Registered Voters</label>

              <input
                type="number"
                style={inputStyle}
                value={form.registered_voters}
                onChange={(e) =>
                  update("registered_voters", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Target Votes</label>

              <input
                type="number"
                style={inputStyle}
                value={form.target_votes}
                onChange={(e) => update("target_votes", Number(e.target.value))}
              />
            </div>

            <div style={fieldStyle}>
              <label>Presiding Agent</label>

              <input
                style={inputStyle}
                value={form.presiding_agent}
                onChange={(e) => update("presiding_agent", e.target.value)}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Phone</label>

              <input
                style={inputStyle}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Notes</label>

              <input
                style={inputStyle}
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
              {saving ? "Saving..." : station ? "Update" : "Save"}
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
  zIndex: 999,
};

const modalStyle: React.CSSProperties = {
  width: 760,
  maxWidth: "95%",
  background: "#ffffff",
  borderRadius: 16,
  padding: 28,
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginTop: 18,
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle: React.CSSProperties = {
  marginTop: 6,
  padding: 10,
  border: "1px solid #d1d5db",
  borderRadius: 8,
};
