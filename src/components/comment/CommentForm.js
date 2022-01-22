import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startCommentReview } from '../../actions/comment/comment';
import { useForm } from '../../hooks/useForm';

export const CommentForm = ({idReview}) => {
    const { uid,photo,name } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [theComment, handleInputChange] = useForm({
        comment: '',
        uid,
        photo,
        name,
        reviewId:idReview,
        date: new Date(),
    })

    const { comment } = theComment


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startCommentReview(theComment,idReview))
    }

    return (
        <Box as='form' onSubmit={handleSubmit} textColor='black'>
            <input type="text" name='comment' onChange={handleInputChange} value={comment} />
            <button>comentar</button>
        </Box>
    )
};
