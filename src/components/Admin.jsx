import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function Admin() {
    const { user, admin } = useAuthContext();

    if(!user || !admin){
        return(
            <Navigate to="/login" replace/>
        )
    }
    return(
        <div>
            <p>Componente Admin</p>
        </div>
    )
}