import { useEffect, useState } from 'react';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [top10By, setTop10By] = useState(''); // 'population' or 'area'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = () => {
    return countries
      .filter(country => 
        (continentFilter ? country.continents.includes(continentFilter) : true) &&
        (subregionFilter ? country.subregion === subregionFilter : true)
      )
      .sort((a, b) => sortAlphabetical ? a.name.common.localeCompare(b.name.common) : 0)
      .sort((a, b) => 
        top10By === 'population' ? b.population - a.population : 
        top10By === 'area' ? b.area - a.area : 0
      )
      .slice(0, top10By ? 10 : countries.length); 
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <div className="filters">
        <label>
          <input type="checkbox" checked={sortAlphabetical} onChange={() => setSortAlphabetical(!sortAlphabetical)} />
          Alpha
        </label>
        <label>
          Top 10:
          <input type="radio" name="top10" value="population" onChange={() => setTop10By('population')} /> by population
          <input type="radio" name="top10" value="area" onChange={() => setTop10By('area')} /> by area
        </label>
        <label>
          By continent:
          <select onChange={(e) => setContinentFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            {/* Add other continents as needed */}
          </select>
        </label>
        <label>
          By subregion:
          <select onChange={(e) => setSubregionFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="Eastern Europe">Eastern Europe</option>
            {/* Add other subregions as needed */}
          </select>
        </label>
      </div>
      <Countries countries={handleSort()} />
    </div>
  );
}

export default App;
