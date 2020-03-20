// 共用
export const FAIL = 'fail'
export const LOG_OUT = 'log_out'
type FAIL = typeof FAIL
type LOG_OUT = typeof LOG_OUT





// user
export const AUTHENTICATION_SUCCESS = 'login_success'
export const UPDATE = 'update_success'
export const GET_USER = 'get_user'

type AUTHENTICATION_SUCCESS = typeof AUTHENTICATION_SUCCESS
type UPDATE = typeof UPDATE
type GET_USER = typeof GET_USER

export interface IUser {
  _id: string
  username: string
  type: string
  avatar?: string,
  post?: string,
  info?: string,
  company?: string,
  salary?: string
  message?: string,
  redirectTo?: string
}

export interface UserAction {
  type: AUTHENTICATION_SUCCESS | FAIL | UPDATE | GET_USER | LOG_OUT,
  data: string | IUser
}





// userList
export const GET_LIST_SUCCESS = 'get_list_success'
type GET_LIST_SUCCESS = typeof GET_LIST_SUCCESS

export interface ListAction {
  type: GET_LIST_SUCCESS | FAIL | LOG_OUT,
  data: Array<IUser> | string
}





// message
export const GET_A_MESSAGE = 'get_a_message'
export const GET_MESSAGE_LIST = 'get_message_list'
export const READ_MESSAGE = 'read_message'

type GET_A_MESSAGE = typeof GET_A_MESSAGE
type GET_MESSAGE_LIST = typeof GET_MESSAGE_LIST
type READ_MESSAGE = typeof READ_MESSAGE

export interface IChatUser{
  [userid: string]: {   // 以 userid 作为属性名，便于查找
    username: string,
    avatar: string
  }
}

export interface IChatMessage {
  from: string,
  to: string,
  content: string,
  belongTo?: string,  // [from,to].sort().join('_')
  isRead?: boolean,
  unreadCount?: number, // 到目前消息为止的未读消息数量
  date?: string,
}

export interface IChat{
  users: IChatUser,
  chatList: Array<IChatMessage>,
  count: number,
}

export interface ChatAction {
  type: GET_A_MESSAGE | GET_MESSAGE_LIST | READ_MESSAGE | LOG_OUT,
  data: IChat | string
}
