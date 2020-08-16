import React from 'react';
import './styles.scss';

// Assets
import CloudyIcon from '../../assets/icons/cloudy.svg';
import WindIcon from '../../assets/icons/wind.svg';
import HumidityIcon from '../../assets/icons/humidity.svg';
import UpIcon from '../../assets/icons/up.svg';
import DownIcon from '../../assets/icons/down.svg';

const Weather = ({weather}) => {
  return (
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
  );
}

export default Weather;