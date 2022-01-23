import React from 'react';

import { CommentBox } from './CommentBox';

export const CommentList = ({comment}) => {
    return (
        <div>
           {comment && comment.map(comment=>(
               <CommentBox key={comment.id} comment={comment}/>
           ))}
        </div>
    )
};
