
// 登陆成功
export const LOGIN_SUCCESS = 'login_success'

// 登陆失败
export const LOGIN_FAIL = 'login_fail'

// 信息完善成功
export const UPDATE_SUCCESS = 'update_success'

// 信息完善失败
export const UPDATE_FAIL = 'update_fail'

type SUCCESS_OR_FAIL = typeof LOGIN_SUCCESS | typeof LOGIN_FAIL
type UPDATE_OR_NO = typeof UPDATE_SUCCESS | typeof UPDATE_FAIL

export interface IUser {
  _id: string
  username: string
  type: string
  avatar?: string,
  post?: string,
  info?: string,
  company?: string,
  salary?: string
}


export interface LoginAction {
  type: SUCCESS_OR_FAIL | UPDATE_OR_NO,
  data: string | IUser
}


