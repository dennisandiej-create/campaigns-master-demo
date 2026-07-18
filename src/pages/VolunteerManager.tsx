import { useEffect, useMemo, useState } from "react";
import {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
} from "../services/volunteerService";

import type { Volunteer } from "../types/volunteer";
import VolunteerForm from "../components/VolunteerForm";

export default function VolunteerManager() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(
    null,
  );

  useEffect(() => {
    loadVolunteers();
  }, []);

  async function loadVolunteers() {
    try {
      setLoading(true);
      const data = await getVolunteers();
      setVolunteers(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    volunteer: Omit<Volunteer, "id" | "created_at" | "updated_at">,
  ) {
    if (editingVolunteer) {
      await updateVolunteer(editingVolunteer.id, volunteer);
    } else {
      await addVolunteer(volunteer);
    }

    setEditingVolunteer(null);
    setShowForm(false);

    await loadVolunteers();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this volunteer?")) return;

    await deleteVolunteer(id);

    await loadVolunteers();
  }

  const filtered = useMemo(() => {
    return volunteers.filter((v) => {
      const q = search.toLowerCase();

      return (
        v.full_name.toLowerCase().includes(q) ||
        v.phone.toLowerCase().includes(q) ||
        (v.role ?? "").toLowerCase().includes(q)
      );
    });
  }, [volunteers, search]);

  const activeCount = volunteers.filter((v) => v.status === "Active").length;

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>👥 Volunteer Manager</h1>

        <button
          onClick={() => {
            setEditingVolunteer(null);
            setShowForm(true);
          }}
        >
          + Add Volunteer
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div>
          <strong>Total Volunteers</strong>
          <div>{volunteers.length}</div>
        </div>

        <div>
          <strong>Active Volunteers</strong>
          <div>{activeCount}</div>
        </div>
      </div>

      <input
        placeholder="Search volunteer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: 320,
          padding: 10,
          marginBottom: 20,
        }}
      />

      {showForm && (
        <VolunteerForm
          volunteer={editingVolunteer}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingVolunteer(null);
          }}
        />
      )}

      {loading ? (
        <p>Loading volunteers...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              background: "#1f2937",
              color: "#fff",
            }}
          >
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date Joined</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((volunteer) => (
              <tr
                key={volunteer.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={tdStyle}>{volunteer.full_name}</td>

                <td style={tdStyle}>{volunteer.phone}</td>

                <td style={tdStyle}>{volunteer.role}</td>

                <td style={tdStyle}>{volunteer.status}</td>

                <td style={tdStyle}>{volunteer.date_joined}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => {
                      setEditingVolunteer(volunteer);
                      setShowForm(true);
                    }}
                    style={editButton}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(volunteer.id)}
                    style={deleteButton}
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
  padding: 14,
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  padding: 14,
};

const editButton: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  marginRight: 8,
  cursor: "pointer",
};

const deleteButton: React.CSSProperties = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  cursor: "pointer",
};
