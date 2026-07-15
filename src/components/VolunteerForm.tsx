import { useState } from "react";
import { addVolunteer } from "../lib/dashboard";

type Props = {
  onClose: () => void;
  onSaved: () => void;
};

export default function VolunteerForm({
  onClose,
  onSaved,
}: Props) {

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    ward: "",
    role: "",
    status: "Active",
  });

  function update(field: string, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  async function saveVolunteer() {

    if (!form.full_name.trim()) {
      alert("Volunteer name required");
      return;
    }

    try {

      setSaving(true);

      await addVolunteer(form);

      alert("Volunteer added successfully");

      onSaved();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Unable to save volunteer");

    } finally {

      setSaving(false);

    }

  }

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >

      <div
        className="panel"
        style={{
          width: 650,
          maxWidth: "95%",
          padding: 30,
        }}
      >

        <h2>Add Volunteer</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 15,
            marginTop: 20,
          }}
        >

          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e)=>update("full_name",e.target.value)}
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e)=>update("phone",e.target.value)}
          />

          <input
            placeholder="Ward"
            value={form.ward}
            onChange={(e)=>update("ward",e.target.value)}
          />

          <input
            placeholder="Role"
            value={form.role}
            onChange={(e)=>update("role",e.target.value)}
          />

          <select
            value={form.status}
            onChange={(e)=>update("status",e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        <div
          style={{
            display:"flex",
            justifyContent:"flex-end",
            gap:10,
            marginTop:30,
          }}
        >

          <button onClick={onClose}>
            Cancel
          </button>

          <button
            className="primaryButton"
            disabled={saving}
            onClick={saveVolunteer}
          >
            {saving ? "Saving..." : "Save Volunteer"}
          </button>

        </div>

      </div>

    </div>

  );

}