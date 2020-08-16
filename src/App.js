import React, { useState, useEffect } from 'react';
import './App.scss';

// Global Styling
import './assets/styles/global.scss';

// Components
import SearchField from './components/SearchField';
import Weather from './components/Weather';

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
    
      {weather !== undefined && 
        <Weather weather={weather} />
      }
      
      <div className="footer">
        Made by <a href="https://github.com/vhall1">Victor Hall</a>
      </div>
    </div>
  );
}

export default App;