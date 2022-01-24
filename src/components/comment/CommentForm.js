import { Box, Button, Text, Textarea } from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebaseConfig';

export const CommentForm = ({ idReview }) => {
    const { uid, photo, name } = useSelector(state => state.auth)
    const [comment, setComment] = useState('')
    console.log('commentForm');
    const handleSubmit = async (e) => {
       
        e.preventDefault()
        const commentToSend = comment
        setComment('')
        await addDoc(collection(db, 'reviews', idReview, 'comments'), {
            comment: commentToSend,
            uid,
            photo,
            name,
            reviewId: idReview,
            date: serverTimestamp(),

        });
    }


    return (
        <Box as='form' onSubmit={handleSubmit} bgColor='whiteAlpha.300' mt='4' p='4'>
            <Text>Deja un comentario</Text>
            <Textarea w='full' mt='4' type="text" name='comment' onChange={(e) => setComment(e.target.value)} value={comment} />
            <Button type='submit' p='4' mt='4' bgColor='twitter.600' >Comentar</Button>
        </Box>
    )
};
