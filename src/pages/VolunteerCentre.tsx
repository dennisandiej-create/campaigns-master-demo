import { useEffect, useState } from "react";
import {
  getVolunteers,
} from "../lib/dashboard";
import VolunteerForm from "../components/VolunteerForm";
import "../styles/dashboard.css";

type Volunteer = {
  id: number;
  full_name: string;
  phone: string;
  ward: string;
  role: string;
  status: string;
};

export default function VolunteerCentre() {

  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadVolunteers();
  }, []);

  async function loadVolunteers() {

    try {

      const data = await getVolunteers();

      setVolunteers(data as Volunteer[]);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="page">

      <div className="pageHeader">

        <div>

          <h1>🤝 Volunteer Centre</h1>

          <p>{volunteers.length} Volunteers</p>

        </div>

        <button
          className="primaryButton"
          onClick={() => setShowForm(true)}
        >
          Add Volunteer
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
          <h3>
            {
              volunteers.filter(
                v => v.status === "Active"
              ).length
            }
          </h3>
          <span>Active</span>
        </div>

        <div className="statCard">
          <h3>
            {
              volunteers.filter(
                v => v.role === "Coordinator"
              ).length
            }
          </h3>
          <span>Coordinators</span>
        </div>

      </div>

      <table className="dataTable">

        <thead>

          <tr>

            <th>Name</th>
            <th>Phone</th>
            <th>Ward</th>
            <th>Role</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td colSpan={5}>
                Loading volunteers...
              </td>

            </tr>

          ) : volunteers.length === 0 ? (

            <tr>

              <td colSpan={5}>
                No volunteers found.
              </td>

            </tr>

          ) : (

            volunteers.map((v) => (

              <tr key={v.id}>

                <td>{v.full_name}</td>

                <td>{v.phone}</td>

                <td>{v.ward}</td>

                <td>{v.role}</td>

                <td>{v.status}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {showForm && (

        <VolunteerForm
          onClose={() => setShowForm(false)}
          onSaved={loadVolunteers}
        />

      )}

    </div>

  );

}