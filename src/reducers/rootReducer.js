import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { reviewReducer } from "./reviewReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  review: reviewReducer,
})