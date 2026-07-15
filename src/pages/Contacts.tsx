import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  getContacts,
  deleteContact,
  exportContacts,
} from "../lib/dashboard";

import ContactForm from "../components/ContactForm";
import ExcelImporter from "../components/ExcelImporter";

import "../styles/dashboard.css";

type Contact = {
  id: number;
  full_name: string;
  phone: string;
  county: string;
  constituency: string;
  ward: string;
  polling_station: string;
  supporter: boolean;
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const data = await getContacts();
      setContacts(data as Contact[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function exportExcel() {
    try {
      const data = await exportContacts();

      const worksheet = XLSX.utils.json_to_sheet(
        data.map((c: any) => ({
          "Full Name": c.full_name,
          Phone: c.phone,
          County: c.county,
          Constituency: c.constituency,
          Ward: c.ward,
          "Polling Station": c.polling_station,
          Supporter: c.supporter ? "Yes" : "No",
        }))
      );

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Contacts"
      );

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(blob, "Campaign_Contacts.xlsx");

    } catch (err) {
      console.error(err);
      alert("Failed to export contacts.");
    }
  }

  async function removeContact(id: number) {
    if (!confirm("Delete this contact?")) return;

    try {
      await deleteContact(id);
      await loadContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete contact.");
    }
  }

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return contacts.filter(
      (c) =>
        c.full_name.toLowerCase().includes(term) ||
        c.phone.includes(term) ||
        c.county.toLowerCase().includes(term) ||
        c.constituency.toLowerCase().includes(term) ||
        c.ward.toLowerCase().includes(term) ||
        c.polling_station.toLowerCase().includes(term)
    );
  }, [contacts, search]);

  return (
    <div className="page">

      <div className="pageHeader">

        <div>
          <h1>👥 Contacts Database</h1>
          <p>{filtered.length} Contacts</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >

          <button
            className="primaryButton"
            onClick={exportExcel}
          >
            Export Excel
          </button>

          <button
            className="primaryButton"
            onClick={() => setShowForm(true)}
          >
            Add Contact
          </button>

        </div>

      </div>

      <div className="searchBar">

        <input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div style={{ marginBottom: 30 }}>
        <ExcelImporter
          onImported={loadContacts}
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
            <th>Supporter</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan={8}>
                Loading contacts...
              </td>
            </tr>

          ) : filtered.length === 0 ? (

            <tr>
              <td colSpan={8}>
                No contacts found.
              </td>
            </tr>

          ) : (

            filtered.map((contact) => (

              <tr key={contact.id}>

                <td>{contact.full_name}</td>
                <td>{contact.phone}</td>
                <td>{contact.county}</td>
                <td>{contact.constituency}</td>
                <td>{contact.ward}</td>
                <td>{contact.polling_station}</td>
                <td>{contact.supporter ? "✅" : "❌"}</td>

                <td
                  style={{
                    display: "flex",
                    gap: 8,
                  }}
                >

                  <button
                    style={{
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeContact(contact.id)
                    }
                    style={{
                      background: "#d32f2f",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {showForm && (

        <ContactForm
          onClose={() => setShowForm(false)}
          onSaved={loadContacts}
        />

      )}

    </div>
  );
}