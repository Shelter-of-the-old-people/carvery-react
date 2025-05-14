import React from 'react';
import Gnb from '../../components/Gnb';
import FacilityList from '../../components/FacilityList';
import Weather from '../../components/Weather';
import '../styles/styleguide.css';
import '../styles/Home.css'

const Home = () => {
  return (
    <div class="home">
        <Weather />
        <div class="one-line-card-frame">
            <p class="title">세차장</p>
            <div class="card-frame">
                <object class="nav-button" type="image/svg+xml" data="/icons/left_button.svg"></object>
                <div class="card-list-frame">
                    <FacilityList />
                </div>
                <object class="nav-button" type="image/svg+xml" data="/icons/right_button.svg"></object>
            </div>
        </div>
    </div>
  );
};

export default Home;