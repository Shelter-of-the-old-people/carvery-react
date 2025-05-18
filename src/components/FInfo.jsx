import React from 'react';
import "../styles/styleguide.css";
import '../styles/facilityCard.css'

const FInfo = (info) => {
    var iconPath = `../assets/facilities/${info}.svg`;
    return (
        <object class="info-icon" type="image/svg+xml" data={iconPath}></object>
    );
};

export default FInfo;