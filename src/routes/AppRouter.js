import { onAuthStateChanged, getAuth } from '../firebase/firebaseConfig'
import React, { useEffect, useState } from 'react'
import {doc,getDoc,db } from '../firebase/firebaseConfig'
import ClipLoader from "react-spinners/ClipLoader";
import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";

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
import {   Flex } from '@chakra-ui/react';
import { AuthRoute } from './AuthRouter';

export const AppRouter = () => {
    const dispatch = useDispatch()
    const { roles } = useSelector(state => state.auth)
    const [checking, setChecking] = useState(true)
    const { uid } = useSelector(state => state.auth)
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async(user) => {
            if (user?.uid) {

                const docuRef = doc(db, `users/${user.uid}`);
                const req = await getDoc(docuRef);
                const roles = req.data().roles  //es como req.json()

                dispatch(login(user.uid, user.displayName, user.email, user.photoURL,roles))
                
            } 
            setChecking(false)
        });

    }, [dispatch])


    if( checking ) {
        return (
            <Flex minW='full' minH='100vh'  justifyContent='center' alignItems='center' fontSize='xl' textColor='white'><ClipLoader color='white'/></Flex>
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
                    <AuthRoute uid={uid}>
                        <Login />
                    </AuthRoute>
                }></Route>
                <Route path="/dashboard" element={
                    <PrivateRoute isAdmin={roles?.admin}>
                        <Dashboard  />
                    </PrivateRoute>
                }></Route>
                <Route path="/register" element={
                    <AuthRoute uid={uid}>
                        <Register />
                    </AuthRoute>
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
