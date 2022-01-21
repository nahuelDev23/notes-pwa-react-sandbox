import { onAuthStateChanged, getAuth } from '../firebase/firebaseConfig'
import React, { useEffect, useState } from 'react'
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
import { login, startLogOut } from '../actions/auth/auth';
import { PublicRoute } from './PublicRouter';
import { PrivateRoute } from './PrivateRouter';
import { Dashboard } from '../pages/Dashboard';

export const AppRouter = () => {
    const dispatch = useDispatch()
    const [admin,setAdmin] = useState(false)
    const handleLogout = () =>{
        dispatch(startLogOut())
    } 

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL))
                user.email === 'tester@gmail.com' && setAdmin(true)
                // console.log(admin);
                // console.log(user.email);
            } else {
                setAdmin(false)
            }
        });

    }, [dispatch])
//falta hacer rutas privadas 258
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><button onClick={handleLogout}>logout</button></li>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'red' : ''}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'red' : ''}>About</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? 'red' : ''}>Register</NavLink></li>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? 'red' : ''}>Login</NavLink></li>
                    <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'red' : ''}>Dashboard</NavLink></li>
                </ul>
            </nav>
            <Routes>
            <Route path="/" element={
                <PublicRoute>
                    <Home />
                </PublicRoute>
            }></Route>
             <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }></Route>
            <Route path="/dashboard" element={
                <PrivateRoute isAdmin={admin}>
                    <Dashboard />
                </PrivateRoute>
            }></Route>
               {/* <Route path="/about" element={<About />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}
