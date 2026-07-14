import "../styles/dashboard.css";

export default function CommandCentre() {

  return (

    <div className="page">

      <div className="pageHeader">

        <div>

          <h1>Campaign Command Centre</h1>

          <p>Real-time Executive Overview</p>

        </div>

        <button className="primaryButton">

          Daily Briefing

        </button>

      </div>

      {/* Executive KPIs */}

      <div className="stats">

        <div className="statCard">
          <h3>421,380</h3>
          <span>Total Contacts</span>
        </div>

        <div className="statCard">
          <h3>82,154</h3>
          <span>Supporters</span>
        </div>

        <div className="statCard">
          <h3>4,286</h3>
          <span>Volunteers</span>
        </div>

        <div className="statCard">
          <h3>74%</h3>
          <span>Win Probability</span>
        </div>

      </div>

      {/* Row 1 */}

      <div className="dashboardGrid">

        <div className="panel large">

          <div className="panelHeader">
            <h2>Today's Priorities</h2>
          </div>

          <table className="dataTable">

            <thead>
              <tr>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Volunteer Deployment</td>
                <td>Active</td>
              </tr>

              <tr>
                <td>Ward Mobilization</td>
                <td>Scheduled</td>
              </tr>

              <tr>
                <td>Media Interviews</td>
                <td>Pending</td>
              </tr>

              <tr>
                <td>Social Listening Review</td>
                <td>Running</td>
              </tr>

              <tr>
                <td>AI Speech Generation</td>
                <td>Ready</td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>Quick Actions</h2>
          </div>

          <div className="aiList">

            <button>New Contact</button>

            <button>Import Excel</button>

            <button>Generate Speech</button>

            <button>Open GIS Map</button>

            <button>Campaign Calendar</button>

            <button>Volunteer Centre</button>

            <button>Broadcast SMS</button>

            <button>Create Report</button>

          </div>

        </div>

      </div>

      {/* Row 2 */}

      <div className="dashboardGrid">

        <div className="panel">

          <div className="panelHeader">
            <h2>AI Daily Brief</h2>
          </div>

          <ul className="activity">

            <li>Support increasing in urban wards.</li>
            <li>Youth engagement remains strong.</li>
            <li>Healthcare is today's top issue.</li>
            <li>Deploy more volunteers in swing polling stations.</li>
            <li>Increase evening social media engagement.</li>

          </ul>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>County Leaderboard</h2>
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

      </div>

    </div>

  );

}