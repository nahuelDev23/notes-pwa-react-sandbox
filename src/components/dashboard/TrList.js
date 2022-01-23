import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

export const TrList = ({review}) => {
   const {title,stars} = review.data()
    return (
        <Tr >
            <Td textAlign='center'>{title}</Td>
            <Td textAlign='center'>{stars} / 5</Td>
            <Td textAlign='center'>editar elimiar</Td>
        </Tr>
    )
};
