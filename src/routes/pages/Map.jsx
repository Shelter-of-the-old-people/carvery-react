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

const mockMenus =
  [
    {title: "지도", targetId: "map"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
  ];

const Map = () => {
  const { location: initialLocation } = useGeoLocation();

  // location 상태는 초기에는 null로 설정하고, initialLocation이 준비되면 업데이트합니다.
  const [location, setLocation] = useState(null); 
  //const [carWashList, setCarWashList] = useState([]);

  // 이 useEffect는 initialLocation이 처음으로 유효한 값을 가질 때 한 번 실행되도록 합니다.
  useEffect(() => {
    if (initialLocation && !location) { // initialLocation이 있고, location이 아직 설정되지 않았을 때
      setLocation(initialLocation);
    }
  }, [initialLocation, location]); // location이 변경될 때도 이 훅이 재실행될 수 있도록 의존성 추가

  // location 상태가 변경될 때 (사용자가 마커를 드래그하거나 초기 위치 설정 시) API를 호출합니다.
//   useEffect(() => {
//   if (location && location.latitude && location.longitude) {
//     fetchNearbyData(location.latitude, location.longitude)
//       .then(response => {
//         // API가 서버로부터 받은 원본 데이터를 그대로 출력합니다.
//         console.log('API로부터 받은 실제 데이터:', response); // <--- 이 로그를 확인하세요!
        
//         // 그 다음에 상태를 업데이트합니다.
//         setCarWashList(response);
//       })
//       .catch(err => console.error('API 오류:', err));
//   }
// }, [location]); // location 객체 자체를 의존성으로 추가
  
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
        />
      </span>
      <span id="setting"><OneLineCardSet title={'정비소'} /></span>
    </div>
  );
};

export default Map;