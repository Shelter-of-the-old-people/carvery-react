import React, { useState } from 'react';
import MapCard from '../../components/SearchMap';
import Gnb from '../../components/Gnb';
import OneLineCardSet from '../../components/oneLineCardSet';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Home.css';
import '../../styles/searchMap.css';
import 'leaflet/dist/leaflet.css';
import { useGeoLocation } from '../../hooks/useGeoLocation';


const mockMenus =
  [
    {title: "지도", targetId: "map"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
  ];

const Map = () => {
    const { location } = useGeoLocation();
  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span id="map"><MapCard lat={location?.latitude} lng={location?.longitude}/></span>
      <span id="carwash"><OneLineCardSet title={'세차장'} lat={location?.latitude} lng={location?.longitude} /></span>
      <span id="setting"><OneLineCardSet title={'정비소'}/></span>
    </div>
  );
};

export default Map;