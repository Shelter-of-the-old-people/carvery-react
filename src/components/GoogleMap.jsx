import { useEffect, useRef } from "react";
import styles from '../styles/GoogleMap.module.css'; // 스타일 시트 경로

// // 1. 중앙에 표시될 마커 (아이콘) 스타일
// const centerMarkerStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   // 아이콘의 중앙이 정확히 지도의 중앙에 오도록 조정합니다.
//   transform: 'translate(-50%, -50%)',
//   // 마커 아이콘 아래의 지도가 클릭 및 드래그될 수 있도록 합니다.
//   pointerEvents: 'none', 
//   fontSize: '3rem', // 아이콘 크기는 원하는 대로 조절하세요.
// };

// // 2. 지도를 담을 컨테이너 스타일
// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };

function GoogleMap({ latitude, longitude, setLocation, className }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // 지도 초기화 로직 (최초 1회만 실행)
  useEffect(() => {
    const initMap = async () => {
      if (!latitude || !longitude || !mapContainerRef.current) {
        return;
      }
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API가 로드되지 않았습니다.");
        return;
      }

      try {
        // 3. 'maps' 라이브러리만 불러옵니다 (Marker는 더 이상 필요 없음).
        const { Map } = await window.google.maps.importLibrary("maps");

        const position = { lat: latitude, lng: longitude };

        const map = new Map(mapContainerRef.current, {
          center: position,
          zoom: 15,
          mapId: 'YOUR_MAP_ID_OR_LEAVE_BLANK',
          // 사용자가 지도를 직접 컨트롤 할 수 있도록 제어 옵션 활성화
          disableDefaultUI: false,
          streetViewControl: false,
        });
        mapInstanceRef.current = map;

        // 4. 지도 이동이 멈췄을 때 실행되는 'idle' 이벤트 리스너 추가
        // 'dragend' 대신 'idle'을 사용하면 줌 변경 시에도 중앙 좌표를 얻을 수 있습니다.
        map.addListener('idle', () => {
          const newCenter = map.getCenter();
          if (newCenter) {
            const lat = newCenter.lat();
            const lng = newCenter.lng();
            
            console.log(`지도 중앙 좌표 변경: 위도 ${lat}, 경도 ${lng}`);
            
            if (setLocation) {
              setLocation({ latitude: lat, longitude: lng });
            }
          }
        });

      } catch (error) {
        console.error("Google Maps 라이브러리 로딩에 실패했습니다.", error);
      }
    };

    initMap();

    // 컴포넌트 언마운트 시 리스너 정리 (메모리 누수 방지)
    return () => {
      if (mapInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
    };
  }, []); // 최초 렌더링 시 한 번만 실행

  // 부모로부터 받은 위치(props)가 변경될 때 지도 중심 업데이트
  useEffect(() => {
    if (mapInstanceRef.current) {
      const newPosition = { lat: latitude, lng: longitude };
      
      // 현재 지도 중심과 새로운 위치가 다를 경우에만 부드럽게 이동
      const currentCenter = mapInstanceRef.current.getCenter();
      if (currentCenter && (currentCenter.lat() !== latitude || currentCenter.lng() !== longitude)) {
        mapInstanceRef.current.panTo(newPosition);
      }
    }
  }, [latitude, longitude]);

  // 5. 렌더링: 지도 컨테이너와 중앙 마커 아이콘을 함께 렌더링
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.centerMarker}>
        <img src="/assets/center_marker.svg" alt="Center Marker" className={styles.markerImage} /> {/* 원하는 아이콘(이미지, SVG 등)으로 변경 가능 */}
      </div>
    </div>
  );
}

export default GoogleMap;