import {combineReducers} from 'redux'

import {
  AUTHENTICATION_SUCCESS,
  FAIL,
  UPDATE,
  GET_USER,
  GET_LIST_SUCCESS,
  LOG_OUT,
  GET_A_MESSAGE,
  GET_MESSAGE_LIST,
  READ_MESSAGE,
  UserAction,
  ListAction,
  ChatAction,
  IUser,
  IChat,
  IChatMessage,
} from './action-types'

import {getRedirectPath} from '../utils/index'


// user
const initailUser: IUser = {
  _id: '',
  username: '',
  type: '',
  avatar: '',
  post: '',
  info: '',
  company: '',
  salary: '',
  message: '',
  redirectTo: ''
}
function user(state = initailUser, action: UserAction) {
  let redirectTo = ''
  
  if (typeof action.data !== 'string' && action.data !== undefined) {
     redirectTo = getRedirectPath(action.data.type, action.data.avatar)
  }
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      // 注意清空错误信息
        return {...state, message:'', ...(action.data as object), redirectTo}
    case FAIL:
      return {...state, message: action.data}
    case UPDATE:
      return {...state, message: '', ...(action.data as object), redirectTo}
    case GET_USER:
      return {...state, message:'',...(action.data as object), redirectTo}
    case LOG_OUT:
      return initailUser
    default: 
      return state
  }
}


// userList
const initialList: Array<IUser> = []
function list(state = initialList, action: ListAction) {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return action.data
    case FAIL:
      return initialList
    case LOG_OUT:
      return initialList
    default:
      return state
  }
}


// chat
const initialChat: IChat = {
  users: {},
  chatList: [],
  count: 0
}
function messages(state = initialChat, action: ChatAction) {
  switch(action.type) {
    case GET_A_MESSAGE: 
      const {message, _id} = action.data as any
      return {
        ...state,
        chatList: [...state.chatList, message],
        count: (!message.isRead && message.to === _id)? ++state.count: state.count
      }
    case GET_MESSAGE_LIST:
      const {chats, userid} = action.data as any
      let count = (chats.chatList as []).reduce((sum: number, curr: IChatMessage) => {
        return (!curr.isRead && userid === curr.to)? sum + 1: sum
      }, 0)
      return {...state, ...chats, count: count}
    case READ_MESSAGE:
      return {...state, count: state.count - (action.data as any)}
    case LOG_OUT:
      return initialChat
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  user,
  list,
  messages
})

export type AppState = ReturnType<typeof rootReducer>

export default  rootReducer 