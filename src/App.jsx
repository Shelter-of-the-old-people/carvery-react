import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles/styleguide.css'

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
