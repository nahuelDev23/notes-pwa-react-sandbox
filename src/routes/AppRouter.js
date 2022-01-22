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
import { login } from '../actions/auth/auth';
import { PublicRoute } from './PublicRouter';
import { PrivateRoute } from './PrivateRouter';
import { Dashboard } from '../pages/Dashboard';

export const AppRouter = () => {
    const dispatch = useDispatch()
    const [admin, setAdmin] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL))
                user.email === 'tester@gmail.com' && setAdmin(true)
            } else {
                setAdmin(false)
            }
            setChecking(false)
        });

    }, [dispatch])


    if( checking ) {
        return (
            <h1>AGUANTAAA</h1>
        )
    }

    return (
        <BrowserRouter>
           
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
                        <Dashboard  />
                    </PrivateRoute>
                }></Route>
                <Route path="/register" element={
                    <PublicRoute >
                        <Register />
                    </PublicRoute>
                }></Route>
                <Route path="/about" element={
                    <PublicRoute >
                        <About />
                    </PublicRoute>
                }></Route>
                
            </Routes>
        </BrowserRouter>
    )
}
