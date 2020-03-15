import React, {Component} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {
  List,
  InputItem,
  Button,
  WhiteSpace,
  WingBlank,
  Radio
} from 'antd-mobile'

import NavBar from '../../components/NavBar/NavBar'
import Logo from '../../components/Logo/Logo'

const {Item} = List

interface IProps extends RouteComponentProps {

}

interface IState {
  username: string,
  password: string,
  autoLogin: boolean

  // type 怎么获取？
}


export default class Login extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)

    this.state = {
      username: '',
      password: '',
      autoLogin: false
    }
  }

  // 收集表单输入
  handleChange = (name: keyof IState, value: string | boolean) => {
    this.setState({
      [name]: value
    }as Pick<IState, keyof IState>)
  }

  // 跳转到注册界面
  toRegister = () => {
    this.props.history.push('/register')
  }


  render() {
    return (
      <div>
        <NavBar title={document.title}/>
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
            <Button type="primary">登陆</Button>
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