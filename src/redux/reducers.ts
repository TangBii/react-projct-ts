import {combineReducers} from 'redux'

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  USER_HAS,
  USER_NOHAS,
  GET_LIST_FAIL,
  GET_LIST_SUCCESS,
  LoginAction,
  ListAction,
  LOG_OUT
} from './action-types'

import {getRedirectPath} from '../utils/index'


export interface IUser {
  username: string,
  type: string,
  message: string
  avatar?: string,
  post?: string,
  info?: string,
  company?: string,
  salary?: string ,
  redirectTo?: string  // 传递重定向地址数据
  _id?: string
}

const initailUser: IUser = {
  username: '',
  type: '',
  message: ''
}
// RegisterAction
function user(state = initailUser, action: LoginAction) {
  let redirectTo = ''
  
  if (typeof action.data !== 'string' && action.data != undefined) {
     redirectTo = getRedirectPath(action.data.type, action.data.avatar)
  }
  switch (action.type) {
    case LOGIN_SUCCESS:
      // 注意清空错误信息
        return {...state, message:'', ...(action.data as object), redirectTo}
    case LOGIN_FAIL:
      return {...state, message: action.data}
    case UPDATE_SUCCESS:
      return {...state, message: '', ...(action.data as object), redirectTo}
    case UPDATE_FAIL:
      return {...state, message: action.data}
    case USER_HAS:
      return {...state, message:'',...(action.data as object), redirectTo}
    case USER_NOHAS:
      return {...state, message: action.data}
    case LOG_OUT:
      return initailUser
    default: 
      return state
  }
}

const initialList: Array<IUser> = []
function list(state = initialList, action: ListAction) {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return action.data
    case GET_LIST_FAIL:
      return initialList
    default:
      return initialList
  }
}


const rootReducer = combineReducers({
  user,
  list
})

export type AppState = ReturnType<typeof rootReducer>

export default  rootReducer 