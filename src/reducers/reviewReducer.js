import { types } from '../types/types';

const initialState = {
  reviews:[]
}

export const reviewReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.setAllReviews:
      return {
        ...state,
        reviews: [...action.payload]
      }

    default:
      return state
  }

}