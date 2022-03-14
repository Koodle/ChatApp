import React from 'react';
import { useSelector } from "react-redux"
//components
import ChatHeader from "../ChatHeader/ChatHeader"
import MessageBox from "../MessageBox/MessageBox"
import MessageInput from "../MessageInput/MessageInput"
import "./Messenger.scss"

const Messenger = () => {

    //grab current chat selected
    const chat = useSelector(state => state.chatReducer.currentChat)

    //check if chat is empty
    const activeChat = () => {
        return Object.keys(chat).length > 0
    }

    return (
        <div id='messenger' className='shadow-light'>
            {/* if we have a chat open ? then render chat components : render nothing */}
            {
                activeChat()
                    ?   <div id='messenger-wrap'>
                        <ChatHeader chat={chat}/>
                        <MessageBox chat={chat}/>
                        <MessageInput chat={chat}/>
                        </div>
                    :   <p>No active chat</p>
            }
        </div>
    );
}

export default Messenger;
