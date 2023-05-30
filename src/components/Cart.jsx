import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { auth, fs } from '../Config/Config';
import CartProducts from './CartProducts.jsx'
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import StripeCheckout from 'react-stripe-checkout';

const Cart = () => {
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('users').doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().FullName);
                    })
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user;
    }
    const user = GetCurrentUser();
    console.log(user)

    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                fs.collection('cart' + user.uid).onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data()
                    }))
                    setCartProducts(newCartProduct);
                })
            } else {
                console.log('User is not signed to reterive the cart items')
            }
        })
    }, [])

    console.log(cartProducts)

    // cart product increase
    let Product;
    const cartProudctIncrease = (product) => {
        // console.log(product)
        Product = product;
        // increase the qty
        Product.qty += 1;
        // update the total amount
        Product.TotalProductPrice = Product.qty * Product.price;
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('cart' + user.uid).doc(product.ID).update(Product);
            } else {
                console.log('user is not logged in to increase the cart qty')
            }
        })
    }
    const cartProudctDecrease = (product) => {
        // console.log(product)
        Product = product;
        // increase the qty
        if (Product.qty > 1) {
            Product.qty -= 1;
            Product.TotalProductPrice = Product.qty * Product.price;
        }
        // update the total amount
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('cart' + user.uid).doc(product.ID).update(Product);
            } else {
                console.log('user is not logged in to decrease the cart qty')
            }
        })
    }

    const qty = cartProducts.map(cartProduct => {
        return cartProduct.qty;
    })
    console.log(qty)

    const totalQty = qty.reduce((acc, cur) => {
        acc += cur;
        return acc;
    }, 0)

    console.log('Total Quantity of the Product ', totalQty)

    // make the total product price
    const price = cartProducts.map(cartProduct => {
        return cartProduct.TotalProductPrice;
    })
    console.log('This is the total Product price of array', price)

    const totalProductPrice = price.reduce((acc, cur) => {
        acc = acc + cur;
        return acc;
    }, 0)
    console.log(totalProductPrice);

    const [totalProducts, setTotalProducts] = useState(0);
    // getting cart products
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('cart' + user.uid).onSnapshot(snapshot => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    }, [])

    return (
        <>
            <Navbar user={user} totalProducts={totalProducts} />
            <br /><br />
            {cartProducts.length > 0 && (
                <div className="container-fluid">
                    <h1 className="text-center">Cart</h1>
                    <div className="products-box">
                        <CartProducts
                            cartProducts={cartProducts}
                            cartProudctIncrease={cartProudctIncrease}
                            cartProudctDecrease={cartProudctDecrease}
                        />
                    </div>
                    <div className='summary-box text-center'>
                        <h5 className='text-center'>Cart Summary</h5>
                        <br></br>
                        <div>
                            Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                            Total Price to Pay: <span>  <MdOutlineCurrencyRupee /> {totalProductPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout>
                            <button className='btn btn-primary text-capitalize'>Pay with Card</button>
                        </StripeCheckout>
                    </div>
                </div>
            )}

            {cartProducts.length < 1 && (
                <div className="container-fluid">No products to show</div>
            )}
        </>
    )
}

export default Cart;
