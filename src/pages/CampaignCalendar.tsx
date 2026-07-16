import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  county: string;
  event_date: string;
  event_time: string;
  status: string;
};

export default function CampaignCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [countyFilter, setCountyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
const [title, setTitle] = useState("");
const [county, setCounty] = useState("");
const [location, setLocation] = useState("");
const [eventDate, setEventDate] = useState("");
const [eventTime, setEventTime] = useState("");
const [status, setStatus] = useState("Planned");
const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
  .from("campaign_events")
  .select("*")
  .order("event_date", { ascending: true });
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const counties = [
    "All",
    ...new Set(events.map((e) => e.county)),
  ];

  const filteredEvents = events.filter((event) => {
    const term = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(term) ||
      event.county.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term);

    const matchesCounty =
      countyFilter === "All" ||
      event.county === countyFilter;

    const matchesStatus =
      statusFilter === "All" ||
      event.status === statusFilter;

    return (
      matchesSearch &&
      matchesCounty &&
      matchesStatus
    );
  });

  async function saveEvent() {
  if (!title || !county || !location || !eventDate) {
    alert("Please fill all required fields.");
    return;
  }

  const { error } = await supabase
    .from("campaign_events")
    .insert([
      {
        title,
        description,
        county,
        location,
        event_date: eventDate,
        event_time: eventTime,
        status,
      },
    ]);

  if (error) {
  console.error("Supabase Error:", error);

  alert(
    "Error:\n\n" +
    JSON.stringify(error, null, 2)
  );

  return;
}
alert("Event saved successfully!");

  await loadEvents();

setShowModal(false);

setTitle("");
setDescription("");
setCounty("");
setLocation("");
setEventDate("");
setEventTime("");
setStatus("Planned");
}

  return (
    <div>

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          marginBottom: 25,
          flexWrap: "wrap",
        }}
      >
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

  <h1>📅 Campaign Calendar</h1>

  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
    }}
  >

    <input
      type="text"
      placeholder="Search events..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: 10,
        width: 220,
      }}
    />

    <select
      value={countyFilter}
      onChange={(e) =>
        setCountyFilter(e.target.value)
      }
      style={{
        padding: 10,
      }}
    >
      {counties.map((county) => (
        <option
          key={county}
          value={county}
        >
          {county}
        </option>
      ))}
    </select>

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      style={{
        padding: 10,
      }}
    >
      <option>All</option>
      <option>Scheduled</option>
      <option>Active</option>
      <option>Planned</option>
      <option>Completed</option>
      <option>Cancelled</option>
    </select>

    <button
  onClick={() => setShowModal(true)}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: 6,
    cursor: "pointer",
  }}
>
  + New Event
</button>
  </div>

        </div>
      </div>

      {/* Events Table */}

      <div className="panel">

        <h2 style={{ marginBottom: 20 }}>
          Campaign Activities
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Date</th>
              <th align="left">Time</th>
              <th align="left">Event</th>
              <th align="left">County</th>
              <th align="left">Location</th>
              <th align="left">Status</th>
              <th align="center">Actions</th>
            </tr>
          </thead>

          <tbody>
  {loading ? (
    <tr>
      <td colSpan={6}>Loading events...</td>
    </tr>
  ) : filteredEvents.length === 0 ? (
    <tr>
      <td colSpan={6}>No events found.</td>
    </tr>
  ) : (
    filteredEvents.map((event) => (
      <tr key={event.id}>
        <td>{event.event_date}</td>
        <td>{event.event_time}</td>
        <td>{event.title}</td>
        <td>{event.county}</td>
        <td>{event.location}</td>
        <td>{event.status}</td>

<td align="center">
  <button
    style={{
      marginRight: 8,
      background: "#f59e0b",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: 6,
      cursor: "pointer",
    }}
  >
    ✏️ Edit
  </button>

  <button
    style={{
      background: "#dc2626",
      color: "white",
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
{showModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: 600,
        maxWidth: "95%",
        borderRadius: 10,
        padding: 25,
        color: "#111",
      }}
    >
      <h2>Add Campaign Event</h2>

      <input
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          height: 90,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <input
        placeholder="County"
        value={county}
        onChange={(e) => setCounty(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          marginTop: 12,
          padding: 10,
        }}
      >
        <option>Planned</option>
        <option>Scheduled</option>
        <option>Active</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button onClick={() => setShowModal(false)}>
          Cancel
        </button>

        <button
          onClick={saveEvent}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 6,
          }}
        >
          Save Event
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}