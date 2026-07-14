import { useMemo, useState } from "react";
import "../styles/dashboard.css";

type Voter = {
  id: number;
  name: string;
  phone: string;
  county: string;
  constituency: string;
  ward: string;
  polling: string;
  gender: string;
  age: number;
  support: string;
};

const voters: Voter[] = [
  {
    id: 1,
    name: "John Mwangi",
    phone: "0712345678",
    county: "Machakos",
    constituency: "Matungulu",
    ward: "Kyeleni",
    polling: "Kyeleni Primary",
    gender: "Male",
    age: 35,
    support: "Strong"
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    phone: "0723456789",
    county: "Machakos",
    constituency: "Matungulu",
    ward: "Tala",
    polling: "Tala Primary",
    gender: "Female",
    age: 29,
    support: "Medium"
  },
  {
    id: 3,
    name: "Peter Otieno",
    phone: "0734567890",
    county: "Kitui",
    constituency: "Kitui Central",
    ward: "Township",
    polling: "Town Primary",
    gender: "Male",
    age: 42,
    support: "Weak"
  },
  {
    id: 4,
    name: "Grace Njeri",
    phone: "0745678901",
    county: "Makueni",
    constituency: "Wote",
    ward: "Wote",
    polling: "Wote Primary",
    gender: "Female",
    age: 31,
    support: "Strong"
  }
];

export default function Voters() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return voters.filter((v) =>
      `${v.name} ${v.phone} ${v.county} ${v.constituency} ${v.ward} ${v.polling}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="page">

      <div className="pageHeader">

        <div>
          <h1>Voter Intelligence</h1>
          <p>{filtered.length} Registered Voters</p>
        </div>

        <button className="primaryButton">
          Import Register
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
          marginBottom: "25px"
        }}
      >

        <select className="filterSelect">
          <option>All Counties</option>
          <option>Machakos</option>
          <option>Kitui</option>
          <option>Makueni</option>
        </select>

        <select className="filterSelect">
          <option>All Constituencies</option>
        </select>

        <select className="filterSelect">
          <option>All Wards</option>
        </select>

        <select className="filterSelect">
          <option>All Polling Stations</option>
        </select>

      </div>

      <div className="searchBar">

        <input
          placeholder="Search voter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <table className="dataTable">

        <thead>

          <tr>

            <th>Name</th>

            <th>Phone</th>

            <th>County</th>

            <th>Constituency</th>

            <th>Ward</th>

            <th>Polling Station</th>

            <th>Gender</th>

            <th>Age</th>

            <th>Support</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((voter) => (

            <tr key={voter.id}>

              <td>{voter.name}</td>

              <td>{voter.phone}</td>

              <td>{voter.county}</td>

              <td>{voter.constituency}</td>

              <td>{voter.ward}</td>

              <td>{voter.polling}</td>

              <td>{voter.gender}</td>

              <td>{voter.age}</td>

              <td>{voter.support}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}