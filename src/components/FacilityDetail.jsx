import React, { useEffect, useState } from 'react';
import InfoList from './FInfoList';
import '../styles/styleguide.css';
import '../styles/globals.css';
import '../styles/facilityDetail.css';
import '../styles/facilityCard.css';
import { map } from 'leaflet';




const FacilityDetail = ({ images = ['/assets/noImage.png', '/assets/noImage.png'], title, map, address, dist, info = [], call, time, closed }) => {
  const mainImage = images[0];
  const imageList = images.slice(1, images.length);
  return (
    <div className='didiv'>
      <p className="titlee">{title}</p>
      <div className='detail-frame'>
        

        {/* 우측 정보 카드 */}
        <div className="detail-info-frame">
          <div className="detail-map">
            <img src={map} alt="지도" />
          </div>

          <div className='row-frame'>
            <div className="content-frame">
              <p className="title">주소</p>
              <p className="content">{address}</p>
            </div>
            <div className="content-frame">
              <p className="title">현 위치에서 거리</p>
              <div className='row'>
                <img src='/assets/location.svg' />
                <p className="content-dist">{dist}</p>
              </div>
            </div>
          </div>
          <div className="content-frame">
            <p className="title">시설 정보</p>
            <InfoList
              infoList={info}
            />
          </div>
          <div className="content-frame">
            <p className="title">전화번호</p>
            <p className="content">{call}</p>
          </div>
          <div className='row-frame'>
            <div className="content-frame">
              <p className="title">운영시간</p>
              <p className="content">{time}</p>
            </div>
            <div className="content-frame">
              <p className="title">휴무일</p>
              <p className="content">{closed}</p>
            </div>
          </div>
        </div>

        <div className="image-frame">
          <img className='main-image' src={mainImage} />
          <div className="image-list-frame">
            tlqkf
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
