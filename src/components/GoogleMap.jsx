import { useEffect, useRef } from "react";

function GoogleMap({ latitude, longitude, setLocation, className }) {
  // 1. DOM 요소와 인스턴스를 저장하기 위한 Ref 선언
  const mapContainerRef = useRef(null);   // 지도를 담을 div 요소
  const mapInstanceRef = useRef(null);    // Google Map 인스턴스
  const markerInstanceRef = useRef(null); // AdvancedMarkerElement 인스턴스

  // 2. 지도 초기화 로직 (최초 1회만 실행)
  useEffect(() => {
    // 비동기로 지도를 초기화하는 함수
    const initMap = async () => {
      // 위도/경도, 또는 지도를 표시할 div가 준비되지 않았다면 실행 중단
      if (!latitude || !longitude || !mapContainerRef.current) {
        return;
      }
      
      // Google Maps API 스크립트가 로드되었는지 최종 확인
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API가 로드되지 않았습니다.");
        return;
      }

      try {
        // 3. Google Maps의 'Map'과 'Marker' 라이브러리를 비동기로 불러오기
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

        const position = { lat: latitude, lng: longitude };

        // 지도 인스턴스를 생성하고 ref에 저장 (불필요한 재생성 방지)
        const map = new Map(mapContainerRef.current, {
          center: position,
          zoom: 15,
          mapId: 'YOUR_MAP_ID_OR_LEAVE_BLANK' // 지도 스타일링을 위한 고유 ID (선택 사항)
        });
        mapInstanceRef.current = map;

        // 4. 드래그 가능한 AdvancedMarkerElement 생성
        const marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          gmpDraggable: true, // 이 속성을 true로 설정하여 드래그 가능하게 만듦
        });
        markerInstanceRef.current = marker;

        // 5. 마커에 'dragend' 이벤트 리스너 추가 (드래그가 끝났을 때 실행)
        marker.addListener('dragend', (event) => {
          const newPosition = event.latLng;
          const lat = newPosition.lat();
          const lng = newPosition.lng();
          
          console.log(`마커 드래그 종료: 위도 ${lat}, 경도 ${lng}`);
          
          // setLocation prop이 존재하면 부모 컴포넌트의 상태를 업데이트
          if (setLocation) {
            setLocation({ latitude: lat, longitude: lng });
          }
        });

      } catch (error) {
        console.error("Google Maps 라이브러리 로딩에 실패했습니다.", error);
      }
    };

    initMap();

  }, []); // 의존성 배열을 비워 최초 렌더링 시 한 번만 실행되도록 설정

  // 6. 부모로부터 받은 위치(props)가 변경될 때 지도와 마커 위치 업데이트
  useEffect(() => {
    // 지도와 마커 인스턴스가 이미 생성된 경우에만 실행
    if (mapInstanceRef.current && markerInstanceRef.current) {
      const newPosition = { lat: latitude, lng: longitude };
      
      // 지도 중심을 부드럽게 이동
      mapInstanceRef.current.panTo(newPosition);

      // 마커 위치 업데이트
      markerInstanceRef.current.position = newPosition;
    }
  }, [latitude, longitude]); // latitude 또는 longitude prop이 변경될 때마다 실행

  // 지도가 렌더링 될 실제 div 요소
  return <div ref={mapContainerRef} className={className} />;
}

export default GoogleMap;