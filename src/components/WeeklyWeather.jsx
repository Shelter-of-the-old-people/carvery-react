import React, { useEffect, useState } from 'react';

const WeeklyWeather = ({ temp, weather, day }) => {
    const weatherPath = `/assets/weathers/${weather}-week.svg`;

    return  (
        <div className="weather-info">
            <p className="temp">{temp}°</p>
            <object type="image/svg+xml" data={weatherPath}></object>
            <p className="temp">{day}</p>
        </div>
    );
};

export default WeeklyWeather;
