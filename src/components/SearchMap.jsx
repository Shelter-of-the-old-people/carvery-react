import GoogleMap from "./GoogleMap";


function SearchMap({lat, lng, setLocation}) {
  return (
    <div className="search-map-container">
      <h2 className="search-map-title">지도로 찾기</h2>
      {typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) && (
        <GoogleMap className="map-box" latitude={lat} longitude={lng} setLocation={setLocation} />
      )}
    </div>
  );
}

export default SearchMap; 