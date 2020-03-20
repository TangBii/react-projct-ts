import { 
  AUTHENTICATION_SUCCESS,
  FAIL,
  UPDATE,
  GET_USER,
  LOG_OUT,
  GET_LIST_SUCCESS,
  GET_MESSAGE_LIST,
  GET_A_MESSAGE,
  READ_MESSAGE,
  IChat,
  IChatMessage,
  IUser
} from "./action-types"
import { Dispatch } from "redux"
import io from 'socket.io-client'

import { 
  reqRegister,
  reqLogin,
  reqUpdate,
  reqUser,
  reqList,
  reqMessageList,
  reqReadMessage
} from "../ajax/index"

import {ILoginState} from '../containers/Login/Login'
import {IRegisterState} from '../containers/Register/Register'
import {IUpdateStuState} from '../containers/StuInfo/StuInfo'
import {IUpdateHRState} from '../containers/HRInfo/HRInfo'
export type IUpdate = IUpdateStuState & IUpdateHRState

// 初始化 IO（单例模式） 连接服务器 + 绑定监听监听服务器返回的信息
let socket:any = null
function initIO(dispatch: Dispatch, userid: string) {
  if (!socket) {
    socket = io('ws://127.0.0.1:4300')
    console.log('已连接服务器')
    socket.on('ServerToClient', (message: IChatMessage) => {
      if (message.from === userid || message.to === userid) {
        dispatch(receiveMessage(message, userid))
      }
   })
  }
}


const fail = (message: string) => ({ type: FAIL, data: message })
export const logOut = () => ({type: LOG_OUT, data: 'log-out'})

// 登陆
const authSuccess = (user: IUser) => ({ type: AUTHENTICATION_SUCCESS, data: user })
export function login(user: ILoginState) {
  const {username, password} = user
  // 前台表单验证
  if (!username) {
    return fail("用户名不能为空")
  } else if (!password) {
    return fail("密码不能为空")
  }
  return async (dispatch: Dispatch) => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.status === 0) {
      dispatch(fail(result.message))
    } else {
      dispatch(authSuccess(result.data))
    }
  }
}

// 注册
export function register(user: IRegisterState) {
  const {username, password, password2, type} = user
  // 前台表单验证
  if (!username) {
    return fail("用户名不能为空") // return 的作用是不让函数继续向下执行
  } else if (!password) {
    return fail("密码不能为空")
  } else if (password !== password2) {
    return fail("两次输入的密码不一致")
  }
  return async (dispatch: Dispatch) => {
    const response = await reqRegister({ username, password, type })
    const result = response.data
    if (result.status === 0) {
      dispatch(fail(result.message))
    } else {
      dispatch(authSuccess(result.data))
    }
  }
}

// 完善用户信息
const updateHelp = (user: IUser) => ({ type: UPDATE, data: user })
export function update(userInfo: IUpdate) {
  const {avatar} = userInfo
  if (!avatar) {
    return fail('请选择头像')
  }

  return async (dispatch: Dispatch) => {
    const response = await reqUpdate(userInfo)
    const result = response.data
    if (result.status === 0) {
      dispatch(fail(result.message))
    } else {
      dispatch(updateHelp(result.data))
    }
  }
}

// 获取用户信息
const getUesrHelp = (user: IUser) => ({ type: GET_USER, data: user })
export function getUser() {
  return async (dispatch: Dispatch) => {
    const response = await reqUser()
    const result = response.data
    if (result.status === 0) {
      dispatch(fail(result.message))
    } else {
      dispatch(getUesrHelp(result.data))
    }
  }

}

// 获取学生/HR列表
export const getListHelp = (users: Array<IUser>) => ({type: GET_LIST_SUCCESS, data: users})
export function getList(type: string) {
  return async (dispatch: Dispatch) => {
    const response = await reqList(type)
    const result = response.data
    if (result.status === 0) {
      dispatch(fail(result.message))
    } else {
      dispatch(getListHelp(result.data))
    }
  }
}

// 获取消息列表
const receiveMessageListHelp = (chats: IChatMessage, userid: string) =>
  ({type: GET_MESSAGE_LIST, data: {chats, userid}})

export const receiveMessageList = (userid: string) => {
  return  async (dispatch: Dispatch) => {
    initIO(dispatch, userid)
    const response = await reqMessageList()
    const result = response.data
    if (result.status === 0) {
      return dispatch(fail(result.message))
    } else {
      return dispatch(receiveMessageListHelp(result.data, userid))
    }
  }
}

// 发送一条信息
export function sendAMessage(message: IChatMessage) {
  return async (dispatch: Dispatch) => {
    socket.emit('ClientToServer', message)
  }
}

// 接收信息
const receiveMessage = (message: IChatMessage, userid: string)  => 
  {return {type: GET_A_MESSAGE, data: {message, _id: userid}}}

// 读取信息
const readMessageHelp = (count: number) => ({type: READ_MESSAGE, data: count})
export const readMessage = (from: string) => {
  return async (dispatch: Dispatch) => {
    const response = await reqReadMessage(from)
    const result = response.data
    if (result.status === 0) {
      return dispatch(fail(result.message))
    } else {
      dispatch(readMessageHelp(result.data))
    }
  }
}