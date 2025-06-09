import GoogleMap from "./GoogleMap";
import LeafletMap from "./LeafletMap";


function SearchMap() {
  return (
    <div className="search-map-container">
      <h2 className="search-map-title">지도로 찾기</h2>
        <GoogleMap className="map-box" latitude={37.5665} longitude={126.9780} />
      {/* 서울시청 좌표 */}
    </div>
  );
}

export default SearchMap; 