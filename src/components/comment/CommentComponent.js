import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";

export const CommentComponent = ({ idReview }) => {
  const [comments, setComments] = useState([])

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
    [idReview]
  );


  return (
    <div>
      <CommentForm idReview={idReview} />
      <CommentList comment={comments} />
    </div>
  )
};
