import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound.jsx'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} exact element={<Home/>}/>
                <Route path={"/login"} element={<LogIn/>}/>
                <Route path={"/signUp"} element={<SignUp/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
