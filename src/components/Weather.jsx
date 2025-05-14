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
        <div className="weather-frame">
            <div className="weather-Icon">
                <object className="w-Icon" type="image/svg+xml" data={iconPath}></object>
            </div>
            <div className="weather-board">
                <div className="today-frame">
                    <div className="recommend-frame">
                        <p className="ment">세차하기 좋은 날입니다.</p>
                        <p className="info">{date}</p>
                    </div>
                    <div className="divier"></div>
                    <div className="information-frame">
                        <p className="temp">{todayWeather.temp}</p>
                        <div className="location-frame">
                            <p className="info-text">{location}</p>
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