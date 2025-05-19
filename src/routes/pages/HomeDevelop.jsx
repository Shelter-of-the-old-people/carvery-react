import React, { useState } from 'react';
import Weather from '../../components/Weather';
import FacilityList from '../../components/FacilityList';
import Gnb from '../../components/Gnb';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Weather.css';
import '../../styles/Home.css';
import '../../styles/Gnb.css'

const mockMenus =
  [
    {title: "날씨", targetId: ""},
    {title: "세차장", targetId: ""},
    {title: "정비소", targetId: ""},
    {title: "차량용품", targetId: ""}
  ];

const HomeDevelop = () => {

  return (
    <div className="home">
    <Gnb menuList={mockMenus}/>
        <Weather />
        <div className="one-line-card-frame">
            <p className="title">세차장</p>
            <div className="card-frame">
                <object className="nav-button" type="image/svg+xml" data="/icons/left_button.svg"></object>
                <div className="card-list-frame">
                    <FacilityList />
                </div>
                <object className="nav-button" type="image/svg+xml" data="/icons/right_button.svg"></object>
            </div>
        </div>
    </div>
  );
};

export default HomeDevelop;