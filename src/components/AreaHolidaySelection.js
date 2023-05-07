import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AreaHolidaySelection = ({ countryCode, year, onAreaHolidaySelect }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (countryCode && year) {
      axios
        .get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
        .then((response) => {
          setHolidays(response.data);
        })
        .catch((error) => {
          console.error('Error fetching holidays:', error);
        });
    }
  }, [countryCode, year]);

  const handleHolidayChange = (event) => {
    onAreaHolidaySelect(event.target.value);
  };

  return (
    <div>
      <label htmlFor="holiday-select">Select a public holiday:</label>
      <select id="holiday-select" onChange={handleHolidayChange}>
        <option value="">--Please choose a holiday--</option>
        {holidays.map((holiday) => (
          <option key={holiday.date} value={holiday.date}>
            {holiday.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AreaHolidaySelection;
