import ajax, {IData} from './ajax'

// 登陆请求
export const reqLogin = (user: IData) => ajax('/login', user, 'POST')

// 注册请求
export const reqRegister = (user: IData) => ajax('/register', user, 'POST')