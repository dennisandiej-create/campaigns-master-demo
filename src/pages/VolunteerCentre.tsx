import { useEffect, useState } from "react";
import { getVolunteers, addVolunteer } from "../lib/dashboard";
import VolunteerForm from "../components/VolunteerForm";
import type { Volunteer } from "../types/volunteer";
import "../styles/dashboard.css";

export default function VolunteerCentre() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadVolunteers();
  }, []);

  async function loadVolunteers() {
    try {
      setLoading(true);

      const data = await getVolunteers();

      setVolunteers(data as Volunteer[]);
    } catch (err) {
      console.error(err);
      alert("Failed to load volunteers.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    volunteer: Omit<Volunteer, "id" | "created_at" | "updated_at">,
  ) {
    try {
      await addVolunteer(volunteer);

      setShowForm(false);

      await loadVolunteers();
    } catch (err) {
      console.error(err);
      alert("Unable to save volunteer.");
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1>🤝 Volunteer Centre</h1>
          <p>{volunteers.length} Volunteers</p>
        </div>

        <button className="primaryButton" onClick={() => setShowForm(true)}>
          + Add Volunteer
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div className="statCard">
          <h3>{volunteers.length}</h3>
          <span>Total Volunteers</span>
        </div>

        <div className="statCard">
          <h3>{volunteers.filter((v) => v.status === "Active").length}</h3>
          <span>Active</span>
        </div>

        <div className="statCard">
          <h3>{volunteers.filter((v) => v.role === "Coordinator").length}</h3>
          <span>Coordinators</span>
        </div>
      </div>

      <table className="dataTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Loading volunteers...</td>
            </tr>
          ) : volunteers.length === 0 ? (
            <tr>
              <td colSpan={4}>No volunteers found.</td>
            </tr>
          ) : (
            volunteers.map((v) => (
              <tr key={v.id}>
                <td>{v.full_name}</td>
                <td>{v.phone}</td>
                <td>{v.role}</td>
                <td>{v.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <VolunteerForm
          volunteer={null}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
