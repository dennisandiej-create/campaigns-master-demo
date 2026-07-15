export default function Settings() {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>
        ⚙️ System Settings
      </h1>

      {/* Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div className="panel">
          <h2>Administrator</h2>
          <p>Current Role</p>
        </div>

        <div className="panel">
          <h2>Secure</h2>
          <p>System Status</p>
        </div>

        <div className="panel">
          <h2>12</h2>
          <p>Connected Modules</p>
        </div>

        <div className="panel">
          <h2>Online</h2>
          <p>Supabase Connection</p>
        </div>
      </div>

      {/* User Management */}

      <div className="panel" style={{ marginBottom: 25 }}>
        <h2>User Management</h2>

        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <button>👤 Manage Users</button>
          <button>🔐 Roles & Permissions</button>
          <button>➕ Add Administrator</button>
          <button>🗑 Remove User</button>
        </div>
      </div>

      {/* Security */}

      <div className="panel" style={{ marginBottom: 25 }}>
        <h2>Security</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          <button>🔒 Change Password</button>
          <button>📱 Two-Factor Authentication</button>
          <button>🛡 Session Management</button>
          <button>📜 Audit Logs</button>
        </div>
      </div>

      {/* Integrations */}

      <div className="panel" style={{ marginBottom: 25 }}>
        <h2>Platform Integrations</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th align="left">Integration</th>
              <th align="left">Status</th>
              <th align="left">Purpose</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ padding: 12 }}>Supabase</td>
              <td>Connected</td>
              <td>Primary Database</td>
            </tr>

            <tr>
              <td style={{ padding: 12 }}>OpenAI</td>
              <td>Connected</td>
              <td>AI Strategy Engine</td>
            </tr>

            <tr>
              <td style={{ padding: 12 }}>SMS Gateway</td>
              <td>Pending</td>
              <td>Bulk Messaging</td>
            </tr>

            <tr>
              <td style={{ padding: 12 }}>Email Service</td>
              <td>Pending</td>
              <td>Broadcast Centre</td>
            </tr>

            <tr>
              <td style={{ padding: 12 }}>GIS Mapping</td>
              <td>Connected</td>
              <td>Campaign Mapping</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* System Preferences */}

      <div className="panel">
        <h2>System Preferences</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          <button>🎨 Theme Settings</button>
          <button>🌍 Regional Settings</button>
          <button>🔔 Notifications</button>
          <button>💾 Backup & Restore</button>
          <button>📥 Import Data</button>
          <button>📤 Export Data</button>
        </div>
      </div>
    </div>
  );
}