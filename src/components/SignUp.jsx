import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [fulllName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignUP = (e) => {
        e.preventDefault();
        console.log(fulllName, email, password)
    }
    return (
        <div className='container'>
            <br /><br />
            <br /><br />
            <h1>Sign Up</h1>
            <hr /><hr />
            <form className='form-group' autoComplete='off' onSubmit={handleSignUP}>
                <label>Full Name</label>
                <input value={fulllName} onChange={(e) => setFullName(e.target.value)} type="text" className='form-control' required />
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='form-control' required />
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='form-control' required />
                <br /><br />
                <div className="btn-box">
                    <span>Already have an account Login <Link to='/login' className='link'>here</Link></span>
                    <button type='submit' className='btn btn-success btn-md text-uppercase'>Sign Up</button>
                </div>
            </form>

        </div>
    )
}

export default SignUp
