import "../styles/landing.css";
import {
  FaUserTie,
  FaUniversity,
  FaUsers,
  FaFemale,
  FaMapMarkedAlt,
} from "react-icons/fa";

type Props = {
  onSelectOffice: (office: string) => void;
};

const offices = [
  {
    title: "President",
    subtitle: "National Campaign",
    icon: <FaUserTie />,
  },
  {
    title: "Governor",
    subtitle: "County Campaign",
    icon: <FaUniversity />,
  },
  {
    title: "Senator",
    subtitle: "County Senate",
    icon: <FaUniversity />,
  },
  {
    title: "Member of Parliament",
    subtitle: "Constituency Campaign",
    icon: <FaUsers />,
  },
  {
    title: "Woman Representative",
    subtitle: "County Representative",
    icon: <FaFemale />,
  },
  {
    title: "MCA",
    subtitle: "Ward Campaign",
    icon: <FaMapMarkedAlt />,
  },
];

export default function Landing({ onSelectOffice }: Props) {
  return (
    <div className="app">
      <div className="overlay">
        <h1>CAMPAIGNS MASTER</h1>

        <p className="subtitle">
          AI Powered Campaign Intelligence Platform
        </p>

        <h2>Select the office you want to manage</h2>

        <div className="officeGrid">
          {offices.map((office) => (
            <div
              key={office.title}
              className="office-card"
              onClick={() => onSelectOffice(office.title)}
            >
              {office.icon}

              <h3>{office.title}</h3>

              <p>{office.subtitle}</p>

              <span>Open Command Centre</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}