import React from 'react'

const IndiviualProduct = ({ indiviualProduct }) => {
    console.log(indiviualProduct)
    return (
        <div className="product">
            <div className="product-img">
                <img src={indiviualProduct.url} alt="product image" />
            </div>
            <div className="product-text title">{indiviualProduct.title}</div>
            <div className="product-text description">{indiviualProduct.description}</div>
            <div className="product-text price">₹ {indiviualProduct.price}</div>
            <button className="btn btn-danger btn-md cart-btn">ADD TO CART</button>
        </div>
    )
}

export default IndiviualProduct
