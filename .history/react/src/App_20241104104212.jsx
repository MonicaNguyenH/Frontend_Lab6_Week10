import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState({ continent: '', subregion: '', top: '', sort: '' });

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
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

  const handleFilterChange = (type: string, value: string) => {
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
