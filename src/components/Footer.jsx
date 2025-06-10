import React, { useEffect, useState } from 'react';
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
            <h2 className="footer-title">Carvary</h2>
            <div className="footer-bottom">
                <p className="footer-description">
                    날씨 기반 세차 정보 서비스로, 사용자에게 최적의 세차 타이밍을 제공하여 더 나은 차량 관리 경험을 제공합니다.날씨 기반 세차 정보 서비스로, 사용자에게 최적의 세차 타이밍을 제공하여 더 나은 차량 관리 경험을 제공합니다.날씨 기반 세차 정보 서비스로, 사용자에게 최적의 세차 타이밍을 제공하여 더 나은 차량 관리 경험을 제공합니다.날씨 기반 세차 정보 서비스로, 사용자에게 최적의 세차 타이밍을 제공하여 더 나은 차량 관리 경험을 제공합니다.날씨 기반 세차 정보 서비스로, 사용자에게 최적의 세차 타이밍을 제공하여 더 나은 차량 관리 경험을 제공합니다.
                </p>            
                <div className="footer-right">
                    <ul className="footer-team-list">
                        <li>윤동근 김민호 최호림 이재원 김동현 |    조원</li>
                        <li>김민호 | DB 담당</li>
                        <li>윤동근 이재원 |   Back</li>
                        <li>최호림 김동현 |  Front</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
