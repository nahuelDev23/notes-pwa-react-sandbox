// //no se usa
// import { types } from '../types/types';

// const initialState = {
//   comments:[]
// }

// export const commentReducer = (state = initialState, action) => {

//   switch (action.type) {
//     case types.setComments:
//       return {
//         ...state,
//         comments: [...action.payload]
//       }
//       case types.addComments:
//       return {
//         ...state,
//         comments: [...state.comments,action.payload]
//       }
//       case types.clearComments:
//       return {
//         comments: []
//       }

//     default:
//       return state
//   }

// }