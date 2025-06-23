import { useEffect, useRef, useState } from "react";
import styles from '../styles/GoogleMap.module.css';
import MarkerIcon from '../assets/center_marker.svg?react';

function GoogleMap({ latitude, longitude, setLocation, className, markerColor = 'royalblue', query }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [carveries, setCarveries] = useState([]);
  const carveryMarkersRef = useRef([]);
  
  // 정보창(InfoWindow) 인스턴스를 관리할 ref. 하나만 만들어 재사용합니다.
  const infoWindowRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (!latitude || !longitude || !mapContainerRef.current || !window.google) {
        // ... 기존 로직과 동일
        return;
      }

      const { Map } = await window.google.maps.importLibrary("maps");
      const { InfoWindow } = await window.google.maps.importLibrary("maps");

      const map = new Map(mapContainerRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        mapId: 'YOUR_MAP_ID_OR_LEAVE_BLANK',
        disableDefaultUI: false,
        streetViewControl: false,
      });
      mapInstanceRef.current = map;

      // 정보창 인스턴스를 생성하고 ref에 저장합니다.
      infoWindowRef.current = new InfoWindow();

      // const fetchCarveries = async (lat, lng, query) => {
      //   if (!lat || !lng || !query) return;
      //   const params = new URLSearchParams({ lat, lng, query });
      //   try {
      //     const response = await fetch(`/carvery-api/api/carvery/nearby?${params.toString()}`);
      //     if (!response.ok) throw new Error(`API call failed: ${response.status}`);
      //     const data = await response.json();
      //     setCarveries(Array.isArray(data) ? data : []); // 항상 배열을 보장
      //   } catch (error) {
      //     console.error("Failed to fetch carveries:", error);
      //     setCarveries([]);
      //   }
      // };

      useEffect(() => {
          if (lat && lng&&query) {
            fetchNearbyData(lat, lng, query)
              .then(setCarveries)
              .catch(err => console.error('API 오류:', err));
          }
      }, [lat, lng, query]);

      google.maps.event.addListenerOnce(map, 'idle', () => {
        const center = map.getCenter();
        fetchCarveries(center.lat(), center.lng(), query);
      });

      map.addListener('idle', () => {
        const center = map.getCenter();
        if (setLocation) setLocation({ latitude: center.lat(), longitude: center.lng() });
        fetchCarveries(center.lat(), center.lng(), query);
      });
    };

    initMap();
    
    return () => {
      if (mapInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
    };
  }, [query, setLocation]);

  // carveries state가 변경될 때마다 마커를 다시 그리는 useEffect
  useEffect(() => {
    const map = mapInstanceRef.current;
    const infoWindow = infoWindowRef.current;
    if (!map || !infoWindow) return;

    // 1. 기존 마커들 삭제
    carveryMarkersRef.current.forEach(marker => marker.setMap(null));
    carveryMarkersRef.current = [];

    // 2. 새로운 데이터로 마커 생성
    carveries.forEach(item => {
      // [수정됨] 실제 데이터에 맞게 경도 키를 'lng' -> 'lon'으로 변경
      const position = { lat: item.lat, lng: item.lon };

      const marker = new window.google.maps.Marker({
        position: position,
        map: map,
        // [수정됨] 이름 키를 'name' -> 'title'으로 변경
        title: item.title,
      });

      // [기능개선] 마커에 클릭 이벤트 리스너 추가
      marker.addListener('click', () => {
        // 정보창에 표시될 HTML 콘텐츠 생성
        const contentString = `
          <div class="${styles.infoWindow}">
            <h3 class="${styles.infoTitle}">${item.title}</h3>
            <p class="${styles.infoAddress}">${item.address}</p>
            <div class="${styles.infoTags}">
              ${item.infos.map(info => `<span class="${styles.infoTag}">${info}</span>`).join('')}
            </div>
            ${item.call ? `<p class="${styles.infoPhone}">전화: ${item.call}</p>` : ''}
          </div>
        `;
        
        // 정보창 내용 설정 및 열기
        infoWindow.setContent(contentString);
        infoWindow.open({
          anchor: marker,
          map,
        });
      });

      carveryMarkersRef.current.push(marker);
    });
  }, [carveries]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.centerMarker}>
        <div style={{ color: markerColor }}>
            <MarkerIcon className={styles.markerImage} />
        </div>
      </div>
    </div>
  );
}

export default GoogleMap;