import React from 'react';
import "../styles/styleguide.css";
import '../styles/facilityCard.css'

<<<<<<< HEAD
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
=======
const FInfo = (info) => {
    var iconPath = `../assets/facilities/${info}.svg`;
    return (
        <object class="info-icon" type="image/svg+xml" data={iconPath}></object>
    );
>>>>>>> main
};

export default FInfo;