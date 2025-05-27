import React from 'react';
import '../styles/productCard.css'

const ProductCard = ({ image, brand, title, price, rating, reviewCount }) => {
  return (
    <div className="card-container">
      <a href='https://www.coupang.com/vp/products/5485035486?itemId=8474019807&vendorItemId=75761635793&sourceType=srp_product_ads&clickEventId=b586af80-353f-11f0-9129-03f527486ee5&korePlacement=15&koreSubPlacement=1&q=%EC%B9%B4%EC%83%B4%ED%91%B8&itemsCount=36&searchId=992650ca8501639&rank=0&searchRank=0&isAddedCart='>
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
      </a>
    </div>
  );
};
export default ProductCard;