import React from "react"
//Navigate - to navigate to a different Route 
//Outlet - allows you to do nested routes in App.js
import {Navigate, Outlet} from "react-router-dom"
//useSelector - to access the store
import { useSelector } from "react-redux"  

//check if user is logged in before giving access to the home route

//https://www.youtube.com/watch?v=0x8Dap2EIVE
const ProtectedRoute = () => {  
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    //<Outlet> Allows you to do nested routes in App.js
    return (
        isLoggedIn ? <Outlet /> : <Navigate to={"/login"}/>

    )
}

export default ProtectedRoute