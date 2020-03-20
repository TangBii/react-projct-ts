import React, { Component } from "react"
import { RouteComponentProps, Redirect } from "react-router-dom"
import {connect} from 'react-redux'
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  List,
  Radio,
  Modal
} from "antd-mobile"

import NavBar from "../../components/NavBar/NavBar"
import Logo from "../../components/Logo/Logo"
import {register} from "../../redux/actions"
import {AppState} from '../../redux/reducers'
import { IUser } from "../../redux/action-types"

const { Item } = List

interface IProps extends RouteComponentProps {
  user: IUser
  register: (user: IRegisterState)=>any,
}

export interface IRegisterState {
  username: string
  password: string
  password2: string
  type: string
}

class Register extends Component<IProps, IRegisterState> {
  constructor(props: IProps) {
    super(props)
    
    this.state= {
      username: "",
      password: "",
      password2: "",
      type: "student"
    }
  }

  // 收集表单输入
  handleChange = (name: keyof IRegisterState, value: string) => {
    this.setState({ [name]: value } as Pick<IRegisterState, keyof IRegisterState>)
  }

  // 跳转到登陆页面
  toLogin = () => {
    this.props.history.push("/login")
  }

  // 注册
  handleRegister = () => {
    this.props.register(this.state)
    setTimeout(() => {
      const {message} = this.props.user
      if (message) {
         Modal.alert(' ', message)
      }
    }, 300);
  }

  render() {
    const {redirectTo} = this.props.user
    return (
      <div>
        {redirectTo && <Redirect to={redirectTo}/>}
        <NavBar title='比&nbsp;特&nbsp;树&nbsp;校&nbsp;招'/>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              placeholder="请输入用户名"
              onChange={value => this.handleChange("username", value)}
            >
              用户名:
            </InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={value => this.handleChange("password", value)}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="确认密码"
              type="password"
              onChange={value => this.handleChange("password2", value)}
            >
              确认密码:
            </InputItem>
            <WhiteSpace />
            <Item>
              请选择用户类别:&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                name="type"
                checked={this.state.type === "student"}
                onChange={() => this.handleChange("type", "student")}
              >
                &nbsp;&nbsp;求职
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                name="type"
                checked={this.state.type === "hr"}
                onChange={() => this.handleChange("type", "hr")}
              >
                &nbsp;&nbsp;招聘
              </Radio>
            </Item>
            <WhiteSpace />
            <Button
             type="primary"
             onClick={this.handleRegister}
            >
              注册
            </Button>
            <Button onClick={this.toLogin}>已有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

// AppState
export default connect(
  (state: AppState) => ({user: state.user}),
  {register}
)(Register)