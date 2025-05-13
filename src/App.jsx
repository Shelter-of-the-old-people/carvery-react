import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles/styleguide.css'

const App = () => {
  return (
    <div>
      <h1>세차용품 플랫폼</h1>
      <Outlet />
    </div>
  );
};

export default App;
