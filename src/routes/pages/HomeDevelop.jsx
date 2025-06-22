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
import { useGeoCoder } from '../../hooks/useGeoCoder';

  const mockMenus =
  [
    {title: "날씨", targetId: "weather"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
    {title: "차량용품", targetId: "supplies"}
  ];

    

const HomeDevelop = () => {
  const { location } = useGeoLocation();
  const { address: geoCoderAddress, error: geoCoderError } = useGeoCoder(location?.latitude, location?.longitude);

    let currentCity = '';
  let currentDistrict = '';
  if (geoCoderAddress && geoCoderAddress.length > 0) { // geoCoderAddress가 유효한지 확인
    currentCity = geoCoderAddress[0].city; // 예: "구미시"
    const fullAddressParts = geoCoderAddress[0].address.split(' '); // 전체 주소 문자열을 공백으로 분리
    if (fullAddressParts.length >= 3) { // 배열의 길이가 '도 시 동' 최소한 3부분인지 확인
      currentDistrict = fullAddressParts[2]; // 세 번째 부분이 동(읍/면) 이름일 가능성이 높음
    }
  }

  // API 쿼리 문자열을 조합하는 헬퍼 함수
  const getQueryString = (categoryTitle) => {
    if (currentCity && currentDistrict) {
      // 도시와 동 정보가 모두 있으면 "도시 동 카테고리" 형태
      return `${currentCity} ${currentDistrict} ${categoryTitle}`;
    } else if (currentCity) {
      // 도시 정보만 있으면 "도시 카테고리" 형태
      return `${currentCity} ${categoryTitle}`;
    }
    // 둘 다 없으면 카테고리만 (최후의 수단, API가 이 형태도 지원해야 함)
    return categoryTitle;
  };

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="weather">
        <Weather />
      </span>
      <span  id="carwash">
        <OneLineCardSet title={"세차장"} lat={location?.latitude} lng={location?.longitude}/>
      </span>
      <span  id="setting">
        <OneLineCardSet title={"정비소"}/>
      </span>
      <span  id="supplies">
        <CarSupplies/>
      </span>
    </div>
  );
};

export default HomeDevelop;