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
=======
import Info from './FInfo';
import "../styles/styleguide.css";
import '../styles/facilityCard.css';

const FInfoList = () => {
    const [infos, setInfos] = useState([]);

    useEffect(() => {
      setInfos();
    }, []);

    return (
         <div class="info-list">
            {infos.map((item, index) => (
              <Info 
>>>>>>> main
                key={index} 
                title={item.title}
              />
              ))}
        </div>
      );
};

export default FInfoList;
