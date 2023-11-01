import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";


const ProtectedRotues = ({ token, cstmusertype, children, redirect = "/home" }) => {

    const usertype = localStorage.getItem('usertype')

    if (!token || usertype != cstmusertype) {
        // go for unauthenticated

        return <Navigate to={"/home"} />;
    }

    // if (usertype != cstmusertype) {

    //     return <Navigate to={"/home"} />;

    // }

    return children ? children : <Outlet />
}

export default ProtectedRotues;


