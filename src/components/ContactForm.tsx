import { useEffect, useState } from "react";
import type { Contact } from "../types/contact";
import type { Ward } from "../types/ward";
import type { PollingStation } from "../types/pollingStation";

import { getWards } from "../services/wardService";
import { getPollingStations } from "../services/pollingStationService";

type Props = {
  contact?: Contact | null;

  onSave: (
    contact: Omit<Contact, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;

  onCancel: () => void;
};

export default function ContactForm({ contact, onSave, onCancel }: Props) {
  const [saving, setSaving] = useState(false);

  const [wards, setWards] = useState<Ward[]>([]);
  const [stations, setStations] = useState<PollingStation[]>([]);

  const [form, setForm] = useState({
    county_id: null as number | null,
    constituency_id: null as number | null,
    ward_id: null as number | null,
    polling_station_id: null as number | null,

    full_name: "",
    phone: "",
    email: "",

    category: "Supporter",
    support_level: "Neutral",

    tags: "",

    last_contact: new Date().toISOString().substring(0, 10),

    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!contact) return;

    setForm({
      county_id: contact.county_id,
      constituency_id: contact.constituency_id,
      ward_id: contact.ward_id,
      polling_station_id: contact.polling_station_id,

      full_name: contact.full_name,
      phone: contact.phone,
      email: contact.email ?? "",

      category: contact.category,
      support_level: contact.support_level,

      tags: contact.tags ?? "",

      last_contact:
        contact.last_contact ?? new Date().toISOString().substring(0, 10),

      notes: contact.notes ?? "",
    });
  }, [contact]);

  async function loadData() {
    const wardData = await getWards();
    const stationData = await getPollingStations();

    setWards(wardData);
    setStations(stationData);
  }

  function update(field: keyof typeof form, value: string | number | null) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.full_name.trim()) {
      alert("Full name is required.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    try {
      setSaving(true);

      await onSave(form);

      onCancel();
    } catch (error) {
      console.error(error);

      alert("Unable to save contact.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>{contact ? "✏️ Edit Contact" : "👥 Add Contact"}</h2>

        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Ward</label>

              <select
                style={inputStyle}
                value={form.ward_id ?? ""}
                onChange={(e) =>
                  update(
                    "ward_id",
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <option value="">Select Ward</option>

                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Polling Station</label>

              <select
                style={inputStyle}
                value={form.polling_station_id ?? ""}
                onChange={(e) =>
                  update(
                    "polling_station_id",
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <option value="">Select Polling Station</option>

                {stations
                  .filter(
                    (station) =>
                      !form.ward_id || station.ward_id === form.ward_id,
                  )
                  .map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Full Name</label>

              <input
                style={inputStyle}
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Phone</label>

              <input
                style={inputStyle}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Email</label>

              <input
                type="email"
                style={inputStyle}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Category</label>

              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                <option value="Supporter">Supporter</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Donor">Donor</option>
                <option value="Party Official">Party Official</option>
                <option value="Influencer">Influencer</option>
                <option value="Business">Business</option>
                <option value="Media">Media</option>
                <option value="Religious Leader">Religious Leader</option>
                <option value="Youth Leader">Youth Leader</option>
              </select>
            </div>
          </div>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Support Level</label>

              <select
                style={inputStyle}
                value={form.support_level}
                onChange={(e) => update("support_level", e.target.value)}
              >
                <option value="Strong">Strong</option>
                <option value="Leaning">Leaning</option>
                <option value="Neutral">Neutral</option>
                <option value="Opposed">Opposed</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Last Contact</label>

              <input
                type="date"
                style={inputStyle}
                value={form.last_contact}
                onChange={(e) => update("last_contact", e.target.value)}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={fieldStyle}>
              <label>Tags</label>

              <input
                style={inputStyle}
                placeholder="Youth, Women, Business..."
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
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
              {saving
                ? "Saving..."
                : contact
                  ? "Update Contact"
                  : "Save Contact"}
            </button>
          </div>{" "}
        </form>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: 900,
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
