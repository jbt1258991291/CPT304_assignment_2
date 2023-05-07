import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccommodationRentalInformation = ({ city, country, holidayDate }) => {
  const [rentalData, setRentalData] = useState([]);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const response = await axios.get('https://hotels4.p.rapidapi.com/locations/v2/search', {
          params: {
            query: `${city}`,
            locale: `${country}`,
            currency: 'USD'
          },
          headers: {
            'X-RapidAPI-Key': 'dbbbbe24dbmshf4255235a75a4fdp1d699ajsn640d01109086',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
          },
        });

        setRentalData(response.data.suggestions[1].entities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRentalData();
  }, [city, country, holidayDate]);

  if (!rentalData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Accommodation Rental Information for {city} on {holidayDate}</h3>

      {rentalData.map((rental, index) => (
        <div key={index}>
          <h4>{rental.name}</h4>

        </div>
      ))}
    </div>
  );
};

export default AccommodationRentalInformation;

