import { Box, Text, Heading, Flex } from '@chakra-ui/react';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CommentComponent } from '../../components/comment/CommentComponent';
import { Layaout } from '../../components/layaout/Layaout';
import { db } from '../../firebase/firebaseConfig';
import { getReview } from '../../helpers/getReview';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Detail = () => {
    const { id } = useParams()
    const { uid, name } = useSelector(state => state.auth)
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [review, setReview] = useState(null)

    const handleLike = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'reviews', id, 'likes', uid))
        } else {
            await setDoc(doc(db, 'reviews', id, 'likes', uid), {
                name
            })
        }

    }

    useEffect(() => {
        getReview(id).then(res => {
            setReview(res)
        })
    }, [id])


    useEffect(() => {
        onSnapshot(collection(db, 'reviews', id, 'likes'), snapshot => {
            setLikes(snapshot.docs)
        })
    }, [id])

    useEffect(() => {

        setHasLiked(
            likes.findIndex((like) => like.id === uid) !== -1
        )

    }, [likes, uid])

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
                <Flex alignItems='center' mt='4'>

                    {
                        uid
                            ?
                            !hasLiked
                                ?
                                <Flex onClick={handleLike} ><FavoriteBorderIcon sx={{ color: 'red' }} /></Flex>
                                :
                                <Flex onClick={handleLike}><FavoriteIcon sx={{ color: 'red' }} /></Flex>

                            : <Flex><FavoriteIcon sx={{ color: 'red' }} /></Flex>
                    }
                    {
                        likes.length > 0 && <Text ml='4'> {likes.length} me gusta</Text>
                    }
                </Flex>
            </Box>
            <CommentComponent idReview={id} />
        </Layaout>)
};
