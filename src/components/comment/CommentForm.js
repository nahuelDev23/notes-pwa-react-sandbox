import { Box, Button, Text, Textarea } from '@chakra-ui/react';
import { serverTimestamp } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startCommentReview } from '../../actions/comment/comment';
import { useForm } from '../../hooks/useForm';

export const CommentForm = ({idReview}) => {
    const { uid,photo,name } = useSelector(state => state.auth)
    const [validateComment,setValidateComment] = useState(true)
    const dispatch = useDispatch()
    const [theComment, handleInputChange] = useForm({
        comment: '',
        uid,
        photo,
        name,
        reviewId:idReview,
        date: serverTimestamp(),
    })

    const { comment } = theComment

   

    useEffect(()=>{
        if(comment.length >= 6) {
            setValidateComment(false)
        }else{
            setValidateComment(true)
        }
    },[comment])


 

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startCommentReview(theComment,idReview))
    }

    return (
        <Box as='form' onSubmit={handleSubmit} bgColor='whiteAlpha.300' mt='4' p='4'>
            <Text>Deja un comentario</Text>
            <Textarea w='full' mt='4' type="text" name='comment' onChange={handleInputChange} value={comment}  />
            <Button type='submit' p='4' mt='4' bgColor='twitter.600' disabled={validateComment}>Comentar</Button>
        </Box>
    )
};
