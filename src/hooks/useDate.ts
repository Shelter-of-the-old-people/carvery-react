import { useState, useEffect } from 'react';

/**
 * 설계 명세: 기상청 API 가이드 기반 안전한 시간 계산
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - 초단기실황용 안전 시간 계산 로직 추가
 * - API 업데이트 시간(정시~09분) 감지 및 대응
 * - 기존 모든 기능 100% 보존
 * 
 * 사용처: useShortWeather에서 안전한 초단기실황 요청
 * 근원지: API 가이드 "정시 생성 → 10분 후 제공" 특성 대응
 */

interface IDate {
  date: string;           // YYYYMMDD
  shortTime: string;      // 단기예보 base_time (HHmm)
  shortDate: string;      // 단기예보 base_date (YYYYMMDD)
  midTime: string;        // 중기예보 tmFc (HHmm)
  midDate: string;        // 중기예보 tmFc용 날짜 (YYYYMMDD)
  nowTime: string;        // 현재시각 (HHmm)
  
  // 🔧 추가: 초단기실황용 안전 시간
  ultraSafeTime: string;  // 초단기실황용 안전한 base_time (HHmm)
  ultraSafeDate: string;  // 초단기실황용 안전한 base_date (YYYYMMDD)
  retryWaitMs: number;    // 다음 안전 시간까지 대기 시간 (밀리초)
  isUpdateWindow: boolean; // 현재 API 업데이트 시간대 여부
}

const pad = (n: number) => n.toString().padStart(2, '0');

function getShortForecastBase(now: Date): { date: string; time: string } {
  // ✅ 기존 기능: 단기예보 공식 발표 시각 (기존과 동일)
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
  // ✅ 기존 기능: 중기예보 공식 발표 시각 (기존과 동일)
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

// 🔧 추가: 초단기실황용 안전 시간 계산
function getUltraSafeTime(now: Date): { 
  date: string; 
  time: string; 
  retryWaitMs: number;
  isUpdateWindow: boolean;
} {
  const minutes = now.getMinutes();
  const isUpdateTime = minutes < 10; // 정시~09분은 업데이트 시간
  
  if (isUpdateTime) {
    // 🔧 업데이트 시간대: 이전 시간 데이터 사용
    const safeDate = new Date(now);
    safeDate.setHours(now.getHours() - 1);
    
    // 0시면 전날 23시로
    if (safeDate.getHours() < 0) {
      safeDate.setHours(23);
      safeDate.setDate(safeDate.getDate() - 1);
    }
    
    const waitMs = (10 - minutes) * 60 * 1000; // 10분까지 남은 시간
    
    return {
      date: `${safeDate.getFullYear()}${pad(safeDate.getMonth() + 1)}${pad(safeDate.getDate())}`,
      time: `${pad(safeDate.getHours())}00`,
      retryWaitMs: waitMs,
      isUpdateWindow: true
    };
  } else {
    // 🔧 안전 시간대: 현재 시간 데이터 사용
    return {
      date: `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`,
      time: `${pad(now.getHours())}00`,
      retryWaitMs: 0,
      isUpdateWindow: false
    };
  }
}

const formatNow = (d: Date): IDate => {
  // ✅ 기존 기능: 모든 기존 시간 계산 (완전 보존)
  const nowTime = `${pad(d.getHours())}00`;
  const { date: shortDate, time: shortTime } = getShortForecastBase(d);
  const { date: midDate, time: midTime } = getMidForecastBase(d);
  
  // 🔧 추가 기능: 초단기실황용 안전 시간 계산
  const { date: ultraSafeDate, time: ultraSafeTime, retryWaitMs, isUpdateWindow } = getUltraSafeTime(d);

  return {
    // ✅ 기존 필드들 (완전 보존)
    date: `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`,
    shortTime,
    shortDate,
    midTime,
    midDate,
    nowTime,
    
    // 🔧 새 필드들 (초단기실황 안전 처리용)
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