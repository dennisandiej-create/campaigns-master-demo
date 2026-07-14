import "../styles/dashboard.css";

export default function GISMap() {
  return (
    <div className="page">

      <div className="pageHeader">

        <div>

          <h1>Campaign GIS Intelligence</h1>

          <p>Interactive Electoral Intelligence Platform</p>

        </div>

        <button className="primaryButton">

          Refresh Map

        </button>

      </div>

      {/* KPI */}

      <div className="stats">

        <div className="statCard">
          <h3>47</h3>
          <span>Counties</span>
        </div>

        <div className="statCard">
          <h3>290</h3>
          <span>Constituencies</span>
        </div>

        <div className="statCard">
          <h3>1450</h3>
          <span>Wards</span>
        </div>

        <div className="statCard">
          <h3>46,229</h3>
          <span>Polling Stations</span>
        </div>

      </div>

      {/* ROW 1 */}

      <div className="dashboardGrid">

        <div className="panel large">

          <div className="panelHeader">

            <h2>Kenya Interactive GIS Map</h2>

          </div>

          <div
            className="placeholder"
            style={{
              height: 520,
              fontSize: 24,
              fontWeight: 700
            }}
          >

            🇰🇪

            <br /><br />

            Kenya GIS Map

            <br /><br />

            (Leaflet / Mapbox will be connected later)

          </div>

        </div>

        <div className="panel">

          <div className="panelHeader">

            <h2>Map Layers</h2>

          </div>

          <div className="aiList">

            <button>County Boundaries</button>

            <button>Constituencies</button>

            <button>Ward Boundaries</button>

            <button>Polling Stations</button>

            <button>Volunteer Coverage</button>

            <button>Support Heatmap</button>

            <button>Population Density</button>

            <button>Campaign Offices</button>

          </div>

        </div>

      </div>

      {/* ROW 2 */}

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
              <tr><td>Kiambu</td><td>62%</td></tr>

            </tbody>

          </table>

        </div>

        <div className="panel">

          <div className="panelHeader">

            <h2>AI GIS Summary</h2>

          </div>

          <ul className="activity">

            <li>Strong support in Eastern Region</li>

            <li>Urban youth engagement rising</li>

            <li>Increase volunteers in swing wards</li>

            <li>Deploy campaign teams to low-turnout areas</li>

            <li>Prioritize healthcare messaging</li>

          </ul>

        </div>

      </div>

    </div>
  );
}