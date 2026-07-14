import "../styles/dashboard.css";

export default function Analytics() {
  return (
    <div className="page">

      <div className="pageHeader">

        <div>
          <h1>Campaign Analytics</h1>
          <p>Real-time Campaign Intelligence</p>
        </div>

        <button className="primaryButton">
          Export Report
        </button>

      </div>

      {/* KPI ROW */}

      <div className="stats">

        <div className="statCard">
          <h3>421,380</h3>
          <span>Total Voters</span>
        </div>

        <div className="statCard">
          <h3>82,154</h3>
          <span>Supporters</span>
        </div>

        <div className="statCard">
          <h3>67%</h3>
          <span>Support Score</span>
        </div>

        <div className="statCard">
          <h3>74%</h3>
          <span>Projected Turnout</span>
        </div>

      </div>

      {/* ROW 1 */}

      <div className="dashboardGrid">

        <div className="panel large">

          <div className="panelHeader">
            <h2>County Performance</h2>
          </div>

          <div className="placeholder">

            <div>

              Machakos ██████████ 82%

              <br/><br/>

              Kitui ████████ 71%

              <br/><br/>

              Makueni ██████ 65%

              <br/><br/>

              Nairobi ███████ 69%

            </div>

          </div>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>Support Distribution</h2>
          </div>

          <div className="placeholder">

            Strong Support — 48%

            <br/><br/>

            Lean Support — 19%

            <br/><br/>

            Undecided — 22%

            <br/><br/>

            Opposition — 11%

          </div>

        </div>

      </div>

      {/* ROW 2 */}

      <div className="dashboardGrid">

        <div className="panel">

          <div className="panelHeader">
            <h2>Age Distribution</h2>
          </div>

          <div className="placeholder">

            18–24

            <br/><br/>

            25–35

            <br/><br/>

            36–50

            <br/><br/>

            51+

          </div>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>Gender Distribution</h2>
          </div>

          <div className="placeholder">

            Male 52%

            <br/><br/>

            Female 47%

            <br/><br/>

            Other 1%

          </div>

        </div>

      </div>

      {/* ROW 3 */}

      <div className="dashboardGrid">

        <div className="panel large">

          <div className="panelHeader">
            <h2>Campaign Progress</h2>
          </div>

          <table className="dataTable">

            <thead>

              <tr>

                <th>Activity</th>

                <th>Progress</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr>
                <td>Contact Collection</td>
                <td>92%</td>
                <td>Completed</td>
              </tr>

              <tr>
                <td>Volunteer Recruitment</td>
                <td>81%</td>
                <td>Active</td>
              </tr>

              <tr>
                <td>Polling Station Mapping</td>
                <td>73%</td>
                <td>In Progress</td>
              </tr>

              <tr>
                <td>Social Listening</td>
                <td>65%</td>
                <td>Running</td>
              </tr>

              <tr>
                <td>AI Strategy Engine</td>
                <td>59%</td>
                <td>Learning</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}