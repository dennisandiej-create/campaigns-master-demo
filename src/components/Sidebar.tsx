type Props = {
  office: string;
  selected: string;
  onSelect: (page: string) => void;
};

const menu = [
  "Dashboard",
  "Contacts",
  "Voters",
  "Volunteers",
  "GIS Map",
  "Analytics",
  "AI",
  "Reports",
  "Settings",
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

      <p
        style={{
          color:"#FFD86B",
          marginBottom:25,
          fontWeight:700
        }}
      >
        {office}
      </p>

      <nav>

        {menu.map((item)=>(

          <button

            key={item}

            className={
              selected===item ? "active":""
            }

            onClick={()=>onSelect(item)}

          >

            {item}

          </button>

        ))}

      </nav>

    </aside>
  );
}