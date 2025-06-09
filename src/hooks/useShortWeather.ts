import { useState, useEffect } from 'react'
import { useGridCoords } from './useGridCoords'


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
  // 기타 필요한 필드
};

function processForecast(items, itemsSshort, todayDate: string, nowTime:string): IShortWeather[] {
  // 날짜별로 그룹핑
  const byDate = {};
  items.forEach(item => {
    const date = item.fcstDate;
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });

  // 날짜별 결과 생성
  const result = Object.entries(byDate).map(([date, dayItems]) => {
    const items = dayItems as ForecastItem[];
    // 최고/최저 기온
    const tmx = (items.find(i => i.category === 'TMX')?.fcstValue ?? '').split('.')[0];

    let tmn: string;
    if(date === todayDate) {
        tmn = (itemsSshort.find(i => i.category === 'T1H')?.obsrValue ?? '').split('.')[0];
    } else {
        tmn = (items.find(i => i.category === 'TMN')?.fcstValue ?? '').split('.')[0];
    }



    // 오전/오후 시간대 분리
    const amTimes = ["0000","0100","0200","0300","0400","0500","0600","0700","0800","0900","1000","1100"];
    const pmTimes = ["1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300"];

    // 오전 PTY
    const amPty = items
      .filter(i => i.category === 'PTY' && amTimes.includes(i.fcstTime) && i.fcstValue !== "0")
      .map(i => i.fcstValue);

    // 오후 PTY
    const pmPty = items
      .filter(i => i.category === 'PTY' && pmTimes.includes(i.fcstTime) && i.fcstValue !== "0")
      .map(i => i.fcstValue);

    // 오전/오후 PTY: 0이 아닌 값이 있으면 그 중 첫 번째 값, 없으면 0
    let amPtyValue: string;
    if(date === todayDate) {
        amPtyValue = itemsSshort.find(i => i.category === 'PTY')?.obsrValue ?? '';
    } else {
        amPtyValue = amPty.length > 0 ? amPty[0] : "0";
    }
    const pmPtyValue = pmPty.length > 0 ? pmPty[0] : "0";

       // 오전 SKY
    const amSky = items
      .filter(i => i.category === 'SKY' && amTimes.includes(i.fcstTime) && i.fcstValue !== "1")
      .map(i => i.fcstValue);
    // 오후 SKY
    const pmSky = items
      .filter(i => i.category === 'SKY' && pmTimes.includes(i.fcstTime) && i.fcstValue !== "1")
      .map(i => i.fcstValue);
    // 오전/오후 SKY: 4가 있으면 4, 3이 있으면 3, 둘 다 없으면 1
    let amSkyValue = "1";
    if(date === todayDate) {
        amSkyValue = items.find(i => (i.category === 'SKY' && amTimes.includes(i.fcstTime)))?.fcstValue ?? '';
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

    // 오전/오후 WSD
    const amWsd = items
      .filter(i => i.category === 'WSD' && amTimes.includes(i.fcstTime))
      .map(i => parseFloat(i.fcstValue));
    const pmWsd = items
      .filter(i => i.category === 'WSD' && pmTimes.includes(i.fcstTime))
      .map(i => parseFloat(i.fcstValue));

    // 오전/오후 풍속: 2.8 이상인 값이 하나라도 있으면 true, 아니면 false
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

export const useShortWeather = (lat?: number, lon?: number,date?:string, nowTime?:string, shortDate?: string, shortTime?: string) => {
    const gridCoords = useGridCoords(lat, lon);
    const [summary, setSummary] = useState<IShortWeather[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (lat === undefined || lon === undefined || !gridCoords || !shortDate || !shortTime || !date || !nowTime) return;
        const fatchLocation = async() => {
            try{
                const res = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=9b3CODM26QpRZg3h6ZdqFpT%2B2jA9iLE8IbW2VHyx6ZqAiCO9c7%2FJiUhO94PdJJzKR5xOzCSyoUI9uBpO9ELYkQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${shortDate}&base_time=${shortTime}&nx=${gridCoords?.x}&ny=${gridCoords?.y}`);
                const data = await res.json();
                const items = data.response.body.items.item;
                
                const resSshort = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=9b3CODM26QpRZg3h6ZdqFpT%2B2jA9iLE8IbW2VHyx6ZqAiCO9c7%2FJiUhO94PdJJzKR5xOzCSyoUI9uBpO9ELYkQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${date}&base_time=${nowTime}&nx=${gridCoords?.x}&ny=${gridCoords?.y}`);                
                const dataSshort = await resSshort.json();
                const itemsSshort  = dataSshort.response.body.items.item;


                setSummary(processForecast(items, itemsSshort, date, nowTime));
                setError('')
            }catch (err: any) {
                setError('3일간의 날씨 정보를 불러오는데 실패했습니다.')
            }
        }
        fatchLocation()
    }, [lat, lon, gridCoords, shortDate, shortTime, date, nowTime])

    return { summary , error}
}