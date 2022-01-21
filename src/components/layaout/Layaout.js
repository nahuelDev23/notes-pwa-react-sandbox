
import { Box } from '@chakra-ui/react'
import React from 'react'
import { Nav } from '../nav/Nav'

export const Layaout = ({ children }) => {
    return (
        <Box  bgColor='gray.200' >
            <Nav />
            <Box as='main' minHeight='full' >
                {children}
            </Box>
        </Box>
    )
}