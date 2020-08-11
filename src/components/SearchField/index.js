import React from 'react';
import './styles.scss';

export default function SearchField({location, handleLocationChange, fetchWeather}) {

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