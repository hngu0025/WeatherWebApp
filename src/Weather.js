// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHERAPI_API_KEY.replace(/'/g, '').replace(';', '');

  const getWeather = async () => {
    try {
      const response = await
      axios({
        method: 'get',
        url: 'https://api.weatherapi.com/v1/current.json',
        params: {
          key: apiKey,
          q: city,
          aqi: 'no'
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>{weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c} &#8451;</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
