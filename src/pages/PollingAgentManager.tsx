import { useEffect, useMemo, useState } from "react";

import type { PollingAgent } from "../types/pollingAgent";

import {
  getPollingAgents,
  addPollingAgent,
  updatePollingAgent,
  deletePollingAgent,
} from "../services/pollingAgentService";

import PollingAgentForm from "../components/PollingAgentForm";

export default function PollingAgentManager() {
  const [agents, setAgents] = useState<PollingAgent[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingAgent, setEditingAgent] = useState<PollingAgent | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    try {
      setLoading(true);

      const data = await getPollingAgents();

      setAgents(data);
    } catch (error) {
      console.error(error);

      alert("Unable to load polling agents.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    agent: Omit<PollingAgent, "id" | "created_at" | "updated_at">,
  ) {
    try {
      if (editingAgent) {
        await updatePollingAgent(editingAgent.id, agent);
      } else {
        await addPollingAgent(agent);
      }

      setShowForm(false);

      setEditingAgent(null);

      await loadAgents();
    } catch (error) {
      console.error(error);

      alert("Unable to save polling agent.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this polling agent?")) {
      return;
    }

    try {
      await deletePollingAgent(id);

      await loadAgents();
    } catch (error) {
      console.error(error);

      alert("Unable to delete polling agent.");
    }
  }

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const searchText = search.toLowerCase();

      return (
        agent.full_name.toLowerCase().includes(searchText) ||
        agent.phone.toLowerCase().includes(searchText) ||
        agent.role.toLowerCase().includes(searchText) ||
        agent.status.toLowerCase().includes(searchText)
      );
    });
  }, [agents, search]);

  const checkedIn = agents.filter((a) => a.status === "Checked In").length;

  const assigned = agents.filter((a) => a.status === "Assigned").length;

  const absent = agents.filter((a) => a.status === "Absent").length;

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>🗳️ Polling Agent Manager</h1>

        <button
          onClick={() => {
            setEditingAgent(null);
            setShowForm(true);
          }}
        >
          + Add Polling Agent
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <StatCard title="Total Agents" value={agents.length} color="#2563eb" />

        <StatCard title="Assigned" value={assigned} color="#f59e0b" />

        <StatCard title="Checked In" value={checkedIn} color="#16a34a" />

        <StatCard title="Absent" value={absent} color="#dc2626" />
      </div>

      <input
        type="text"
        placeholder="Search by name, phone, role or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: 350,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          marginBottom: 20,
        }}
      />

      {showForm && (
        <PollingAgentForm
          agent={editingAgent}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingAgent(null);
          }}
        />
      )}

      {loading ? (
        <p>Loading polling agents...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#ffffff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          }}
        >
          <thead
            style={{
              background: "#1f2937",
              color: "#ffffff",
            }}
          >
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAgents.map((agent) => (
              <tr
                key={agent.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={tdStyle}>{agent.full_name}</td>

                <td style={tdStyle}>{agent.phone}</td>

                <td style={tdStyle}>{agent.role}</td>

                <td style={tdStyle}>{agent.status}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => {
                      setEditingAgent(agent);
                      setShowForm(true);
                    }}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button onClick={() => handleDelete(agent.id)}>
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

type CardProps = {
  title: string;
  value: number;
  color: string;
};

function StatCard({ title, value, color }: CardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 14,
        padding: 20,
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        borderLeft: `6px solid ${color}`,
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#111827",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
};
