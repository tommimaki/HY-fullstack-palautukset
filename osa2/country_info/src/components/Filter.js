import React, { useEffect, useState } from "react";

const Filter = ({ countries, searchterm }) => {
  const [matches, setMatches] = useState(countries);

  useEffect(() => {
    setMatches(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchterm.toLowerCase())
      )
    );
  }, [countries, searchterm]);

  let displayContent;

  if (matches.length > 10) {
    displayContent = <p>Please be more specific in your search.</p>;
  } else if (matches.length === 1) {
    const country = matches[0];
    displayContent = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <p>Languages: {Object.values(country.languages).join(", ")}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  } else if (matches.length > 0) {
    displayContent = (
      <div>
        <p>Countries that match:</p>
        {matches.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    );
  } else {
    displayContent = <p>No countries match your search.</p>;
  }

  return <div>{displayContent}</div>;
};

export default Filter;
