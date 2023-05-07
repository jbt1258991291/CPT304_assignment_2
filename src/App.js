import React, { useState } from 'react';
import CountrySelection from './components/CountrySelection';
import AreaHolidaySelection from './components/AreaHolidaySelection';
import WeatherInformation from './components/WeatherInformation';
import AccommodationRentalInformation from './components/AccommodationRentalInformation';
import YearSelection from  './components/YearSelection';
import CitySelection from './components/CitySelection';

function App() {
  const [countryCode, setCountryCode] = useState('');
  const [year, setYearCode] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="App">
      <CountrySelection onCountrySelect={setCountryCode} />
      <CitySelection countryCode={countryCode} onCitySelect={setSelectedCity} />
      <YearSelection onYearSelect={setYearCode} />
      <AreaHolidaySelection
        countryCode={countryCode}
        year={year}
        onAreaHolidaySelect={setHolidayDate}
      />
      <WeatherInformation city={selectedCity} date={holidayDate} country={countryCode}/>
      <AccommodationRentalInformation city={selectedCity} country={countryCode} holidayDate={holidayDate} />
    </div>
  );
}

export default App;


