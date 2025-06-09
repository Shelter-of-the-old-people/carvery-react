import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './routes/pages/Home.jsx';
import Map from './routes/pages/Map.jsx';
import HomeDevelop from './routes/pages/HomeDevelop.jsx';
import Detail from './routes/pages/Detail.jsx';
import NotFound from './routes/pages/NotFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path='/home' index element={<HomeDevelop />} />
          <Route path='/map' index element={<Map />} />
          <Route path='/detail' index element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);