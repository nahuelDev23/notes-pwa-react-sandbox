import { onAuthStateChanged, getAuth } from '../firebase/firebaseConfig'
import React, { useEffect } from 'react'
import {
    Routes,
    Route,
    BrowserRouter,
    NavLink
} from "react-router-dom";

import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import './style.css'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth/auth';

export const AppRouter = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL))
            } else {
                // User is signed out
                // ...
            }
        });

    }, [])

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'red' : ''}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'red' : ''}>About</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? 'red' : ''}>Register</NavLink></li>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? 'red' : ''}>Login</NavLink></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
