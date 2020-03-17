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
import { register } from "../../redux/actions"
import {AppState} from '../../redux/reducers'

const { Item } = List

interface IProps extends RouteComponentProps {
  register: (username: string, password: string, password2: string, type: string)=>any,
  message: string,
  redirectTo: string
}

interface IState {
  username: string
  password: string
  password2: string
  type: string
}

class Register extends Component<IProps, IState> {
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
  handleChange = (name: keyof IState, value: string) => {
    this.setState({ [name]: value } as Pick<IState, keyof IState>)
  }

  // 跳转到登陆页面
  toLogin = () => {
    this.props.history.push("/login")
  }

  // 注册
  handleRegister = (user: IState) => {
    const {username, password, password2, type} = user
    this.props.register(username, password, password2, type)
    setTimeout(() => {
      if (this.props.message) {
         Modal.alert(' ', this.props.message)
      }
    }, 300);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
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
                onChange={value => this.handleChange("type", "student")}
              >
                &nbsp;&nbsp;求职
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                name="type"
                checked={this.state.type === "hr"}
                onChange={value => this.handleChange("type", "hr")}
              >
                &nbsp;&nbsp;招聘
              </Radio>
            </Item>
            <WhiteSpace />
            <Button
             type="primary"
             onClick={() => this.handleRegister(this.state)}
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
  (state: AppState) => state.user,
  {register}
)(Register)