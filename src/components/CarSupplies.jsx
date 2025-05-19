import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const CarSupplies = () => { 
    
    return  (
        <div className="supplies-frame">
            <p className="title">차량용품</p>
            <div class="product-category-list">
                <div class="post-category">
                    <input class="category-radio" type='radio' name='post-category' id='post-all' value='post-all'/>
                    <label for="post-all">all</label>
                </div>
                <div class="post-category">
                    <input class="category-radio" type='radio' name='post-category' id='post-fashion' value='post-fashion'/>
                    <label for="post-fashion">fashion</label>
                </div>
                <div class="post-category">
                    <input class="category-radio" type='radio' name='post-category' id='post-mood' value='post-mood'/>
                    <label for="post-mood">mood</label>
                </div>
                <div class="post-category">
                    <input class="category-radio" type='radio' name='post-category' id='post-mood' value='post-mood'/>
                    <label for="post-mood">story</label>
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