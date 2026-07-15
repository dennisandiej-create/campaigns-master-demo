import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const supporterData = [
  { month: "Jan", supporters: 12000 },
  { month: "Feb", supporters: 15800 },
  { month: "Mar", supporters: 20100 },
  { month: "Apr", supporters: 26500 },
  { month: "May", supporters: 34400 },
  { month: "Jun", supporters: 42100 },
];

const countyData = [
  { county: "Machakos", support: 82 },
  { county: "Kitui", support: 71 },
  { county: "Makueni", support: 66 },
  { county: "Nairobi", support: 64 },
  { county: "Kiambu", support: 61 },
];

export default function Analytics() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1>Campaign Analytics</h1>
          <p>Real-time campaign performance overview</p>
        </div>
      </div>

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
          <h3>74%</h3>
          <span>Win Probability</span>
        </div>

        <div className="statCard">
          <h3>94%</h3>
          <span>Volunteer Coverage</span>
        </div>
      </div>

      <div className="dashboardGrid">

        <div className="panel large">
          <div className="panelHeader">
            <h2>Supporter Growth</h2>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={supporterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="supporters"
                stroke="#FFD86B"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="panelHeader">
            <h2>County Support</h2>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={countyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="county" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="support" fill="#4F7CFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="panel">
        <div className="panelHeader">
          <h2>AI Insights</h2>
        </div>

        <ul className="activity">
          <li>📈 Support is increasing in Machakos.</li>
          <li>🗳️ Youth voter engagement has grown by 14%.</li>
          <li>📱 Evening social media campaigns perform best.</li>
          <li>🤝 Volunteer recruitment is strongest in Kitui.</li>
          <li>🎯 Door-to-door campaigns have the highest conversion rate.</li>
        </ul>
      </div>
    </div>
  );
}