import React, { useState } from 'react';
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

const mockMenus =
  [
    {title: "날씨", targetId: ""},
    {title: "세차장", targetId: ""},
    {title: "정비소", targetId: ""},
    {title: "차량용품", targetId: ""}
  ];

const HomeDevelop = () => {

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <Weather />
      <OneLineCardSet title={"세차장"}/>
      <OneLineCardSet title={"정비소"}/>
      <TwoLineCardSet title={"몰라시발"}/>
      <CarSupplies/>
    </div>
  );
};

export default HomeDevelop;