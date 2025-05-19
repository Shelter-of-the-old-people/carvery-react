import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const CarSupplies = () => { 
    
    return  (
        <div className="supplies-frame">
            <p className="title">차량용품</p>
            <div class="product-category-list">
                <div class="product-category">
                    <input class="category-radio" type='radio' name='product-category' id='product-all' checked/>
                    <label for="product-all">all</label>
                </div>
                <div class="product-category">
                    <input class="category-radio" type='radio' name='product-category' id='product-fashion'/>
                    <label for="product-fashion">fashion</label>
                </div>
                <div class="product-category">
                    <input class="category-radio" type='radio' name='product-category' id='product-mood'/>
                    <label for="product-mood">mood</label>
                </div>
                <div class="product-category">
                    <input class="category-radio" type='radio' name='product-category' id='product-mood'/>
                    <label for="product-mood">story</label>
                </div>
            </div>
            <div className="card-frame">
                <button className="nav-button"><img src='/assets/left_button.svg'></img></button>
                <div className="card-list-frame">
                    <ProductList />
                </div>
                <button className="nav-button"><img src='/assets/right_button.svg'></img></button>
            </div>
        </div>
    );
};

export default CarSupplies;