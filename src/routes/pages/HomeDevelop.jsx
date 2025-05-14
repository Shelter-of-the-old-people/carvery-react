import React from 'react';
import Gnb from '../../components/Gnb';
import FacilityList from '../../components/FacilityList';
import Weather from '../../components/Weather';
import '../styles/styleguide.css';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
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

export default Home;