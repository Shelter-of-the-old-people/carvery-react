import React, { useEffect, useState } from 'react';
import FacilityList from './FacilityList';

const OneLineCardSet = ({title}) => { 
    return  (
        <div className="one-line-card-frame">
            <p className="title">{title}</p>
            <div className="card-frame">
                <button className="nav-button"><img src='/assets/left_button.svg'></img></button>
                <div className="card-list-frame">
                    <FacilityList />
                </div>
                <button className="nav-button"><img src='/assets/right_button.svg'></img></button>
            </div>
        </div>
    );
};

export default OneLineCardSet;