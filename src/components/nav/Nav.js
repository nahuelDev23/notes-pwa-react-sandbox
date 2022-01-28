import { Box } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogOut } from '../../actions/auth/auth'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export const Nav = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogOut())
    }
    
    return (
        <>
            <Box display={{ base: 'block', sm: 'none' }}>
                <MobileNav handleLogout={handleLogout} />
            </Box>

            <Box display={{ base: 'none', sm: 'flex' }} as='nav' alignItems='center' justifyContent='space-between' p='4'>
                <DesktopNav handleLogout={handleLogout} />
            </Box>
        </>

    )
}
