// src/components/FacilityDetail.jsx

import React from 'react';
import InfoList from './FInfoList';
import DetailMap from './DetailMap'; // 지도 컴포넌트 추가
import '../styles/styleguide.css';
import '../styles/globals.css';
import '../styles/facilityDetail.css';
import '../styles/facilityCard.css';

const FacilityDetail = ({ images = ['/assets/noImage.png'], title, address, dist, info = [], call, time, closed, lat, lon, currentLocation }) => {
  const mainImage = images[0];

   const destinationName = encodeURIComponent(title);

     // 출발지(currentLocation) 위도, 경도가 있으면 URL에 추가, 없으면 빈 값으로 둡니다.
  const startLat = currentLocation?.latitude || '';
  const startLon = currentLocation?.longitude || '';

  const kakaoMapUrl = startLat && startLon
    ? `https://map.kakao.com/link/route/${destinationName},${lat},${lon}/${startLat},${startLon}`
    : `https://map.kakao.com/link/to/${destinationName},${lat},${lon}`; // 출발지가 없으면 도착지만 표시

  return (
    <div className='didiv'>
      <p className="titlee">{title}</p>
      <div className='detail-frame'>

        {/* --- 왼쪽 정보 카드 --- */}
        <div className="detail-info-frame">
          {/* ★★★ 1. 이 위치에 지도가 아닌 '메인 이미지'가 오도록 수정 */}
          <div className="detail-map">
            <img src={mainImage} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* 주소, 거리 등 나머지 정보는 그대로 유지됩니다. */}
          <div className='row-frame'>
            <div className="content-frame">
              <p className="title">주소</p>
              <p className="content">{address}</p>
            </div>
            <div className="content-frame">
              <p className="title">현 위치에서 거리</p>
              <div className='row'>
                <img src='/assets/location.svg' />
                <p className="content-dist">{parseFloat(dist).toFixed(1)}km</p>
              </div>
            </div>
          </div>
          <div className="content-frame">
            <p className="title">시설 정보</p>
            <InfoList infoList={info} />
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


        {/* --- 오른쪽 프레임 --- */}
        <div className="image-frame">
          {/* ★★★ 2. 이 위치에 메인 이미지가 아닌 '지도'가 오도록 수정 */}
          {/* 기존 main-image의 스타일(크기, 테두리 등)을 지도 컨테이너에 적용 */}
          <div className='main-image'>
            {lat && lon ? (
               <DetailMap latitude={lat} longitude={lon} />
            ) : (
              <div>지도 정보를 불러올 수 없습니다.</div>
            )}
          </div>
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="image-list-frame"
            style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
          >
            길찾기
          </a>
        </div>

      </div>
    </div>
  );
};

export default FacilityDetail;