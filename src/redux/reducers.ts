import {combineReducers} from 'redux'

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  USER_HAS,
  USER_NOHAS,
  LoginAction
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
    default: 
      return state
  }
}


const rootReducer = combineReducers({
  user
})

export type AppState = ReturnType<typeof rootReducer>

export default  rootReducer 