import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField } from '@chakra-ui/react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import React from 'react';
import { useForm } from '../../../hooks/useForm';

export const Form = ({ isOpen, onClose, initData, currentReviewId = null, newReview = true, }) => {

    const [values, handleInputChange, reset] = useForm(initData)

    const { title, stars } = values

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newReview) {
            await addDoc(collection(db, 'reviews'), values);
            reset()
        } else {
            const reviewRef = doc(db, `reviews/${currentReviewId}`);
            await updateDoc(reviewRef, values);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{newReview ? 'Agregar Review' : 'Editar review'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex as='form' direction='column' onSubmit={handleSubmit}>

                        <Input placeholder='title' name='title' value={title} onChange={handleInputChange} mb='4' />

                        <NumberInput name='stars' value={stars} defaultValue={1} min={1} max={5}>
                            <NumberInputField onChange={handleInputChange} />
                        </NumberInput>

                        <Button type='submit' bgColor='twitter.400' color='white' mt='4'>{newReview ? 'Guardar' : 'Editar'}</Button>

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
};
