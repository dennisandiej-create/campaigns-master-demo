import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type County = {
  id: number;
  name: string;
};

type Constituency = {
  id: number;
  name: string;
  county_id: number;
};

export default function ConstituencyManager() {
  const [counties, setCounties] = useState<County[]>([]);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    const { data: countyData } = await supabase
      .from("counties")
      .select("*")
      .order("name");

    const { data: constituencyData } = await supabase
      .from("constituencies")
      .select("*")
      .order("name");
    console.log("Constituencies:", constituencyData);

    setCounties(countyData || []);
    setConstituencies(constituencyData || []);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);
  function getCountyName(countyId: number) {
    const county = counties.find((c) => c.id === countyId);
    return county ? county.name : "Unknown";
  }

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <div>
          <h1>🏛️ Constituency Manager</h1>
          <p>Manage constituencies for every county.</p>
        </div>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
          }}
        >
          + Add Constituency
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 20,
          marginBottom: 25,
        }}
      >
        <div className="panel">
          <h2>{counties.length}</h2>
          <p>Counties</p>
        </div>

        <div className="panel">
          <h2>{constituencies.length}</h2>
          <p>Constituencies</p>
        </div>
      </div>

      <div className="panel">
        <h2>Constituency Directory</h2>

        <table
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Constituency</th>
              <th align="left">County</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2}>Loading...</td>
              </tr>
            ) : (
              constituencies.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{getCountyName(c.county_id)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
