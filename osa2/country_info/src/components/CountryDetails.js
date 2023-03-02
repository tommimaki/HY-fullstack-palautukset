import React, { useState, useEffect } from "react";
import axios from "axios";
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const city = country.capital[0];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [country]);
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Wind speed: {weather.wind.speed} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};
export default CountryDetails;
