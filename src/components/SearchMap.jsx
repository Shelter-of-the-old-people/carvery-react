import GoogleMap from "./GoogleMap";
import LeafletMap from "./LeafletMap";
import SearchBar from "./SearchBar";


function SearchMap({lat,lng}) {
  return (
    <div className="search-map-container">
      <h2 className="search-map-title">지도로 찾기</h2>
        <GoogleMap className="map-box" latitude={lat} longitude={lng}/>

      {/* 서울시청 좌표 */}
    </div>
  );
}

export default SearchMap; 