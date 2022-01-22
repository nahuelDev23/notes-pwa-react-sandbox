import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startClearComments, startSetCommentReview } from '../../actions/comment/comment';
import { CommentBox } from './CommentBox';

export const CommentList = ({idReview}) => {
    const {  comments } = useSelector(state => state.comment)
   const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startSetCommentReview(idReview))
        return ()=>{
            dispatch(startClearComments())
        }
    },[dispatch,idReview])

    if(!comments){
        return 'cargando comentarios'
    }
    return (
        <div>
           {comments && comments.map(comment=>(
               <CommentBox key={comment.id} comment={comment}/>
           ))}
        </div>
    )
};
