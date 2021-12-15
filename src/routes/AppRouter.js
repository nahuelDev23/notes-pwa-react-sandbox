import React from 'react'
import {
    Routes,
    Route,
    BrowserRouter,
    NavLink
} from "react-router-dom";

import { About } from '../pages/About';
import { Home } from '../pages/Home';
import './style.css'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'red' : ''}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({isActive}) => isActive ? 'red' : ''}>About</NavLink></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
