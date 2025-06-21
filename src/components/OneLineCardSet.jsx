import React, { useEffect, useState, useRef } from 'react';
import FacilityList from './FacilityList';
import { fetchNearbyData } from '../api/NearbyApi';

const OneLineCardSet = ({title, lat, lng, carWashData}) => { 
    const listRef = useRef(null);
    const [data, setData] =useState([]);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
    if (lat && lng) {
      fetchNearbyData(lat, lng)
        .then(setData)
        .catch(err => console.error('API 오류:', err));
    }
  }, [lat, lng]);

    const scrollLeft = () => {
  if (listRef.current && !scrolling) {
    setScrolling(true); // 스크롤 시작
    listRef.current.scrollBy({ left: -1182, behavior: 'smooth' });

    // 일정 시간 후 잠금 해제 (애니메이션 시간에 맞춤)
    setTimeout(() => {
      setScrolling(false);
      }, 400); // scroll-behavior: smooth → 보통 300~400ms 정도
    }
  };

  const scrollRight = () => {
  if (listRef.current && !scrolling) {
    setScrolling(true);
    listRef.current.scrollBy({ left: 1182, behavior: 'smooth' });

    setTimeout(() => {
      setScrolling(false);
      }, 400);
    }
  };
    return  (
        <div className="one-line-card-frame">
            <p className="title">{title}</p>
            <div className="card-frame">
                <button className="nav-button" onClick={scrollLeft}><img src='/assets/left_button.svg'></img></button>
                <div className="card-list-frame">
                    <FacilityList scrollRef={listRef} facilities={carWashData}/>
                </div>
                <button className="nav-button" onClick={scrollRight}><img src='/assets/right_button.svg'></img></button>
            </div>
        </div>
    );
};

export default OneLineCardSet;