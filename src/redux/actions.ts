import { 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  USER_HAS,
  USER_NOHAS,
  LOG_OUT,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_MESSAGE_LIST,
  IUser,
  IMessage,
} from "./action-types"
import { Dispatch } from "redux"
import io from 'socket.io-client'
import {IChat, IMessageServer, GET_A_MESSAGE} from '../redux/action-types'

import { 
  reqRegister,
  reqLogin,
  reqUpdate,
  reqUserInfo,
  reqList,
  reqMessageList
} from "../ajax/index"

// 初始化 IO（单例模式） 连接服务器 + 绑定监听监听服务器返回的信息
let socket:any = null
function initIO(dispatch: Dispatch, userid: string) {
  if (!socket) {
    socket = io('ws://127.0.0.1:4300')
    console.log('已连接服务器')
    socket.on('ServerToClient', (message: IMessageServer) => {
      if (message.from === userid || message.to === userid) {
        dispatch(receiveMessage(message))
      }
   })
  }
}

// 同步
const loginSuccess = (user: IUser) => ({ type: LOGIN_SUCCESS, data: user })
const loginFail = (message: string) => ({ type: LOGIN_FAIL, data: message })

const updateSuccess = (user: IUser) => ({ type: UPDATE_SUCCESS, data: user })
const updateFail = (message: string) => ({ type: UPDATE_FAIL, data: message })

const hasUser = (user: IUser) => ({ type: USER_HAS, data: user })
const noUser = (message: string) => ({ type: USER_NOHAS, data: message })

export const logout = () => {return {type: LOG_OUT, data: 'logout'}}

export const getListSuccess = (users: Array<IUser>) => ({type: GET_LIST_SUCCESS, data: users})
export const getListFail = (message: string) => ({type: GET_LIST_FAIL, data: message})

// 登陆
export function login(username: string, password: string, autoLogin: boolean) {
  // 前台表单验证
  if (!username) {
    return loginFail("用户名不能为空")
  } else if (!password) {
    return loginFail("密码不能为空")
  }
  return async (dispatch: Dispatch) => {
    const response = await reqLogin({ username, password, autoLogin})
    const result = response.data
    if (result.status === 0) {
      dispatch(loginFail(result.message))
    } else {
      dispatch(loginSuccess(result.data))
    }
  }
}

// 注册
export function register( 
  username: string,
  password: string,
  password2: string,
  type: string
) {
  // 前台表单验证
  if (!username) {
    return loginFail("用户名不能为空") // return 的作用是不让函数继续向下执行
  } else if (!password) {
    return loginFail("密码不能为空")
  } else if (password !== password2) {
    return loginFail("两次输入的密码不一致")
  }
  return async (dispatch: Dispatch) => {
    const response = await reqRegister({ username, password, type })
    const result = response.data
    if (result.status === 0) {
      dispatch(loginFail(result.message))
    } else {
      dispatch(loginSuccess(result.data))
    }
  }
}

// 信息完善
export function update(
  avatar: string,
  post?: string,
  info?: string,
  company?: string,
  salary?: string
) {
  if (!avatar) {
    return updateFail('请选择头像')
  }

  return async (dispatch: Dispatch) => {
    const response = await reqUpdate({avatar, post, info, company, salary})
    const result = response.data
    if (result.status === 0) {
      dispatch(updateFail(result.message))
    } else {
      dispatch(updateSuccess(result.data))
    }
  }
}

// 接收用户信息
export function getUser() {
  return async (dispatch: Dispatch) => {
    const response = await reqUserInfo()
    const result = response.data
    if (result.status === 0) {
      dispatch(noUser(result.message))
    } else {
      dispatch(hasUser(result.data))
    }
  }

}

// 获取学生/HR列表
export function getList(type: string) {
  return async (dispatch: Dispatch) => {
    const response = await reqList(type)
    const result = response.data
    if (result.status === 0) {
      dispatch(getListFail(result.message))
    } else {
      dispatch(getListSuccess(result.data))
    }
  }
}

// 获取消息列表
const getMessage = (chats: IChat & IMessageServer) => {return {type: GET_MESSAGE_LIST, data: chats}}


// 发送一条信息
export function sendAMessage(message: IMessage) {
  return async (dispatch: Dispatch) => {
    socket.emit('ClientToServer', message)
  }
}

// 接收信息
const receiveMessage = (message: IMessageServer)  => 
  {return {type: GET_A_MESSAGE, data: message}}

// 接收信息列表
export const receiveMessageList = (userid: string) => {
  return  async (dispatch: Dispatch) => {
    initIO(dispatch, userid)
    const response = await reqMessageList()
    const result = response.data
    if (result.status === 0) {
      return dispatch(loginFail('获取信息列表失败'))
    } else {
      return dispatch(getMessage(result.data))
    }
  }
}