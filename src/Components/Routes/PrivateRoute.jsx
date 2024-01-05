import { useContext } from "react";
import { UserContext } from "../../Providers/UserProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    if(user){
        return children;
    }
    return <Navigate state={{from: location}} to="/login" replace></Navigate>
};

export default PrivateRoute;