import React from 'react';
import { Button, Menu, MenuButton, MenuList, Td, Tr } from '@chakra-ui/react';
export const TrList = ({ review, handleEdit, onOpen, setIdToDelete, setIsOpenDelete }) => {

    const { title, stars } = review.data()

    return (
        <>
            <Tr >
                <Td textAlign='center'>{title}</Td>
                <Td textAlign='center'>{stars} / 5</Td>
                <Td textAlign='center' display={{ base: 'none', md: 'flex' }}>
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
                <Td textAlign='center' display={{ base: 'block', md: 'none' }}>
                    <Menu>
                        <MenuButton>Opciones</MenuButton>
                        <MenuList px='4' textColor='black' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                            <Button bgColor='twitter.400'
                                w='full'
                                mb='4'
                                textColor='white'
                                _hover={{
                                    background: "blue.400",
                                    color: "none",
                                }} onClick={() => {
                                    handleEdit(review.id);
                                    onOpen();
                                }}>Editar</Button>
                            <Button bgColor='red.600'
                                w='full'
                                textColor='white'
                                _hover={{
                                    background: "red.700",
                                    color: "none",
                                }} onClick={() => {
                                    setIdToDelete(review.id);
                                    setIsOpenDelete(true);
                                }}>Eliminar</Button>
                        </MenuList>
                    </Menu>
                </Td>
            </Tr>
        </>
    )
};
