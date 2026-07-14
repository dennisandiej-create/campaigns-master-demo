import "../styles/dashboard.css";

const platforms = [
  {
    name: "Facebook",
    mentions: "18,420",
    sentiment: "Positive",
    trend: "+12%"
  },
  {
    name: "X (Twitter)",
    mentions: "9,140",
    sentiment: "Neutral",
    trend: "+8%"
  },
  {
    name: "TikTok",
    mentions: "6,870",
    sentiment: "Positive",
    trend: "+25%"
  },
  {
    name: "Instagram",
    mentions: "5,940",
    sentiment: "Positive",
    trend: "+16%"
  },
  {
    name: "YouTube",
    mentions: "2,240",
    sentiment: "Mixed",
    trend: "+4%"
  },
  {
    name: "News Media",
    mentions: "830",
    sentiment: "Neutral",
    trend: "+2%"
  }
];

export default function SocialListening() {

    return(

        <div className="page">

            <div className="pageHeader">

                <div>

                    <h1>Social Listening Centre</h1>

                    <p>Real-time media intelligence</p>

                </div>

                <button className="primaryButton">

                    Refresh Analysis

                </button>

            </div>

            <div className="stats">

                <div className="statCard">

                    <h3>43,440</h3>

                    <span>Total Mentions</span>

                </div>

                <div className="statCard">

                    <h3>72%</h3>

                    <span>Positive Sentiment</span>

                </div>

                <div className="statCard">

                    <h3>18</h3>

                    <span>Trending Topics</span>

                </div>

                <div className="statCard">

                    <h3>94%</h3>

                    <span>AI Confidence</span>

                </div>

            </div>

            <table className="dataTable">

                <thead>

                    <tr>

                        <th>Platform</th>

                        <th>Mentions</th>

                        <th>Sentiment</th>

                        <th>Trend</th>

                    </tr>

                </thead>

                <tbody>

                    {platforms.map((p)=>(

                        <tr key={p.name}>

                            <td>{p.name}</td>

                            <td>{p.mentions}</td>

                            <td>{p.sentiment}</td>

                            <td>{p.trend}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <br/>

            <div className="dashboardGrid">

                <div className="panel">

                    <div className="panelHeader">

                        <h2>Trending Topics</h2>

                    </div>

                    <ul className="activity">

                        <li>#JobsForYouth</li>

                        <li>#BetterHealthcare</li>

                        <li>#RoadDevelopment</li>

                        <li>#EducationFirst</li>

                        <li>#CampaignLaunch</li>

                    </ul>

                </div>

                <div className="panel">

                    <div className="panelHeader">

                        <h2>AI Daily Briefing</h2>

                    </div>

                    <div className="placeholder">

                        Positive online engagement continues to
                        increase.

                        <br/><br/>

                        Youth conversations dominate today's
                        discussions.

                        <br/><br/>

                        Healthcare and employment remain the
                        highest priority issues.

                    </div>

                </div>

            </div>

        </div>

    );

}