import { Box, Flex, List, ListItem } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogOut } from '../../actions/auth/auth'

export const Nav = () => {
    const { photo, uid, roles, name } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const handleLogout = () => {
        dispatch(startLogOut())
    }


    return (
        <Box as='nav' display='flex' alignItems='center' justifyContent='space-between' p='4'>
            <List display='flex' textDecor='none'>
                <ListItem mr='4'><NavLink to="/" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}  >Home</NavLink></ListItem>
                <ListItem mr='4'><NavLink to="/about" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>About</NavLink></ListItem>
                {!uid && <ListItem mr='4'><NavLink to="/register" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>Register</NavLink></ListItem>}
                {!uid && <ListItem mr='4'><NavLink to="/login" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>Login</NavLink></ListItem>}
                {roles?.admin && <ListItem mr='4'><NavLink to="/dashboard" className={`{ ({ isActive }) => isActive ? 'active' : ''  } p-button`}>Dashboard</NavLink></ListItem>}
                {uid && <ListItem ><button onClick={handleLogout}>logout</button></ListItem>}

            </List>
            {uid &&
                <Flex alignItems='center'>
                    <Box mr='4' bgColor='yellow.200' textColor='black' px='4' py='2' rounded='sm' fontWeight='bold'>{name}</Box>
                    <Box maxW='10' borderRadius='full' overflow='hidden'>
                        <img w='full' src={photo} alt="" />
                    </Box>
                </Flex>
            }


        </Box>
    )
}
