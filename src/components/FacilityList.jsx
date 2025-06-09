import React, { useEffect, useState } from 'react';
import Card from './FacilityCard';
import '../styles/styleguide.css';
import '../styles/facilityCard.css';

const FacilityList = ({ scrollRef , className="" ,facilities=[]}) => {
    return (
            <div className={`card-list ${className}`} ref={scrollRef}>
              {facilities.map((item, index) => (
                <Card
                  key={index}
                  image={item.productImage}
                  title={item.title}
                  dist={item.dist}
                  address={item.address}
                  info={item.infos}
                  call={item.call}
                />
              ))}
            </div>
      );
};

export default FacilityList;