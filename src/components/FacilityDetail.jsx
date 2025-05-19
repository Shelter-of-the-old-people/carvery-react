import React,{useEffect, useState} from 'react';
import InfoList from './FInfoList';
import '../styles/styleguide.css';
import '../styles/globals.css';
import '../styles/facilityDetail.css';
import '../styles/facilityCard.css';


const mockProducts = [
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '호림이네',
      dist: '3.0',
      address: '구미시 옥계남로 76-23',
      infos: [
        {title: 'self'},
        {title: 'auto'}
      ],
      call: '11111111111',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    }
  ];

const FacilityDetail = ({ mainImage, images = ['https://test-it.co.kr/face93.png','https://test-it.co.kr/face93.png','https://test-it.co.kr/face93.png','https://test-it.co.kr/face93.png'], thumbnails, title, mapImage, address, dist, info=[{title:'hand'}, {title:'self'}], call, time, closed }) => {
  return (
    <div className='detail-frame'>
      <div className="image-frame">
        <img className='main-image' src="https://test-it.co.kr/face93.png"/>
        <div className="image-list-frame">
          {images.map((item, index) => (
            <img src={item} className="image" />
          ))}
        </div>
      </div>

      {/* 우측 정보 카드 */}
      <div className="detail-info-frame">
        <p className="title">시설정보</p>
        <div className="detail-map">
         <img src="https://test-it.co.kr/face93.png" alt="지도 이미지"  />
        </div>

        <div className='row-frame'>
          <div className="content-frame">
            <p className="title">주소</p>
            <p className="content">주소</p>
          </div>
          <div className="content-frame">
            <p className="title">현 위치에서 거리</p>
            <div className='row'>
            <img src='/assets/location.svg'/>
            <p className="content-dist">거리</p>
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
              <p className="content">운영시간</p>
            </div>
            <div className="content-frame">
              <p className="title">휴무일</p>
              <p className="content">휴무일</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FacilityDetail;
