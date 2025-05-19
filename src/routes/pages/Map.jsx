import React, { useState } from 'react';
import MapCard from '../../components/SearchMap';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Home.css';
import '../../styles/searchMap.css';
import 'leaflet/dist/leaflet.css';
import Gnb from '../../components/Gnb';

const mockMenus =
  [
  ];

const Map = () => {

  return (
    <div className="home">
        <Gnb menuList={[mockMenus]}/>
        <MapCard/>
    </div>
  );
};

export default Map;