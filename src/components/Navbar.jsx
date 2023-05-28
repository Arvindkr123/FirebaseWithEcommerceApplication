import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <Link to='login'>LogIn</Link>
            <Link to='signUp'>SignUp</Link>
        </div>
    )
}

export default Navbar
