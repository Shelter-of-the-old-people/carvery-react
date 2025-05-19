import React from 'react';
import ProductList from '../../components/ProductList';
import Weather from '../../components/Weather';
import '../../styles/styleguide.css';
import '../../styles/Home.css';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>추천 세차용품</h2>
      <ProductList />
      <h2>관광지</h2>
      <FacilityList/>
      <Weather />
    </div>
  );
};

export default Home;