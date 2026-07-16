import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const supporterData = [
  { month: "Jan", supporters: 12000 },
  { month: "Feb", supporters: 15800 },
  { month: "Mar", supporters: 20100 },
  { month: "Apr", supporters: 26500 },
  { month: "May", supporters: 34400 },
  { month: "Jun", supporters: 42100 },
];

const countyData = [
  { county: "Machakos", support: 82 },
  { county: "Kitui", support: 74 },
  { county: "Makueni", support: 68 },
  { county: "Nairobi", support: 63 },
  { county: "Kiambu", support: 61 },
];

const offices = [
  "President",
  "Governor",
  "Senator",
  "Woman Representative",
  "Member of Parliament",
  "Member of County Assembly",
  "Party Headquarters",
];

type Props = {
  onNavigate: (page: string) => void;
};

export default function Analytics({
  onNavigate,
}: Props) {
  const [office, setOffice] = useState("Governor");
  const [contactsCount, setContactsCount] = useState(0);
const [volunteersCount, setVolunteersCount] = useState(0);
const [eventsCount, setEventsCount] = useState(0);
const [broadcastsCount, setBroadcastsCount] = useState(0);
useEffect(() => {
  loadDashboard();
}, []);

async function loadDashboard() {
  const { count: contacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  const { count: volunteers } = await supabase
    .from("volunteers")
    .select("*", { count: "exact", head: true });

  const { count: events } = await supabase
    .from("campaign_events")
    .select("*", { count: "exact", head: true });

  const { count: broadcasts } = await supabase
    .from("broadcasts")
    .select("*", { count: "exact", head: true });

  setContactsCount(contacts ?? 0);
  setVolunteersCount(volunteers ?? 0);
  setEventsCount(events ?? 0);
  setBroadcastsCount(broadcasts ?? 0);
}

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
          marginBottom: 30,
        }}
      >
        <div>

          <h1
            style={{
              margin: 0,
              fontSize: 34,
            }}
          >
            Campaign Command Centre
          </h1>

          <p
            style={{
              marginTop: 8,
              color: "#888",
            }}
          >
            National Campaign Intelligence Dashboard
          </p>

        </div>

        <div>

          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Office
          </label>

          <select
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            style={{
              padding: 10,
              minWidth: 240,
              borderRadius: 8,
            }}
          >
            {offices.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Location Filters */}

      <div
        className="panel"
        style={{
          marginBottom: 30,
        }}
      >

        <h2>Location</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 15,
            marginTop: 20,
          }}
        >

          <select>
            <option>All Counties</option>
          </select>

          <select>
            <option>All Constituencies</option>
          </select>

          <select>
            <option>All Wards</option>
          </select>

          <select>
            <option>All Polling Stations</option>
          </select>

        </div>

      </div>

      {/* KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >

        <div className="panel">
          <h2>74%</h2>
          <p>Support Index</p>
        </div>
<div
  className="panel"
   onClick={() => onNavigate("Contacts")}
  style={{
    cursor: "pointer",
    transition: "0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.18)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "";
  }}
>
  <h2>{contactsCount.toLocaleString()}</h2>
  <p>👥 Contacts</p>
</div>

        <div
  className="panel"
  onClick={() => onNavigate("Volunteer Centre")}
  style={{
    cursor: "pointer",
    transition: "0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.18)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "";
  }}
>
  <h2>{volunteersCount.toLocaleString()}</h2>
  <p>🙋 Volunteers</p>
</div>

        <div
  className="panel"
  onClick={() => onNavigate("Campaign Calendar")}
  style={{
    cursor: "pointer",
    transition: "0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.18)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "";
  }}
>
  <h2>{eventsCount.toLocaleString()}</h2>
  <p>📅 Events</p>
</div>

        <div
  className="panel"
  onClick={() => onNavigate("Broadcast Centre")}
  style={{
    cursor: "pointer",
    transition: "0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.18)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "";
  }}
>
  <h2>{broadcastsCount.toLocaleString()}</h2>
  <p>📢 Broadcasts</p>
</div>

        <div className="panel">
          <h2>KES 18.4M</h2>
          <p>Fundraising</p>
        </div>

        <div className="panel">
          <h2>91%</h2>
          <p>AI Confidence</p>
        </div>

        <div className="panel">
          <h2>Positive</h2>
          <p>Social Sentiment</p>
        </div>

      </div>

      {/* Charts */}

      <div
        className="dashboardGrid"
      >
        {/* Support Growth */}

        <div className="panel large">

          <div className="panelHeader">
            <h2>Support Growth</h2>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <LineChart data={supporterData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="supporters"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* County Performance */}

        <div className="panel">

          <div className="panelHeader">
            <h2>County Performance</h2>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={countyData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="county" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="support"
                fill="#16a34a"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}
