import React from "react";
import "./Map.css";
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { showDataOnMap } from "./utils";
import L from 'leaflet';
import tapir from './images/tapir2.png';
const myIcon = L.icon({
  iconUrl: tapir,
  iconSize: [20,20],
  popupAnchor: [-10, -30],
});
function SetViewOnClick({ center,zoom }) {
  const map = useMap();
  map.setView(center,zoom);

  return null;
}

function Map({ center, zoom,countries,typeCases}) {
 return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} typeCases={typeCases}>
   
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
    
        { showDataOnMap(countries,typeCases)}
        <Marker position={center}   icon={myIcon} >
         
        </Marker >
         
        <SetViewOnClick center={center} zoom={zoom}/> 

      </MapContainer>
    </div>
  );
}

export default Map;
