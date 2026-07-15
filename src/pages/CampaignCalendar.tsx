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

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data, error } = await supabase
      .from("campaign_events")
      .select("*")
      .order("event_date");

    if (error) {
      console.error(error);
    } else {
      setEvents(data ?? []);
    }

    setLoading(false);
  }

  return (
    <div>

      <h1 style={{ marginBottom: 20 }}>
        📅 Campaign Calendar
      </h1>

      {/* KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >

        <div className="panel">
          <h2>{events.length}</h2>
          <p>Total Events</p>
        </div>

        <div className="panel">
          <h2>
            {events.filter(e => e.status === "Scheduled").length}
          </h2>
          <p>Scheduled</p>
        </div>

        <div className="panel">
          <h2>
            {events.filter(e => e.status === "Active").length}
          </h2>
          <p>Active</p>
        </div>

        <div className="panel">
          <h2>
            {events.filter(e => e.status === "Planned").length}
          </h2>
          <p>Planned</p>
        </div>

      </div>

      {/* Events */}

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
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={6}>
                  Loading events...
                </td>
              </tr>

            ) : events.map((event) => (

              <tr key={event.id}>

                <td>{event.event_date}</td>

                <td>{event.event_time}</td>

                <td>{event.title}</td>

                <td>{event.county}</td>

                <td>{event.location}</td>

                <td>{event.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}