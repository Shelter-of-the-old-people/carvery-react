import React, { useEffect, useState } from 'react';
import WeeklyList from './WeeklyList';
import { useWeather } from '../hooks/useWeather';

const Weather = () => { 
    const { weatherInfo, error, isRetrying, weatherCondition } = useWeather();
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
    
    const getMentClassName = (condition) => {
        const baseClass = "ment";
        switch (condition) {
            case 'poor': return `${baseClass} ment-poor`;
            case 'fair': return `${baseClass} ment-fair`;
            case 'good': return `${baseClass} ment-good`;
            case 'excellent': return `${baseClass} ment-excellent`;
            default: return baseClass;
        }
    };
    
    if (error) {
        return (
            <div className="weather-frame" id="weather">
                <div className="weather-info-Frame">
                    <div className="weather-board">
                        <div className="today-frame">
                            <div className="recommend-frame">
                                <p className="ment ment-error">날씨 정보를 불러올 수 없습니다.</p>
                                <p className="info">잠시 후 다시 시도해주세요.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="weather-frame" id="weather">
            <div className="weather-info-Frame">
                <div className="weather-board">
                    <div className="today-frame">
                        <div className="recommend-frame">
                            <p className={getMentClassName(weatherCondition)}>
                                {weatherInfo?.recommendation || "날씨 정보를 불러오는 중..."}
                                {isRetrying && <span className="loading-indicator"> ↻</span>}
                            </p>
                            
                            <p className="info">{weatherInfo?.date}</p>
                        </div>
                        <div className="divier"></div>
                        <div className="information-frame">
                            <p className="temp">{todayTemp}°</p>
                            <div className="location-frame">
                                <p className="info-text">{weatherInfo?.address}</p>
                                <img src='/assets/location.svg' alt="위치"></img>
                            </div>
                            
                        </div>
                    </div>
                    <WeeklyList weatherList={weathers}/>
                </div>
                <img className="w-Icon" src={iconPath} alt="오늘 날씨"></img>
            </div>
        </div>
    );
};

export default Weather;