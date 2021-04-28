import {SET_CHAT, SET_MESSAGE} from './ChatActions'

const init = {
  chatList: []
}

const Chat = (state: any = init, action: any) => {
  switch (action.type) {
    case SET_CHAT:
      return {...state, chatList: action.payload}
    case SET_MESSAGE:
      return {...state, [action.payload.id]: action.payload.msg}
    default:
      return state
  }
}

export const setChats = (payload: any) => ({type: SET_CHAT, payload})
export const setMsgs = (payload: any) => ({type: SET_MESSAGE, payload})

export default Chat
