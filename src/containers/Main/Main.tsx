import React, {Component} from 'react'
import {Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import {AppState} from '../../redux/reducers'
import StuInfo from '../StuInfo/StuInfo'
import HRInfo from '../HRInfo/HRInfo'
import TabBar from '../../components/TabBar/TabBar'
import Student from '../Student/Studnet'
import HR from '../HR/HR'
import Message from '../../containers/Message/Message'
import Personal from '../../containers/Personal/Personal'
import {getUser, receiveMessageList} from '../../redux/actions'
import Chat from '../Chat/Chat'
import { IUser } from '../../redux/action-types'

interface IProps extends RouteComponentProps{
  receiveMessageList: any
  getUser: any
  username: string
  message: string
  type: string
  redirectTo: string
  user: IUser
}

class Main extends Component<IProps> {
  componentWillMount() {
    // if (!Cookies.get('userid')) {
    //   this.props.receiveMessageList(Cookies.get('userid')!.slice(3, -1))
    // }
    // 如果存在 cookie 请求获取 user
    const {username} = this.props
    if (Cookies.get('userid') && !username) {
      this.props.getUser()
      this.props.receiveMessageList(Cookies.get('userid')!.slice(3, -1))
    }
  }


  render() {
    let {pathname} = this.props.location
    const userid = Cookies.get('userid'),
          {username, type} = this.props
    if (!userid) {
      return <Redirect to='/login'/>
    }
    if (!username) {
      return null
    } else {
      if(pathname === '/') {
        pathname = this.props.redirectTo
        return <Redirect to={pathname}/>
      }
      this.props.receiveMessageList(Cookies.get('userid')!.slice(3, -1))
    }
    const tabBarList = [
      {
        title: '求职者列表',
        icon: 'graduate',
        selectedIcon: 'graduate-selected',
        path: '/hr',
        component: HR,
        hide: false
      },
      {
        title: 'HR列表',
        icon: 'hr',
        selectedIcon: 'hr-selected',
        path: '/student',
        component: Student,
        hide: false
      },
      {
        title: '消息',
        icon: 'message',
        selectedIcon: 'message-selected',
        path: '/message',
        component: Message,
        hide: false
      },
      {
        title: '个人中心',
        icon: 'personal',
        selectedIcon: 'personal-selected',
        path: '/presonal',
        component: Personal,
        hide: false
      }
    ]
    if (type === 'student') {
      tabBarList[0].hide = true
    } else {
      tabBarList[1].hide = true
    }
    const currentTab = tabBarList.find(item => item.path === pathname)
    return (
      <>
      {currentTab && <NavBar className="stick-top">{currentTab.title}</NavBar>}
      <Switch>
        <Route path='/studentinfo' component={StuInfo}/>
        <Route path='/hrInfo' component={HRInfo}/>
        <Route path='/chat/:userid' component={Chat}/>
        {
          tabBarList.map(item => (
            <Route
              path={item.path}
              component={item.component}
              key={item.title}
            />
          ))
        }
      </Switch>
      {currentTab &&  <TabBar 
        tabBarList={tabBarList} 
        history={this.props.history}
        location={this.props.location}
      />}
      </>
    )
  }
}

export default connect(
  (state: AppState) => state.user,
  {getUser, receiveMessageList}
)(Main)
