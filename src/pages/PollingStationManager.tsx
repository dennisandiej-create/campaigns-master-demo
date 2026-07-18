import { useEffect, useMemo, useState } from "react";
import {
  getPollingStations,
  addPollingStation,
  updatePollingStation,
  deletePollingStation,
} from "../services/pollingStationService";

import type { PollingStation } from "../types/pollingStation";
import PollingStationForm from "../components/PollingStationForm";

export default function PollingStationManager() {
  const [stations, setStations] = useState<PollingStation[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingStation, setEditingStation] = useState<PollingStation | null>(
    null,
  );

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    try {
      setLoading(true);

      const data = await getPollingStations();

      setStations(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    station: Omit<PollingStation, "id" | "created_at" | "updated_at">,
  ) {
    if (editingStation) {
      await updatePollingStation(editingStation.id, station);
    } else {
      await addPollingStation(station);
    }

    setEditingStation(null);

    setShowForm(false);

    loadStations();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this polling station?")) return;

    await deletePollingStation(id);

    loadStations();
  }

  const filtered = useMemo(() => {
    return stations.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.presiding_agent ?? "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [stations, search]);

  const totalStations = stations.length;

  const totalVoters = stations.reduce((sum, s) => sum + s.registered_voters, 0);

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
        <h1>🗳 Polling Station Manager</h1>

        <button
          onClick={() => {
            setEditingStation(null);
            setShowForm(true);
          }}
        >
          + Add Polling Station
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
          <strong>Total Stations</strong>

          <div>{totalStations}</div>
        </div>

        <div>
          <strong>Registered Voters</strong>

          <div>{totalVoters.toLocaleString()}</div>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search polling station..."
        style={{
          padding: 10,
          width: 320,
          marginBottom: 20,
        }}
      />

      {showForm && (
        <PollingStationForm
          station={editingStation}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingStation(null);
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
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Registered</th>
              <th>Target</th>
              <th>Agent</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((station) => (
              <tr key={station.id}>
                <td>{station.name}</td>

                <td>{station.station_code ?? "-"}</td>

                <td>{station.registered_voters}</td>

                <td>{station.target_votes}</td>

                <td>{station.presiding_agent ?? "-"}</td>

                <td>{station.phone ?? "-"}</td>

                <td>
                  <button
                    onClick={() => {
                      setEditingStation(station);
                      setShowForm(true);
                    }}
                  >
                    ✏️
                  </button>

                  <button onClick={() => handleDelete(station.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
