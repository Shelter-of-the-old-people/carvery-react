import React,{useEffect, useState} from 'react';
import InfoList from './FInfoList';
import '../styles/styleguide.css';
import '../styles/facilityCard.css';
import { Link } from 'react-router-dom';

const FacilityCard = ({ facility }) => { 
    
    if (!facility) {
        return null;
    }
  const { id, title, productImage, infos, call } = facility;

  // --- ★★★ 이미지 URL 유효성 검사 로직 ★★★ ---
  // productImage가 문자열이고 'http'로 시작하는 유효한 URL인지 확인합니다.
  const isValidImageUrl = typeof productImage === 'string' && productImage.startsWith('http');
  
  // 유효한 URL이면 그것을 사용하고, 아니면 기본 이미지 경로를 사용합니다.
  const imageUrl = isValidImageUrl ? productImage : '/assets/noImage.png';


  // 렌더링 직전에 표시할 데이터를 가공합니다.
  const displayDist = parseFloat(facility.dist).toFixed(1);
  const addressParts = facility.address.split(' ');
  const displayAddress = addressParts.slice(0, 4).join(' ');

    return  (
    <Link to={`/detail/${id}`} state={{ facility: facility }}>
        <div className="card">
            <div className="info-head">
                <p className="name">{title}</p>
                <div className="divier"></div>
                <div className="location-frame">
                    <object className="location_small" type="image/svg+xml" data="../assets/location_small.svg"></object>
                    <p className="distance">{displayDist}km</p>
                </div>
            </div>
            <img src={imageUrl} alt={title} className="image"/>
            <div className="info-frame">
                <div className="content-frame">
                    <p className="title">주소</p>
                    <p className="content">{displayAddress}</p>
                </div>
                <div className="content-frame">
                    <p className="title">시설 정보</p>
                    <InfoList
                            infoList={infos}
                        />
                </div>
                <div className="content-frame">
                    <p className="title">전화번호</p>
                    <p className="content">{call}</p>
                </div>
            </div>
        </div>
    </Link>

    );
};

export default FacilityCard;
