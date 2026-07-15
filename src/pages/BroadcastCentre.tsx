import { useEffect, useMemo, useState } from "react";
import { getBroadcasts } from "../lib/dashboard";
import "../styles/dashboard.css";

type Broadcast = {
  id: number;
  title: string;
  message: string;
  channel: string;
  audience: string;
  status: string;
  scheduled_at: string | null;
  created_at: string;
};

export default function BroadcastCentre() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBroadcasts();
  }, []);

  async function loadBroadcasts() {
    try {
      const data = await getBroadcasts();
      setBroadcasts(data as Broadcast[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    if (filter === "All") return broadcasts;
    return broadcasts.filter((b) => b.status === filter);
  }, [broadcasts, filter]);

  return (
    <div className="page">

      <div className="pageHeader">

        <div>
          <h1>📢 SMS / Email Broadcast Centre</h1>
          <p>{broadcasts.length} Campaign Broadcasts</p>
        </div>

        <button className="primaryButton">
          New Broadcast
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 25,
        }}
      >
        <div className="statCard">
          <h3>{broadcasts.length}</h3>
          <span>Total Broadcasts</span>
        </div>

        <div className="statCard">
          <h3>{broadcasts.filter(b => b.status === "Sent").length}</h3>
          <span>Sent</span>
        </div>

        <div className="statCard">
          <h3>{broadcasts.filter(b => b.status === "Scheduled").length}</h3>
          <span>Scheduled</span>
        </div>

        <div className="statCard">
          <h3>{broadcasts.filter(b => b.status === "Draft").length}</h3>
          <span>Draft</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {["All", "Sent", "Scheduled", "Draft"].map((item) => (
          <button
            key={item}
            className="primaryButton"
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <table className="dataTable">

        <thead>

          <tr>
            <th>Title</th>
            <th>Channel</th>
            <th>Audience</th>
            <th>Status</th>
            <th>Scheduled</th>
          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>

          ) : (

            filtered.map((item) => (

              <tr key={item.id}>

                <td>
                  <strong>{item.title}</strong>
                  <br />
                  <small>{item.message}</small>
                </td>

                <td>{item.channel}</td>

                <td>{item.audience}</td>

                <td>{item.status}</td>

                <td>
                  {item.scheduled_at
                    ? new Date(item.scheduled_at).toLocaleDateString()
                    : "-"}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}