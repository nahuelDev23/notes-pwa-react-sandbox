import { Table, Tbody, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '../../components/dashboard/review/Form';
import { TrList } from '../../components/dashboard/TrList';
import { AlertDelete } from '../../components/ui/review/dashboard/AlertDelete';
import { db } from '../../firebase/firebaseConfig';


export const ReviewsListTable = () => {
    const dispatch = useDispatch()

    /**ref edit */
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentReview, setCurrentReview] = useState(null)
    const [currentReviewId, setCurrentReviewId] = useState(null)
    const [reviews, setReview] = useState([])

    /** ref Delete */
    const [idToDelete, setIdToDelete] = useState(null)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const onCloseDelete = () => setIsOpenDelete(false)
    const cancelRef = React.useRef()

    const handleEdit = async (id) => {
        if (id) {
            setCurrentReview(null)
            const docRef = doc(db, 'reviews', id)
            const docSnap = await getDoc(docRef);
            docSnap.data() !== null && setCurrentReview(docSnap.data())
            setCurrentReviewId(id)
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

    useEffect(() => {

        const unsuscribe = onSnapshot(
            query(
                collection(db, 'reviews'),
                orderBy('date')
            ),
            (snapshot) => { setReview(snapshot.docs) }
        )

        return () => {
            // cancel the subscription
            unsuscribe();
        };
    }, [dispatch])

    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th textAlign='center'>Titulo</Th>
                        <Th textAlign='center'>Puntaje</Th>
                        <Th textAlign='center'>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reviews && reviews.map(review => (
                        <TrList key={review.id}
                            onOpen={onOpen}
                            review={review}
                            handleEdit={handleEdit}
                            setIdToDelete={setIdToDelete}
                            setIsOpenDelete={setIsOpenDelete}
                        />
                    ))}
                </Tbody>
            </Table>

            {currentReview && <Form
                isOpen={isOpen}
                onClose={onClose}
                newReview={false}
                initData={initData}
                currentReviewId={currentReviewId} />}

            <AlertDelete
                handleDelete={handleDelete}
                idToDelete={idToDelete}
                isOpenDelete={isOpenDelete}
                onCloseDelete={onCloseDelete}
                cancelRef={cancelRef}
                setIsOpenDelete={setIsOpenDelete}
            />

        </>

    )
};
