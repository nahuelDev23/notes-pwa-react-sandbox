import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

export const CommentComponent = ({ idReview }) => {
  const [comments, setComments] = useState([])
  const { uid } = useSelector(state => state.auth)
  useEffect(
    () =>
    
      onSnapshot(
        query(
          collection(db, 'reviews', idReview, 'comments'),
          where("reviewId", "==", idReview),
          orderBy('date')
        ),
        (snapshot) => { setComments(snapshot.docs) }
      ),
    []
  );

  
  return (
    <Box mb='4'>
      {uid ? <CommentForm idReview={idReview} /> : <Text textAlign='center' mt='4'>Tenes que estar registrado para comentar</Text>}
       <CommentList comment={comments} />
    </Box>
  )
};
