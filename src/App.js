import React from 'react';
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
export default function App() {
    const [name, setName] = React.useState("App");
    const [location, setLocation] = React.useState("");
    const [weather, setWeather] = React.useState();

    React.useEffect(() => {
        if (weather === undefined) {
            navigator.geolocation.getCurrentPosition((pos) => {
                fetch(`${api}weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API}`)
                    .then(r => r.json())
                    .then(cb => {
                        if (cb.main !== undefined) {
                            // Remove focus from search field
                            setWeather({
                                clouds: `${cb.clouds.all} %`, 
                                wind: `${cb.wind.speed} m/s`,
                                humidity: `${cb.main.humidity} %`,
                                temp: Math.round(cb.main.temp),
                                variation: {min: Math.round(cb.main.temp_min), max: Math.round(cb.main.temp_max)},
                                location: `${cb.name}, ${cb.sys.country}`,
                                description: cb.weather[0].main
                            });

                            if (cb.main.temp > 21) {
                                setName("App orange");
                            } else if (cb.main.temp < 16) {
                                setName("App purple");
                            } else {
                                setName("App");
                            }
                        }
                    });
            });
        }
    })

    const fetchWeather = (event) => {
        // Submit Search
        if (event.key === "Enter") {
            document.getElementById("weatherInput").blur();
            setLocation("");
            fetch(`${api}weather?q=${location}&units=metric&APPID=${process.env.REACT_APP_API}`)
                .then(r => r.json())
                .then(cb => {
                    if (cb.main !== undefined) {
                        // Remove focus from search field
                        setWeather({
                            clouds: `${cb.clouds.all} %`, 
                            wind: `${cb.wind.speed} m/s`,
                            humidity: `${cb.main.humidity} %`,
                            temp: Math.round(cb.main.temp),
                            variation: {min: Math.round(cb.main.temp_min), max: Math.round(cb.main.temp_max)},
                            location: `${cb.name}, ${cb.sys.country}`,
                            description: cb.weather[0].main
                        });

                        if (cb.main.temp > 21) {
                            setName("App orange");
                        } else if (cb.main.temp < 16) {
                            setName("App purple");
                        } else {
                            setName("App");
                        }
                    }
                });
        }
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }  

    return (
        <div className={name}>
            <SearchField
                location={location}
                handleLocationChange={handleLocationChange}
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