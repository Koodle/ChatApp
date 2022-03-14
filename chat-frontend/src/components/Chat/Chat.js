//useEffect - runs a function after every render of the component
import React, {useEffect} from "react"
//useSelector - Allows you to extract data from the Redux store state
//useDispatch - to call any ACTIONS
import { useSelector, useDispatch } from "react-redux"

//COMPONENTS:
//Navbar component to stack inside this one
import Navbar from "./components/Navbar/Navbar"
import Friend from "./components/Friend/Friend"
import FriendList from "./components/FriendList/FriendList"
import Messenger from "./components/Messenger/Messenger"

//redux action
import { fetchChats } from "../../store/actions/chat"

import "./Chat.scss"

const Chat = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)  // should this be state.chatReducer?

    useEffect(() => {
        dispatch(fetchChats()).then(res => console.log(res)).catch(err => console.log(err))
    }, [dispatch])  //set dispatch as a dependency -> will run whenever dispatch value changes

    return (
        <div id="chat-container">
            <Navbar/>
            <div id="chat-wrap">
                <FriendList/>
                <Messenger/>
            </div>
        </div>
    );
}

export default Chat