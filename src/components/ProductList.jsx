import React, { useEffect, useState } from 'react';
import Card from './ProductCard';
import { fetchProducts } from '../api/SearchApi';

//const mockProducts = [
//     {
//       productImage: 'https://test-it.co.kr/face93.png',
//       brand: '로드위너',
//       productName: '로드위너 18L 대용량 세차 버킷 + 그릿가드 + 뚜껑 세트',
//       price: 14620,
//       rating: 4.5,
//       reviewCount: 179,
//     },
//     {
//       productImage: 'https://test-it.co.kr/face93.png',
//       brand: '(주)월드크린',
//       productName: '대용량 세차 버킷 세트',
//       price: 6800,
//       rating: 3.5,
//       reviewCount: 23,
//     },
//     {
//       productImage: 'https://test-it.co.kr/face93.png',
//       brand: '(주)월드ㅇㄹㄴㅇㄹㄴㄹ크린',
//       productName: '대용량 킷 세트',
//       price: 6800,
//       rating: 3.5,
//       reviewCount: 23,
//     },
//     // 추가 상품 예시
//  ];      


const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);

    //useEffect(() => {
      // 실제 API 사용 전 Mock 데이터로 테스트
      //setProducts(mockProducts);
useEffect(() => {
    const query = category;
    fetchProducts(query)
      .then(data => {
        const mapped = data.map(item => ({
          productImage: item.image,
          brand: item.brand || item.mallName,
          productName: item.title.replace(/<[^>]*>?/g, ''),
          price: parseInt(item.lprice),
          link: item.link,
        }));
        setProducts(mapped);
      })
      .catch(err => console.error(err));
  }, [category]); // ← category가 바뀔 때마다 실행
    //}, []);

    return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'nowrap' }}>
          {products.map((item, index) => (
            <Card
              key={index}
              image={item.productImage}
              brand={item.brand}
              title={item.productName}
              price={item.price}
              link={item.link}
            />
          ))}
        </div>
      );
};

export default ProductList;
