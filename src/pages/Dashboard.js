import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'
import { Layaout } from '../components/layaout/Layaout'
import { db } from '../firebase/firebaseConfig'
import { useForm } from '../hooks/useForm'
import { ReviewsListTable } from './review/ReviewsListTable'

export const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { uid } = useSelector(state => state.auth)
    
    const [values,handleInputChange,reset] = useForm({
        title:'',
        stars:1,
        owner:uid,
        date: serverTimestamp(),
    })

    const {title,stars} = values

    const handleSubmit = async(e) => {
        e.preventDefault()

        reset()

        await addDoc(collection(db, 'reviews'),values);
    }

    return (
        <Layaout>
            <Button onClick={onOpen} bgColor='twitter.400'>Agregar review</Button>
            <ReviewsListTable />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex as='form' direction='column' onSubmit={handleSubmit}>

                            <Input placeholder='title' name='title' value={title} onChange={handleInputChange} mb='4'/>

                            <NumberInput  name='stars' defaultValue={1} min={1} max={5}>
                                <NumberInputField  value={stars} onChange={handleInputChange}/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <Button type='submit' bgColor='twitter.400' color='white' mt='4'>guardar</Button>

                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Layaout>
    )
}
