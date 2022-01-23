import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CommentComponent } from '../../components/comment/CommentComponent';
import { Layaout } from '../../components/layaout/Layaout';
import { db } from '../../firebase/firebaseConfig';
import {  doc,getDoc } from 'firebase/firestore';

export const Detail = () => {
    const { id } = useParams()
    const { uid } = useSelector(state => state.auth)
    const [review, setReview] = useState(null)

    const getData = useCallback(async() =>{
        const docRef =  doc(db,'reviews',id)
        const docSnap =  await getDoc(docRef);
        if (docSnap.exists()) {
            setReview(docSnap.data())
        }
    },[id])

    useEffect(() => {
        getData()
    }, [getData])

    if (!review) {
        return <p>cargando detail</p>
    }

    return (
        <Layaout>
            <Box bgColor='whiteAlpha.400' p='4'>
                <Heading>{review.title}</Heading>
                <Text mt='4'>Estrellas: {review.stars}</Text>
            </Box>

            {uid ? <CommentComponent idReview={id} /> : <Text textAlign='center' mt='4'>Tenes que estar registrado para comentar</Text>}
        </Layaout>)
};
