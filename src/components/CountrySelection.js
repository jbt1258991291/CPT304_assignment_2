import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountrySelection = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    onCountrySelect(event.target.value);
  };

  return (
    <div>
      <label htmlFor="country-select">Select a country:</label>
      <select id="country-select" onChange={handleCountryChange}>
        <option value="">--Please choose a country--</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelection;

