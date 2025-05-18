import React,{use, useState} from 'react';
import '../styles/styleguide.css';
import '../styles/Gnb.css'

const Gnb = ({menuList}) => { 
    // menuList={name: '', targetId:''}
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        // 실제 API 사용 전 Mock 데이터로 테스트
        setMenus(menuList);
    }, []);

    const handleMenuClick = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return  (
    <div className="gnb">
        <div className="logo-frame"><a href='/home'><object className="logo" data="../assets/logo.svg"></object></a></div>
        <div className="menu-frame">
            {menus.map((menu, index) => (
                <div className="menu" key={index}>
                    <button className="menu-text" onClick={() => handleMenuClick(menu.targetId)}>
                        {menu.name}
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
                <object type="image/svg+xml" data="../assets/search.svg"></object>
                <input type="text" name='search' className="search-input" />
            </form>
        </div>
     </div>
    );
};

export default Gnb;