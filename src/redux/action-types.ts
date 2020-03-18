
// 登陆成功
export const LOGIN_SUCCESS = 'login_success'

// 登陆失败
export const LOGIN_FAIL = 'login_fail'

// 信息完善成功
export const UPDATE_SUCCESS = 'update_success'

// 信息完善失败
export const UPDATE_FAIL = 'update_fail'

// 获取信息成功
export const USER_HAS = 'user_has'
export const USER_NOHAS = 'user_nohas'

// 退出登陆
export const LOG_OUT = 'log_out'

// 获取列表信息
export const GET_LIST_SUCCESS = 'get_list_success'
export const GET_LIST_FAIL = 'get_list_fail'

type SUCCESS_OR_FAIL = typeof LOGIN_SUCCESS | typeof LOGIN_FAIL
type UPDATE_OR_NO = typeof UPDATE_SUCCESS | typeof UPDATE_FAIL
type USER_HAS_NO = typeof USER_HAS | typeof USER_NOHAS
type LOG_OUT = typeof LOG_OUT
type GETLIST_OR_NOT = typeof GET_LIST_FAIL | typeof GET_LIST_SUCCESS

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
  type: SUCCESS_OR_FAIL | UPDATE_OR_NO | USER_HAS_NO | LOG_OUT,
  data: string | IUser
}


export interface ListAction {
  type: GETLIST_OR_NOT,
  data: Array<IUser>
}

