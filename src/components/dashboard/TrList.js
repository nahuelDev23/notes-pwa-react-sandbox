import { Button, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { Form } from './review/Form';

export const TrList = ({ review }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, stars } = review.data()
    const [currentReview, setCurrentReview] = useState(null)


    const handleEdit = async (id) => {
        if (id) {
            const docRef = doc(db, 'reviews', id)
            const docSnap = await getDoc(docRef);
            docSnap.data() !== null && setCurrentReview(docSnap.data())
            currentReview && console.log(currentReview);
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
                    <Button bgColor='twitter.600' onClick={() => {
                        handleEdit(review.id);
                        onOpen();
                    }}>Editar</Button>
                </Td>
            </Tr>
            {/* !esto tiene que estar por fuera del table! */}
            {currentReview && <Form isOpen={isOpen} onClose={onClose} newReview={false} initData={initData} currentReviewId={review.id}/>}
        </>

    )
};
