import { useState, useEffect } from 'react';
import { IAddress } from './useGeoCoder';

// IAddress는 프로젝트 내 다른 Hook에서 이미 정의됨
// 예시: interface IAddress { Address: string; state: string; city: string; }

interface IRegionCodeResult {
  regionName: string | null;
  tempRegId: string | null;
  castRegId: string | null;
  error?: string;
}

export const useRegionCode = (addressObj?: IAddress) => {
  const [result, setResult] = useState<IRegionCodeResult>({ regionName: null, tempRegId: null, castRegId:null, error: '' });

  useEffect(() => {
    if(!addressObj){
      setResult({ regionName: null, tempRegId: null, castRegId:null, error: '주소 정보가 부족합니다.' });
      return;
    }
    const address = addressObj[0];

    const fetchRegionCodes = async () => {
      try {
        // 예보구역정보 전체 목록 요청 (numOfRows는 충분히 크게)
        const res = await fetch(
          `/apihub/api/typ02/openApi/FcstZoneInfoService/getFcstZoneCd?pageNo=1&numOfRows=1000&dataType=JSON&authKey=v0vzKwyERqiL8ysMhFaoag`
        );
        const register = await res.text();
        const data = JSON.parse(register);
        const items = data.response.body.items.item;


        // state와 city를 모두 포함하는 구역명을 우선적으로 찾음
        let tempMatched = items.find((item: any) =>
          item.regName.includes(address.state) && item.regName.endsWith(address.city)
        );
        
        let castMached = items.find((item: any) => item.regName.endsWith(address.state));

        const regex = /[시군구]$/;

        // 없으면 city만 포함하는 구역명을 찾음 (접미사 '시', '군', '구' 제거)
        if (!tempMatched) {
          const cityKey = address.city.replace(regex, '');
          tempMatched = items.find((item: any) =>
            item.regName.endsWith(cityKey)
          );
          
        }

        if (tempMatched && castMached) {
          setResult({
            regionName: tempMatched.regName,
            tempRegId: tempMatched.regId,
            castRegId: castMached.regId,
            error: ''
          });
        } else {
          setResult({ regionName: null, tempRegId: null, castRegId:null, error: '해당 주소에 대한 예보구역코드를 찾을 수 없습니다.' });
        }
      } catch (err) {
        console.error('fetchRegionCodes 에러:', err);
        setResult({  regionName: null, tempRegId: null, castRegId:null, error: '예보구역정보 조회에 실패했습니다.' });
      }
    };

    fetchRegionCodes();
  }, [addressObj]);

  return result;
};