// src/components/FInfoList.jsx

import React from 'react';
import FInfo from './FInfo';
import "../styles/styleguide.css";
import '../styles/facilityCard.css';

const FInfoList = ({ infoList }) => {
  // ★★★ 중요: infoList가 null이나 undefined 같은 falsy 값이면
  // safeInfoList 변수에 빈 배열을 할당합니다.
  const safeInfoList = infoList || [];

  return (
    <div className="info-list">
      {/* 이제 안전한 safeInfoList 변수를 사용해서 map을 호출합니다. */}
      {safeInfoList.map((title, index) => (
        <FInfo key={index} title={title} />
      ))}
    </div>
  );
};

export default FInfoList;