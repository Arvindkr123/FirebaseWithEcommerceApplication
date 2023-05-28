import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password)
    }
    return (
        <div className='container'>
            <br /><br />
            <br /><br />
            <h1>LogIn</h1>
            <hr /><hr />
            <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='form-control' required />
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='form-control' required />
                <br /><br />
                <div className="btn-box">
                    <span>Don't have an account SignUp <Link to='/signUp' className='link'>here</Link></span>
                    <button type='submit' className='btn btn-success btn-md text-uppercase'>LogIn</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn
