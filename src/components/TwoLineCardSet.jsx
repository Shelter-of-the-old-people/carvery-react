import React, { useEffect, useState, useRef } from 'react';
import FacilityList from './FacilityList';

const TwoLineCardSet = ({title}) => { 
    const listRef = useRef(null);

  const scrollLeft = () => {
    listRef.current?.scrollBy({ left: -394, behavior: 'smooth' });
  };

  const scrollRight = () => {
    listRef.current?.scrollBy({ left: 394, behavior: 'smooth' });
  };
    return  (
        <div className="two-line-card-frame">
            <p className="title">{title}</p>
            <div className="card-frame">
                <button className="nav-button" onClick={scrollLeft}><img src='/assets/left_button.svg'></img></button>
                <div className="card-list-frame">
                    <FacilityList scrollRef={listRef} className="two-line-layout"/>
                </div>
                <button className="nav-button" onClick={scrollRight}><img src='/assets/right_button.svg'></img></button>
            </div>
        </div>
    );
};

export default TwoLineCardSet;