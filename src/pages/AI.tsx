import { useState } from "react";
import "../styles/dashboard.css";

export default function AI() {
  const [prompt, setPrompt] = useState("");

  const suggestions = [
    "Generate Campaign Speech",
    "Create Manifesto",
    "SWOT Analysis",
    "Social Media Strategy",
    "Ward Campaign Plan",
    "Debate Preparation",
    "Crisis Response",
    "Daily Campaign Brief",
  ];

  return (
    <div className="page">

      <div className="pageHeader">

        <div>
          <h1>AI Campaign Strategist</h1>
          <p>Powered by Campaign Master AI</p>
        </div>

        <button className="primaryButton">
          Generate
        </button>

      </div>

      <div className="dashboardGrid">

        <div className="panel large">

          <div className="panelHeader">
            <h2>AI Prompt</h2>
          </div>

          <textarea
            className="aiTextarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask the AI anything...

Examples:

• Write a speech for youth in Machakos.

• Analyse today's public sentiment.

• Suggest tomorrow's campaign itinerary.

• Compare our campaign with our main opponent.

• Generate fundraising ideas.

• Predict turnout by ward.

• Identify swing polling stations."
          />

          <button
            className="primaryButton"
            style={{ marginTop: 20 }}
          >
            Ask AI Strategist
          </button>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>Quick Actions</h2>
          </div>

          <div className="aiList">

            {suggestions.map((item) => (

              <button key={item}>
                {item}
              </button>

            ))}

          </div>

        </div>

      </div>

      <div className="dashboardGrid">

        <div className="panel">

          <div className="panelHeader">
            <h2>AI Recommendations</h2>
          </div>

          <ul className="activity">

            <li>Increase youth engagement in urban wards.</li>

            <li>Deploy more volunteers in low-support polling stations.</li>

            <li>Schedule two town hall meetings this week.</li>

            <li>Increase Facebook and TikTok activity.</li>

            <li>Target undecided women voters.</li>

          </ul>

        </div>

        <div className="panel">

          <div className="panelHeader">
            <h2>Campaign Health</h2>
          </div>

          <table className="dataTable">

            <tbody>

              <tr>
                <td>Momentum</td>
                <td>Excellent</td>
              </tr>

              <tr>
                <td>Public Sentiment</td>
                <td>Positive</td>
              </tr>

              <tr>
                <td>Volunteer Activity</td>
                <td>High</td>
              </tr>

              <tr>
                <td>Fundraising</td>
                <td>Growing</td>
              </tr>

              <tr>
                <td>Media Presence</td>
                <td>Strong</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}