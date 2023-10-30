import React from "react";
import { useNavigate, Navigate, Outlet, redirect } from "react-router-dom";

const UnAuthProtectedRoutes = ({
    token,
    usertype,
    children,
    redirect = "/home"
}) => {
    const enums = {
        user: 'user',
        vendor: 'vendor'
    }

    if (token) {
        if (usertype == enums.user) {
            return <Navigate to={'/user/dashboard'} />
        } else if (usertype == enums.vendor) {
            return <Navigate to={'/vendor/dashboard'} />
        }
    }

    return children ? children : <Outlet />;
}


export default UnAuthProtectedRoutes;