import React, { useEffect, useState } from 'react';
import WeeklyList from './WeeklyList';

const mockWeather =
    {
      weatherToday: {type: 'sunny', temp: '24'},
      weatherWeeks: [
        {weather: 'sunny', temperature: '11', day: '월요일'},
        {weather: 'rainy', temperature: '22', day: '화요일'},
        {weather: 'cloudy', temperature: '33', day: '수요일'},
        {weather: 'windy', temperature: '44', day: '목요일'},
        {weather: 'snowy', temperature: '55', day: '금요일'},
        {weather: 'sunny', temperature: '66', day: '토요일'},
        {weather: 'cloudy', temperature: '77', day: '일요일'},
      ],
      date: '2025년 5월 18일',
      location: '경상북도 구미시 거의동'
    };

const Weather = () => { 
    const [weather, setWeather] = useState([]);
    const [todayWeather, setTodayWeather] = useState({type: 'null', temp:'0'});

    useEffect(() => {
        setTodayWeather(mockWeather.weatherToday);
        setWeather(mockWeather);
    }, []);

    const iconPath = `/assets/weathers/${todayWeather?.type}-today.svg`;

    return  (
        <div className="weather-frame" id="weather">
            <div className="weather-Icon">
                <img className="w-Icon" src={iconPath}></img>
            </div>
            <div className="weather-board">
                <div className="today-frame">
                    <div className="recommend-frame">
                        <p className="ment">세차하기 좋은 날입니다.</p>
                        <p className="info">-{weather.date}-</p>
                    </div>
                    <div className="divier"></div>
                    <div className="information-frame">
                        <p className="temp">{todayWeather.temp}°</p>
                        <div className="location-frame">
                            <p className="info-text">{weather.location}</p>
                            <img src='/assets/location.svg'></img>
                        </div>
                    </div>
                </div>
                <WeeklyList weatherList={weather.weatherWeeks}/>
            </div>
        </div>
    );
};

export default Weather;