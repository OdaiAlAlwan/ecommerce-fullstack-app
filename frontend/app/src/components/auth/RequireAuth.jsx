
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";



const RequireAuth = ({ allowedRoles }) => {
    const { role } = useSelector(state=>state.auth);
    const location = useLocation();

    return (
        allowedRoles.includes(role)
            ? <Outlet />
            : <Navigate to='/SignIn' state={{ from: location }} replace />
    );
}

export default RequireAuth