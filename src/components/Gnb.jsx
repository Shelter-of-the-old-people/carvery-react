import React, { useEffect, useState } from 'react';

const Gnb = ({menuList = []}) => { 

    const handleMenuClick = (targetId) => {
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            console.log(targetElement);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100); // DOM이 렌더링될 시간을 확보
    };

      const getCurrentLocation = () => {
        // 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log("현재 위치", lat, lon);
        });
    };


    return  (
    <div className="gnb">
        <div className="logo-frame"><a href='/home'><img className="logo" src="/assets/logo.svg"></img></a></div>
        <div className="menu-frame">
            {menuList.map((menu, index) => (
                <div className="menu" key={index}>
                    <button className="menu-text" onClick={() => handleMenuClick(menu.targetId)}>
                        {menu.title}
                    </button>
                </div>
            ))}
            <div className="menu">
                <div className="menu-text">
                    <a href='/map'>지도로 찾기</a>
                </div>
            </div>
            <div className="menu">
                <div className="menu-text">
                    <button className='menu-text' onClick={()=> getCurrentLocation()}>현위치</button>
                </div>
            </div>
        </div>
     </div>
    );
};

export default Gnb;