import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CommentComponent } from '../../components/comment/CommentComponent';
import { Layaout } from '../../components/layaout/Layaout';

export const Detail = () => {
    const { id } = useParams()
    const { reviews } = useSelector(state => state.review)
    const [review, setReview] = useState(null)

    useEffect(() => {
        setReview(reviews.find(review => review.id === id))
    }, [reviews, id])

    if (!review) {
        return <p>cargnado</p>
    }

    return (
        <Layaout>
            <Box bgColor='whiteAlpha.400' p='4'>
                <Heading>{review.title}</Heading>
                <Text mt='4'>Estrellas: {review.stars}</Text>
            </Box>
            
            <CommentComponent idReview={id}/>
        </Layaout>)
};
