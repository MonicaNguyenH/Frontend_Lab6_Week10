function Country({ country }) {
  // Generate Google Maps URL based on latitude and longitude
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${country.latlng[0]},${country.latlng[1]}`;

  return (
    <div className="country-card">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
      <h2 className="country-name">{country.name.common}</h2>
      <div className="country-info">
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Continent:</strong> {country.continents.join(', ')}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
      </div>
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="google-maps-link">
        Show on Google Maps
      </a>
    </div>
  );
}

export default Country;
