import React, { useEffect, useState } from 'react';
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
                key={index} 
                title={item.title}
              />
              ))}
        </div>
      );
};

export default FInfoList;
