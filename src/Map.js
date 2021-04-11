import React, { useState } from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Circle,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import tapir from "./images/tapir2.png";
import numeral from "numeral";

const myIcon = L.icon({
  iconUrl: tapir,
  iconSize: [20, 20],
  popupAnchor: [-10, -30],
});

function SetViewOnClick({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);

  return null;
}

const casesTypeColors = {
  cases: {
    hex: "#CC1089",
    multiplier: 160,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 240,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 400,
  },
};

const CircleonMap = (countries, typeCases, color) => {
  return countries.map((country, key) => {
    console.log(color);
    return (
      <Circle
        style={{ background: "pink!important" }}
        key={key}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        radius={Math.sqrt(country[color]) * casesTypeColors[color].multiplier}
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recoverd">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>

            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
};

function Map({ center, zoom, countries, typeCases, color }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} typeCases={typeCases}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={myIcon}></Marker>
        {CircleonMap(countries, typeCases, color)}

        <SetViewOnClick center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

export default Map;
