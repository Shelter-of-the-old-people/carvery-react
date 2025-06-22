import { useState, useEffect } from 'react';

interface IDate {
  date: string;           // YYYYMMDD
  shortTime: string;      // 단기예보 base_time (HHmm)
  shortDate: string;      // 단기예보 base_date (YYYYMMDD)
  midTime: string;        // 중기예보 tmFc (HHmm)
  midDate: string;        // 중기예보 tmFc용 날짜 (YYYYMMDD)
  nowTime: string;        // 현재시각 (HHmm)
  
  ultraSafeTime: string;  // 초단기실황용 안전한 base_time (HHmm)
  ultraSafeDate: string;  // 초단기실황용 안전한 base_date (YYYYMMDD)
  retryWaitMs: number;    // 다음 안전 시간까지 대기 시간 (밀리초)
  isUpdateWindow: boolean; // 현재 API 업데이트 시간대 여부
}

const pad = (n: number) => n.toString().padStart(2, '0');

function getShortForecastBase(now: Date): { date: string; time: string } {
  const baseTimes = [2, 5, 8, 11];
  const hour = now.getHours();
  const minute = now.getMinutes();

  let baseHour = baseTimes.slice().reverse().find(h => hour > h || (hour === h && minute >= 0));
  let baseDate = new Date(now);

  if (baseHour === undefined) {
    baseHour = 23;
    baseDate.setDate(baseDate.getDate() - 1);
  }

  const dateStr = `${baseDate.getFullYear()}${pad(baseDate.getMonth() + 1)}${pad(baseDate.getDate())}`;
  const timeStr = `${pad(baseHour)}00`;

  return { date: dateStr, time: timeStr };
}

function getMidForecastBase(now: Date): { date: string; time: string } {
  const baseTimes = [6];
  const hour = now.getHours();
  const minute = now.getMinutes();

  let baseHour = baseTimes.slice().reverse().find(h => hour > h || (hour === h && minute >= 0));
  let baseDate = new Date(now);

  if (baseHour === undefined) {
    baseHour = 6;
    baseDate.setDate(baseDate.getDate() - 1);
  }

  const dateStr = `${baseDate.getFullYear()}${pad(baseDate.getMonth() + 1)}${pad(baseDate.getDate())}`;
  const timeStr = `${pad(baseHour)}00`;

  return { date: dateStr, time: timeStr };
}

function getUltraSafeTime(now: Date): { 
  date: string; 
  time: string; 
  retryWaitMs: number;
  isUpdateWindow: boolean;
} {
  const minutes = now.getMinutes();
  const isUpdateTime = minutes < 10;
  
  if (isUpdateTime) {
    const safeDate = new Date(now);
    safeDate.setHours(now.getHours() - 1);
    
    if (safeDate.getHours() < 0) {
      safeDate.setHours(23);
      safeDate.setDate(safeDate.getDate() - 1);
    }
    
    const waitMs = (10 - minutes) * 60 * 1000;
    
    return {
      date: `${safeDate.getFullYear()}${pad(safeDate.getMonth() + 1)}${pad(safeDate.getDate())}`,
      time: `${pad(safeDate.getHours())}00`,
      retryWaitMs: waitMs,
      isUpdateWindow: true
    };
  } else {
    return {
      date: `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`,
      time: `${pad(now.getHours())}00`,
      retryWaitMs: 0,
      isUpdateWindow: false
    };
  }
}

const formatNow = (d: Date): IDate => {
  const nowTime = `${pad(d.getHours())}00`;
  const { date: shortDate, time: shortTime } = getShortForecastBase(d);
  const { date: midDate, time: midTime } = getMidForecastBase(d);
  
  const { date: ultraSafeDate, time: ultraSafeTime, retryWaitMs, isUpdateWindow } = getUltraSafeTime(d);

  return {
    date: `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`,
    shortTime,
    shortDate,
    midTime,
    midDate,
    nowTime,
    
    ultraSafeTime,
    ultraSafeDate,
    retryWaitMs,
    isUpdateWindow
  };
};

const useDate = (): IDate => {
  const [now, setNow] = useState<IDate>(() => formatNow(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(formatNow(new Date()));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return now;
};

export default useDate;