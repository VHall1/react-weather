import React, { useState, useEffect } from 'react';
import './styles.scss';

// Components
import SearchField from '../..//components/SearchField';
import Weather from '../..//components/Weather';

const api = "https://api.openweathermap.org/data/2.5/";

const Forecast = () => {
  const [name, setName] = useState("Home");
  const [weather, setWeather] = useState([]);

  // Only Triggers On First Render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`${api}forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API}`)
      .then(r => r.json())
      .then(cb => {
        setData(cb);
      });
    });
  }, []);
  const fetchWeather = (event, location) => {
    event.preventDefault();
    document.getElementById("inputWeather").blur();

    if (location !== "") {
      fetch(`${api}forecast?q=${location}&units=metric&APPID=${process.env.REACT_APP_API}`)
      .then(r => r.json())
      .then(cb => {
        console.log(cb)
        setData(cb);
      });
    }
  }
  const setData = data => {
    if (data.main !== undefined) {
      setWeather({
        temp: Math.round(data.main.temp),
        location: `${data.name}, ${data.sys.country}`,
        description: data.weather[0].main,
        timestamp: Math.round((new Date()).getTime() / 1000)
      });
      
      if (data.main.temp > 21) {
        setName("Home orange");
      } else if (data.main.temp < 16) {
        setName("Home purple");
      } else {
        setName("Home");
      }
    }
  }

  return (
    <div className={name}>
      <SearchField fetchWeather={fetchWeather} />
    
      {weather !== undefined && 
        <Weather weather={weather} />
      }
    </div>
  );
}

export default Forecast;