//The types of action's available to to the reducer
import { FETCH_CHATS, SET_CURRENT_CHAT } from "../actions/chat";

const intialState = {
    chats: [],
    currentChat: {}
}

const chatReducer = (state = intialState, action) => {

    const {type, payload} = action

    switch (type) {
        
        case FETCH_CHATS:
            return {
                ...state,
                chats: payload
            }

        case SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload
            }
        
        default:
            return state
    }

}

export default chatReducer