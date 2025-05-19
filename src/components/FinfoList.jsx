import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import FInfo from './FInfo';
import "../styles/styleguide.css";
import "../styles/facilityCard.css";

const FInfoList = ({info}) => {
    return (
         <div className="info-list">
            {info.map((item, index) => (
              <FInfo 
                key={index} 
                title={item.title}
              />
              ))}
        </div>
      );
};

export default FInfoList;
