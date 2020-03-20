import React, { Component } from "react"
import { connect } from "react-redux"
import { AppState } from "../../redux/reducers"
import { List, WhiteSpace, InputItem, TextareaItem, Button, Modal } from "antd-mobile"
import {Redirect} from 'react-router'


import AvatarList from "../../components/AvatarList/AvatarList"
import NavBar from '../../components/NavBar/NavBar'

import {update, IUpdate} from '../../redux/actions'
import { IUser } from "../../redux/action-types"


export interface IUpdateHRState{
  avatar: string,
  post: string
  company: string,
  salary: string
  info: string
}

interface IProps{
  user: IUser,
  update: (userinfo: IUpdate) => any
}

export interface IChange{
  (name: keyof IUpdateHRState, val: string | undefined) : void
}

class HRInfo extends Component<IProps, IUpdateHRState> {
  constructor(props:IProps) {
    super(props)
    this.state = {
      avatar: '',
      post: '',
      company: '',
      salary: '',
      info: ''
    }
  }

  handleChange:IChange = (name, val) => {
    this.setState({
      [name]: val
    } as Pick<IUpdateHRState, keyof IUpdateHRState>)
  }

  handleSave = () => {
    this.props.update(this.state)
    setTimeout(() => {
      const {message} = this.props.user
      if (message)
      Modal.alert(' ', message)
    }, 100);
  }


  render() {
    const {redirectTo} = this.props.user
    return (
      <div>
        {redirectTo && <Redirect to={redirectTo}/>}
        <NavBar title="完善用户信息"/>
        <AvatarList handleChange={this.handleChange}/>
        <List>
          <WhiteSpace />
          <InputItem
           onChange={ value => this.handleChange('post', value)}
           placeholder="请输入招聘岗位"
          >
            招聘岗位
          </InputItem>
          <WhiteSpace />
          <InputItem
           onChange={ value => this.handleChange('company', value)}
           placeholder="请输入公司名称"
          >
            公司名称
          </InputItem>
          <WhiteSpace />
          <InputItem
           onChange={ value => this.handleChange('salary', value)}
           placeholder="请输入职位薪资"
          >
            职位薪资
          </InputItem>
          <WhiteSpace />
          <TextareaItem
           title="岗位需求" 
           rows={2}
           onChange={value => this.handleChange('info', value)}
           placeholder="岗位需求"
          />
          <WhiteSpace />
          <Button
           type="primary"
           onClick={this.handleSave}
          >
            保存
          </Button>
        </List>
      </div>
    )
  }
}

export default connect(
  (state: AppState) => ({user: state.user}),
  {update}
)(HRInfo)
