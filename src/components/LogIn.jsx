import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Config/Config';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const naviagate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setSuccessMsg('Login successfull, you will now automatically get redirected to Home...')
            setEmail('');
            setPassword('')
            setErrorMsg('')
            setTimeout(() => {
                setSuccessMsg('');
                naviagate("/")
            }, 3000)
        }).catch(error => setErrorMsg(error.message))
    }
    return (
        <div className='container'>
            <br /><br />
            <br /><br />
            <h1>LogIn</h1>
            <hr />
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
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
            {errorMsg && <>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>
            </>}
        </div>
    )
}

export default LogIn
