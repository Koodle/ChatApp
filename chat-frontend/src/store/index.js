/*
-applyMidleware will allow us to add additional capabilities to the store (is a store enhancer)
-middleware refers to a function that allows us to alter what happens when we dispatch an action
-redux-thunk is a middleware

1)We need to use applyMiddleware
2)To use redux-thunk
3)To use async code in the dispatch function

need to import a route reducer
*/
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store