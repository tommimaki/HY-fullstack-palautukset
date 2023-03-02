import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Filter from "./components/Filter";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  const fetchCountries = () => {
    let url = `https://restcountries.com/v3.1/name/${searchTerm}`;
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="App">
      <h1> country_info</h1>
      <input value={searchTerm} onChange={handleInput} />
      <Filter searchterm={searchTerm} countries={countries} />
    </div>
  );
}

export default App;
