import React from 'react'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'

import { AppState } from '../../redux/reducers'
import { IChat } from '../../redux/action-types'
import {ITabBarListItem} from '../../containers/Main/Main'

const {Item} = TabBar

interface IProps extends RouteComponentProps{
  tabBarList: Array<ITabBarListItem>
  messages: IChat
}

 class MyTabBar extends React.Component<IProps>{
  render() {
    let {tabBarList} = this.props
    return(
      <TabBar
      >
        {tabBarList.filter(item => !item.hide).map(item => (
          <Item
            title={item.title}
            key={item.title}
            icon={{uri: require(`./nav/${item.icon}.png`)}}
            selectedIcon={{uri: require(`./nav/${item.selectedIcon}.png`)}}
            selected={this.props.location.pathname === item.path}
            onPress={() => this.props.history.push(item.path)}
            badge={item.path==='/message'? this.props.messages.count: 0}
          />
        ))}
      </TabBar>
    )
  }
}

export default connect(
  (state: AppState) => ({messages: state.messages})
)(MyTabBar)