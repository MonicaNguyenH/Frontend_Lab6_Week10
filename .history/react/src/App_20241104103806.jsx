import React, { useState, useEffect } from 'react';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: '', subregion: '', top: '', sort: '' });

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...countries];

    if (filter.continent) {
      filtered = filtered.filter(country => country.continents.includes(filter.continent));
    }

    if (filter.subregion) {
      filtered = filtered.filter(country => country.subregion === filter.subregion);
    }

    if (filter.top) {
      const key = filter.top === 'population' ? 'population' : 'area';
      filtered = filtered
        .sort((a, b) => b[key] - a[key])
        .slice(0, 10);
    }

    if (filter.sort === 'alphabetical') {
      filtered = filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    setFilteredCountries(filtered);
  }, [filter, countries]);

  const handleFilterChange = (type, value) => {
    setFilter(prev => ({
      ...prev,
      [type]: value,
      ...(type === 'continent' && { subregion: '' }),
      ...(type === 'subregion' && { continent: '' }),
    }));
  };

  return (
    <div>
      {/* Filter and Sort Controls */}
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
