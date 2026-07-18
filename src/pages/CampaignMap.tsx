import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { getWards } from "../services/wardService";
import { getPollingStations } from "../services/pollingStationService";

import type { Ward } from "../types/ward";
import type { PollingStation } from "../types/pollingStation";

// Fix Leaflet marker icons in Vite

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapStation = PollingStation & {
  wardName?: string;
};

export default function CampaignMap() {
  const [loading, setLoading] = useState(true);

  const [wards, setWards] = useState<Ward[]>([]);

  const [stations, setStations] = useState<MapStation[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const wardData = await getWards();

      const stationData = await getPollingStations();

      const mergedStations = stationData.map((station) => ({
        ...station,

        wardName:
          wardData.find((ward) => ward.id === station.ward_id)?.name ?? "",
      }));

      setWards(wardData);

      setStations(mergedStations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredStations = stations.filter((station) => {
    const searchText = search.toLowerCase();

    return (
      station.name.toLowerCase().includes(searchText) ||
      station.wardName?.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Loading Campaign Map...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>🗺 Campaign Map</h1>

      <input
        placeholder="Search Ward or Polling Station..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: 350,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          height: "650px",
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,.15)",
        }}
      >
        <MapContainer
          center={[-1.286389, 36.817223]} // Nairobi
          zoom={11}
          scrollWheelZoom={true}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredStations.map((station) => {
            const lat = Number(station.latitude);
            const lng = Number(station.longitude);

            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker key={station.id} position={[lat, lng]}>
                <Popup>
                  <div style={{ minWidth: 220 }}>
                    <h3
                      style={{
                        margin: "0 0 10px 0",
                      }}
                    >
                      {station.name}
                    </h3>

                    <p>
                      <strong>Ward:</strong> {station.wardName}
                    </p>

                    <p>
                      <strong>Code:</strong> {station.station_code}
                    </p>

                    <p>
                      <strong>Registered Voters:</strong>{" "}
                      {station.registered_voters.toLocaleString()}
                    </p>

                    <p>
                      <strong>Target Votes:</strong>{" "}
                      {station.target_votes.toLocaleString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
