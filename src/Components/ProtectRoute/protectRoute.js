import React from 'react';
import { useAuth } from '../Authorization/auth';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({children}) => {

    const auth = useAuth()
    const location = useLocation()

    if(!auth.user){
        return <Navigate to={'/login'} state={{path : location.pathname}} />
    }

    return children
}

export default ProtectRoute;
