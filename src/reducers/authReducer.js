import { types } from "../types/types";

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.setUserAuth:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
                photo: action.payload.photo
            }

        case types.logout:
            return {}
            
        default:
            return state;
    }
}