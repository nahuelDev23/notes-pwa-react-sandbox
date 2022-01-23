// import { types } from "../../types/types"
// import { db, collection, addDoc,getDocs } from '../../firebase/firebaseConfig'
// import {  orderBy, query, where } from "firebase/firestore/lite";



// export const startCommentReview = (comment,idReview) => {
//     return async (dispatch) => {

//         const x = await addDoc(collection(db, 'reviews',idReview,'comments'), comment);
       
        
//         const commentsRef = collection(db, 'reviews',idReview,'comments')
//         const q = query(commentsRef, where("reviewId", "==", idReview) ,orderBy('date'));
//         const querySnapshot = await getDocs(q);
//         const comments = []
//         querySnapshot.forEach((doc) => {
//             comments.push({id:doc.id,...doc.data()})
            
//         });

        
//         dispatch(setCommentReview(comments))
//         // dispatch(addComments(x.id,comment))
//         // onSnapshot(query(collection(db, 'reviews',idReview,'comments')), (doc) => {
//         //     console.log("Current data: ", doc.docs);
//         // });

        

//     }
// }

// export const startClearComments = () => {
//     return async (dispatch) => {
//         dispatch(clearComments())

//     }
// }


// export const startSetCommentReview = (idReview) => {
//     return async (dispatch) => {
    
//         try {
//             const commentsRef = collection(db, 'reviews',idReview,'comments')
//             const q = query(commentsRef, where("reviewId", "==", idReview) ,orderBy('date'));
//             const querySnapshot = await getDocs(q);
//             const comments = []
//             querySnapshot.forEach((doc) => {
//                 comments.push({id:doc.id,...doc.data()})
                
//             });
//             dispatch(setCommentReview(comments))
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


// const setCommentReview = (comments) => {
//     return {
//         type: types.setComments,
//         payload: comments
//     }
// }
// const addComments = (id,comments) => {
//     return {
//         type: types.addComments,
//         payload: {id,...comments}
//     }
// }

// const clearComments = () => {
//     return {
//         type: types.clearComments,
//     }
// }





