import React, { useEffect, useState } from 'react';
import Card from './FacilityCard';
import '../styles/styleguide.css';
import '../styles/facilityCard.css';

const mockProducts = [
    {
      productImage: 'https://test-it.co.kr/face93.png',
<<<<<<< HEAD
      productName: '호림이네',
=======
      title: '호림이네',
>>>>>>> main
      dist: '3.0',
      address: '구미시 옥계남로 76-23',
      infos: [
        {title: 'self'},
        {title: 'auto'}
      ],
      call: '11111111111',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
<<<<<<< HEAD
      productName: '민호네',
=======
      title: '민호네',
>>>>>>> main
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    }
    // 추가 상품 예시
  ];

const FacilityList = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
      // 실제 API 사용 전 Mock 데이터로 테스트
      setFacilities(mockProducts);
    }, []);

    return (
            <div className="card-list">
              {facilities.map((item, index) => (
                <Card
                  key={index}
                  image={item.productImage}
                  title={item.productName}
                  dist={item.dist}
                  address={item.address}
                  info={item.infos}
                  call={item.call}
                />
              ))}
            </div>
      );
};

export default FacilityList;
<<<<<<< HEAD

=======
>>>>>>> main
