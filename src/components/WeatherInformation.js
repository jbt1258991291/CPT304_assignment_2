import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parse } from 'papaparse';

const WeatherInformation = ({ city, date, country }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://visual-crossing-weather.p.rapidapi.com/history', {
          params: {
            startDateTime: `${date}T00:00:00`,
            aggregateHours: '24',
            location: `${city},${country}`,
            endDateTime: `${date}T23:59:59`,
            unitGroup: 'us',
            dayStartTime: '8:00:00',
            contentType: 'csv',
            dayEndTime: '17:00:00',
            shortColumnNames: '0',
          },
          headers: {
            'X-RapidAPI-Key': 'dbbbbe24dbmshf4255235a75a4fdp1d699ajsn640d01109086',
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
          },
        });

        const parsedData = parse(response.data, {
          header: true,
          skipEmptyLines: true,
        });

        setWeatherData(parsedData.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [city, date, country]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Weather Information for {city} on {date}</h3>
      <p>Minimum Temperature: {weatherData['Minimum Temperature']}</p>
      <p>Maximum Temperature: {weatherData['Maximum Temperature']}</p>
      <p>Temperature: {weatherData['Temperature']}</p>
      <p>Dew Point: {weatherData['Dew Point']}</p>
      <p>Relative Humidity: {weatherData['Relative Humidity']}</p>
      <p>Wind Speed: {weatherData['Wind Speed']}</p>
    </div>
  );
};

export default WeatherInformation;



