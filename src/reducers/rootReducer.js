import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { reviewReducer } from "./reviewReducer"
// import { commentReducer } from "./commentReducer"
export const rootReducer = combineReducers({
  auth: authReducer,
  review: reviewReducer,
  // comment: commentReducer,
})