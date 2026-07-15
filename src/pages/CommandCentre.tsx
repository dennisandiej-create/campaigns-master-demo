import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { getDashboardStats } from "../lib/dashboard";

type DashboardStats = {
  contacts: number;
  supporters: number;
  volunteers: number;
  activeVolunteers: number;
  events: number;
  activeEvents: number;
  broadcasts: number;
};

const recentActivities = [
  "Volunteer database synchronized",
  "SMS campaign sent successfully",
  "AI generated campaign speech",
  "Ward analytics refreshed",
  "Social media sentiment updated",
];

const upcomingEvents = [
  {
    title: "Youth Rally",
    date: "15 Jul",
    location: "Matungulu",
  },
  {
    title: "Volunteer Training",
    date: "17 Jul",
    location: "Machakos",
  },
  {
    title: "Town Hall Meeting",
    date: "19 Jul",
    location: "Kitui",
  },
  {
    title: "Women Leaders Forum",
    date: "21 Jul",
    location: "Makueni",
  },
];

export default function CommandCentre() {  

  const [stats, setStats] = useState<DashboardStats>({
    contacts: 0,
    supporters: 0,
    volunteers: 0,
    activeVolunteers: 0,
    events: 0,
    activeEvents: 0,
    broadcasts: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
  try {
    const data = await getDashboardStats();
    setStats(data);
  } catch (err) {
    console.error(err);
  }
}

return (
    <div className="page">

      <div className="pageHeader">
        <div>
          <h1>Campaign Command Centre</h1>
          <p>Executive Campaign Operations Dashboard</p>
        </div>

        <button className="primaryButton">
          AI Daily Briefing
        </button>
      </div>

      {/* KPI CARDS */}

      <div className="stats">

        <div className="statCard">
          <h3>{stats.contacts}</h3>
          <span>Registered Voters</span>
        </div>

        <div className="statCard">
          <h3>{stats.supporters}</h3>
          <span>Supporters</span>
        </div>

        <div className="statCard">
          <h3>{stats.volunteers}</h3>
          <span>Volunteers</span>
        </div>

        <div className="statCard">
          <h3>1,048</h3>
          <span>Polling Stations</span>
        </div>

        <div className="statCard">
          <h3>{stats.events}</h3>
          <span>Today's Events</span>
        </div>

        <div className="statCard">
          <h3>{stats.broadcasts}</h3>
          <span>Broadcasts</span>
        </div>

      </div>

      {/* FIRST ROW */}

      <div className="dashboardGrid">

        <div className="panel large">

          <div className="panelHeader">
            <h2>Campaign Performance</h2>
          </div>

          <table className="dataTable">

            <thead>
              <tr>
                <th>Campaign Activity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Volunteer Deployment</td>
                <td>🟢 Active</td>
              </tr>

              <tr>
                <td>Ward Mobilization</td>
                <td>🟢 Running</td>
              </tr>

              <tr>
                <td>Door-to-Door Campaign</td>
                <td>🟡 Scheduled</td>
              </tr>

              <tr>
                <td>Digital Campaign</td>
                <td>🟢 Live</td>
              </tr>

              <tr>
                <td>Media Interviews</td>
                <td>🟡 Pending</td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>AI Strategy Centre</h2>
          </div>

          <div className="aiList">

            <button>Generate Speech</button>

            <button>Manifesto Builder</button>

            <button>SWOT Analysis</button>

            <button>Predict Election</button>

            <button>Social Listening</button>

            <button>Campaign Planner</button>

            <button>Media Strategy</button>

            <button>Risk Analysis</button>

          </div>

        </div>

      </div>

      {/* SECOND ROW */}

      <div className="dashboardGrid">

        <div className="panel">

          <div className="panelHeader">
            <h2>Upcoming Campaign Events</h2>
          </div>

          <table className="dataTable">

            <thead>

              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Location</th>
              </tr>

            </thead>

            <tbody>

              {upcomingEvents.map((event) => (

                <tr key={event.title}>

                  <td>{event.date}</td>

                  <td>{event.title}</td>

                  <td>{event.location}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>Recent Activity</h2>
          </div>

          <ul className="activity">

            {recentActivities.map((activity) => (

              <li key={activity}>
                ✔ {activity}
              </li>

            ))}

          </ul>

        </div>

      </div>

      {/* THIRD ROW */}

      <div className="dashboardGrid">

        <div className="panel">

          <div className="panelHeader">
            <h2>County Performance</h2>
          </div>

          <table className="dataTable">

            <thead>

              <tr>

                <th>County</th>

                <th>Support</th>

              </tr>

            </thead>

            <tbody>

              <tr><td>Machakos</td><td>82%</td></tr>
              <tr><td>Kitui</td><td>71%</td></tr>
              <tr><td>Makueni</td><td>66%</td></tr>
              <tr><td>Nairobi</td><td>64%</td></tr>
              <tr><td>Kiambu</td><td>61%</td></tr>

            </tbody>

          </table>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>AI Daily Insights</h2>
          </div>

          <ul className="activity">

            <li>📈 Youth engagement continues to improve.</li>

            <li>📍 Focus additional volunteers in swing wards.</li>

            <li>💬 Healthcare dominates online conversations.</li>

            <li>📲 Evening social media posts receive the highest engagement.</li>

            <li>🗳️ Schedule rallies in high-growth constituencies.</li>

          </ul>

        </div>

      </div>

    </div>
  );
}