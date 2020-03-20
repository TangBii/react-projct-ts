import React, {Component} from 'react'
import {RouteComponentProps, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {
  List,
  InputItem,
  Button,
  WhiteSpace,
  WingBlank,
  Radio,
  Modal
} from 'antd-mobile'

import {login} from '../../redux/actions'
import { IUser } from '../../redux/action-types'
import {AppState} from '../../redux/reducers'
import NavBar from '../../components/NavBar/NavBar'
import Logo from '../../components/Logo/Logo'

const {Item} = List


interface IProps extends RouteComponentProps {
  user: IUser
  login: (user: ILoginState)=>any,
}

export interface ILoginState {
  username: string,
  password: string,
  autoLogin: boolean
}


class Login extends Component<IProps, ILoginState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      autoLogin: false,
    }
  }

  // 收集表单输入
  handleChange = (name: keyof ILoginState, value: string | boolean) => {
    this.setState({
      [name]: value
    }as Pick<ILoginState, keyof ILoginState>)
  }

  // 跳转到注册界面
  toRegister = () => {
    this.props.history.push('/register')
  }

  // 处理登陆
  handleLogin = () => {
    this.props.login(this.state)
    setTimeout(() => {
      const {message} = this.props.user
      if (message) {
        Modal.alert(' ', message)
      }
    }, 300);
    // 需要一个延时才能设置好 cookie
    setTimeout(() => {
      this.setState({})
    }, 100);
  }

  render() {
    const {redirectTo} = this.props.user
    return (
      <div>
        {
          Cookies.get('userid') &&
          redirectTo &&
          <Redirect to={redirectTo}/>
        }
        <NavBar title='比&nbsp;特&nbsp;树&nbsp;校&nbsp;招'/>
        <Logo/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem
              placeholder="请输入用户名"
              onChange={(value) => this.handleChange('username', value)}
            >
              用户名
            </InputItem>
            <WhiteSpace/>
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={(value) => this.handleChange('password', value)}
            >
              密码
            </InputItem>
            <WhiteSpace/>
            <Item
               onClick={(e) => this.handleChange('autoLogin', !this.state.autoLogin)}
            >
            <Radio
                name="type"
                checked={this.state.autoLogin}
            >
                &nbsp;&nbsp;七天免登陆
              </Radio>
            </Item>
            <WhiteSpace/>
            <Button
             type="primary"
             onClick={this.handleLogin}
            >
              登陆
            </Button>
            <Button
              onClick={this.toRegister}
            >
              还没有账号?
            </Button> 
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  (state: AppState) => ({user: state.user}),
  {login}
)(Login)