import React, { useEffect, useState } from 'react';
import Card from './WeeklyWeather';

const WeeklyList = ({weatherList = []}) => {

    return (
         <div className="weekly-frame">
            {weatherList.map((item, index) => (
                <Card
                  key={index}
                  day={item.day}
                  tmx={item.tmx}
                  tmn={item.tmn}
                  amIcon={item.amIcon}
                  pmIcon={item.pmIcon}
                />
              ))}
        </div>
      );
};

export default WeeklyList;