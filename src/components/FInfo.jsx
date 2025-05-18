import React from 'react';
import "../styles/styleguide.css";
import '../styles/facilityCard.css'

const FInfo = ({title}) => {
  const iconPath = `/assets/facilities/${title}.svg`;

  return (
    <img
      className="info-icon"
      src={iconPath}
      alt={title}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = '/assets/facilities/toilet.svg'; // fallback 이미지
      }}
    />
  );
};

export default FInfo;