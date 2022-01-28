import { Navigate } from "react-router-dom";

export const AuthRoute = ({uid, children}) => {
    return !uid ? children : <Navigate to="/" />;
};