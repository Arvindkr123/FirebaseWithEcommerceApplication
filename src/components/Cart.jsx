import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { auth, fs } from '../Config/Config';
import Products from './Products';
import CartProducts from './CartProducts.jsx'

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


    return (
        <>
            <Navbar user={user} />
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
                </div>
            )}

            {cartProducts.length < 1 && (
                <div className="container-fluid">No products to show</div>
            )}
        </>
    )
}

export default Cart;
