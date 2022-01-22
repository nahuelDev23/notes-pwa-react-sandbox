import { onAuthStateChanged, getAuth } from '../firebase/firebaseConfig'
import React, { useEffect, useState } from 'react'
import {doc,getDoc,db } from '../firebase/firebaseConfig'

import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";

import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Detail } from '../pages/review/Detail';
import { Register } from '../pages/Register';
import './style.css'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth/auth';
import { PublicRoute } from './PublicRouter';
import { PrivateRoute } from './PrivateRouter';
import { Dashboard } from '../pages/Dashboard';
import { useSelector } from 'react-redux';
import { Heading } from '@chakra-ui/react';

export const AppRouter = () => {
    const dispatch = useDispatch()
    const { roles } = useSelector(state => state.auth)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async(user) => {
            if (user?.uid) {

                const docuRef = doc(db, `users/${user.uid}`);
                const req = await getDoc(docuRef);
                const roles = req.data().roles; //es como req.json()

                dispatch(login(user.uid, user.displayName, user.email, user.photoURL,roles))
                
            } 
            setChecking(false)
        });

    }, [dispatch])


    if( checking ) {
        return (
            <Heading fontSize='xl' textColor='green.300'>Cargando</Heading>
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
                    <PrivateRoute isAdmin={roles?.admin}>
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
                <Route path="/review/:id" element={
                    <PublicRoute >
                        <Detail />
                    </PublicRoute>
                }></Route>
                
            </Routes>
        </BrowserRouter>
    )
}
