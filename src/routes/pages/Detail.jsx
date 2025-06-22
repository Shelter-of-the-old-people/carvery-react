import React, { useState, useEffect } from 'react';
import FacilityDetail from '../../components/FacilityDetail';
import OneLineCardSet from '../../components/OneLineCardSet';
import Gnb from '../../components/Gnb';
import '../../styles/styleguide.css';
import '../../styles/globals.css';
import '../../styles/Weather.css';
import '../../styles/Home.css';
import '../../styles/Gnb.css'
import '../../styles/facilityCard.css';
import '../../styles/facilityDetail.css';
import { useLocation, useParams } from 'react-router-dom';

const mockMenus =
  [
    {title: "시설정보", targetId: "detail"},
    {title: "관광지", targetId: "aa"},
    {title: "음식점", targetId: "bb"},
    {title: "카페", targetId: "cc"}
  ];

const Detail = () => {
  
  const location = useLocation();
  const { facilityId } = useParams(); // URL에서 id 파라미터를 가져옵니다.

  //  Link의 state나 API로부터 받은 실제 데이터를 저장할 상태(state)를 만듭니다.
  const [facility, setFacility] = useState(location.state?.facility || null);
  const [loading, setLoading] = useState(!facility);

    // ---  주변 검색을 위한 query state들을 추가 ---
  const [foodQuery, setFoodQuery] = useState('');
  const [cafeQuery, setCafeQuery] = useState('');

  //  새로고침 시, ID를 이용해 데이터를 다시 불러오는 로직
  useEffect(() => {
    // 데이터가 없을 때 (새로고침, URL 직접 접근 등) API를 호출
    if (!facility && facilityId) {
      const fetchFacilityById = async () => {
        try {
          // ★★★ 참고: 이 URL은 ID로 특정 시설 하나만 조회하는 실제 백엔드 API로 변경
          const response = await fetch(`http://131.186.16.173:8080/nearby?id=${facilityId}`);
          if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
          }
          const data = await response.json();
          // 개별 조회 API의 응답 구조에 맞춰야 합니다.
          // 만약 { dt: [...] } 형태라면 data.dt[0] 와 같이 사용해야 할 수 있습니다.
          setFacility(data.dt ? data.dt[0] : data);
        } catch (error) {
          console.error("Error fetching facility details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFacilityById();
    }
  }, [facilityId, facility]);

    // 주변 검색 query를 만드는 useEffect를 추가
  useEffect(() => {

    if (facility && facility.address) {
      // 주소를 '시'와 '동' 단위로 자릅니다 (예: "경상북도 구미시 구포동 1066" -> "구미시 구포동")
      const addressParts = facility.address.split(' ');
      if (addressParts.length >= 3) {
        const baseAddress = `${addressParts[1]} ${addressParts[2]}`;
        
        // 각 카테고리에 맞는 검색어를 생성하여 state에 저장합니다.
        setFoodQuery(`${baseAddress} 음식점`);
        setCafeQuery(`${baseAddress} 카페`);
      }
    }
  }, [facility]); // facility 객체가 변경될 때마다 이 효과를 실행합니다.

   // 로딩 중이거나 데이터가 없을 때의 UI 처리
  if (loading) return <div>상세 정보를 불러오는 중입니다...</div>;
  if (!facility) return <div>존재하지 않는 정보입니다.</div>;

    // 거리(dist)를 소수점 첫째 자리까지의 숫자로 변환
  const formattedDist = parseFloat(facility.dist).toFixed(1);

  // 주소(address)를 앞에서 4번째 부분까지만 잘라내기
  const addressParts = facility.address.split(' ');
  const shortAddress = addressParts.slice(0, 4).join(' ');

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="detail">
      <FacilityDetail 
        images={facility.productImage ? [facility.productImage] : []}
        title={facility.title}
        map={facility.map}
        address={shortAddress}
        dist={formattedDist}
        info={facility.infos}
        call={facility.call}
        time={facility.time}
        closed={facility.close}
        lat={facility.lat}
        lon={facility.lon}
      />
      </span>
      <span id="food">
        <OneLineCardSet title={"주변 음식점"} lat={facility.lat} lng={facility.lon} query={foodQuery} />
      </span>
      <span id="cafe">
        <OneLineCardSet title={"주변 카페"} lat={facility.lat} lng={facility.lon} query={cafeQuery} />
      </span>
    </div>
  );
};

export default Detail;