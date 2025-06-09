import React, { useEffect, useState } from 'react';
import Info from './FInfo';
import "../styles/styleguide.css";
import '../styles/facilityCard.css';

const FInfoList = ({ infoList = [] }) => {
  
  return (
    <div className="info-list">
      {infoList.map((title, index) => (
        <Info key={index} title={title} />
      ))}
    </div>
  );
};


export default FInfoList;
