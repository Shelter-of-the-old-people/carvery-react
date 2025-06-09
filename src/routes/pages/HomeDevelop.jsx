import React, { useState } from 'react';
import { Suspense } from 'react';
import Weather from '../../components/Weather';
import OneLineCardSet from '../../components/oneLineCardSet';
import TwoLineCardSet from '../../components/TwoLineCardSet';
import CarSupplies from '../../components/CarSupplies';
import Gnb from '../../components/Gnb';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Weather.css';
import '../../styles/Home.css';
import '../../styles/Gnb.css'
import '../../styles/facilityCard.css';
import Footer from '../../components/Footer';

const mockMenus =
  [
    {title: "날씨", targetId: "weather"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"},
    {title: "차량용품", targetId: "supplies"}
  ];

const HomeDevelop = () => {

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="weather">
        <Weather />
      </span>
      <span  id="carwash">
        <OneLineCardSet title={"세차장"}/>
      </span>
      <span  id="setting">
        <OneLineCardSet title={"정비소"}/>
      </span>
      <span  id="supplies">
        <CarSupplies/>
      </span>
    <Footer/>
    </div>
  );
};

export default HomeDevelop;