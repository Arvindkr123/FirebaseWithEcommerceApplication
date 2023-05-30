import React from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { auth, fs } from '../Config/Config'
const IndividualCartProduct = ({ cartProduct, cartProudctIncrease, cartProudctDecrease }) => {
    const handleCartProductIncrease = () => {
        cartProudctIncrease(cartProduct);
    }

    const handleCartProductDecrease = () => {
        cartProudctDecrease(cartProduct);
    }

    const deleteCartHandler = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('cart' + user.uid).doc(cartProduct.ID).delete().then(() => {
                    console.log('successfully deleted cart')
                })
            } else {
                console.log('user is not logged to delete the cart item')
            }
        })
    }
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
                <div className="actions-btns minus" onClick={handleCartProductDecrease}>
                    <HiMinus size={20} />
                </div>
                <div>{cartProduct.qty}</div>
                <div className="actions-btns plus" onClick={handleCartProductIncrease}>
                    <HiPlus size={20} />
                </div>
            </div>
            <div className="product-text cart-price"><MdOutlineCurrencyRupee size={20} />{cartProduct.TotalProductPrice}</div>
            <div className="btn btn-danger btn-md cart-btn text-uppercase" onClick={deleteCartHandler}>delete</div>
        </div>
    )
}

export default IndividualCartProduct
