import LeafletMap from "./LeafletMap";
import SearchBar from "./SearchBar";

function SearchMap() {
  return (
    <div className="map-frame">
      <div className="title-frame">
        <h2 className="search-map-title">지도로 찾기</h2>
        <SearchBar />
      </div>
        <LeafletMap latitude={37.5665} longitude={126.9780} />
      {/* 서울시청 좌표 */}
    </div>
  );
}

export default SearchMap; 