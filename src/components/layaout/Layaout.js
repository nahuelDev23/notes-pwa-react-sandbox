
import { Box } from '@chakra-ui/react'
import React from 'react'
import { Nav } from '../nav/Nav'

export const Layaout = ({ children }) => {
    return (
        <Box textColor='white'>
            <Nav />
            <Box as='main' minHeight='full' >
                {children}
            </Box>
        </Box>
    )
}