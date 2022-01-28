import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import React, { useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';

export const Form = ({ isOpen, onClose, initData, currentReviewId = null, newReview = true, }) => {

    const [values, handleInputChange, reset, setValues] = useForm(initData)

    const { title, stars } = values
    const [handleError, setHandleError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title.trim().length === 0) {
            setHandleError('El titulo es necesario');
            return
        }

        try {
            if (newReview) {
                const ref = collection(db, 'reviews')
                await addDoc(ref, values);
                reset()
                onClose()
                setHandleError(null)
            } else {
                const path = `reviews/${currentReviewId}`
                const reviewRef = doc(db, path);
                await updateDoc(reviewRef, values);
                onClose()
                setHandleError(null)
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (stars > 5) {
            setValues({ ...values, stars: 5 })
        } else if (stars < 0) {
            setValues({ ...values, stars: 1 })
        }

    }, [stars, setValues, values])


    return (
        <Modal isOpen={isOpen} onClose={() => {
            onClose();
            setHandleError(null)
        }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{newReview ? 'Agregar Review' : 'Editar review'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex as='form' direction='column' onSubmit={handleSubmit}>
                        {handleError && <Text bgColor='red.100' p='2' borderRadius='sm' mb='4' fontWeight='bold'>{handleError}</Text>}
                        <Input placeholder='Titulo' name='title' value={title} onChange={handleInputChange} mb='4' />

                        <NumberInput name='stars' value={stars} defaultValue={1} min={0} max={5} required>
                            <NumberInputField onChange={handleInputChange} placeholder='Calificacion' />
                        </NumberInput>

                        <Button type='submit' _hover={{
                            background: "blue.400",
                            color: "none",
                        }}
                            bgColor='twitter.400' color='white' mt='4'>{newReview ? 'Guardar' : 'Editar'}</Button>

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
};
