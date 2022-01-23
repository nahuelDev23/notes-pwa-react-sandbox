import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { Form } from './review/Form';

export const TrList = ({ review }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, stars } = review.data()
    const [currentReview, setCurrentReview] = useState(null)
    const [idToDelete, setIdToDelete] = useState(null)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const onCloseDelete = () => setIsOpenDelete(false)
    const cancelRef = React.useRef()

    const handleEdit = async (id) => {
        if (id) {
            const docRef = doc(db, 'reviews', id)
            const docSnap = await getDoc(docRef);
            docSnap.data() !== null && setCurrentReview(docSnap.data())
            currentReview && console.log(currentReview);
        }
    }
    const handleDelete = async (id) => {

        if (id) {
            const docRef = doc(db, 'reviews', id)
            await deleteDoc(docRef);

        }
    }

    const initData = {
        title: currentReview?.title,
        stars: currentReview?.stars,
    }


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
            {/* !esto tiene que estar por fuera del table! */}
            {currentReview && <Form isOpen={isOpen} onClose={onClose} newReview={false} initData={initData} currentReviewId={review.id} />}


            <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Borrar Review
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Estas seguro?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDelete}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={() => handleDelete(idToDelete)} ml={3}>
                                Borrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>

    )
};
