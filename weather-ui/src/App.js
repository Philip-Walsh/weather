import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/weather/current/galway')
      .then(response => setWeather(response.data))
      .catch(error => console.error(error));

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {weather && weather.current ? (
          <div>
            <h1>{weather.location.name} {weather.location.country}</h1>
            <p>{weather.current.condition.text}</p>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} km/h, {weather.current.wind_dir}</p>

            {/* <code>{JSON.stringify(weather)}</code> */}
          </div>
        ) : (
          <code>{JSON.stringify(weather)}</code>
        )}
      </header>
    </div>

  );
}

export default App;

