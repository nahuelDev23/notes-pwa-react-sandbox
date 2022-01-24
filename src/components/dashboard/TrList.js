import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';

export const TrList = ({ review, handleEdit, onOpen, setIdToDelete, setIsOpenDelete }) => {

    const { title, stars } = review.data()

    return (
        <>
            <Tr >
                <Td textAlign='center'>{title}</Td>
                <Td textAlign='center'>{stars} / 5</Td>
                <Td textAlign='center'>
                    <Button bgColor='twitter.600' mr='4' onClick={() => {
                        handleEdit(review.id);
                        onOpen();
                    }}>Editar</Button>
                    <Button bgColor='red.600' onClick={() => {
                        setIdToDelete(review.id);
                        setIsOpenDelete(true);
                    }}>Eliminar</Button>
                </Td>
            </Tr>
        </>
    )
};
