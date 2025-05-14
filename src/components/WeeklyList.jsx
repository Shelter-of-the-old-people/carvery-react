import React, { useEffect, useState } from 'react';
import Card from './WeeklyWeather';
import "../styles/styleguide.css";
import '../styles/Weather.css';

const WeeklyList = ([weatherList]) => {
    const [weathers, setWeathers] = useState([]);

    useEffect(() => {
        setWeathers(weatherList);
    }, []);

    return (
         <div className="weekly-frame">
            {weathers.map((item, index) => (
                <Card
                  key={index}
                  temp={item.temperature}
                  weather={item.weather}
                  day={item.day}
                />
              ))}
        </div>
      );
};

export default WeeklyList;