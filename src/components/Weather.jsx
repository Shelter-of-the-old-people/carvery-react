import React,{use, useState} from 'react';
import WeeklyList from './WeeklyList';
import '../styles/styleguide.css';
import '../styles/Weather.css';

const Weather = ({WToday, WWeeks, date, location}) => { 
    const [todayWeather, setTodayWeather] = useState([]);
    const [weekWeathers, setWeekWeathers] = useState([]);
    const iconPath = `../assets/weathers/${todayWeather.type}.svg`;

    useEffect(() => {
        setTodayWeather(WToday);
        setWeekWeathers(WWeeks);
    }, []);


    return  (
        <div class="weather-frame">
            <div class="weather-Icon">
                <object class="w-Icon" type="image/svg+xml" data={iconPath}></object>
            </div>
            <div class="weather-board">
                <div class="today-frame">
                    <div class="recommend-frame">
                        <p class="ment">세차하기 좋은 날입니다.</p>
                        <p class="info">{date}</p>
                    </div>
                    <div class="divier"></div>
                    <div class="information-frame">
                        <p class="temp">{todayWeather.temp}</p>
                        <div class="location-frame">
                            <p class="info-text">{location}</p>
                            <object type="image/svg+xml" data="/icons/location.svg"></object>
                        </div>
                    </div>
                </div>
                <WeeklyList weatherList={weekWeathers}/>
            </div>
        </div>
    );
};

export default Weather;