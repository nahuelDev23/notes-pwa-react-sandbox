import React from 'react'
import { Avatar, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'

export const MobileNav = ({handleLogout}) => {
    const { photo, uid, roles, name } = useSelector(state => state.auth)
    let activeStyle = {
        textDecoration: "underline"
    };
    return (
        <Menu>
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            m='4'

            _hover={{ bg: 'blue.400' }}
            _expanded={{ bg: 'blue.400' }}
        />
        <MenuList textColor='black' >
            <NavLink to="/" style={({ isActive }) =>
                isActive ? activeStyle : undefined
            }>
                <MenuItem _hover={{ bgColor: 'blue.200' }}>
                    Home
                </MenuItem>
            </NavLink>
            {!uid &&
                <NavLink to="/register" style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <MenuItem _hover={{ bgColor: 'blue.200' }}>
                        Register
                    </MenuItem>
                </NavLink>
            }
            {!uid &&
                <NavLink to="/login" style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <MenuItem _hover={{ bgColor: 'blue.200' }}>
                        Login
                    </MenuItem>
                </NavLink>
            }
            {roles?.admin &&
                <NavLink to="/dashboard" style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <MenuItem _hover={{ bgColor: 'blue.200' }}>
                        Dashboard
                    </MenuItem>
                </NavLink>
            }
            {uid &&
                <MenuItem _hover={{ bgColor: 'blue.200' }}>
                    <Box onClick={handleLogout}>logout</Box>
                </MenuItem>
            }
            {uid &&
                <MenuItem>
                    <Flex alignItems='center'>
                        <Box mr='4' bgColor='yellow.200' textColor='black' px='4' py='2' rounded='sm' fontWeight='bold'>{name}</Box>
                        <Box maxW='10' borderRadius='full' overflow='hidden'>
                            <Avatar src={photo} size='sm' alt="" />
                        </Box>
                    </Flex>
                </MenuItem>

            }
        </MenuList>
    </Menu>
    )
}
