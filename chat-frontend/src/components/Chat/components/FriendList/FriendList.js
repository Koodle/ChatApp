import React from 'react';
//useSelector - access redux store
//useDispatch - run redux ACTIONS
import { useSelector, useDispatch } from 'react-redux';
//component
import Friend from '../Friend/Friend';
//action
import { setCurrentChat } from '../../../../store/actions/chat';
import "./FriendList.scss"

const Friendlist = () => {

    const dispatch = useDispatch()

    const chats = useSelector(state => state.chatReducer.chats)

    const openChat = (chat) => {
        dispatch(setCurrentChat(chat))

    }

    return (
        <div id='friends' className='shadow-light'>
            <div id='title'>
                <h3 className='m-0'>Friends</h3>
                <button>ADD</button>
            </div>

            <hr />

            <div id='friends-box'> 
                {
                    chats.length > 0
                    ? chats.map(chat => {
                        return <Friend click={() => openChat(chat)} chat={chat} key={chat.id}/>
                    })
                    : <p id='no-chat'>No friends added</p>
                }
            </div>
        </div>
    );
}

export default Friendlist;
