import React from 'react';
import "../styles/styleguide.css";
import '../styles/facilityCard.css'

const FInfo = ({title}) => {
    const iconPath = `/assets/facilities/${title}.svg`;
    return (
        <img src={iconPath}></img>
    );
};

export default FInfo;