import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, ReactElement } from 'react';
import WeatherCurrent from './components/WeatherCurrent';
import ireland from './ireland.svg';
import WeatherForecast from './components/WeatherForecast';
import WeatherHourly from './components/WeatherHourly';

interface AppProps {
  weather: any;
}

function App({ weather }: AppProps): ReactElement {

  const [weatherState, setWeather] = useState<any>(null);

  useEffect(() => {
    axios.get<any>('http://localhost:3000/weather/forecast/galway/7')
      .then((response: AxiosResponse<any>) => setWeather(response.data))
      .catch((error: any) => console.error(error));

  }, []);

  return (
    <>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1> Weather</h1>
      </header>
      <main>
        <WeatherCurrent weather={weatherState} />
        <WeatherHourly weather={weatherState} />
        <WeatherForecast weather={weatherState} />
        {/* <img src={ireland} className="map" alt="ireland" /> */}
      </main>
      <footer></footer>
    </>
  );
}

export default App;


