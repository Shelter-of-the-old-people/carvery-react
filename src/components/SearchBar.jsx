import React,{useEffect, useState} from 'react';

const SearchBar = ({ content }) => {
    return  (
    <div className="search-bar-frame">
        <form className="gnb-search-bar-frame" action="" method="get">
            <img src="/assets/search.svg"></img>
            <input type="text" name='search' className="search-input" />
        </form>
    </div>
    );
};

export default SearchBar;
