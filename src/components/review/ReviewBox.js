import { Box, Grid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetAllReviews } from '../../actions/review/review';
import {
  Link,
} from "react-router-dom";

export const ReviewBox = () => {
  const dispatch = useDispatch()
  const { reviews } = useSelector(state => state.review)

  useEffect(() => {
    dispatch(startSetAllReviews())
  }, [dispatch])


  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      {reviews && reviews.map(review => ( 
        <Box key={review.id} bgColor='whiteAlpha.500' p='4' borderRadius='4'>
          <Link to={`/review/${review.id}`}>{review.title}</Link>
        </Box>
      ))}
    </Grid>
  )
}
