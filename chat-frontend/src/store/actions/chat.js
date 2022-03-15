//To make HTTP requests to our Back-End
import ChatService from "../../services/chatService"
export const FETCH_CHATS = "FETCH_CHATS"
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT"

/*
-Components will trigger actions from events (button clicks, form submits)
-Actions are objects that contain Type & Payload
-Type determines what in the Store gets updated
-Payload represents data to be added, updated or removed from the store
*/

export const fetchChats = () => dispatch => {
    return ChatService.fetchChats()
        .then(data => {
            //for each user => set default status to be offline
            data.forEach(chat => {
                chat.Users.forEach(user => {
                    user.status = "offline"
                });
                //reverse all messages inside a chat
                chat.Messages.reverse()
            });

            //dispatch reducer
            dispatch({ type: FETCH_CHATS, payload: data })
            return data
        })
        .catch((err => {
            throw err
        }))
}

export const setCurrentChat = (chat) => dispatch => {
    dispatch({ type: SET_CURRENT_CHAT, payload: chat })
}
