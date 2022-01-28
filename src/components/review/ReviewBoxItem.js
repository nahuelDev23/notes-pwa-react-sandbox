import { Box, Flex, Grid } from '@chakra-ui/react'
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {
    Link,
} from "react-router-dom";
import { db } from '../../firebase/firebaseConfig';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
export const ReviewBoxItem = ({ review }) => {
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        const unsuscribe = onSnapshot(collection(db, 'reviews', review.id, 'likes'), snapshot => {
            setLikes(snapshot.docs)
        })
        return () =>{
            unsuscribe()
        }
    }, [review.id])

    useEffect(() => {
        const unsuscribe = onSnapshot(collection(db, 'reviews', review.id, 'comments'), snapshot => {
            setComments(snapshot.docs)
        })
        return () =>{
            unsuscribe()
        }
    }, [review.id])


    return (
        <Link to={`/review/${review.id}`} >
            <Flex flexDirection='column'  justifyContent='space-between' minH='full' maxW='full' key={review.id} bgColor='whiteAlpha.500' p='4'  borderRadius='4'>
                <Box minH='16'>{review.data().title}</Box>
                <Grid gap='1' templateColumns='repeat(2, 1fr)'  >
                    <Flex fontSize='sm' rounded='sm' p='2' w='full' bgColor='twitter.800' alignItems='center' mt='4' >{likes.length > 0 ? <Box mr='2'>{likes.length}</Box> : <Box mr='2'>0</Box>} <FavoriteIcon sx={{fontSize:'16px'}}/></Flex>
                    <Flex fontSize='sm' rounded='sm' p='2' w='full' bgColor='twitter.800' alignItems='center' mt='4' >{comments.length > 0 ? <Box mr='2'>{comments.length}</Box> : <Box mr='2'>0</Box>} <ChatBubbleIcon sx={{fontSize:'16px'}}/></Flex>
                </Grid>

            </Flex>
        </Link>
    )
}
