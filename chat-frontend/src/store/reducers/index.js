/*
The combineReducers helper function turns an object whose values are 
different reducing functions into a single reducing function you can 
pass to createStore.
*/
import { combineReducers } from "redux";   
import authReducer from "./auth"
import chatReducer from "./chat"

//-You may have many reduces in the application 
//-But can only have 1 route reducer
export default combineReducers({
    authReducer,
    chatReducer
})