import React from 'react'
import IndividualCartProduct from './IndividualCartProduct.jsx'

const CartProducts = ({ cartProducts }) => {
    return cartProducts.map((cartProduct) => {
        return <IndividualCartProduct key={cartProduct.ID} cartProduct={cartProduct} />
    })
}

export default CartProducts;
