import GoogleMap from "./GoogleMap";


function MapCard({lat, lng, setLocation, query}) {
  return (
    console.log('주소 찍어보기: ', query),
    <div className="search-map-container">
      <h2 className="search-map-title">지도로 찾기</h2>
      {typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) && (
        <GoogleMap className="map-box" latitude={lat} longitude={lng} setLocation={setLocation} query={query}/>
      )}
    </div>
  );
}

export default MapCard; 