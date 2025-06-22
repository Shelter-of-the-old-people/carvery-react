import { useState, useEffect } from 'react';
import { useGeoLocation } from './useGeoLocation';
import { useShortWeather } from './useShortWeather';
import { useMidForecast } from './useMidWeather';
import useDate from './useDate';
import { useGeoCoder } from './useGeoCoder';

interface IWeather{
    day: string;
    tmx: string;
    tmn: string;
    amIcon?: string;
    pmIcon?: string;
}

interface IWeatherWithLocation {
    address : string;
    date: string;
    todayIcon: string;
    todayTemp: string;
    weathers : IWeather[];
}

function getDayOfWeek(yyyymmdd:string, plus:number): string {
  const dateStr = `${yyyymmdd.slice(0,4)}-${yyyymmdd.slice(4,6)}-${yyyymmdd.slice(6,8)}`;
  const date = new Date(dateStr);
  date.setDate(date.getDate() + plus);
  const dayIdx = date.getDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayIdx];
}

function getDate(yyyymmdd:string): string {
  const dateStr = `- ${yyyymmdd.slice(0,4)}년 ${yyyymmdd.slice(4,6)}월 ${yyyymmdd.slice(6,8)}일 -`;
  return dateStr;
}

function getMidIcon(sky?: string) {
    if(sky)
    {
      if (sky.includes('흐림')) {
        return 'overcast';
      }
      if (sky.includes('구름많음')) {
          return 'cloudy';
      }
      if (sky.includes('비') || sky.includes('소나기')) {
          return 'rainy';
      }
      if (sky.includes('눈')) {
          return 'snowy';
      }
      if (sky.includes('비/눈')) {
          return 'rainy';
      }
    }
    else{
      return 'sunny';
    }
}

export const useWeather = (options = {}) => {
  const { location } = useGeoLocation();
  const { date, shortTime, shortDate, midTime, midDate, nowTime } = useDate();
  const addressObj = useGeoCoder(location?.latitude, location?.longitude);
  const shortForecast = useShortWeather(location?.latitude, location?.longitude, date, nowTime, shortDate, shortTime);
  const midForecast = useMidForecast(addressObj.address, midDate + midTime);

  const [weatherInfo, setWeatherInfo] = useState<IWeatherWithLocation>();
  const [error, setError] = useState('');
  
 useEffect(() => {
    // 필수 데이터가 모두 준비됐는지 확인
    if (
      !location ||
      !addressObj.address ||
      !shortForecast.summary ||
      !midForecast.forecast
    ) {
      setWeatherInfo(undefined);
      return;
    }

    try {
      // 1. 단기예보(오늘~3일) 정리
      const shortArr: IWeather[] = shortForecast.summary.map(item => {
        let aIcon = item.amWindy ? "windy" : "sunny";
        let pIcon = item.pmWindy ? "windy" : "sunny";

        switch (item.amPty) {
            case "1":
            case "2":
            case "4":
            aIcon = "rainy";
            break;
            case "3":
            aIcon = "snowy";
            break;
            case "0":
            default:
            break;
            }

        switch (item.pmPty) {
            case "1":
            case "2":
            case "4":
            pIcon = "rainy";
            break;
            case "3":
            pIcon = "snowy";
            break;
            case "0":
            default:
            break;
            }
            
            let dayDay = item.date === date ? "오늘" : getDayOfWeek(item.date, 0);
            
            return {
                day: dayDay,
                tmx: item.tmx,
                tmn: item.tmn,
                amIcon: aIcon,
                pmIcon: pIcon,
            };
        });

      // 2. 중기예보(4~10일) 정리
      const midArr: IWeather[] = midForecast.forecast.map(item => {
        const aIcon = getMidIcon(item.amSky);
        const pIcon = getMidIcon(item.pmSky);
        return {
            day: getDayOfWeek(date, item.day),
            tmx: item.taMax,
            tmn: item.taMin,
            amIcon: aIcon,
            pmIcon: pIcon,
        };
    });

      // 3. 합치기 (총 10일)
      const allWeather = [...shortArr.slice(0, 4), ...midArr.slice(0, 4)].slice(0, 10);
      setWeatherInfo({
        address: addressObj.address[0].address,
        date: getDate(date),
        todayIcon:allWeather[0].amIcon ?? "sunny", 
        todayTemp:allWeather[0].tmn,
        weathers: allWeather
      });
      setError('');

    } catch (e) {
      setError('날씨 정보를 불러오지 못했습니다.');
      setWeatherInfo(undefined);
    }
  }
  
  , [
    location,
    addressObj.address?.address,
    shortForecast.summary,
    midForecast.forecast,
  ]);

  return { weatherInfo, error };
};