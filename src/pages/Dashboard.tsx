import CommandCentre from "./CommandCentre";
import GISMap from "./GISMap";
import SocialListening from "./SocialListening";
import AI from "./AI";
import Analytics from "./Analytics";
import Voters from "./Voters";
import { useState } from "react";

import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import KPICard from "../components/KPICard";
import Contacts from "./Contacts";

type Props = {
  office: string;
  onBack: () => void;
};

export default function Dashboard({ office, onBack }: Props) {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="dashboard">

      <Sidebar
        office={office}
        selected={page}
        onSelect={setPage}
      />

      <div className="content">

        <Header
          office={office}
          onBack={onBack}
        />

        { page === "Dashboard" && <CommandCentre />}
          <>

            <section className="stats">

              <KPICard
                title="Registered Voters"
                value="421,380"
              />

              <KPICard
                title="Supporters"
                value="82,154"
              />

              <KPICard
                title="Polling Stations"
                value="1,048"
              />

              <KPICard
                title="Volunteers"
                value="4,286"
              />

            </section>

            <section className="dashboardGrid">

              <div className="panel large">

                <div className="panelHeader">
                  <h2>Campaign Overview</h2>
                </div>

                <div className="placeholder">

                  <div>

                    <h3>Interactive Campaign Dashboard</h3>

                    <br />

                    Kenya GIS Map

                    <br />

                    County Performance

                    <br />

                    Constituency Analysis

                    <br />

                    Ward Analytics

                    <br />

                    Polling Station Intelligence

                  </div>

                </div>

              </div>

              <div className="panel">

                <div className="panelHeader">
                  <h2>AI Strategist</h2>
                </div>

                <div className="aiList">

                  <button>Speech Writer</button>

                  <button>Manifesto Builder</button>

                  <button>SWOT Analysis</button>

                  <button>Social Listening</button>

                  <button>Campaign Calendar</button>

                  <button>Media Strategy</button>

                </div>

              </div>

            </section>

            <section className="dashboardGrid">

              <div className="panel">

                <div className="panelHeader">
                  <h2>Social Listening</h2>
                </div>

                <div className="placeholder">

                  <div>

                    Facebook

                    <br /><br />

                    X (Twitter)

                    <br /><br />

                    TikTok

                    <br /><br />

                    Instagram

                    <br /><br />

                    YouTube

                  </div>

                </div>

              </div>

              <div className="panel">

                <div className="panelHeader">
                  <h2>Recent Activity</h2>
                </div>

                <ul className="activity">

                  <li>✔ Contacts imported successfully</li>

                  <li>✔ Volunteer database synchronized</li>

                  <li>✔ AI generated campaign speech</li>

                  <li>✔ Polling stations updated</li>

                  <li>✔ Analytics refreshed</li>

                  <li>✔ Public sentiment analysed</li>

                </ul>

              </div>

            </section>

          </>
        )

        {page === "Contacts" && <Contacts />}

        {page === "Voters" && (
          <div className="panel">
            <h2>Voters Module</h2>
            <p>Coming next...</p>
          </div>
        )}

        {page === "Voters" && <Voters />}

        {page === "GIS Map" && <GISMap />}

        {page === "Analytics" && <Analytics />}

        {page === "AI" && <AI />}

        {page === "Reports" && <SocialListening />}

        {page === "Settings" && (
          <div className="panel">
            <h2>Settings</h2>
            <p>Coming next...</p>
          </div>
        )}

      </div>

    </div>
  );
}