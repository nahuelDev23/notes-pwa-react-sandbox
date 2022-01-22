import React from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

export const CommentComponent = ({idReview}) => {
  return (
  <div>
      <CommentForm idReview={idReview}/>
      <CommentList idReview={idReview}/>
  </div>
  )
};
