// src/components/Detailmap.jsx

import React, { useEffect, useRef } from 'react';

function DetailMap({ latitude, longitude }) {
  const mapContainerRef = useRef(null);
  
  // latitude 또는 longitude 값이 변경될 때마다 지도를 다시 그립니다.
  useEffect(() => {
    // 위도, 경도, 또는 지도를 담을 div가 준비되지 않았으면 아무것도 하지 않습니다.
    if (typeof latitude !== 'number' || typeof longitude !== 'number' || !mapContainerRef.current) {
      return;
    }

    // Google Maps API 스크립트가 로드되었는지 확인합니다.
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }
    
    const initMap = async () => {
      try {
        const { Map } = await window.google.maps.importLibrary("maps");
        const { Marker } = await window.google.maps.importLibrary("marker");

        const position = { lat: latitude, lng: longitude };

        // 지도 생성
        const map = new Map(mapContainerRef.current, {
          center: position,
          zoom: 16,
          disableDefaultUI: true, // 상세 페이지에서는 UI를 숨기는 것이 깔끔합니다.
        });

        // 해당 위치에 마커 생성
        new Marker({
          position: position,
          map: map,
        });

      } catch (error) {
        console.error("Google 지도 초기화 중 에러 발생:", error);
      }
    };

    initMap();

  }, [latitude, longitude]);

  // 지도를 담을 컨테이너 div만 렌더링합니다.
  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default DetailMap;