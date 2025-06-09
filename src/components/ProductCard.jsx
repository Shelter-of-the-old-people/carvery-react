import React from 'react';
import '../styles/productCard.css'

const ProductCard = ({ image, brand, title, price, link}) => {
  return (
    <div className="card-container">
      <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="card-background"></div>
      <div className="card-content-wrapper">
        <img src={image} alt={title} className="card-image" />
        <div className="card-content">
          <div className="brand">{brand}</div>
          <div className="title">{title}</div>
          <div className="price">{price.toLocaleString()}원</div>
        </div>
      </div>
      </a>
    </div>
  );
};
export default ProductCard;