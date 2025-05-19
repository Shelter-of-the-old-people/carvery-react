import React, { useEffect, useState } from 'react';

const Gnb = ({menuList = []}) => { 

    const handleMenuClick = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return  (
    <div className="gnb">
        <div className="logo-frame"><a href='/home'><object className="logo" data="/assets/logo.svg"></object></a></div>
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
                        <a href='/Map'>지도로 찾기</a>
                    </div>
                </div>
        </div>
        <div className="search-bar-frame">
            <form className="gnb-search-bar-frame" action="" method="get">
                <img src="/assets/search.svg"></img>
                <input type="text" name='search' className="search-input" />
            </form>
        </div>
     </div>
    );
};

export default Gnb;