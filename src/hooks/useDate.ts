import { useState, useEffect } from 'react';

interface IDate {
  date: string;      // YYYYMMDD
  shortTime: string; // 단기예보 base_time (HHmm)
  shortDate: string; // 단기예보 base_date (YYYYMMDD)
  midTime: string;   // 중기예보 tmFc (HHmm)
  midDate: string;   // 중기예보 tmFc용 날짜 (YYYYMMDD)
  nowTime: string;   // 현재시각 (HHmm)
}

const pad = (n: number) => n.toString().padStart(2, '0');

function getShortForecastBase(now: Date): { date: string; time: string } {
  // 단기예보 공식 발표 시각
  const baseTimes = [2, 5, 8, 11];
  const hour = now.getHours();
  const minute = now.getMinutes();

  // 현재 시각보다 이전의 가장 가까운 예보 시각 찾기
  let baseHour = baseTimes.slice().reverse().find(h => hour > h || (hour === h && minute >= 0));
  let baseDate = new Date(now);

  if (baseHour === undefined) {
    // 0시~1시59분은 전날 23시
    baseHour = 23;
    baseDate.setDate(baseDate.getDate() - 1);
  }

  const dateStr = `${baseDate.getFullYear()}${pad(baseDate.getMonth() + 1)}${pad(baseDate.getDate())}`;
  const timeStr = `${pad(baseHour)}00`;

  return { date: dateStr, time: timeStr };
}

function getMidForecastBase(now: Date): { date: string; time: string } {
  // 중기예보 공식 발표 시각
  const baseTimes = [6];
  const hour = now.getHours();
  const minute = now.getMinutes();

  let baseHour = baseTimes.slice().reverse().find(h => hour > h || (hour === h && minute >= 0));
  let baseDate = new Date(now);

  if (baseHour === undefined) {
    // 0시~5시59분은 전날 06시
    baseHour = 6;
    baseDate.setDate(baseDate.getDate() - 1);
  }

  const dateStr = `${baseDate.getFullYear()}${pad(baseDate.getMonth() + 1)}${pad(baseDate.getDate())}`;
  const timeStr = `${pad(baseHour)}00`;

  return { date: dateStr, time: timeStr };
}

const formatNow = (d: Date): IDate => {
  const nowTime = `${pad(d.getHours())}00`;

  const { date: shortDate, time: shortTime } = getShortForecastBase(d);
  const { date: midDate, time: midTime } = getMidForecastBase(d);

  return {
    date: `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`,
    shortTime,
    shortDate,
    midTime,
    midDate,
    nowTime,
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