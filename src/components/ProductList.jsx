import React, { useEffect, useState } from 'react';
import Card from './ProductCard';
import { fetchProducts } from '../api/SearchApi';

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);
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
