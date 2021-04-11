import React from 'react'
import { Circle, Popup } from "react-leaflet"
import numeral from "numeral";
const casesTypeColors = {
    cases: {
      hex:"#CC1089",
    
      multiplier: 160,
    },
    recovered: {
      hex:"#7dd71d",
    
      multiplier: 240,
    },
    deaths: {
     
      hex:"#fb4443",
  
      multiplier: 400,
    },
  };
  
  
function  CircleonMap({countries,typeCases}) {
    countries.map((country,key) => (
        <Circle
          key={key}
          center={[country.countryInfo.lat, country.countryInfo.long]}
          color={casesTypeColors[typeCases].hex}
          fillColor={casesTypeColors[typeCases].hex}
          fillOpacity={0.4}
          radius={
            Math.sqrt(country[typeCases]) * casesTypeColors[typeCases].multiplier
          }
        >
          <Popup>
            <div className="info-container">
              <div className ="info-flag"
                style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
              ></div>
              <div className="info-name">{country.country}</div>
              <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
              <div className="info-recoverd">Recovered: {numeral(country.recovered).format("0,0")}</div>
    
              <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
            </div>
          </Popup>
        </Circle>
      ));
}

export default CircleonMap
