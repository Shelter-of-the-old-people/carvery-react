import React,{use, useState} from 'react';

const Gnb = () => {

    return  (
    <div class="gnb">
        <div class="logo-frame"><div class="logo"><a href="/home">Carvery</a></div></div>
        <div class="menu-frame">
            <div class="menu"><div class="menu-text"><a href="">{menu}</a></div></div>
        </div>
        <div class="search-bar-frame">
            <form class="gnb-search-bar-frame" action="" method="get">
                <object type="image/svg+xml" data="../assets/search.svg"></object>
                <input type="text" name='search' class="search-input" />
            </form>
        </div>
     </div>
    );
};

export default Gnb;