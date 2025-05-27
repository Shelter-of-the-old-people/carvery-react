import React,{useEffect, useState} from 'react';
import InfoList from './FInfoList';
import '../styles/styleguide.css';
import '../styles/facilityCard.css';

const FacilityCard = ({ title,image, dist, address, info , call }) => { 

    return  (
    <a href='/detail'>
        <div className="card">
            <div className="info-head">
                <p className="name">{title}</p>
                <div className="divier"></div>
                <div className="location-frame">
                    <object className="location_small" type="image/svg+xml" data="../assets/location_small.svg"></object>
                    <p className="distance">{dist}km</p>
                </div>
            </div>
            <img src={image} alt={title} className="image" />
            <div className="info-frame">
                <div className="content-frame">
                    <p className="title">주소</p>
                    <p className="content">{address}</p>
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
            </div>
        </div>
    </a>

    );
};

export default FacilityCard;
