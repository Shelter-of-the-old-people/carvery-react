import React, { useEffect, useState } from 'react';
import Card from './FacilityCard';
import '../styles/styleguide.css';
import '../styles/facilityCard.css';

const mockProducts = [
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체 1',
      dist: '3.0',
      address: '구미시 옥계남로 1',
      infos: [
        {title: 'self'},
        {title: 'auto'}
      ],
      call: '054-000-0001',
    },
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체 2',
      dist: '4.0',
      address: '구미시 양포동 2',
      infos: [
        {title: 'just'},
        {title: 'repair'}
      ],
      call: '054-000-0002',
    },
    {

      productImage: 'https://placehold.co/335x206',
      title: '업체 3',
      dist: '4.0',
      address: '구미시 양포동 3',
      infos: [
        {title: 'hand'},
        {title: 'self'}
      ],
      call: '054-000-0003',
    },
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체 4',
      dist: '4.0',
      address: '구미시 양포동 4',
      infos: [
        {title: 'just'},
        {title: 'toilet'}
      ],
      call: '054-000-0004',
    },
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체 5',
      dist: '4.0',
      address: '구미시 양포동 5',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '054-000-0005',
    },
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '054-000-0006',
    },
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '054-000-0007',
    },
    {
      productImage: 'https://placehold.co/335x206',
      title: '업체',
      dist: '4.0',
      address: '구미시 양포동',
      infos: [
        {title: 'hand'},
        {title: 'toilet'}
      ],
      call: '054-000-0008',
    }
  ];

const FacilityList = ({ scrollRef , className=""}) => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
      setFacilities(mockProducts);
    }, []);

    return (
            <div className={`card-list ${className}`} ref={scrollRef}>
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