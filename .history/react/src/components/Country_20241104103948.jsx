import React from 'react';

const Country = ({ country }) => {
  return (
    <div>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continent: {country.continents.join(', ')}</p>
      <p>Sub-region: {country.subregion}</p>
    </div>
  );
};

export default Country;
