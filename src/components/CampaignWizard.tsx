import { useEffect, useState } from "react";
import { getOffices, createCampaign } from "../services/campaignService";

import type { Office } from "../types/office";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};

export default function CampaignWizard({ open, onClose, onSaved }: Props) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [offices, setOffices] = useState<Office[]>([]);

  const [form, setForm] = useState({
    office_id: "",
    campaign_name: "",
    candidate_name: "",
    county_id: "",
    constituency_id: "",
    ward_id: "",
    admin_name: "",
    national_id: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadOffices();
  }, []);

  async function loadOffices() {
    const data = await getOffices();
    setOffices(data);
  }

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleCreateCampaign() {
    try {
      setSaving(true);

      if (!form.office_id) {
        alert("Select an office.");
        return;
      }

      if (!form.campaign_name.trim()) {
        alert("Campaign name is required.");
        return;
      }

      if (!form.candidate_name.trim()) {
        alert("Candidate name is required.");
        return;
      }

      await createCampaign({
        office_id: Number(form.office_id),
        campaign_name: form.campaign_name,
        candidate_name: form.candidate_name,
        county_id: form.county_id ? Number(form.county_id) : null,
        constituency_id: form.constituency_id
          ? Number(form.constituency_id)
          : null,
        ward_id: form.ward_id ? Number(form.ward_id) : null,
      });

      alert("Campaign created successfully.");

      onSaved?.();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to create campaign.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Create Campaign</h2>

        <p>Step {step} of 4</p>

        {step === 1 && (
          <>
            <div style={fieldStyle}>
              <label>Office</label>

              <select
                style={inputStyle}
                value={form.office_id}
                onChange={(e) => update("office_id", e.target.value)}
              >
                <option value="">Select Office</option>

                {offices.map((office) => (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label>Campaign Name</label>

              <input
                style={inputStyle}
                value={form.campaign_name}
                onChange={(e) => update("campaign_name", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label>Candidate Name</label>

              <input
                style={inputStyle}
                value={form.candidate_name}
                onChange={(e) => update("candidate_name", e.target.value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={fieldStyle}>
              <label>County</label>

              <input
                style={inputStyle}
                value={form.county_id}
                onChange={(e) => update("county_id", e.target.value)}
              />
            </div>

            {(form.office_id === "5" || form.office_id === "6") && (
              <div style={fieldStyle}>
                <label>Constituency</label>

                <input
                  style={inputStyle}
                  value={form.constituency_id}
                  onChange={(e) => update("constituency_id", e.target.value)}
                />
              </div>
            )}

            {form.office_id === "6" && (
              <div style={fieldStyle}>
                <label>Ward</label>

                <input
                  style={inputStyle}
                  value={form.ward_id}
                  onChange={(e) => update("ward_id", e.target.value)}
                />
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <div style={fieldStyle}>
              <label>Campaign Administrator</label>

              <input
                style={inputStyle}
                value={form.admin_name}
                onChange={(e) => update("admin_name", e.target.value)}
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

            <div style={fieldStyle}>
              <label>Phone</label>

              <input
                style={inputStyle}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

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
              <label>Password</label>

              <input
                type="password"
                style={inputStyle}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3>Review</h3>

            <p>
              <strong>Campaign:</strong> {form.campaign_name}
            </p>
            <p>
              <strong>Candidate:</strong> {form.candidate_name}
            </p>
            <p>
              <strong>Administrator:</strong> {form.admin_name}
            </p>
            <p>
              <strong>Phone:</strong> {form.phone}
            </p>

            <button
              style={{
                marginTop: 20,
                width: "100%",
                padding: 14,
              }}
              disabled={saving}
              onClick={handleCreateCampaign}
            >
              {saving ? "Creating..." : "Create Campaign"}
            </button>
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
          >
            Previous
          </button>

          <button
            type="button"
            disabled={step === 4}
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        </div>
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
  zIndex: 2000,
};

const modalStyle: React.CSSProperties = {
  width: 700,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 16,
  padding: 30,
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
};

const inputStyle: React.CSSProperties = {
  marginTop: 8,
  padding: 12,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 15,
};
