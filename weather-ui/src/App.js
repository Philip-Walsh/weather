import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import WeatherCurrent from './components/WeatherCurrent';
import ireland from './ireland.svg';
import WeatherForecast from './components/WeatherForecast';

function App() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/weather/forecast/galway/7')
      .then(response => setWeather(response.data))
      .catch(error => console.error(error));

  }, []);

  return (
    <>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <WeatherCurrent weather={weather} />
        <WeatherForecast weather={weather} />
        {/* <img src={ireland} className="map" alt="ireland" /> */}
      </main>
      <footer></footer>
    </>
  );
}

export default App;

