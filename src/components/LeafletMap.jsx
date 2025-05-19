import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/searchMap.css';

function LeafletMap({ latitude, longitude }) {
  const center = [latitude, longitude];

  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={center}>
          <Popup>서울입니다!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
