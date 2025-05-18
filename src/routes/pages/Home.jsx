import React from 'react';
import ProductList from '../../components/ProductList';
import FacilityList from '../../components/FacilityList';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>추천 세차용품</h2>
      <ProductList />
      <h2>관광지</h2>
      <FacilityList/>
    </div>
  );
};

export default Home;