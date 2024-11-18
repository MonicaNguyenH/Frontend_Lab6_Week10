import React from 'react';
import Country from './Country';

interface CountriesProps {
  countries: Country[];
}

const Countries: React.FC<CountriesProps> = ({ countries }) => {
  return (
    <div>
      {countries.map(country => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default Countries;
