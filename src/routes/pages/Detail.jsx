import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const mockMenus =
  [
    {title: "시설정보", targetId: "detail"},
    {title: "관광지", targetId: "aa"},
    {title: "음식점", targetId: "bb"},
    {title: "카페", targetId: "cc"}
  ];


const allFacilitiesMockData = [
  {
    id: 'wash1', // 고유 ID 추가
    title: '유워시 셀프 세차장',
    images: ['/assets/noImage.png', '/assets/noImage.png'], // 실제 이미지 경로로 변경 필요
    map: '/assets/map_placeholder.png', // 실제 지도 이미지 또는 컴포넌트 사용
    dist: '3.7km',
    address: '경상북도 구미시 옥계신당로1길 21-21',
    infos: [{ title: 'hand' }, { title: 'toilet' }],
    call: '054-480-5573',
    time: '00:00 ~ 24:00',
    closed: '연중무휴',
  },
  {
    id: 'repair1', // 고유 ID 추가
    title: '카베리 정비소',
    images: ['/assets/noImage.png', '/assets/noImage.png'],
    map: '/assets/map_placeholder.png',
    dist: '5.2km',
    address: '서울특별시 강남구 테헤란로 123',
    infos: [{ title: 'repair' }],
    call: '02-1234-5678',
    time: '09:00 ~ 18:00',
    closed: '일요일',
  },
  // 다른 시설 데이터...
];

const Detail = () => {

  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  const [facilityDetailData, setFacilityDetailData] = useState(null); // 시설 상세 정보를 저장할 상태

  useEffect(() => {
    // 실제 API 호출 로직을 여기에 구현합니다.
    // fetch(`/api/facilities/${id}`)
    //   .then(response => response.json())
    //   .then(data => setFacilityDetailData(data))
    //   .catch(error => console.error('시설 상세 정보 불러오기 실패:', error));

    // 현재는 목업 데이터에서 id에 맞는 항목을 찾아서 설정합니다.
    const foundFacility = allFacilitiesMockData.find(item => item.id === id);
    if (foundFacility) {
      setFacilityDetailData(foundFacility);
    } else {
      console.log(`ID ${id}에 해당하는 시설 정보를 찾을 수 없습니다.`);
      setFacilityDetailData(null); // 찾지 못하면 null로 설정
    }
  }, [id]); // id가 변경될 때마다 이 useEffect가 다시 실행됩니다.

  if (!facilityDetailData) {
    return <div>시설 정보를 불러오는 중이거나 찾을 수 없습니다...</div>;
  }

  return (
    <div className="home">
      <Gnb menuList={mockMenus}/>
      <span  id="detail">
      <FacilityDetail 
        images={facilityDetailData.images}
        title={facilityDetailData.title}
        map={facilityDetailData.map}
        address={facilityDetailData.address}
        dist={facilityDetailData.dist}
        info={facilityDetailData.infos}
        call={facilityDetailData.call}
        time={facilityDetailData.time}
        closed={facilityDetailData.close}
      />
      </span>
      <span  id="aa">
      <OneLineCardSet title={"관광지"}/>
      </span>
      <span  id="bb">
      <OneLineCardSet title={"음식점"}/>
      </span>
      <span  id="cc">
      <OneLineCardSet title={"카페"}/>
      </span>
    </div>
  );
};

export default Detail;