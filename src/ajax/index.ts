import ajax from './ajax'
import {ILoginState} from '../containers/Login/Login'
import {IUpdate} from '../redux/actions'

interface IRegister {
  username: string,
  password: string,
  type: string
}

// 登陆请求
export const reqLogin = (user: ILoginState) => ajax('/login', user, 'POST')

// 注册请求
export const reqRegister = (user: IRegister) => ajax('/register', user, 'POST')

// 信息完善请求
export const reqUpdate = (user: IUpdate) => ajax('/update', user, 'POST')

// 获取信息
export const reqUser = () => ajax('/getinfo')

// 获取学生/HR列表
export const reqList = (type: string) => ajax('/getlist', {type})

// 获取信息列表
export const reqMessageList = () => ajax('/getchatlist')

// 阅读消息
export const reqReadMessage = (from: string) => ajax('/readmessage', {from}, 'post')