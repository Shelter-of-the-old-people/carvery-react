// components/GoogleMap.js
import { useEffect, useRef } from "react";

function GoogleMap({ latitude, longitude, setLocation, className }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Google Maps API가 로드되었는지 확인
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    });

    map.addListener('click', function(e) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      console.log(`위도: ${lat}, 경도: ${lng}`);
      if(setLocation)
      {
        setLocation({latitude: lat, longitude: lng});
      }
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
    });
  }, [latitude, longitude, setLocation]);

  return <div ref={mapRef} className={className} />;
}

export default GoogleMap;
