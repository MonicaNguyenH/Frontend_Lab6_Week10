import Country from './Country';
import './Countries.css';

function Countries({ countries }) {
  return (
    <div className="countries">
      {countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </div>
  );
}

export default Countries;
