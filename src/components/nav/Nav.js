import { Box, List, ListItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogOut } from '../../actions/auth/auth'

export const Nav = () => {
    const { photo, uid, email } = useSelector(state => state.auth)
    const [admin, setAdmin] = useState(false)
    const dispatch = useDispatch()


    const handleLogout = () => {
        dispatch(startLogOut())
    }
    
    useEffect(() => {
        email === 'tester@gmail.com' && setAdmin(true)
    }, [email])

    return (
        <Box as='nav' display='flex' alignItems='center' justifyContent='space-between' p='4'>
            <List display='flex' textDecor='none'>
                <ListItem mr='4'><NavLink  to="/"  className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}  >Home</NavLink></ListItem>
                <ListItem mr='4'><NavLink  to="/about" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>About</NavLink></ListItem>
                <ListItem mr='4'><NavLink  to="/register" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>Register</NavLink></ListItem>
                {!uid && <ListItem mr='4'><NavLink  to="/login" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>Login</NavLink></ListItem>}
                {admin && <ListItem mr='4'><NavLink  to="/dashboard" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>Dashboard</NavLink></ListItem>}
                <ListItem ><button onClick={handleLogout}>logout</button></ListItem>

            </List>
            <Box maxW='10' borderRadius='full' overflow='hidden'>
                <img w='full' src={photo} alt="" />
            </Box>
        </Box>
    )
}
