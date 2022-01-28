import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';

export const TrList = ({ review, handleEdit, onOpen, setIdToDelete, setIsOpenDelete }) => {

    const { title, stars } = review.data()

    return (
        <>
            <Tr >
                <Td textAlign='center'>{title}</Td>
                <Td textAlign='center'>{stars} / 5</Td>
                <Td textAlign='center' display='flex'>
                    <Button bgColor='twitter.400' mr='4'
                        _hover={{
                            background: "blue.400",
                            color: "none",
                        }} onClick={() => {
                            handleEdit(review.id);
                            onOpen();
                        }}>Editar</Button>
                    <Button bgColor='red.600'
                        _hover={{
                            background: "red.700",
                            color: "none",
                        }} onClick={() => {
                            setIdToDelete(review.id);
                            setIsOpenDelete(true);
                        }}>Eliminar</Button>
                </Td>
            </Tr>
        </>
    )
};
