
import { Box } from '@chakra-ui/react'
import React from 'react'
import { Nav } from '../nav/Nav'

export const Layaout = ({ children }) => {
    return (
        <Box textColor='white' width={{base:'full',lg:'container.sm'}} mx='auto'>
            <Nav />
            <Box as='main' minHeight='full' mx='4' >
                {children}
            </Box>
        </Box>
    )
}