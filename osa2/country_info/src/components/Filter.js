import React, { useEffect, useState } from "react";
import CountryDetails from "./CountryDetails";

const Filter = ({ countries, searchterm }) => {
  const [matches, setMatches] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };
  const handleHideClick = () => {
    setSelectedCountry(null);
  };

  useEffect(() => {
    setMatches(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchterm.toLowerCase())
      )
    );
  }, [countries, searchterm]);

  let displayContent;

  if (selectedCountry) {
    return (
      <div>
        <button onClick={handleHideClick}>Hide</button>
        <CountryDetails country={selectedCountry} />
      </div>
    );
  }

  if (selectedCountry) {
    return (
      <div>
        <button onClick={handleHideClick}>Hide</button>
        <CountryDetails country={selectedCountry} />
      </div>
    );
  }

  if (matches.length > 10) {
    return <p>Please be more specific in your search.</p>;
  }

  if (matches.length === 1) {
    return <CountryDetails country={matches[0]} />;
  }

  return (
    <div>
      {matches.map((country) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}{" "}
            <button onClick={() => handleShowClick(country)}>Show</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Filter;
