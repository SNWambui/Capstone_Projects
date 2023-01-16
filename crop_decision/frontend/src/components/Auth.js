import { useLocation,Navigate } from "react-router-dom";
import React from "react";

export const setToken = (token)=>{

    localStorage.setItem('stevedavies', token)// make up your own token
}

export const fetchToken = (token)=>{

    return localStorage.getItem('stevedavies')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <Navigate to='/' state ={{from : location}}/>;
    }

    return children;
}