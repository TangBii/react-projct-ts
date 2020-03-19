import React from 'react'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import { AppState } from '../../redux/reducers'
import { IChat } from '../../redux/action-types'
const {Item} = TabBar

interface IItem{
  title: string,
  icon: string,
  selectedIcon: string,
  path: string,
  component: any,
  hide: boolean
}

interface IProps {
  tabBarList: Array<IItem>
  history: any,
  location: any,
  messages: IChat
}

 class MyTabBar extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props)
  }

  render() {
    let {tabBarList} = this.props    
    tabBarList = tabBarList.filter(item => !item.hide)
    return(
      <TabBar
       tabBarPosition='bottom'
       tintColor='#1CAE82'
      >
        {tabBarList.map(item => (
          <Item
            title={item.title}
            key={item.title}
            icon={{uri: require(`./nav/${item.icon}.png`)}}
            selectedIcon={{uri: require(`./nav/${item.selectedIcon}.png`)}}
            selected={this.props.location.pathname === item.path}
            onPress={() => this.props.history.replace(item.path)}
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