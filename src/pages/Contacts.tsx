import { useMemo, useState } from "react";
import "../styles/dashboard.css";

type Contact = {
  id: number;
  name: string;
  phone: string;
  ward: string;
  polling: string;
};

const sampleContacts: Contact[] = [
  { id: 1, name: "John Mwangi", phone: "0712345678", ward: "Central", polling: "Town Primary" },
  { id: 2, name: "Mary Wanjiku", phone: "0723456789", ward: "East Ward", polling: "Market Primary" },
  { id: 3, name: "Peter Otieno", phone: "0734567890", ward: "West Ward", polling: "St Mary's" },
  { id: 4, name: "Grace Njeri", phone: "0745678901", ward: "North Ward", polling: "Kiamaina" },
  { id: 5, name: "James Mutua", phone: "0700111222", ward: "South Ward", polling: "ABC Primary" },
  { id: 6, name: "Faith Achieng", phone: "0700222333", ward: "Central", polling: "Town Primary" },
  { id: 7, name: "Daniel Kimani", phone: "0700333444", ward: "East Ward", polling: "Market Primary" },
  { id: 8, name: "Mercy Wairimu", phone: "0700444555", ward: "West Ward", polling: "St Mary's" },
];

export default function Contacts() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return sampleContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.phone.includes(term) ||
        c.ward.toLowerCase().includes(term) ||
        c.polling.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="page">

      <div className="pageHeader">

        <div>
          <h1>Contacts Database</h1>
          <p>{filtered.length} Contacts</p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>

          <button className="primaryButton">
            Import Excel
          </button>

          <button className="primaryButton">
            Add Contact
          </button>

        </div>

      </div>

      <div className="searchBar">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, ward or polling station..."
        />

      </div>

      <table className="dataTable">

        <thead>

          <tr>

            <th>#</th>

            <th>Name</th>

            <th>Phone</th>

            <th>Ward</th>

            <th>Polling Station</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((contact) => (

            <tr key={contact.id}>

              <td>{contact.id}</td>

              <td>{contact.name}</td>

              <td>{contact.phone}</td>

              <td>{contact.ward}</td>

              <td>{contact.polling}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}