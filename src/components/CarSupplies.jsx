import React, { useEffect, useState, useRef } from 'react';
import ProductList from './ProductList';

const CarSupplies = () => {
    // 카테고리 상태 관리
    const [selectedCategory, setSelectedCategory] = useState('버킷');
    const cardListRef = useRef(null);
    const [scrolling, setScrolling] = useState(false);
    
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
    };

  const scrollLeft = () => {
  if (cardListRef.current && !scrolling) {
    setScrolling(true); // 스크롤 시작
    cardListRef.current.scrollBy({ left: -960, behavior: 'smooth' });

    // 일정 시간 후 잠금 해제 (애니메이션 시간에 맞춤)
    setTimeout(() => {
      setScrolling(false);
      }, 400); // scroll-behavior: smooth → 보통 300~400ms 정도
    }
  };

  const scrollRight = () => {
  if (cardListRef.current && !scrolling) {
    setScrolling(true);
    cardListRef.current.scrollBy({ left: 960, behavior: 'smooth' });

    setTimeout(() => {
      setScrolling(false);
      }, 400);
    }
  };
    // 카테고리 바뀌면 스크롤 맨 앞으로 초기화
  useEffect(() => {
    if (cardListRef.current) {
      cardListRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [selectedCategory]);
    
    return (
      <div className="supplies-frame">
        <p className="title">세차용품</p>
        <div className="product-category-list">
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-Bucket"
              checked={selectedCategory === '버킷'}
              onChange={() => handleCategoryChange('버킷')}
            />
            <label htmlFor="product-Bucket">버킷</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-CarShampoo"
              checked={selectedCategory === '카샴푸'}
              onChange={() => handleCategoryChange('카샴푸')}
            />
            <label htmlFor="product-CarShampoo">카샴푸</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-Sponge/Pad"
              checked={selectedCategory === '세차 스펀지/패드'}
              onChange={() => handleCategoryChange('세차 스펀지/패드')}
            />
            <label htmlFor="product-Sponge/Pad">스펀지/패드</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-WashMitt"
              checked={selectedCategory === '세차 워시미트'}
              onChange={() => handleCategoryChange('세차 워시미트')}
            />
            <label htmlFor="product-WashMitt">워시미트</label>
          </div>     
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-GlassCleaner"
              checked={selectedCategory === '차량 유리세정제'}
              onChange={() => handleCategoryChange('차량량 유리세정제')}
            />
            <label htmlFor="product-GlassCleaner">유리세정제</label>
          </div> 
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-OilFilmRemover"
              checked={selectedCategory === '차량 유막제거제'}
              onChange={() => handleCategoryChange('차량 유막제거제')}
            />
            <label htmlFor="product-OilFilmRemover">유막제거제</label>
          </div>
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-Tire/WheelCleaner"
              checked={selectedCategory === '타이어/휠 세정제'}
              onChange={() => handleCategoryChange('타이어/휠 세정제')}
            />
            <label htmlFor="product-Tire/WheelCleaner">타이어/휠 세정제</label>
          </div> 
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-DryingTowel"
              checked={selectedCategory === '차량 드라잉타월'}
              onChange={() => handleCategoryChange('차량 드라잉타월')}
            />
            <label htmlFor="product-DryingTowel">드라잉타월</label>
          </div>    
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-LiquidWax"
              checked={selectedCategory === '차량 액체왁스'}
              onChange={() => handleCategoryChange('차량 액체왁스')}
            />
            <label htmlFor="product-LiquidWax">액체왁스</label>
          </div> 
          <div className="product-category">
            <input 
              className="category-radio" 
              type="radio" 
              name="product-category" 
              id="product-PasteWax"
              checked={selectedCategory === '차량 고체왁스'}
              onChange={() => handleCategoryChange('차량 고체왁스')}
            />
            <label htmlFor="product-PasteWax">고체왁스</label>
          </div> 
        </div>
        <div className="card-frame">
          <button className="nav-button" onClick={scrollLeft}>
            <img src="/assets/left_button.svg" alt="Previous" />
          </button>
          <div className="card-list-frame" ref={cardListRef}>
            <ProductList category={selectedCategory} />
          </div>
          <button className="nav-button" onClick={scrollRight}>
            <img src="/assets/right_button.svg" alt="Next" />
          </button>
        </div>
      </div>
    );
  };

export default CarSupplies;