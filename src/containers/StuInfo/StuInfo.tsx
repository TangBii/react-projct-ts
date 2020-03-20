import React, { Component } from "react"
import { connect } from "react-redux"
import { AppState } from "../../redux/reducers"
import { List, WhiteSpace, InputItem, TextareaItem, Button, Modal} from "antd-mobile"
import {Redirect} from 'react-router'


import AvatarList from "../../components/AvatarList/AvatarList"
import NavBar from '../../components/NavBar/NavBar'
import {update, IUpdate} from '../../redux/actions'
import {IUser} from '../../redux/action-types'

export interface IUpdateStuState{
  avatar: string
  post: string,
  info: string
}

interface IProps{
  user: IUser
  update: (userInfo: IUpdate) => any
}

export interface IChange{
  (name: keyof IUpdateStuState, val: string | undefined) : void
}

class StuInfo extends Component<IProps, IUpdateStuState> {
  constructor(props:IProps) {
    super(props)
    this.state = {
      avatar:'',
      post:'',
      info:'',
    }
  }

  handleChange:IChange = (name, val) => {
    this.setState({
      [name]: val
    } as Pick<IUpdateStuState, keyof IUpdateStuState>)
  }

  handleSave = () => {
    this.props.update((this.state as IUpdate))
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
           placeholder="请输入求职岗位"
          >
            求职岗位
          </InputItem>
          <WhiteSpace />
          <TextareaItem
           title="个人介绍" 
           rows={2}
           onChange={value => this.handleChange('info', value)}
           placeholder="个人介绍"
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
)(StuInfo)
