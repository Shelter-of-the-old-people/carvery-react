import { useEffect, useRef, useState } from "react";
import styles from '../styles/GoogleMap.module.css';
import MarkerIcon from '../assets/center_marker.svg?react';
import { fetchNearbyData } from '../api/NearbyApi';

function GoogleMap({ latitude, longitude, setLocation, className, markerColor = 'royalblue', query }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const infoWindowRef = useRef(null);
  const placeMarkersRef = useRef([]);

  const [places, setPlaces] = useState([]);

  // 1. 맵 초기화 Effect: 최초 렌더링 시 단 한 번만 실행되도록 의존성 배열을 비웁니다.
  useEffect(() => {
    if (!latitude || !longitude || !mapContainerRef.current || !window.google) return;

    const initMap = async () => {
      const { Map, InfoWindow } = await window.google.maps.importLibrary("maps");
      const map = new Map(mapContainerRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15, // 초기 줌 레벨
        mapId: 'YOUR_MAP_ID_OR_LEAVE_BLANK',
        disableDefaultUI: false,
        streetViewControl: false,
      });

      mapInstanceRef.current = map;
      infoWindowRef.current = new InfoWindow();

      // idle 이벤트 리스너는 여기에 그대로 둡니다.
      const idleListener = map.addListener('idle', () => {
        const center = map.getCenter();
        if (setLocation) {
          setLocation({ latitude: center.lat(), longitude: center.lng() });
        }
        if (query) {
          fetchNearbyData(center.lat(), center.lng(), query)
            .then(setPlaces)
            .catch(error => {
              console.error("Error fetching on map idle:", error);
              setPlaces([]);
            });
        } else {
          setPlaces([]);
        }
      });
      
      // 초기 로드 시 데이터 한 번 가져오기
      if (query) {
        fetchNearbyData(latitude, longitude, query)
          .then(setPlaces)
          .catch(error => console.error("Error fetching on initial load:", error));
      }
      
      // 컴포넌트 언마운트 시 리스너 정리
      return () => {
        window.google.maps.event.removeListener(idleListener);
        if (mapInstanceRef.current) {
          window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
      };
    };

    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의존성 배열을 비워서 최초 마운트 시에만 실행되도록 변경

  // 2. 부모로부터 받은 위치(props)가 변경될 때 지도 중심만 이동시키는 Effect
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !latitude || !longitude) return;
    
    // 이미 생성된 맵의 중심만 이동시킵니다. 맵을 새로 만들지 않습니다.
    map.setCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);


  // 3. 검색어(query) 변경 시 데이터 다시 불러오기 Effect
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const center = map.getCenter();
    if (query) {
      fetchNearbyData(center.lat(), center.lng(), query)
        .then(setPlaces)
        .catch(err => {
          console.error('API 오류:', err);
          setPlaces([]);
        });
    } else {
      setPlaces([]);
    }
  }, [query]);

  // 마커 렌더링 Effect (변경 없음)
  useEffect(() => {
    // ... 기존 코드와 동일
    const map = mapInstanceRef.current;
    const infoWindow = infoWindowRef.current;
    if (!map || !infoWindow) return;

    placeMarkersRef.current.forEach(marker => marker.setMap(null));
    placeMarkersRef.current = [];

    places.forEach(item => {
      if (!item.lat || !item.lon) {
        console.warn('Item is missing lat/lon:', item);
        return;
      }
      const position = { lat: parseFloat(item.lat), lng: parseFloat(item.lon) };
      const marker = new window.google.maps.Marker({
        position: position,
        map: map,
        title: item.title,
      });

      marker.addListener('click', () => {
        const contentString = `
          <div class="${styles.infoWindow}">
            <h3 class="${styles.infoTitle}">${item.title}</h3>
            <p class="${styles.infoAddress}">${item.address}</p>
            ${item.infos ? `<div class="${styles.infoTags}">${item.infos.map(info => `<span class="${styles.infoTag}">${info}</span>`).join('')}</div>` : ''}
            ${item.call ? `<p class="${styles.infoPhone}">전화: ${item.call}</p>` : ''}
          </div>
        `;
        infoWindow.setContent(contentString);
        infoWindow.open({ anchor: marker, map });
      });
      placeMarkersRef.current.push(marker);
    });
  }, [places]);

  return (
    // ... 기존 코드와 동일
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