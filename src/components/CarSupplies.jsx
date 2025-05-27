import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const CarSupplies = () => {
    // 카테고리 상태 관리
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
    };
    
    return (
      <div className="supplies-frame">
        <p className="titler">세차용품</p>
        <div className="product-category-list">
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-all"
              checked={selectedCategory === 'all'}
              onChange={() => handleCategoryChange('all')}
            />
            <label htmlFor="product-all">all</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-fashion"
              checked={selectedCategory === 'fashion'}
              onChange={() => handleCategoryChange('fashion')}
            />
            <label htmlFor="product-fashion">fashion</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-mood"
              checked={selectedCategory === 'mood'}
              onChange={() => handleCategoryChange('mood')}
            />
            <label htmlFor="product-mood">mood</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-story"
              checked={selectedCategory === 'story'}
              onChange={() => handleCategoryChange('story')}
            />
            <label htmlFor="product-story">story</label>
          </div>
        </div>
        <div className="card-frame">
          <button className="nav-button">
            <img src="/assets/left_button.svg" alt="Previous" />
          </button>
          <div className="card-list-frame">
            <ProductList category={selectedCategory} />
          </div>
          <button className="nav-button">
            <img src="/assets/right_button.svg" alt="Next" />
          </button>
        </div>
      </div>
    );
  };

export default CarSupplies;