import { useState } from "react";
import * as XLSX from "xlsx";
import { importContacts } from "../lib/dashboard";

type Props = {
  onImported: () => void;
};

export default function ExcelImporter({
  onImported,
}: Props) {
  const [rows, setRows] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");
  const [importing, setImporting] = useState(false);

  function handleFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      if (!data) return;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      setRows(json);
    };

    reader.readAsBinaryString(file);
  }

  async function uploadToSupabase() {
    if (rows.length === 0) {
      alert("Please select an Excel file.");
      return;
    }

    try {
      setImporting(true);

      await importContacts(rows);

      alert(`${rows.length} contacts imported successfully.`);

      setRows([]);
      setFileName("");

      onImported();

    } catch (err) {
      console.error(err);
      alert("Import failed.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="panel">

      <h2>📥 Excel Import</h2>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFile}
      />

      {fileName && (
        <p style={{ marginTop: 15 }}>
          <strong>Selected:</strong> {fileName}
        </p>
      )}

      {rows.length > 0 && (
        <>
          <p style={{ marginTop: 10 }}>
            {rows.length} records detected.
          </p>

          <div
            style={{
              maxHeight: 300,
              overflow: "auto",
              marginTop: 20,
            }}
          >
            <table className="dataTable">

              <thead>
                <tr>
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.slice(0, 10).map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value: any, j) => (
                      <td key={j}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <button
            className="primaryButton"
            onClick={uploadToSupabase}
            disabled={importing}
            style={{ marginTop: 20 }}
          >
            {importing
              ? "Importing..."
              : `Import ${rows.length} Contacts`}
          </button>
        </>
      )}

    </div>
  );
}