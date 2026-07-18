import { useEffect, useState } from "react";

import { getWards } from "../services/wardService";
import { getPollingStations } from "../services/pollingStationService";
import { getVolunteers } from "../services/volunteerService";
import { getContacts } from "../services/contactService";

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);

  const [totalWards, setTotalWards] = useState(0);
  const [totalStations, setTotalStations] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  const [registeredVoters, setRegisteredVoters] = useState(0);
  const [targetVotes, setTargetVotes] = useState(0);

  const [strongSupporters, setStrongSupporters] = useState(0);
  const [leaningSupporters, setLeaningSupporters] = useState(0);
  const [neutralSupporters, setNeutralSupporters] = useState(0);
  const [opposedSupporters, setOpposedSupporters] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const wards = await getWards();
      const stations = await getPollingStations();
      const volunteers = await getVolunteers();
      const contacts = await getContacts();

      setTotalWards(wards.length);
      setTotalStations(stations.length);
      setTotalVolunteers(volunteers.length);
      setTotalContacts(contacts.length);

      setRegisteredVoters(
        wards.reduce((sum, ward) => sum + ward.registered_voters, 0),
      );

      setTargetVotes(wards.reduce((sum, ward) => sum + ward.target_votes, 0));

      setStrongSupporters(
        contacts.filter((c) => c.support_level === "Strong").length,
      );

      setLeaningSupporters(
        contacts.filter((c) => c.support_level === "Leaning").length,
      );

      setNeutralSupporters(
        contacts.filter((c) => c.support_level === "Neutral").length,
      );

      setOpposedSupporters(
        contacts.filter((c) => c.support_level === "Opposed").length,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>📊 Campaign Analytics Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <StatCard
          title="🏛 Total Wards"
          value={totalWards.toString()}
          color="#2563eb"
        />

        <StatCard
          title="🗳 Polling Stations"
          value={totalStations.toString()}
          color="#7c3aed"
        />

        <StatCard
          title="👥 Volunteers"
          value={totalVolunteers.toString()}
          color="#059669"
        />

        <StatCard
          title="📇 Contacts"
          value={totalContacts.toString()}
          color="#ea580c"
        />

        <StatCard
          title="🧮 Registered Voters"
          value={registeredVoters.toLocaleString()}
          color="#0891b2"
        />

        <StatCard
          title="🎯 Target Votes"
          value={targetVotes.toLocaleString()}
          color="#dc2626"
        />
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: 14,
          padding: 24,
          boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Support Level Breakdown</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Support Level</th>
              <th style={thStyle}>Contacts</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={tdStyle}>💚 Strong</td>
              <td style={tdStyle}>{strongSupporters}</td>
            </tr>

            <tr>
              <td style={tdStyle}>💙 Leaning</td>
              <td style={tdStyle}>{leaningSupporters}</td>
            </tr>

            <tr>
              <td style={tdStyle}>💛 Neutral</td>
              <td style={tdStyle}>{neutralSupporters}</td>
            </tr>

            <tr>
              <td style={tdStyle}>❤️ Opposed</td>
              <td style={tdStyle}>{opposedSupporters}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
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
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 32,
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
  textAlign: "left",
  padding: "12px",
  background: "#1f2937",
  color: "#ffffff",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  color: "#111827",
};
