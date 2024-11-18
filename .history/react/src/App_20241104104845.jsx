import { useEffect, useState } from 'react';
import Countries from './Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [top10By, setTop10By] = useState('population'); // or 'area'

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

  // Apply filters and sorting
  let displayedCountries = countries
    .filter(country => 
      (continentFilter ? country.continents.includes(continentFilter) : true) &&
      (subregionFilter ? country.subregion === subregionFilter : true)
    )
    .sort((a, b) => sortOrder === 'alphabetical' ? a.name.common.localeCompare(b.name.common) : 0)
    .slice(0, top10By === 'population' ? 10 : countries.length); // limit top 10 by chosen metric

  return (
    <div>
      <h1>Countries of the World</h1>
      <Countries countries={displayedCountries} />
    </div>
  );
}

export default App;
