import React from 'react';
import '../styles/productCard.css'

const ProductCard = ({ image, brand, title, price, rating, reviewCount }) => {
  return (
    <div className="card-container">
      <div className="card-background"></div>
      <div className="card-content-wrapper">
        <img src={image} alt={title} className="card-image" />
        <div className="card-content">
          <div className="brand">{brand}</div>
          <div className="title">{title}</div>
          <div className="price">{price.toLocaleString()}원</div>
          <div className="rating">
            <span className="star">⭐</span> {rating} <span className="review">(리뷰 {reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;