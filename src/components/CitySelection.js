import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityAutocomplete = ({ countryCode, onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const options = {
        method: 'GET',
        url: 'https://spott.p.rapidapi.com/places/autocomplete',
        params: {
          type: 'CITY',
          q: searchTerm,
          country: countryCode,
          skip: '0',
          limit: '10',
        },
        headers: {
            'X-RapidAPI-Key': 'dbbbbe24dbmshf4255235a75a4fdp1d699ajsn640d01109086',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        },
      };

      axios
        .request(options)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error('Error fetching city autocomplete:', error);
        });
    }
  }, [searchTerm, countryCode]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setSearchTerm('');
  };

  return (
    <div>
      <label htmlFor="city-search">Search city:</label>
      <input
        type="text"
        id="city-search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Type to search..."
      />
      <ul>
        {cities.map((city) => (
          <li key={city.id} onClick={() => handleCitySelect(city.name)}>
            {city.name}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default CityAutocomplete;
