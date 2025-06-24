import React, { useEffect, useState } from 'react';
import MapCard from '../../components/MapCard'; // MapCard 임포트 경로 확인
import Gnb from '../../components/Gnb';
import OneLineCardSet from '../../components/OneLineCardSet';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Home.css';
import '../../styles/searchMap.css';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { fetchNearbyData } from '../../api/NearbyApi';
import { useGeoCoder } from '../../hooks/useGeoCoder';

const mockMenus =
  [
    {title: "지도", targetId: "map"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
  ];

const Map = () => {
  const { location: initialLocation, error: locationError } = useGeoLocation();

  console.log('초기 위치:', initialLocation);
  // location 상태는 초기에는 null로 설정하고, initialLocation이 준비되면 업데이트합니다.
  const [location, setLocation] = useState(null); 
  //const [carWashList, setCarWashList] = useState([]);

   // 세차장과 정비소 검색어를 각각 저장할 state를 추가
  const [washQuery, setWashQuery] = useState('');
  const [repairQuery, setRepairQuery] = useState('');

  const { address: mapAddressArray } = useGeoCoder(location?.latitude, location?.longitude);
  // 이 useEffect는 initialLocation이 처음으로 유효한 값을 가질 때 한 번 실행되도록 합니다.
  useEffect(() => {
    if (initialLocation && !location) { // initialLocation이 있고, location이 아직 설정되지 않았을 때
      setLocation(initialLocation);
    }
  }, [initialLocation, location]); // location이 변경될 때도 이 훅이 재실행될 수 있도록 의존성 추가
  
  console.log('mapAddressArray:', mapAddressArray);

useEffect(() => {
  // mapAddressArray에 유효한 값이 있는지 확인합니다.
  if (mapAddressArray && mapAddressArray.length > 0) {
    const addressString = mapAddressArray[0].unitAddress;

    // 1. 공백으로 주소를 나눈 뒤, filter(Boolean)으로 빈 문자열을 배열에서 제거합니다.
    const addressParts = addressString.split(' ').filter(Boolean);

    // 2. 유효한 주소 부분이 2개 이상 있는지 확인합니다. (예: '구미시', '원평동')
    //    '경상북도'까지 포함하면 3개 이상이므로 length >= 3 으로 확인하는 것이 더 안전합니다.
    if (addressParts.length >= 3) {
      // 3. 깨끗하게 정제된 배열에서 원하는 부분을 조합합니다.
      const baseAddress = `${addressParts[1]} ${addressParts[2]}`; // "구미시 원평동"
      
      setWashQuery(`${baseAddress} 세차장`);   // "구미시 원평동 세차장"
      setRepairQuery(`${baseAddress} 정비소`); // "구미시 원평동 정비소"
    }
  }
}, [mapAddressArray]);

  if (locationError) {
    return (
      <div className="home" style={{ padding: '20px' }}>
        <h1>위치 정보 에러 발생</h1>
        <p>위치 정보를 가져오는 데 실패했습니다. 브라우저의 주소창 왼쪽 자물쇠(🔒) 아이콘을 눌러 위치 권한이 '허용' 상태인지 확인해주세요.</p>
        <p style={{ color: 'red', fontWeight: 'bold' }}>에러 메시지: {locationError}</p>
      </div>
    );
  } 

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span id="map" className="search-map-container">
        {/* location이 null이 아닐 때만 MapCard를 렌더링하여 안전하게 위도/경도를 전달합니다. */}
        {location ? (
          <MapCard
            lat={location.latitude} 
            lng={location.longitude} 
            setLocation={setLocation}
            query={washQuery}
          />
        ) : (
          <div>위치 정보를 불러오는 중입니다...</div> // 위치 정보 로딩 중 표시
        )}
      </span>
      <span id="carwash">
        <OneLineCardSet 
          title={'세차장'} 
          lat={location?.latitude} 
          lng={location?.longitude}
          query={washQuery}
        />
      </span>
      <span id="setting">
        <OneLineCardSet 
        title={'정비소'}
        lat={location?.latitude} 
        lng={location?.longitude}
        query={repairQuery} /></span>
    </div>
  );
};

export default Map;