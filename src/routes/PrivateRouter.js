import { Navigate } from "react-router-dom";

export const PrivateRoute = ({isAdmin, children}) => {
    return isAdmin ? children : <Navigate to="/" />;
};