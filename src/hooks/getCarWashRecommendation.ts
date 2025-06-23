interface IWeather {
    day: string;
    tmx: string;    // 최고기온
    tmn: string;    // 최저기온
    amIcon?: string; // 오전 날씨 아이콘
    pmIcon?: string; // 오후 날씨 아이콘
}

interface CarWashAnalysis {
    recommendation: string;
    reason: string;
    priority: number; // 1~5 (1이 가장 긴급)
}

function analyzeTodayWeather(todayWeather: IWeather, todayMinTemp: string): {
    hasRainSnow: boolean;
    isTooCold: boolean;
    isTooHot: boolean;
    isWindy: boolean;
    maxTemp: number;
    minTemp: number;
} {
    const maxTemp = parseInt(todayWeather.tmx) || 0;
    const minTemp = parseInt(todayMinTemp) || parseInt(todayWeather.tmn) || 0;
    
    const hasRainSnow = 
        todayWeather.amIcon === 'rainy' || 
        todayWeather.pmIcon === 'rainy' ||
        todayWeather.amIcon === 'snowy' || 
        todayWeather.pmIcon === 'snowy';
    
    const isWindy = 
        todayWeather.amIcon === 'windy' || 
        todayWeather.pmIcon === 'windy';
    
    const isTooCold = maxTemp < 5;
    const isTooHot = maxTemp > 30;
    
    return {
        hasRainSnow,
        isTooCold,
        isTooHot,
        isWindy,
        maxTemp,
        minTemp
    };
}

function analyzeWeeklyForecast(weathers: IWeather[]): {
    rainSnowDays: number[];
    hasRainSnowIn3Days: boolean;
    hasRainSnowIn7Days: boolean;
    nextRainSnowDay: number | null;
} {
    const rainSnowDays: number[] = [];
    
    weathers.slice(1, 8).forEach((weather, index) => {
        const dayNumber = index + 1;
        const hasRainSnow = 
            weather.amIcon === 'rainy' || 
            weather.pmIcon === 'rainy' ||
            weather.amIcon === 'snowy' || 
            weather.pmIcon === 'snowy';
            
        if (hasRainSnow) {
            rainSnowDays.push(dayNumber);
        }
    });
    
    const hasRainSnowIn3Days = rainSnowDays.some(day => day <= 3);
    const hasRainSnowIn7Days = rainSnowDays.length > 0;
    const nextRainSnowDay = rainSnowDays.length > 0 ? rainSnowDays[0] : null;
    
    return {
        rainSnowDays,
        hasRainSnowIn3Days,
        hasRainSnowIn7Days,
        nextRainSnowDay
    };
}

export function getCarWashRecommendation(
    weathers: IWeather[], 
    todayMinTemp: string
): CarWashAnalysis {
    
    if (!weathers || weathers.length === 0) {
        return {
            recommendation: "날씨 정보를 불러오는 중입니다.",
            reason: "데이터 로딩 중",
            priority: 5
        };
    }
    
    const todayWeather = weathers[0];
    const todayAnalysis = analyzeTodayWeather(todayWeather, todayMinTemp);
    const weeklyAnalysis = analyzeWeeklyForecast(weathers);
    
    // 1순위: 오늘 비/눈이 오는 경우
    if (todayAnalysis.hasRainSnow) {
        const weatherType = (todayWeather.amIcon === 'snowy' || todayWeather.pmIcon === 'snowy') ? '눈' : '비';
        return {
            recommendation: "세차하기 좋은 날씨가 아닙니다.",
            reason: `오늘 ${weatherType}가 예보되어 있습니다.`,
            priority: 1
        };
    }
    
    // 2순위: 오늘은 괜찮지만 너무 추운 경우 
    if (todayAnalysis.isTooCold) {
        return {
            recommendation: "날씨가 너무 추워서 세차하기 힘듭니다.",
            reason: `최고기온이 ${todayAnalysis.maxTemp}°C로 너무 춥습니다.`,
            priority: 2
        };
    }
    
    // 3순위: 오늘은 괜찮지만 너무 더운 경우
    if (todayAnalysis.isTooHot) {
        return {
            recommendation: "날씨가 너무 더워서 세차하기 힘듭니다.",
            reason: `최고기온이 ${todayAnalysis.maxTemp}°C로 너무 덥습니다.`,
            priority: 2
        };
    }
    
    // 4순위: 3일 이내 비/눈 예보
    if (weeklyAnalysis.hasRainSnowIn3Days) {
        const nextDay = weeklyAnalysis.nextRainSnowDay;
        return {
            recommendation: "근시일 내 비나 눈 소식이 있습니다.",
            reason: `${nextDay}일 후 비나 눈이 예보되어 있습니다.`,
            priority: 3
        };
    }
    
    // 5순위: 바람이 강한 경우 (주의 멘트)
    if (todayAnalysis.isWindy) {
        return {
            recommendation: "세차하기 좋지만 바람이 강합니다.",
            reason: "강한 바람으로 인해 먼지가 다시 쌓일 수 있습니다.",
            priority: 4
        };
    }
    
    // 6순위: 일주일 내 비/눈 예보 (정보성)
    if (weeklyAnalysis.hasRainSnowIn7Days) {
        const nextDay = weeklyAnalysis.nextRainSnowDay;
        return {
            recommendation: "세차하기 좋은 날입니다!",
            reason: `${nextDay}일 후 비 예보가 있으니 오늘 세차하세요.`,
            priority: 5
        };
    }
    
    // 7순위: 모든 조건이 완벽한 경우
    return {
        recommendation: "세차하기 완벽한 날입니다!",
        reason: `맑은 날씨에 적정 기온(${todayAnalysis.maxTemp}°C)입니다.`,
        priority: 5
    };
}

// 🔧 추가: 상세 날씨 정보 제공 함수
export function getDetailedWeatherInfo(weathers: IWeather[], todayMinTemp: string): {
    todayTemp: { min: number; max: number };
    todayCondition: string;
    weeklyRainDays: number[];
    overallCondition: 'excellent' | 'good' | 'fair' | 'poor';
} {
    const todayWeather = weathers[0];
    const todayAnalysis = analyzeTodayWeather(todayWeather, todayMinTemp);
    const weeklyAnalysis = analyzeWeeklyForecast(weathers);
    
    // 오늘 날씨 상태 텍스트
    let todayCondition = "맑음";
    if (todayAnalysis.hasRainSnow) {
        todayCondition = (todayWeather.amIcon === 'snowy' || todayWeather.pmIcon === 'snowy') ? "눈" : "비";
    } else if (todayAnalysis.isWindy) {
        todayCondition = "강풍";
    } else if (todayWeather.amIcon === 'cloudy' || todayWeather.pmIcon === 'cloudy') {
        todayCondition = "구름많음";
    } else if (todayWeather.amIcon === 'overcast' || todayWeather.pmIcon === 'overcast') {
        todayCondition = "흐림";
    }
    
    // 전체적인 세차 조건 평가
    let overallCondition: 'excellent' | 'good' | 'fair' | 'poor' = 'excellent';
    if (todayAnalysis.hasRainSnow || todayAnalysis.isTooCold || todayAnalysis.isTooHot) {
        overallCondition = 'poor';
    } else if (weeklyAnalysis.hasRainSnowIn3Days || todayAnalysis.isWindy) {
        overallCondition = 'fair';
    } else if (weeklyAnalysis.hasRainSnowIn7Days) {
        overallCondition = 'good';
    }
    
    return {
        todayTemp: {
            min: todayAnalysis.minTemp,
            max: todayAnalysis.maxTemp
        },
        todayCondition,
        weeklyRainDays: weeklyAnalysis.rainSnowDays,
        overallCondition
    };
}