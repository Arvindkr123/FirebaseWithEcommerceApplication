import React from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
const IndividualCartProduct = ({ cartProduct }) => {
    return (
        <div className="product">
            <div className="product-img">
                <img src={cartProduct.url} alt="product image" />
            </div>
            <div className="product-text title">{cartProduct.title}</div>
            <div className="product-text description">{cartProduct.description}</div>
            <div className="product-text price"><MdOutlineCurrencyRupee size={20} />{cartProduct.price}</div>
            <span>Quantity</span>
            <div className="product-text quantity-box">
                <div className="actions-btns minus">
                    <HiMinus size={20} />
                </div>
                <div>{cartProduct.qty}</div>
                <div className="actions-btns plus">
                    <HiPlus size={20} />
                </div>
            </div>
            <div className="product-text cart-price"><MdOutlineCurrencyRupee size={20} />{cartProduct.TotalProductPrice}</div>
            <div className="btn btn-danger btn-md cart-btn text-uppercase">delete</div>
        </div>
    )
}

export default IndividualCartProduct
