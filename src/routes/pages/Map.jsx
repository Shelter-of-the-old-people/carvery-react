import React, { useEffect, useState } from 'react';
import '../../components/MapCard';
import Gnb from '../../components/Gnb';
import OneLineCardSet from '../../components/OneLineCardSet';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Home.css';
import '../../styles/searchMap.css';
import 'leaflet/dist/leaflet.css';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { fetchNearbyData } from '../api/NearbyApi';

const mockMenus =
  [
    {title: "지도", targetId: "map"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
  ];

const Map = () => {
  const { location: initialLocation } = useGeoLocation();
  const [location, setLocation] = useState(initialLocation);
  const [ carWashList, setCarWashList ] = useState([]);
  //const [markerList, setMarkerList] = useState([]);

  useEffect(() => {
      if (lat && lng) {
        fetchNearbyData(lat, lng)
          .then(setCarWashList)
          .catch(err => console.error('API 오류:', err));
      }
    }, [lat, lng]);

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span id="map"><MapCard lat={location?.latitude} lng={location?.longitude} setLocation={setLocation}/></span>
      <span id="carwash"><OneLineCardSet title={'세차장'} lat={location?.latitude} lng={location?.longitude} carWashData={carWashList} /></span>
      <span id="setting"><OneLineCardSet title={'정비소'}/></span>
    </div>
  );
};

export default Map;
