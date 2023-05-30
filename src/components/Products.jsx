import React from 'react'
import IndiviualProduct from './IndiviualProduct.jsx'

const Products = ({ products, onAddToCart }) => {
    console.log(products)
    return products.map((indiviual) => {
        return <IndiviualProduct key={indiviual.ID} indiviualProduct={indiviual} addToCart={onAddToCart} />
    })
}

export default Products
