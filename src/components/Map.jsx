import { MapContainer, TileLayer } from "react-leaflet";

import Geoman from "./Geoman";

const Map = () => {
  const center = [35.662875, 51.393835];
  const zoom = 13;

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "800px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap English | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={20}
        />
        <Geoman />
      </MapContainer>
    </>
  );
};

export default Map;
