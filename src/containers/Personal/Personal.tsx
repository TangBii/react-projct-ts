import React from 'react'
import {connect} from 'react-redux'
import {Result, List, Button, WhiteSpace, Modal} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'


import {AppState} from '../../redux/reducers'
import {IUser} from '../../redux/action-types'
import {logOut} from '../../redux/actions'

interface IProps{
  user: IUser,
  logOut: any
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
          // 记得清除 cookie
          Cookies.remove('userid')
          this.props.logOut()
          return <Redirect to='/login'/>
        }
      }
    ])
  }
  render() {
    const {avatar, username, post, type, info, company, salary} = this.props.user
    return(
      <div>
        <Result
          img={<img src={avatar} alt=""/>}
          title={username}
          message={type==='hr' && company}
          className="down"
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
         className="logout"
        >
          退出登陆
        </Button>
      </div>
    )
  }
}

export default connect(
  (state:AppState) => ({user: state.user}),
  {logOut}
)(Personal)


