import { useEffect, useMemo, useState } from "react";
import {
  getWards,
  addWard,
  updateWard,
  deleteWard,
} from "../services/wardService";
import type { Ward } from "../types/ward";
import WardForm from "../components/WardForm";

export default function WardManager() {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingWard, setEditingWard] = useState<Ward | null>(null);

  useEffect(() => {
    loadWards();
  }, []);

  async function loadWards() {
    try {
      setLoading(true);
      setWards(await getWards());
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    ward: Omit<Ward, "id" | "created_at" | "updated_at">,
    id?: number,
  ) {
    if (id) {
      await updateWard(id, ward);
    } else {
      await addWard(ward);
    }
    setEditingWard(null);
    setShowForm(false);
    await loadWards();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this ward?")) return;
    await deleteWard(id);
    await loadWards();
  }

  const filtered = useMemo(
    () =>
      wards.filter(
        (w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          (w.coordinator ?? "").toLowerCase().includes(search.toLowerCase()),
      ),
    [wards, search],
  );

  const totalVoters = wards.reduce((a, b) => a + b.registered_voters, 0);

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>📍 Ward Manager</h1>
        <button
          onClick={() => {
            setEditingWard(null);
            setShowForm(true);
          }}
        >
          + Add Ward
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, margin: "20px 0" }}>
        <div>
          <strong>Total Wards</strong>
          <div>{wards.length}</div>
        </div>
        <div>
          <strong>Registered Voters</strong>
          <div>{totalVoters}</div>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        style={{ padding: 10, width: 320, marginBottom: 20 }}
      />

      {showForm && (
        <WardForm
          ward={editingWard}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingWard(null);
          }}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          }}
        >
          <thead
            style={{
              background: "#1f2937",
              color: "#fff",
            }}
          >
            <tr>
              <th style={thStyle}>Ward</th>
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Registered Voters</th>
              <th style={thStyle}>Target Votes</th>
              <th style={thStyle}>Coordinator</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((ward) => (
              <tr
                key={ward.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={tdStyle}>{ward.name}</td>

                <td style={tdStyle}>{ward.ward_code || "-"}</td>

                <td style={tdStyle}>
                  {ward.registered_voters.toLocaleString()}
                </td>

                <td style={tdStyle}>{ward.target_votes.toLocaleString()}</td>

                <td style={tdStyle}>{ward.coordinator || "-"}</td>

                <td style={tdStyle}>{ward.phone || "-"}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => {
                      setEditingWard(ward);
                      setShowForm(true);
                    }}
                    style={{
                      marginRight: 8,
                      padding: "6px 10px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(ward.id)}
                    style={{
                      padding: "6px 10px",
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
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

const thStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left" as const,
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left" as const,
};
