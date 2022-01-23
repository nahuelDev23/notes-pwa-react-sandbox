import { types } from "../../types/types"
import { db, collection, getDocs } from '../../firebase/firebaseConfig'

export const startSetAllReviews = () => {
    return async (dispatch, getState) => {
        // const reviewsCol = collection(db, 'reviews');
        // const reviewsSnapshot = await getDocs(reviewsCol);
        // const reviewList = []
        // reviewsSnapshot.docs.map(doc =>
        // (
        //     reviewList.push({
        //         id: doc.id,
        //         ...doc.data()
        //     })
        // )
        // );
        // dispatch(setAllReviews(reviewList))

    }
}


const setAllReviews = (data) => ({
    type: types.setAllReviews,
    payload: data,
})

