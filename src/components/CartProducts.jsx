import React from 'react'
import IndividualCartProduct from './IndividualCartProduct.jsx'

const CartProducts = ({ cartProducts, cartProudctIncrease, cartProudctDecrease }) => {
    return cartProducts.map((cartProduct) => {
        return <IndividualCartProduct
            key={cartProduct.ID}
            cartProduct={cartProduct}
            cartProudctIncrease={cartProudctIncrease}
            cartProudctDecrease={cartProudctDecrease}
        />
    })
}

export default CartProducts;
