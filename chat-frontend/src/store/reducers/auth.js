/*Reducers are responsible for updating the Store's STATE*/

//The types of action's available to to the reducer
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from "../types/index"

//check local storage if the user has previously logged in
//else we set initial state as empty
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("user") ? true : false
}
/* 
-Reducer is a pure function so we shouldn’t perform any API calls, route, mutate arguments from actions.
-No Mutations
*/
const authReducer = (state = initialState, action) => {

    //destructure the action
    const {type, payload} = action

    //check the type of action
    switch(type){
        case LOGIN:
            //We shouldn’t mutate an existing state but return a new state with copied values from the previous state plus the changes.
            return {
                ...state,   //Merge objects using the spread operator (...)
                user: payload.user,
                token: payload.token,
                isLoggedIn: true         
            }

        case REGISTER:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                isLoggedIn: true         
            }

        case LOGOUT:
            return{
                ...state,
                // we clear all user data
                user: {},
                token: "",
                isLoggedIn: false
            }

        case UPDATE_PROFILE:
            return {
                ...state,
                user: payload,
            }

        default:
            //if nothing is found -> return just the unchanged state
            return state
    }
}

export default authReducer
