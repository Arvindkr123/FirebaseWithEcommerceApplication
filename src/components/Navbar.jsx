import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../img/cart-icon-28341(1).png'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { auth } from '../Config/Config'


const Navbar = ({ user }) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        auth.signOut().then(() => {
            navigate("/login")
        })
    }
    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className='rightside'>
                {!user &&
                    <>
                        <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                        <div><Link className='navlink' to="login">LOGIN</Link></div>
                    </>}

                {user && <>
                    <div><Link className='navlink' to='/'>{user}</Link></div>
                    <div className="cart-menu-btn">
                        <Link className="navlink" to='/cart'>
                            <HiOutlineShoppingCart size={'35px'} />
                        </Link>
                        {/* <span className='cart-indicator'>{0}</span> */}
                    </div>
                    <div className="btn btn-danger btn-md" onClick={handleLogOut}>
                        LOGOUT
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Navbar
