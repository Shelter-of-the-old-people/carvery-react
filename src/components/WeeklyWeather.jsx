import React, { useEffect, useState } from 'react';

const WeeklyWeather = ({ day, tmx, tmn, amIcon, pmIcon }) => {
    const amPath = `/assets/weathers/${amIcon}-week.svg`;
    const pmPath = `/assets/weathers/${pmIcon}-week.svg`;

    return  (
        <div className="weather-info">
            
            <p className="day">{day}</p>
            <div className='icon-frame'>
                <div className='am-icon-frame'>
                    <img className='am-icon' src={amPath} alt="오전 날씨 아이콘" />
                </div>
                <div className='pm-icon-frame'>
                    <img className='pm-icon' src={pmPath} alt="오후 날씨 아이콘" />
                </div>
            </div>
            <div className='temp-frame'>
                <p className="temp">{tmn}°</p>
                <p className="temp">{tmx}°</p>
            </div>
        </div>
    );
};

export default WeeklyWeather;
