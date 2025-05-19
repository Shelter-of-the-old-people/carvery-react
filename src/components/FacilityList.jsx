import React, { useEffect, useState } from 'react';
import Card from './FacilityCard';
import '../styles/styleguide.css';
import '../styles/facilityCard.css';

const mockProducts = [
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '호림이네',
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
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    },
    {
      productImage: 'https://test-it.co.kr/face93.png',
      title: '민호네',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '00000000000',
    }
  ];

const FacilityList = ({ scrollRef }) => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
      setFacilities(mockProducts);
    }, []);

    return (
            <div className="card-list" ref={scrollRef}>
              {facilities.map((item, index) => (
                <Card
                  key={index}
                  image={item.productImage}
                  title={item.title}
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
