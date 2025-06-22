import { useState, useEffect } from 'react'
import { useGridCoords } from './useGridCoords'

/**
 * 설계 명세: 기상청 API 가이드 기반 안전한 초단기실황 처리
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - API 업데이트 시간대(정시~09분) 안전 처리
 * - 이전 시간 데이터 활용 + 자동 재시도 로직
 * - 기존 모든 기능 100% 보존 + 확장성 확보
 * 
 * 사용처: useWeather에서 호출
 * 근원지: 초단기실황 API "10분 후 제공" 특성 완전 해결
 */

interface IShortWeather{
    date: string
    tmx: string
    tmn: string
    amPty: string
    pmPty: string
    amSky: string
    pmSky: string
    amWindy: boolean
    pmWindy: boolean
}

type ForecastItem = {
  fcstDate: string;
  fcstTime: string;
  category: string;
  fcstValue: string;
};

function processForecast(items, itemsSshort, todayDate: string, nowTime:string): IShortWeather[] {
  // ✅ 기존 기능: 날짜별로 그룹핑 (기존과 완전 동일)
  const byDate = {};
  items.forEach(item => {
    const date = item.fcstDate;
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });

  // ✅ 기존 기능: 날짜별 결과 생성 (기존과 완전 동일)
  const result = Object.entries(byDate).map(([date, dayItems]) => {
    const items = dayItems as ForecastItem[];
    // 최고/최저 기온
    const tmx = (items.find(i => i.category === 'TMX')?.fcstValue ?? '').split('.')[0];

    let tmn: string;
    if(date === todayDate) {
        // 🔧 개선: 초단기실황 데이터가 있으면 사용, 없으면 단기예보 데이터로 대체
        tmn = (itemsSshort?.find(i => i.category === 'T1H')?.obsrValue ?? 
               items.find(i => i.category === 'TMN')?.fcstValue ?? '').split('.')[0];
    } else {
        tmn = (items.find(i => i.category === 'TMN')?.fcstValue ?? '').split('.')[0];
    }

    // ✅ 기존 기능: 오전/오후 시간대 분리 (완전 동일)
    const amTimes = ["0000","0100","0200","0300","0400","0500","0600","0700","0800","0900","1000","1100"];
    const pmTimes = ["1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300"];

    // ✅ 기존 기능: 오전/오후 PTY (완전 동일)
    const amPty = items
      .filter(i => i.category === 'PTY' && amTimes.includes(i.fcstTime) && i.fcstValue !== "0")
      .map(i => i.fcstValue);

    const pmPty = items
      .filter(i => i.category === 'PTY' && pmTimes.includes(i.fcstTime) && i.fcstValue !== "0")
      .map(i => i.fcstValue);

    // 🔧 개선: PTY 처리 with 초단기실황 안전 대체
    let amPtyValue: string;
    if(date === todayDate) {
        amPtyValue = itemsSshort?.find(i => i.category === 'PTY')?.obsrValue ?? 
                    (amPty.length > 0 ? amPty[0] : "0");
    } else {
        amPtyValue = amPty.length > 0 ? amPty[0] : "0";
    }
    const pmPtyValue = pmPty.length > 0 ? pmPty[0] : "0";

    // ✅ 기존 기능: 오전/오후 SKY (완전 동일)
    const amSky = items
      .filter(i => i.category === 'SKY' && amTimes.includes(i.fcstTime) && i.fcstValue !== "1")
      .map(i => i.fcstValue);
    const pmSky = items
      .filter(i => i.category === 'SKY' && pmTimes.includes(i.fcstTime) && i.fcstValue !== "1")
      .map(i => i.fcstValue);
      
    // 🔧 개선: SKY 처리 with 초단기실황 안전 대체
    let amSkyValue = "1";
    if(date === todayDate) {
        amSkyValue = itemsSshort?.find(i => (i.category === 'SKY' && amTimes.includes(i.fcstTime)))?.obsrValue ?? 
                    items.find(i => (i.category === 'SKY' && amTimes.includes(i.fcstTime)))?.fcstValue ?? '1';
    } else if (amSky.includes("4")) {
        amSkyValue = "4";
    } else if (amSky.includes("3")) {
        amSkyValue = "3";
    }
    
    let pmSkyValue = "1";
    if (pmSky.includes("4")) {
        pmSkyValue = "4";
    } else if (pmSky.includes("3")) {
        pmSkyValue = "3";
    }

    // ✅ 기존 기능: 오전/오후 WSD (완전 동일)
    const amWsd = items
      .filter(i => i.category === 'WSD' && amTimes.includes(i.fcstTime))
      .map(i => parseFloat(i.fcstValue));
    const pmWsd = items
      .filter(i => i.category === 'WSD' && pmTimes.includes(i.fcstTime))
      .map(i => parseFloat(i.fcstValue));

    const amWindy = amWsd.some(val => val >= 2.8);
    const pmWindy = pmWsd.some(val => val >= 2.8);

    return {
      date,
      tmx,
      tmn,
      amPty: amPtyValue,
      pmPty: pmPtyValue,
      amSky: amSkyValue,
      pmSky: pmSkyValue,
      amWindy,
      pmWindy,
    };
  });

  return result;
}

export const useShortWeather = (
    lat?: number, 
    lon?: number,
    date?: string, 
    nowTime?: string, 
    shortDate?: string, 
    shortTime?: string,
    // 🔧 추가: 초단기실황 안전 처리용 매개변수
    ultraSafeDate?: string,
    ultraSafeTime?: string,
    retryWaitMs?: number,
    isUpdateWindow?: boolean
) => {
    const gridCoords = useGridCoords(lat, lon);
    const [summary, setSummary] = useState<IShortWeather[]>([]);
    const [error, setError] = useState('');
    const [isRetrying, setIsRetrying] = useState(false);

    // 🔧 추가: 안전한 초단기실황 데이터 요청 함수
    const fetchUltraSafeData = async (safeDate: string, safeTime: string) => {
        try {
            const response = await fetch(
                `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=9b3CODM26QpRZg3h6ZdqFpT%2B2jA9iLE8IbW2VHyx6ZqAiCO9c7%2FJiUhO94PdJJzKR5xOzCSyoUI9uBpO9ELYkQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${safeDate}&base_time=${safeTime}&nx=${gridCoords?.x}&ny=${gridCoords?.y}`
            );
            const data = await response.json();
            
            // API 응답 검증
            if (data.response?.header?.resultCode === "00" && data.response?.body?.items?.item) {
                return data.response.body.items.item;
            }
            return null;
        } catch (err) {
            console.warn('초단기실황 요청 실패:', err);
            return null;
        }
    };

    // 🔧 메인 데이터 요청 함수
    const fetchWeatherData = async() => {
        if (lat === undefined || lon === undefined || !gridCoords || !shortDate || !shortTime || !date || !ultraSafeDate || !ultraSafeTime) return;
        
        try{
            // ✅ 기존 기능: 단기예보 요청 (완전 동일)
            const res = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=9b3CODM26QpRZg3h6ZdqFpT%2B2jA9iLE8IbW2VHyx6ZqAiCO9c7%2FJiUhO94PdJJzKR5xOzCSyoUI9uBpO9ELYkQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${shortDate}&base_time=${shortTime}&nx=${gridCoords?.x}&ny=${gridCoords?.y}`);
            const data = await res.json();
            const items = data.response.body.items.item;

            // 🔧 개선: 안전한 초단기실황 요청
            const itemsSshort = await fetchUltraSafeData(ultraSafeDate, ultraSafeTime);

            setSummary(processForecast(items, itemsSshort, date, nowTime!));
            setError('');

            // 🔧 추가: 업데이트 시간대면 재시도 예약
            if (isUpdateWindow && retryWaitMs && retryWaitMs > 0 && !isRetrying) {
                setIsRetrying(true);
                setTimeout(async () => {
                    try {
                        // 현재 시간 데이터로 재시도
                        const retryItemsSshort = await fetchUltraSafeData(date, nowTime!);
                        if (retryItemsSshort) {
                            setSummary(processForecast(items, retryItemsSshort, date, nowTime!));
                        }
                    } catch (err) {
                        console.warn('재시도 실패:', err);
                    } finally {
                        setIsRetrying(false);
                    }
                }, retryWaitMs);
            }

        } catch (err: any) {
            setError('3일간의 날씨 정보를 불러오는데 실패했습니다.')
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [lat, lon, gridCoords, shortDate, shortTime, date, nowTime, ultraSafeDate, ultraSafeTime])

    return { summary, error, isRetrying };
};