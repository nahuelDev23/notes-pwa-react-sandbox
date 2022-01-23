import { Box, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetAllReviews } from '../../actions/review/review';
import {
  Link,
} from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const ReviewBox = () => {
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
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      {reviews && reviews.map(review => ( 
        <Box key={review.id} bgColor='whiteAlpha.500' p='4' borderRadius='4'>
          <Link to={`/review/${review.id}`}>{review.data().title}</Link>
        </Box>
      ))}
    </Grid>
  )
}
