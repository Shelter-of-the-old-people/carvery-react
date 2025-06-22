import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './styles/styleguide.css'
import Footer from './components/Footer';

const App = () => {
   const [todayIcon, setTodayIcon] = useState(localStorage.getItem('todayIcon') || '');

    useEffect(() => {
    const handleStorageChange = () => {
      setTodayIcon(localStorage.getItem('todayIcon') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (todayIcon) {
      document.body.style.backgroundColor = `var(--background-${todayIcon})`;
    }
  }, [todayIcon]);

  return (
    <div>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default App;
