import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Volunteer = {
  id: number;
  full_name: string;
  id_number: string;
  phone: string;
  email: string;
  county: string;
  constituency: string;
  ward: string;
  role: string;
  status: string;
};

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [countyFilter, setCountyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");

  const [role, setRole] = useState("Volunteer");
  const [status, setStatus] = useState("Active");

  async function loadVolunteers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("full_name");

    if (error) {
      console.error(error);
    } else {
      setVolunteers(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadVolunteers();
  }, []);

  async function saveVolunteer() {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !county.trim() ||
      !constituency.trim() ||
      !ward.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const { error } = await supabase.from("volunteers").insert([
      {
        full_name: fullName,
        id_number: idNumber,
        phone,
        email,
        county,
        constituency,
        ward,
        role,
        status,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Volunteer registered successfully.");

    setShowModal(false);

    setFullName("");
    setIdNumber("");
    setPhone("");
    setEmail("");
    setCounty("");
    setConstituency("");
    setWard("");
    setRole("Volunteer");
    setStatus("Active");

    await loadVolunteers();
  }

  async function deleteVolunteer(id: number, name: string) {
    const confirmed = window.confirm(`Delete ${name}?`);

    if (!confirmed) return;

    const { error } = await supabase.from("volunteers").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadVolunteers();
  }

  const counties = [
    "All",
    ...new Set(volunteers.map((v) => v.county).filter(Boolean)),
  ];

  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      v.full_name.toLowerCase().includes(search.toLowerCase()) ||
      v.phone.toLowerCase().includes(search.toLowerCase()) ||
      v.ward.toLowerCase().includes(search.toLowerCase());

    const matchesCounty = countyFilter === "All" || v.county === countyFilter;

    const matchesStatus = statusFilter === "All" || v.status === statusFilter;

    return matchesSearch && matchesCounty && matchesStatus;
  });
  return (
    <div>
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <h1>👥 Volunteer Command Centre</h1>
          <p>Manage campaign volunteers across Kenya.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          + Register Volunteer
        </button>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div className="panel">
          <h2>{volunteers.length}</h2>
          <p>Total Volunteers</p>
        </div>

        <div className="panel">
          <h2>{volunteers.filter((v) => v.status === "Active").length}</h2>
          <p>Active Volunteers</p>
        </div>

        <div className="panel">
          <h2>{volunteers.filter((v) => v.role === "Team Leader").length}</h2>
          <p>Team Leaders</p>
        </div>

        <div className="panel">
          <h2>{counties.length - 1}</h2>
          <p>Counties Covered</p>
        </div>
      </div>

      {/* Filters */}

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 25,
        }}
      >
        <input
          placeholder="Search volunteer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 10,
            width: 260,
          }}
        />

        <select
          value={countyFilter}
          onChange={(e) => setCountyFilter(e.target.value)}
        >
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Volunteer Table */}

      <div className="panel">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Phone</th>
              <th align="left">County</th>
              <th align="left">Constituency</th>
              <th align="left">Ward</th>
              <th align="left">Role</th>
              <th align="left">Status</th>
              <th align="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>Loading volunteers...</td>
              </tr>
            ) : filteredVolunteers.length === 0 ? (
              <tr>
                <td colSpan={8}>No volunteers found.</td>
              </tr>
            ) : (
              filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td>{volunteer.full_name}</td>

                  <td>{volunteer.phone}</td>

                  <td>{volunteer.county}</td>

                  <td>{volunteer.constituency}</td>

                  <td>{volunteer.ward}</td>

                  <td>{volunteer.role}</td>

                  <td>{volunteer.status}</td>

                  <td align="center">
                    <button
                      style={{
                        background: "#f59e0b",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        marginRight: 8,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        alert("Edit volunteer will be added in Phase 4.")
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        deleteVolunteer(volunteer.id, volunteer.full_name)
                      }
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Register Volunteer Modal */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: 520,
              maxWidth: "95%",
              padding: 30,
              borderRadius: 12,
              boxShadow: "0 20px 50px rgba(0,0,0,.35)",
            }}
          >
            <h2>Register Volunteer</h2>

            <div
              style={{
                display: "grid",
                gap: 12,
                marginTop: 20,
              }}
            >
              <input
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />

              <input
                placeholder="Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="County *"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
              />

              <input
                placeholder="Constituency *"
                value={constituency}
                onChange={(e) => setConstituency(e.target.value)}
              />

              <input
                placeholder="Ward *"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />

              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Volunteer</option>
                <option>Team Leader</option>
                <option>Coordinator</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 25,
              }}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setFullName("");
                  setIdNumber("");
                  setPhone("");
                  setEmail("");
                  setCounty("");
                  setConstituency("");
                  setWard("");
                  setRole("Volunteer");
                  setStatus("Active");
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveVolunteer}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Save Volunteer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
