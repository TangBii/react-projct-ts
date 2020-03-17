import { 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  IUser
} from "./action-types"
import { Dispatch } from "redux"

import { 
  reqRegister,
  reqLogin,
  reqUpdate
} from "../ajax/index"

// 同步
const loginSuccess = (user: IUser) => ({ type: LOGIN_SUCCESS, data: user })
const loginFail = (message: string) => ({ type: LOGIN_FAIL, data: message })

const updateSuccess = (user: IUser) => ({ type: UPDATE_SUCCESS, data: user })
const updateFail = (message: string) => ({ type: UPDATE_FAIL, data: message })


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