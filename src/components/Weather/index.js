import React from 'react';
import Moment from 'react-moment';
import './styles.scss';

import Cloudy from '../../assets/icons/cloudy.svg'

// Material
import { Typography } from '@material-ui/core';

const Weather = ({ weather }) => {
  return (
    <div className="weatherContainer">
      <Typography
        className="description"
      >
        {weather.description}
      </Typography>
      <Typography
        className="location"
      >
        {weather.location}
      </Typography>
      <Typography
        className="temperature"
      >
        {weather.temp}°C
      </Typography>
      
      {/* <img
        src={Cloudy}
        alt="Weather"
      /> */}

      <Typography
        className="timestamp"
      >
        <Moment unix fromNow interval={30000}>
          {weather.timestamp}
        </Moment>
      </Typography>
    </div>
  );
}

export default Weather;