import React from 'react'
import {connect} from 'react-redux'
import {Result, List, Button, WhiteSpace, Modal} from 'antd-mobile'
import {Redirect} from 'react-router-dom'


import {AppState} from '../../redux/reducers'
import {logout} from '../../redux/actions'

interface IProps{
  logout: any,
  avatar: string,
  username: string,
  post: string,
  type: string,
  info: string,
  company: string,
  salary: string
}


class Personal extends React.Component<IProps>{

  handleClick = () => {
    Modal.alert('退出','确认退出吗?',[
      {
        text: '取消',
        onPress: () => {

        }
      },
      {
        text: '确认',
        onPress: () => {
          this.props.logout()
          return <Redirect to='/login'/>
        }
      }
    ])

  }

  render() {
    const {avatar, username, post, type, info, company, salary} = this.props
    return(
      <div>
        <Result
          img={<img src={avatar}/>}
          title={username}
          message={type==='hr' && company}
        />
        <List renderHeader = {() => '相关信息'}>
          <List.Item>职位:&nbsp;&nbsp;{post}</List.Item>
          <List.Item>简介&nbsp;&nbsp;:{info}</List.Item>
          {type==='hr' && <List.Item>职位待遇&nbsp;&nbsp;:{salary}</List.Item>}
        </List>
        <WhiteSpace/>
        <Button
         type="warning"
         onClick={this.handleClick}
        >
          退出登陆
        </Button>
      </div>
    )
  }
}

export default connect(
  (state:AppState) => state.user,
  {logout}
)(Personal)


