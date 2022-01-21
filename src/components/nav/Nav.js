import { Box, List, ListItem } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogOut } from '../../actions/auth/auth'

export const Nav = () => {
    const { photo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(startLogOut())
    }
    return (
        <Box as='nav'>
            <List display='flex' textDecor='none'>
                <ListItem><NavLink to="/" className={({ isActive }) => isActive ? 'red' : ''}>Home</NavLink></ListItem>
                <ListItem><NavLink to="/about" className={({ isActive }) => isActive ? 'red' : ''}>About</NavLink></ListItem>
                <ListItem><NavLink to="/register" className={({ isActive }) => isActive ? 'red' : ''}>Register</NavLink></ListItem>
                <ListItem><NavLink to="/login" className={({ isActive }) => isActive ? 'red' : ''}>Login</NavLink></ListItem>
                <ListItem><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'red' : ''}>Dashboard</NavLink></ListItem>
                <ListItem><button onClick={handleLogout}>logout</button></ListItem>
                
            </List>
            <Box>
            <img src={photo} alt="" />
            </Box>
        </Box>
    )
}
