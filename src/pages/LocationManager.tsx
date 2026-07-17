import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type County = {
  id: number;
  name: string;
};

export default function LocationManager() {
  const [counties, setCounties] = useState<County[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [countyName, setCountyName] = useState("");
  const [editingCounty, setEditingCounty] = useState<County | null>(null);

  const [search, setSearch] = useState("");

  const [constituenciesCount, setConstituenciesCount] = useState(0);
  const [wardsCount, setWardsCount] = useState(0);

  async function loadCounties() {
    setLoading(true);

    const { data, error } = await supabase
      .from("counties")
      .select("*")
      .order("name");

    if (error) {
      console.error(error);
    } else {
      setCounties(data || []);
    }

    setLoading(false);
  }

  async function loadStatistics() {
    const { count: constituencyCount } = await supabase
      .from("constituencies")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: wardCount } = await supabase.from("wards").select("*", {
      count: "exact",
      head: true,
    });

    setConstituenciesCount(constituencyCount ?? 0);
    setWardsCount(wardCount ?? 0);
  }

  async function saveCounty() {
    if (!countyName.trim()) {
      alert("Please enter a county name.");
      return;
    }

    let error;

    if (editingCounty) {
      ({ error } = await supabase
        .from("counties")
        .update({
          name: countyName.trim(),
        })
        .eq("id", editingCounty.id));
    } else {
      ({ error } = await supabase.from("counties").insert({
        name: countyName.trim(),
      }));
    }

    if (error) {
      alert(error.message);
      return;
    }

    setCountyName("");
    setEditingCounty(null);
    setShowModal(false);

    await loadCounties();
    await loadStatistics();
  }

  async function deleteCounty(id: number, name: string) {
    const confirmed = window.confirm(`Delete ${name}?`);

    if (!confirmed) return;

    const { error } = await supabase.from("counties").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadCounties();
    await loadStatistics();
  }

  useEffect(() => {
    loadCounties();
    loadStatistics();
  }, []);

  const filtered = counties.filter((county) =>
    county.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page">
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 25,
        }}
      >
        <div>
          <h1>📍 Location Manager</h1>
          <p>Manage Counties, Constituencies and Wards</p>
        </div>

        <button
          onClick={() => {
            setEditingCounty(null);
            setCountyName("");
            setShowModal(true);
          }}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          + Add County
        </button>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          marginBottom: 25,
        }}
      >
        <div className="panel">
          <h2>{counties.length}</h2>
          <p>Counties</p>
        </div>

        <div className="panel">
          <h2>{constituenciesCount}</h2>
          <p>Constituencies</p>
        </div>

        <div className="panel">
          <h2>{wardsCount}</h2>
          <p>Wards</p>
        </div>
      </div>

      {/* Search */}

      <input
        placeholder="Search county..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: 320,
          padding: 10,
          marginBottom: 20,
          borderRadius: 6,
        }}
      />

      {/* Table */}

      <div className="panel">
        <h2>County Directory</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th align="left">County</th>
              <th align="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2}>Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={2}>No counties found.</td>
              </tr>
            ) : (
              filtered.map((county) => (
                <tr key={county.id}>
                  <td>{county.name}</td>

                  <td align="center">
                    <button
                      onClick={() => {
                        setEditingCounty(county);
                        setCountyName(county.name);
                        setShowModal(true);
                      }}
                      style={{
                        background: "#f59e0b",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        marginRight: 8,
                        cursor: "pointer",
                      }}
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() => deleteCounty(county.id, county.name)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
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
      {/* Modal */}

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
              background: "#ffffff",
              width: 420,
              padding: 30,
              borderRadius: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,.35)",
            }}
          >
            <h2>{editingCounty ? "Edit County" : "Add County"}</h2>

            <input
              value={countyName}
              onChange={(e) => setCountyName(e.target.value)}
              placeholder="County name"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 20,
                marginBottom: 25,
                borderRadius: 6,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setCountyName("");
                  setEditingCounty(null);
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveCounty}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {editingCounty ? "Update County" : "Save County"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
