type Props = {
  office: string;
  selected: string;
  onSelect: (page: string) => void;
};

const menu = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Contacts", icon: "👥" },
  { label: "Voters", icon: "🗳️" },
  { label: "Volunteer Centre", icon: "🤝" },
  { label: "Campaign Calendar", icon: "📅" },
  { label: "Broadcast Centre", icon: "📨" },
  { label: "GIS Map", icon: "🗺️" },
  { label: "Analytics", icon: "📈" },
  { label: "AI Centre", icon: "🤖" },
  { label: "Reports", icon: "📊" },
  { label: "Settings", icon: "⚙️" },
];

export default function Sidebar({
  office,
  selected,
  onSelect,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>CAMPAIGNS</h2>
        <span>MASTER</span>
      </div>

      <div
        style={{
          marginBottom: "24px",
          padding: "12px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "#9CA3AF",
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Active Office
        </div>

        <div
          style={{
            color: "#FFD86B",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {office}
        </div>
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {menu.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className={selected === item.label ? "active" : ""}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
            }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>

            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#9CA3AF",
            }}
          >
            Campaign Master
          </div>

          <div
            style={{
              color: "#FFD86B",
              fontWeight: 700,
              marginTop: "6px",
            }}
          >
            Demo Version
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#AEB6C3",
              marginTop: "6px",
            }}
          >
            AI Powered Campaign Management
          </div>
        </div>
      </div>
    </aside>
  );
}