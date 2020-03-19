import ajax, {IData} from './ajax'

// 登陆请求
export const reqLogin = (user: IData) => ajax('/login', user, 'POST')

// 注册请求
export const reqRegister = (user: IData) => ajax('/register', user, 'POST')

// 信息完善请求
export const reqUpdate = (user: IData) => ajax('/update', user, 'POST')

// 获取信息
export const reqUserInfo = () => ajax('/getinfo')

// 获取学生/HR列表
export const reqList = (type: string) => ajax('/getlist', {type})

// 获取信息列表
export const reqMessageList = () => ajax('/getchatlist')

// 阅读消息
export const reqReadMessage = (from: string) => ajax('/readmessage', {from}, 'post')