import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icon path issue in React bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Default fallback location (Seattle)
const SEATTLE_CENTER = [47.6062, -122.3321];

// Helper component to smoothly center the map when coordinates update
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

function MapView() {
  const [position, setPosition] = useState(SEATTLE_CENTER);
  const [hasUserLocation, setHasUserLocation] = useState(false);

  useEffect(() => {
    // Check if the browser supports geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          
          setPosition([userLat, userLng]);
          setHasUserLocation(true);
        },
        (error) => {
          console.warn("Geolocation permission denied or failed. Defaulting to Seattle.", error);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
    >
      {/* Dynamic View Recenter Hook */}
      <ChangeView center={position} />

      {/* Free OpenStreetMap Tile Layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker for current location / fallback */}
      <Marker position={position}>
        <Popup>
          <strong>{hasUserLocation ? "Your Current Location" : "Seattle Resource Hub"}</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;