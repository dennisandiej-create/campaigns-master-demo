import { useState } from "react";
import { addContact } from "../lib/dashboard";

type Props = {
  onClose: () => void;
  onSaved: () => void;
};

export default function ContactForm({
  onClose,
  onSaved,
}: Props) {

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    county: "",
    constituency: "",
    ward: "",
    polling_station: "",
    supporter: false,
  });

  function update(
    field: string,
    value: string | boolean
  ) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  async function saveContact() {

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

      await addContact(form);

      alert("Contact added successfully.");

      onSaved();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Failed to save contact.");

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
        zIndex: 9999,
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

        <h2 style={{ marginBottom: 25 }}>
          Add Contact
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 15,
          }}
        >

          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e)=>
              update("full_name", e.target.value)
            }
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e)=>
              update("phone", e.target.value)
            }
          />

          <input
            placeholder="County"
            value={form.county}
            onChange={(e)=>
              update("county", e.target.value)
            }
          />

          <input
            placeholder="Constituency"
            value={form.constituency}
            onChange={(e)=>
              update("constituency", e.target.value)
            }
          />

          <input
            placeholder="Ward"
            value={form.ward}
            onChange={(e)=>
              update("ward", e.target.value)
            }
          />

          <input
            placeholder="Polling Station"
            value={form.polling_station}
            onChange={(e)=>
              update("polling_station", e.target.value)
            }
          />

        </div>

        <div
          style={{
            marginTop: 20,
          }}
        >

          <label>

            <input
              type="checkbox"
              checked={form.supporter}
              onChange={(e)=>
                update("supporter", e.target.checked)
              }
            />

            {" "}Supporter

          </label>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 30,
          }}
        >

          <button
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="primaryButton"
            disabled={saving}
            onClick={saveContact}
          >
            {saving ? "Saving..." : "Save Contact"}
          </button>

        </div>

      </div>

    </div>

  );

}