import React, { useEffect, useState } from 'react';
import Card from './ProductCard';

const mockProducts = [
    {
      productImage: 'https://placehold.co/260x224',
      brand: '로드위너',
      productName: '로드위너 18L 대용량 세차 버킷 + 그릿가드 + 뚜껑 세트',
      price: 14620,
      rating: 4.5,
      reviewCount: 179,
    },
    {
      productImage: 'https://placehold.co/260x224',
      brand: '(주)월드크린',
      productName: '대용량 세차 버킷 세트',
      price: 6800,
      rating: 3.5,
      reviewCount: 23,
    },
    {
      productImage: 'https://placehold.co/260x224',
      brand: '(주)클린',
      productName: '대용량 카샴푸',
      price: 6800,
      rating: 3.5,
      reviewCount: 23,
    },
    // 추가 상품 예시
  ];

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // 실제 API 사용 전 Mock 데이터로 테스트
      setProducts(mockProducts);
    }, []);

    return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {products.map((item, index) => (
            <Card
              key={index}
              image={item.productImage}
              brand={item.brand}
              title={item.productName}
              price={item.price}
              rating={item.rating}
              reviewCount={item.reviewCount}
            />
          ))}
        </div>
      );
};

export default ProductList;
