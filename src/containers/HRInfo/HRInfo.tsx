import React, { Component } from "react"
import { connect } from "react-redux"
import { AppState } from "../../redux/reducers"
import { List, WhiteSpace, InputItem, TextareaItem, Button, Modal } from "antd-mobile"
import {Redirect} from 'react-router'


import AvatarList from "../../components/AvatarList/AvatarList"
import {update} from '../../redux/actions'


interface IState{
  avatar: string,
  post: string
  company: string,
  salary: string
  info: string
}

interface IProps{
  update: (
    avatar: string,
    post?: string,
    info?: string,
    company?: string,
    salary?: string
  ) => any,
  message: string,
  redirectTo: string
}

export interface IChange{
  (name: keyof IState, val: string | undefined) : void
}

class HRInfo extends Component<IProps, IState> {
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
    } as Pick<IState, keyof IState>)
  }

  handleSave = () => {
    const {avatar, post, company, info, salary} = this.state
    this.props.update(avatar,post,info,company,salary)
    setTimeout(() => {
      let {message} = this.props
      if (message)
      Modal.alert(' ', message)
    }, 100);
  }


  render() {
    return (
      <div>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
        <AvatarList handleChange={this.handleChange}/>
        <List>
          <WhiteSpace />
          <InputItem
           onChange={ value => this.handleChange('post', value)}
          >
            招聘岗位
          </InputItem>
          <WhiteSpace />
          <InputItem
           onChange={ value => this.handleChange('company', value)}
          >
            公司名称
          </InputItem>
          <WhiteSpace />
          <InputItem
           onChange={ value => this.handleChange('salary', value)}
          >
            职位薪资
          </InputItem>
          <WhiteSpace />
          <TextareaItem
           title="公司介绍" 
           rows={2}
           onChange={value => this.handleChange('info', value)}
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
  (state: AppState) => state.user,
  {update}
)(HRInfo)
