import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "825a403a9c3c7f0a83af6107dc05c38a"; 

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather:", error.response?.data || error.message);
      alert("City not found or API error!");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="info-weather">{weather.weather[0].main}</p>
          <img
            alt="weather icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p  className="info-weather">Temperature: {weather.main.temp} °C</p>
          <p className="info-weather">Humidity: {weather.main.humidity}%</p>
          <p className="info-weather">Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
