import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import { auth, fs } from '../Config/Config'

const Home = () => {
    // get the current user
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }
    const user = GetCurrentUser();
    console.log(user)
    return (
        <div>
            <Navbar user={user} />
            <Products />
        </div>
    )
}

export default Home
