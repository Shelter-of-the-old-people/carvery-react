import React, { useEffect, useState } from 'react';
import Card from './WeeklyWeather';

const WeeklyList = ({weatherList = []}) => {

    return (
         <div className="weekly-frame">
            {weatherList.map((item, index) => (
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