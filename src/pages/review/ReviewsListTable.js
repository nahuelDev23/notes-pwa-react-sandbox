import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TrList } from '../../components/dashboard/TrList';
import { db } from '../../firebase/firebaseConfig';

export const ReviewsListTable = () => {
    const dispatch = useDispatch()

    const [reviews, setReview] = useState([])
    useEffect(() => {
        onSnapshot(
            query(
                collection(db, 'reviews'),
                orderBy('date')
            ),
            (snapshot) => { setReview(snapshot.docs) }
        )
    }, [dispatch])

    return (
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
                    <TrList  key={review.id} review={review} />
                ))}
            </Tbody>

        </Table>)
};
