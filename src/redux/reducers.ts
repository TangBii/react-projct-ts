import {combineReducers} from 'redux'

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LoginAction
} from './action-types'


interface IUser {
  username: string,
  type: string,
  message: string
  redirectTo: string  // 传递重定向地址数据
}

const initailUser: IUser = {
  username: '',
  type: '',
  message: '',
  redirectTo: ''
}
// RegisterAction
function user(state = initailUser, action: LoginAction) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // 注意清空错误信息
      return {...state,message:'',  ...(action.data as object), redirectTo: '/main'}
    case LOGIN_FAIL:
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