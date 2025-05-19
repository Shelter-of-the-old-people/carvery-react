import React, { useState } from 'react';
import FacilityDetail from '../../components/FacilityDetail';
import OneLineCardSet from '../../components/oneLineCardSet';
import Gnb from '../../components/Gnb';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Weather.css';
import '../../styles/Home.css';
import '../../styles/Gnb.css'
import '../../styles/facilityCard.css';
import '../../styles/facilityDetail.css';

const mockMenus =
  [
    {title: "시설정보", targetId: "detail"},
    {title: "세차장", targetId: "carwash"},
    {title: "정비소", targetId: "setting"}
  ];

const Detail = () => {

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="detail">
      <FacilityDetail />
      </span>
      <span  id="carwash">
      <OneLineCardSet title={"세차장"}/>
      </span>
      <span  id="setting">
      <OneLineCardSet title={"정비소"}/>
      </span>
    </div>
  );
};

export default Detail;