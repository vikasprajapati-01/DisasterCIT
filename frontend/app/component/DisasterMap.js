"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

// Define custom icons for disasters
const icons = {
  earthquake: new L.Icon({ iconUrl: "/icons/earthquake.png", iconSize: [30, 30] }),
  wildfire: new L.Icon({ iconUrl: "/icons/wildfire.png", iconSize: [30, 30] }),
  flood: new L.Icon({ iconUrl: "/icons/flood.png", iconSize: [30, 30] }),
};

// Fetch disaster data from an API (USGS Earthquake API Example)
export default function DisasterMap() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    async function fetchDisasterData() {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10"
        );
        const data = await res.json();

        // Extract earthquake data
        const disasterList = data.features.map((quake) => ({
          id: quake.id,
          type: "earthquake",
          lat: quake.geometry.coordinates[1],
          lng: quake.geometry.coordinates[0],
          name: quake.properties.place,
          magnitude: quake.properties.mag,
        }));

        setDisasters(disasterList);
      } catch (error) {
        console.error("Error fetching disaster data:", error);
      }
    }

    fetchDisasterData();
  }, []);

  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-6">Global Disaster Map</h2>
      <p className="text-lg text-gray-300 mb-6">
        Explore past disasters worldwide. Click on markers to learn more.
      </p>

      {/* OpenStreetMap Container */}
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Add Disaster Markers */}
        {disasters.map((disaster) => (
          <Marker
            key={disaster.id}
            position={[disaster.lat, disaster.lng]}
            icon={icons[disaster.type] || icons.earthquake} // Default to earthquake icon
          >
            <Popup>
              <strong>{disaster.name}</strong>
              <br />
              🌍 <b>Magnitude:</b> {disaster.magnitude || "N/A"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
