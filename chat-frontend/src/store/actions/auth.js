//To make HTTP requests to our Back-End
import AuthService from "../../services/authService"
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from "../types/index"


/*
-Components will trigger actions from events (button clicks, form submits)
-Actions are objects that contain Type & Payload
-Type determines what in the Store gets updated
-Payload represents data to be added, updated or removed from the store
*/

//dispatch allows us to perform async code
export const login = (params, useNavigate) => (dispatch) => {  //how do we chain anonymous functions here?  
    return AuthService.login(params)
        .then((data)=>{
            //https://stackoverflow.com/questions/61286885/how-action-and-reducers-are-connected-with-each-other-in-react-redux
            dispatch({type: LOGIN, payload:data})  //dispatch the reducer  //why don't we reference the relevant Reducer for this action //how do we call the reducer //how does the dispatch function know where the reducer is?
            useNavigate("/")   //Navigate to chat screen
        })
        .catch(err => {
            
        })
}

export const register = (params, useNavigate) => (dispatch) => {   
    return AuthService.register(params)
        .then((data)=>{
            dispatch({type: REGISTER, payload:data})
            useNavigate("/")
        })
        .catch(err => {
            
        })
}

export const logout = () => (dispatch) => {
    AuthService.logout()
    dispatch({type: LOGOUT})  // to dispatch the ACTION (Run the REDUCER)
}

export const updateProfile = (params) => (dispatch) => {
    return AuthService.updateProfile(params)
        .then((data)=>{
            dispatch({type: UPDATE_PROFILE, payload:data})
        })
        .catch(err => {
            throw err
        })
}