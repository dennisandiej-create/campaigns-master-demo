import { useEffect, useState } from "react";
import type { Ward } from "../types/ward";

type Props = {
  ward?: Ward | null;
  onSave: (
    ward: Omit<Ward, "id" | "created_at" | "updated_at">,
    id?: number,
  ) => Promise<void>;
  onCancel: () => void;
};

export default function WardForm({ ward, onSave, onCancel }: Props) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    constituency_id: 1,
    name: "",
    ward_code: "",
    registered_voters: 0,
    target_votes: 0,
    coordinator: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (ward) {
      setForm({
        constituency_id: ward.constituency_id,
        name: ward.name,
        ward_code: ward.ward_code ?? "",
        registered_voters: ward.registered_voters,
        target_votes: ward.target_votes,
        coordinator: ward.coordinator ?? "",
        phone: ward.phone ?? "",
        notes: ward.notes ?? "",
      });
    }
  }, [ward]);

  function update(field: keyof typeof form, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Ward name is required.");
      return;
    }

    try {
      setSaving(true);

      await onSave(form, ward?.id);

      onCancel();
    } catch (error) {
      console.error(error);
      alert("Unable to save ward.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: 720,
          maxWidth: "95%",
          background: "#fff",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 20px 40px rgba(0,0,0,.25)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          {ward ? "✏️ Edit Ward" : "📍 Add Ward"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Ward Name</label>

              <input
                style={inputStyle}
                placeholder="e.g. Westlands"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Ward Code</label>

              <input
                style={inputStyle}
                placeholder="e.g. W001"
                value={form.ward_code}
                onChange={(e) => update("ward_code", e.target.value)}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Registered Voters</label>

              <input
                type="number"
                style={inputStyle}
                placeholder="e.g. 25000"
                value={form.registered_voters}
                onChange={(e) =>
                  update("registered_voters", Number(e.target.value))
                }
              />
            </div>

            <div style={fieldStyle}>
              <label>Target Votes</label>

              <input
                type="number"
                style={inputStyle}
                placeholder="e.g. 18000"
                value={form.target_votes}
                onChange={(e) => update("target_votes", Number(e.target.value))}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Coordinator</label>

              <input
                style={inputStyle}
                placeholder="e.g. John Mwangi"
                value={form.coordinator}
                onChange={(e) => update("coordinator", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Phone</label>

              <input
                style={inputStyle}
                placeholder="e.g. 0712345678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <label>Notes</label>

            <textarea
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
              placeholder="Additional information about the ward..."
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
              {saving ? "Saving..." : ward ? "Update Ward" : "Save Ward"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginTop: 16,
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle: React.CSSProperties = {
  marginTop: 6,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #D1D5DB",
  fontSize: 15,
};
