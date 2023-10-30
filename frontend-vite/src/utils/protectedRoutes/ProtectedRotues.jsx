import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";


const ProtectedRotues = ({ token, usertype, cstmusertype, children, redirect = "/home" }) => {
    const navigate = useNavigate();


    if (!token || usertype != cstmusertype) {
        // go for unauthenticated

        return <Navigate to={"/home"} />;
    }

    if (usertype != cstmusertype) {

        return <Navigate to={"/home"} />;

    }

    return children ? children : <Outlet />
}

export default ProtectedRotues;


