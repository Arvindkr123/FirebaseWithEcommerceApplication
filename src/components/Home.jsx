import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import { auth, fs } from '../Config/Config'

const Home = () => {
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
    return (
        <div>
            <Navbar user={user} />
            {products.length > 0 && (
                <div className='container-fluid mt-5'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} />
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
