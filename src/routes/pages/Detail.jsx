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
    {title: "관광지", targetId: "aa"},
    {title: "음식점", targetId: "bb"},
    {title: "카페", targetId: "cc"}
  ];


const mockDetail = 
  {
    title: '민호네',
    map: 'https://placehold.co/460x230',
    dist: '4.0',
    address: '구미시 양포동',
    infos: [
      {title: 'hand'},
      {title: 'toilet'}
    ],
    call: '00000000000',
    time:'00:00 ~ 00:00',
    close: '연중무휴',
  };

const Detail = () => {

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="detail">
      <FacilityDetail 
        images={mockDetail.images}
        title={mockDetail.title}
        map={mockDetail.map}
        address={mockDetail.address}
        dist={mockDetail.dist}
        info={mockDetail.infos}
        call={mockDetail.call}
        time={mockDetail.time}
        closed={mockDetail.close}
      />
      </span>
      <span  id="aa">
      <OneLineCardSet title={"관광지"}/>
      </span>
      <span  id="bb">
      <OneLineCardSet title={"음식점"}/>
      </span>
      <span  id="cc">
      <OneLineCardSet title={"카페"}/>
      </span>
    </div>
  );
};

export default Detail;