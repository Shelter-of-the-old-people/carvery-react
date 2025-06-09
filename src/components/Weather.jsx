import React, { useEffect, useState } from 'react';
import WeeklyList from './WeeklyList';
import { useWeather } from '../hooks/useWeather';



const Weather = () => { 
    const { weatherInfo } = useWeather();
    const [weathers, setWeathers] = useState([]);
    const [todayIcon, setTodayIcon] = useState([]);
    const [todayTemp, setTodayTemp] = useState([]);

    useEffect(() => {
    if (todayIcon) {
        localStorage.setItem('todayIcon', todayIcon);
    }
    if (weatherInfo && Array.isArray(weatherInfo.weathers) && weatherInfo.weathers.length > 0) {
        setWeathers(weatherInfo.weathers);
        setTodayIcon(weatherInfo.todayIcon);
        setTodayTemp(weatherInfo.todayTemp);
        }
    }, [weatherInfo, todayIcon]);

    const iconPath = `/assets/weathers/${todayIcon}-today.svg`;

    return  (
        <div className="weather-frame" id="weather">
            <div className="weather-info-Frame">
                <div className="weather-board">
                    <div className="today-frame">
                        <div className="recommend-frame">
                            <p className="ment">세차하기 좋은 날입니다.</p>
                            <p className="info">{weatherInfo?.date}</p>
                        </div>
                        <div className="divier"></div>
                        <div className="information-frame">
                            <p className="temp">{todayTemp}°</p>
                            <div className="location-frame">
                                <p className="info-text">{weatherInfo?.address}</p>
                                <img src='/assets/location.svg'></img>
                            </div>
                        </div>
                    </div>
                    <WeeklyList weatherList={weathers}/>
                </div>
                <img className="w-Icon" src={iconPath}></img>

            </div>
        </div>
    );
};

export default Weather;