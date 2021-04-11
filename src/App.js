import "./App.css";
import React, { useState, useEffect } from "react";

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import NewTable from "./NewTable";
import { makePrettyer, sortData, makePrettyer2 } from "./utils";
import LineGrraph from "./LineGrraph";
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [typeCases, setTypeCases] = useState("cases");
  const [co,setCo] = useState('cases')
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  const options = {
    legend: {
      display: false,
    },
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((commits) => {
        const sortedData = sortData(commits);
        setMapCountries(commits);
        setTableData(sortedData);
        const countries = commits.map((country) => ({
          country: country.country,
          name: country.countryInfo.iso2,
        }));

        setCountries(countries);
      });
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url).then((response) =>
      response.json().then((data) => {
        setMapZoom(5);
        console.log(data.countryInfo);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setCountryInfo(data);
      })
    );

    setCountry(countryCode);
  };

  const setColor = (color) => {
    setCo(color)
    setTypeCases(color)
  }


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER </h1>
          {/* Title +Select input dropdown field */}
          <FormControl className="app__downdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value={country}>{country}</MenuItem>
              {countries.map((country, key) => (
                <MenuItem value={country.name} key={key}>
                  {country.country}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            active={typeCases === "cases"}
            className="infobox"
            onClick={(e) => setColor("cases")}
            title="Coronavirus Cases"
            cases={makePrettyer(countryInfo.todayCases)}
            total={makePrettyer2(countryInfo.cases)}
          />
          <InfoBox
            active={typeCases === "recovered"}
            className="infobox"
            onClick={(e) => setColor("recovered")}
            title="Recovered"
            cases={makePrettyer(countryInfo.todayRecovered)}
            total={makePrettyer2(countryInfo.recovered)}
          />
          <InfoBox
           active={typeCases === "deaths"}
            className="infobox"
            onClick={(e) => setColor("deaths")}
            title="Deaths"
            cases={makePrettyer(countryInfo.todayDeaths)}
            total={makePrettyer2(countryInfo.deaths)}
          />
        </div>
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          typeCases={typeCases}
          color = {co}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live CASES BY COUNTY</h3>
        </CardContent>
        <NewTable countries={tableData} options={options} />
        
        <LineGrraph typeCases={typeCases} />
    
      </Card>
    </div>

  );
}

export default App;
