import { Box, Text,Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentComponent } from '../../components/comment/CommentComponent';
import { Layaout } from '../../components/layaout/Layaout';
import { getReview } from '../../helpers/getReview';

export const Detail = () => {
    const { id } = useParams()

    const [review, setReview] = useState(null)


    useEffect(() => {
        getReview(id).then(res => {
            setReview(res)
        })
    }, [id])

    if (!review) {
        return (
            <Layaout>
                <Box w='full' textAlign='center'><Heading>Cargando...</Heading></Box> 
            </Layaout>
            )
    }

    return (
        <Layaout>
            <Box bgColor='whiteAlpha.400' p='4'>
                <Heading>{review.title}</Heading>
                <Text mt='4'>Estrellas: {review.stars}</Text>
            </Box>

            <CommentComponent idReview={id} />
        </Layaout>)
};
