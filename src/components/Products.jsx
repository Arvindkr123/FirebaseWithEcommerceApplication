import React from 'react'
import IndiviualProduct from './IndiviualProduct.jsx'

const Products = ({ products }) => {
    console.log(products)
    return products.map((indiviual) => {
        return <IndiviualProduct key={indiviual.ID} indiviualProduct={indiviual} />
    })
}

export default Products
