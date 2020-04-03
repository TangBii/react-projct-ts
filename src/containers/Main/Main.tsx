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
import {getUser, receiveMessageList, logOut} from '../../redux/actions'
import Chat from '../Chat/Chat'
import { IUser} from '../../redux/action-types'

interface IProps extends RouteComponentProps{
  user: IUser
  // chat: IChat
  receiveMessageList: any
  getUser: any
  logOut: any
}

export interface ITabBarListItem{
  title: string
  icon: string,
  selectedIcon: string,
  path: string,
  component: any,
  hide: boolean
}

class Main extends Component<IProps> {
  componentWillMount() {
    const {username} = this.props.user
    if (Cookies.get('userid') && !username) {
      this.props.getUser()  
      this.props.receiveMessageList(Cookies.get('userid')!.slice(3, -1))
    }
  }


  render() {
    let {pathname} = this.props.location
    const userid = Cookies.get('userid'),
          {username, type} = this.props.user
    if (!userid) {
      this.props.logOut()
      return <Redirect to='/login'/>
    }
    if (!username) {
      return null
    } else {
      if(pathname === '/') {
        pathname = this.props.user.redirectTo!
        return <Redirect to={pathname}/>
      }
      this.props.receiveMessageList(Cookies.get('userid')!.slice(3, -1))
    }
    const tabBarList: ITabBarListItem[] = [
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
      {
        currentTab &&  <TabBar 
          tabBarList={tabBarList}
          history = {this.props.history}
          location = {this.props.location}
          match = {this.props.match}
        />
      }
      </>
    )
  }
}

export default connect(
  (state: AppState) => ({user: state.user}),
  {getUser, receiveMessageList, logOut}
)(Main)
