import { useState, useEffect } from 'react';
import { useRegionCode } from './useRegionCode';
import { IAddress } from './useGeoCoder';

interface IMidWeather {
    day: number; // 4~10
    amSky: string;
    pmSky: string;
    taMax: string;
    taMin: string;
}


export const useMidForecast = (addressObj?: IAddress, tmFc?: string) => {
  const { tempRegId, castRegId, error: regionError } = useRegionCode(addressObj);
  const [forecast, setForecast] = useState<IMidWeather[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!tempRegId || !castRegId || !tmFc) {
      setForecast([]);
      setError(regionError || '예보구역코드 또는 발표시각이 없습니다.');
      return;
    }
    const fetchMidForecast = async () => {
      try {
        // 중기육상예보 API 요청
        const resMid = await fetch(
          `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=9b3CODM26QpRZg3h6ZdqFpT%2B2jA9iLE8IbW2VHyx6ZqAiCO9c7%2FJiUhO94PdJJzKR5xOzCSyoUI9uBpO9ELYkQ%3D%3D&regId=${castRegId}&tmFc=${tmFc}&dataType=JSON`
        );
        const dataMid = await resMid.json();
        const midItem = dataMid.response.body.items.item[0];
        // 중기기온예보 API 요청
        const resTemp = await fetch(
          `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=9b3CODM26QpRZg3h6ZdqFpT%2B2jA9iLE8IbW2VHyx6ZqAiCO9c7%2FJiUhO94PdJJzKR5xOzCSyoUI9uBpO9ELYkQ%3D%3D&regId=${tempRegId}&tmFc=${tmFc}&dataType=JSON`
        );
        const dataTemp = await resTemp.json();
        const tempItem = dataTemp.response.body.items.item[0];

        // 데이터 가공
        const result: IMidWeather[] = [];
        for (let day = 4; day <= 10; day++) {
          result.push({
            day,
            amSky: day <= 7 ? midItem[`wf${day}Am`] : midItem[`wf${day}`],
            pmSky: day <= 7 ? midItem[`wf${day}Pm`] : midItem[`wf${day}`],
            taMax: tempItem[`taMax${day}`].toString(),
            taMin: tempItem[`taMin${day}`].toString(),
          });
        }

        setForecast(result);
        setError('');
      } catch (err) {
        setError('중기예보 정보를 불러오는데 실패했습니다.');
        setForecast([]);
      }
    };
    fetchMidForecast();
  }, [tempRegId, castRegId, tmFc, regionError]);

  return { forecast, error };
};