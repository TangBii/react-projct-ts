
// 登陆成功
export const LOGIN_SUCCESS = 'login_success'

// 登陆失败
export const LOGIN_FAIL = 'login_fail'

type SUCCESS_OR_FAIL = typeof LOGIN_SUCCESS | typeof LOGIN_FAIL

export interface IUser {
  _id: string
  username: string
  type: string
}


export interface LoginAction {
  type: SUCCESS_OR_FAIL,
  data: string | IUser
}
