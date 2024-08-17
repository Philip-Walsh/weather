import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // axios.get('http://localhost:3000/weather/current/galway')
    //   .then(response => setWeather(response.data))
    //   .catch(error => console.error(error));

    axios.get('http://localhost:3000/weather/forecast/galway')
      .then(response => setWeather(response.data))
      .catch(error => console.error(error));

  }, []);

  return (
    <>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        {weather && weather.current ? (
          <section id="weather">
            <h1>{weather.location.name} {weather.location.country}</h1>
            <p id="time">{weather.location.localtime}</p>
            <p id="conditionTxt">{weather.current.condition.text}</p>
            <p id="temp">Temperature: {weather.current.temp_c}°C</p>
            <p id="humidity">Humidity: {weather.current.humidity}%</p>
            <p id="wind">Wind: {weather.current.wind_kph} km/h, {weather.current.wind_dir}</p>
          </section>
        ) : (
          <code>{JSON.stringify(weather)}</code>
        )}
        {weather && weather.forecast && weather.forecast.forecastday ? (
          <section id="forecast">
          <h2>Forecast</h2>
          {weather.forecast.forecastday.map((day, index) => (
            <div key={index}>
              <h3>{day.date}</h3>
              <p>{day.day.condition.text}</p>
              <p>High: {day.day.maxtemp_c}°C</p>
              <p>Low: {day.day.mintemp_c}°C</p>
              <p>Humidity: {day.day.avghumidity}%</p>
              <p>Wind: {day.day.maxwind_kph} km/h, {day.day.maxwind_dir}</p>
              <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
              <p>UV Index: {day.day.uv} / {day.day.uv_desc}</p>
              <p>Sunrise: {day.astro.sunrise}</p>
              <p>Sunset: {day.astro.sunset}</p>
              <p>Moonrise: {day.astro.moonrise}</p>
              <p>Moonset: {day.astro.moonset}</p>
              <p>Moon Phase: {day.astro.moon_phase}</p>
              <p>Moon Illumination: {day.astro.moon_illumination}</p>
            </div>
          ))}
        </section>
        ) : (
          <code>{JSON.stringify(weather)}</code>
        )}
      </main>
      <footer></footer>
    </>
  );  
}

export default App;

