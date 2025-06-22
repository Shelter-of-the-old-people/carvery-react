import { useState, useEffect } from 'react';
import { useGeoLocation } from './useGeoLocation';
import { useShortWeather } from './useShortWeather';
import { useMidForecast } from './useMidWeather';
import useDate from './useDate';
import { useGeoCoder } from './useGeoCoder';

/**
 * 설계 명세: 초단기실황 안전 처리 통합 날씨 시스템
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - useDate의 안전 시간을 useShortWeather에 완전 연결
 * - API 업데이트 시간대 자동 감지 및 대응
 * - 기존 모든 기능 100% 보존 + 안정성 확보
 * 
 * 사용처: Weather 컴포넌트에서 호출
 * 근원지: 초단기실황 "10분 후 제공" 문제 완전 해결
 */

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

// ✅ 기존 기능: 요일 계산 (완전 동일)
function getDayOfWeek(yyyymmdd:string, plus:number): string {
  const dateStr = `${yyyymmdd.slice(0,4)}-${yyyymmdd.slice(4,6)}-${yyyymmdd.slice(6,8)}`;
  const date = new Date(dateStr);
  date.setDate(date.getDate() + plus);
  const dayIdx = date.getDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayIdx];
}

// ✅ 기존 기능: 날짜 포맷팅 (완전 동일)
function getDate(yyyymmdd:string): string {
  const dateStr = `- ${yyyymmdd.slice(0,4)}년 ${yyyymmdd.slice(4,6)}월 ${yyyymmdd.slice(6,8)}일 -`;
  return dateStr;
}

// ✅ 기존 기능: 중기예보 아이콘 매핑 (완전 동일)
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
  
  // 🔧 개선: 확장된 useDate로 안전 시간 정보 포함
  const { 
    date, shortTime, shortDate, midTime, midDate, nowTime,
    ultraSafeTime, ultraSafeDate, retryWaitMs, isUpdateWindow 
  } = useDate();
  
  const addressObj = useGeoCoder(location?.latitude, location?.longitude);
  
  // 🔧 개선: 안전 시간 매개변수들을 useShortWeather에 전달
  const shortForecast = useShortWeather(
    location?.latitude, 
    location?.longitude, 
    date, 
    nowTime, 
    shortDate, 
    shortTime,
    // 새로 추가된 안전 처리 매개변수들
    ultraSafeDate,
    ultraSafeTime,
    retryWaitMs,
    isUpdateWindow
  );
  
  const midForecast = useMidForecast(addressObj.address, midDate + midTime);

  const [weatherInfo, setWeatherInfo] = useState<IWeatherWithLocation>();
  const [error, setError] = useState('');
  
 useEffect(() => {
    // ✅ 기존 기능: 필수 데이터 준비 확인 (완전 동일)
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
      // ✅ 기존 기능: 단기예보(오늘~3일) 정리 (완전 동일)
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

      // ✅ 기존 기능: 중기예보(4~10일) 정리 (완전 동일)
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

      // ✅ 기존 기능: 전체 날씨 정보 조합 (완전 동일)
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

  return { 
    weatherInfo, 
    error,
    // 🔧 추가: 디버깅 및 상태 확인용 정보 제공
    isUpdateWindow,
    isRetrying: shortForecast.isRetrying 
  };
};