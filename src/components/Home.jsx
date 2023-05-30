import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import { auth, fs } from '../Config/Config'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    // get the current user
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

    const [products, setProducts] = useState([]);
    // getting product functions 
    const getProducts = async () => {
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    const getUserId = () => {
        const [uId, setUId] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUId(user.uid);
                }
            })
        }, [])

        return uId;
    }
    const uId = getUserId();
    let Product;
    const addToCart = (product) => {
        if (uId === null) {
            navigate('/login')
        } else {
            Product = product;
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            fs.collection('cart' + uId).doc(product.ID).set(Product).then(() => {
                console.log('successfully added to cart')
            })
            console.log(product)
            console.log('uid', uId)
        }
    }

    return (
        <div>
            <Navbar user={user} />
            {products.length > 0 && (
                <div className='container-fluid mt-5'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} onAddToCart={addToCart} />
                    </div>
                </div>
            )}

            {products.length < 1 && (
                <div className='container-fluid'>Please Wait........</div>
            )}
        </div>
    )
}

export default Home
