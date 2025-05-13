import React from 'react';
import ProductList from '../../components/ProductList';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>추천 세차용품</h2>
      <ProductList />
    </div>
  );
};

export default Home;