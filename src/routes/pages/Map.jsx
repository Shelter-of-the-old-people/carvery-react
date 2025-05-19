import React, { useState } from 'react';
import MapCard from '../../components/SearchMap';
import Gnb from '../../components/Gnb';
import OneLineCardSet from '../../components/oneLineCardSet';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Home.css';
import '../../styles/searchMap.css';
import 'leaflet/dist/leaflet.css';

const mockMenus =
  [
    {title: "지도", targetId: ""},
    {title: "세차장", targetId: ""},
    {title: "정비소", targetId: ""},
  ];

const Map = () => {
  return (
    <div className="home">
        <Gnb menuList={[mockMenus]}/>
        <MapCard/>
        <OneLineCardSet title={'세차장'}/>
        <OneLineCardSet title={'정비소'}/>
    </div>
  );
};

export default Map;