import React from 'react';

const YearSelection = ({ onYearSelect }) => {
  const handleYearChange = (event) => {
    const value = event.target.value;

    if (value.length === 4 && /^\d{4}$/.test(value)) {
      onYearSelect(value);
    } else {
      onYearSelect('');
    }
  };

  return (
    <div>
      <label htmlFor="year-input">Enter a year:</label>
      <input
        id="year-input"
        type="text"
        maxLength="4"
        placeholder="YYYY"
        onChange={handleYearChange}
      />
    </div>
  );
};

export default YearSelection;