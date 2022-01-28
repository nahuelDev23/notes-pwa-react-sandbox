import React from 'react'
import { Avatar, Box, Flex, List, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const DesktopNav = ({ handleLogout }) => {
    const { photo, uid, roles, name } = useSelector(state => state.auth)

    let activeStyleDesktop = {
        textDecoration: "underline",
        color: 'white',
    };

    return (
        <>
            <List display='flex' textDecor='none'>
                <ListItem mr='4'>
                    <NavLink to="/" style={({ isActive }) =>
                        isActive ? activeStyleDesktop : undefined
                    } >
                        Home
                    </NavLink>
                </ListItem>
                {!uid &&
                    <ListItem mr='4'>
                        <NavLink to="/register" style={({ isActive }) =>
                            isActive ? activeStyleDesktop : undefined
                        } >
                            Register
                        </NavLink>
                    </ListItem>}
                {!uid &&
                    <ListItem mr='4'>
                        <NavLink to="/login" style={({ isActive }) =>
                            isActive ? activeStyleDesktop : undefined
                        } >
                            Login
                        </NavLink>
                    </ListItem>}
                {roles?.admin &&
                    <ListItem mr='4'><NavLink to="/dashboard" style={({ isActive }) =>
                        isActive ? activeStyleDesktop : undefined
                    } >
                        Dashboard
                    </NavLink>
                    </ListItem>}
                {uid && <ListItem ><button onClick={handleLogout}>logout</button></ListItem>}

            </List>
            {uid &&
                <Flex alignItems='center'>
                    <Box mr='4' bgColor='blue.200' textColor='black' px='2' py='1' rounded='sm' fontWeight='bold'>{name}</Box>
                    <Box maxW='10' borderRadius='full' overflow='hidden'>
                        <Avatar src={photo} size='sm' alt="" />
                    </Box>
                </Flex>
            }
        </>
    )
}
