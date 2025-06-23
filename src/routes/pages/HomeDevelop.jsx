import React, { useEffect, useState } from 'react';
import Weather from '../../components/Weather';
import OneLineCardSet from '../../components/OneLineCardSet';
import TwoLineCardSet from '../../components/TwoLineCardSet';
import CarSupplies from '../../components/CarSupplies';
import Gnb from '../../components/Gnb';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Weather.css';
import '../../styles/Home.css';
import '../../styles/Gnb.css'
import '../../styles/facilityCard.css';
import { useGeoLocation} from '../../hooks/useGeoLocation';
import { useGeoCoder} from '../../hooks/useGeoCoder';

  const mockMenus =
  [
    {title: "날씨", targetId: "weather"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
    {title: "차량용품", targetId: "supplies"}
  ];

const HomeDevelop = () => {
  const { location } = useGeoLocation();
  
  const { address: addressArray } = useGeoCoder(location?.latitude, location?.longitude);

  const [washQuery, setWashQuery] = useState('');
  const [repairQuery, setRepairQuery] = useState('');
  
  useEffect(() => {
  if (Array.isArray(addressArray) && addressArray.length > 0) {
      // 주소 문자열을 추출합니다.
      const addressString = addressArray[0].unitAddress;
      
      const addressParts = addressString.split(' ');
      if (addressParts.length >= 2) {
        // '세차장'과 '정비소' 검색어를 각각 생성하여 상태에 저장합니다.
        setWashQuery(`${addressParts[0]} ${addressParts[1]} 세차장`);
        setRepairQuery(`${addressParts[0]} ${addressParts[1]} 정비소`);
      }
    }
  }, [addressArray]); // addressArray가 변경될 때 이 useEffect를 실행합니다.

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="weather">
        <Weather />
      </span>
      <span  id="carwash">
        <OneLineCardSet title={"세차장"} lat={location?.latitude} lng={location?.longitude} query={washQuery}/>
      </span>
      <span  id="setting">
        <OneLineCardSet title={"정비소"} lat={location?.latitude} lng={location?.longitude} query={repairQuery}/>
      </span>
      <span  id="supplies">
        <CarSupplies/>
      </span>
    </div>
  );
};

export default HomeDevelop;