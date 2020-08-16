import React, { useState, useEffect } from 'react';
import './App.scss';

import CloudyIcon from './assets/icons/cloudy.svg';
import WindIcon from './assets/icons/wind.svg';
import HumidityIcon from './assets/icons/humidity.svg';
import UpIcon from './assets/icons/up.svg';
import DownIcon from './assets/icons/down.svg';

// Global Styling
import './assets/styles/global.scss';

// Components
import SearchField from './components/SearchField';

const api = "https://api.openweathermap.org/data/2.5/";

const App = () => {
  const [name, setName] = useState("App");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();

  // Only Triggers On First Render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`${api}weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API}`)
      .then(r => r.json())
      .then(cb => {
        setData(cb);
      });
    });
  }, []);

  const fetchWeather = event => {
    if (event.key === "Enter") {
      document.getElementById("weatherInput").blur();
      setLocation("");

      fetch(`${api}weather?q=${location}&units=metric&APPID=${process.env.REACT_APP_API}`)
      .then(r => r.json())
      .then(cb => {
        setData(cb);
      });
    }
  }

  const setData = data => {
    if (data.main !== undefined) {
      setWeather({
        clouds: `${data.clouds.all} %`, 
        wind: `${data.wind.speed} m/s`,
        humidity: `${data.main.humidity} %`,
        temp: Math.round(data.main.temp),
        variation: {min: Math.round(data.main.temp_min), max: Math.round(data.main.temp_max)},
        location: `${data.name}, ${data.sys.country}`,
        description: data.weather[0].main
      });
      
      if (data.main.temp > 21) {
        setName("App orange");
      } else if (data.main.temp < 16) {
        setName("App purple");
      } else {
        setName("App");
      }
    }
  }

  return (
    <div className={name}>
      <SearchField
        location={location}
        handleLocationChange={(event) => setLocation(event.target.value)}
        fetchWeather={fetchWeather}
      />
    
      {(weather !== undefined) ? (
        <div className="weatherContainer">
          <div className="topContainer">
            <div>
              <img src={CloudyIcon} alt="Weather icon" />
              {weather.clouds}
            </div>
            <div>
              <img src={WindIcon} alt="Weather icon" />
              {weather.wind}
            </div>
            <div>
              <img src={HumidityIcon} alt="Weather icon" />
              {weather.humidity}
            </div>
          </div>
          
          <div className="tempContainer">
            <span className="temperature">{weather.temp}</span>
            <div className="tempVariation">
              <div className="celsius">°C</div>
              <div>
                <img src={UpIcon} alt="Weather icon" />
                {weather.variation.max}
              </div>
              <div>
                <img src={DownIcon} alt="Weather icon" />
                {weather.variation.min}
              </div>
            </div>
          </div>
          
          <div className="cityContainer">{weather.location}</div>
          <div className="detailsContainer">{weather.description}</div>
        </div>
      ) : ('')}
      
      <div className="footer">
        Made by <a href="https://github.com/vhall1">Victor Hall</a>
      </div>
    </div>
  );
}

export default App;