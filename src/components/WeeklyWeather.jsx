import React,{use, useState} from 'react';
import '../styles/styleguide.css';
import '../styles/Weather.css';

const WeeklyWeather = ({ temp, weather, day }) => {
    const weatherPath = `../assets/weathers/${weather}.svg`;

    return  (
        <div class="weather-info">
            <p class="temp">{temp}</p>
            <object type="image/svg+xml" data={weatherPath}></object>
            <p class="temp">{day}</p>
        </div>
    );
};

export default WeeklyWeather;
