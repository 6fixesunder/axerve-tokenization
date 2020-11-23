import React from 'react';
import './Product.css';
import watch from '../../img/watch.png';

function Product() {

    return (
        <div className="Product">
            <h3>Paper Watch by Paper Style</h3>
            <div className="Body">
                <img width={20 + '%'} height={20 + '%'} src={watch} alt={"Watch"}/>
                <div className="Texts">
                    <h4>Description</h4>
                    <p>A luxury watch made with paper</p>
                    <h4>Price</h4>
                    <p>10€</p>
                </div>
            </div>
        </div>)

}

export default Product;