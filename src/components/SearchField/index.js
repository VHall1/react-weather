import React from 'react';
import './styles.scss';

const SearchField = ({ location, handleLocationChange, fetchWeather }) => {
  return (
    <div className="inputContainer">
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        onKeyPress={fetchWeather}
        placeholder="Search"
        id="weatherInput"
      />
    </div>
  );
}

export default SearchField;