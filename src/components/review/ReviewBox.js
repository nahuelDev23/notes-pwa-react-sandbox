import { Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';


import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ReviewBoxItem } from './ReviewBoxItem';

export const ReviewBox = () => {
  // const dispatch = useDispatch()

  const [reviews, setReview] = useState([])

  useEffect(() => {
    let isApiSubscribed = true;
    onSnapshot(
      query(
        collection(db, 'reviews'),
        orderBy('date', 'desc')
      ),
      (snapshot) => {
        if (isApiSubscribed) {
          setReview(snapshot.docs)
        }

      }
    )
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, [])


  return (
    <Grid maxW='full'  templateColumns={{base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',md:'repeat(3, 1fr)'}} gap={6}>
      {reviews && reviews.map(review => (
        <ReviewBoxItem key={review.id} review={review} />
      ))}
    </Grid>
  )
}
