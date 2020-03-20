import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import {AppState} from '../../redux/reducers'
import {IUser} from '../../redux/action-types'
import {IChatMessage, IChat } from '../../redux/action-types'
import {RouteComponentProps} from 'react-router-dom'
import {readMessage} from '../../redux/actions'
const {Item} = List


interface IGroups {
    [belongTo: string]: IChatMessage,
}


function getLastMessages(messages: Array<IChatMessage>, userid: string) {
  // 获取最后一个消息数组
  const messageGroups: IGroups = {}
  messages.forEach(message => {
    const {belongTo, date} = message
    if (!messageGroups[belongTo!]) {
      messageGroups[belongTo!] = message
      message.unreadCount = (!message.isRead && message.to === userid)? 1: 0
    } else {
      const preMessage = messageGroups[belongTo!]
      message.unreadCount = 0
      if (date! > preMessage.date!) {
        message.unreadCount = preMessage.unreadCount
        messageGroups[belongTo!] = message
      }
      message.unreadCount = message.unreadCount! + 
                            ((!message.isRead && message.to === userid)? 1: 0)
    }
  })
  return Object.values(messageGroups)
         .sort((message1: IChatMessage, message2: IChatMessage) =>(
            Number(message2.date) - Number(message1.date)
         ))
}


interface IProps extends RouteComponentProps{
  user: IUser
  chat: IChat
  readMessage: (from: string) => any
}

class Message extends React.Component<IProps>{
  handleClick = (target: string) => {
    this.props.readMessage(target)
    this.props.history.push(`/chat/${target}`)
  }

  render() {
    const {user, chat} = this.props
    const lastMessages = getLastMessages(this.props.chat.chatList, user._id!)
      return(
      <div>
        <List
          style={{margin:"50px 0"}}
        >
          {
            lastMessages.map(item =>{
              const target = item.from === user._id? item.to: item.from
              return (
                <Item
                key={target}
                  thumb={
                    <img 
                      src={chat.users[target]?.avatar}
                      style={{width:"100%", height: "100%"}}
                      alt=""
                    />
                  }
                  extra={<Badge text={item.unreadCount}/>}
                  arrow="horizontal"
                  onClick={() => this.handleClick(target)}
                >
                  {chat.users[target]?.username}
                    <Item.Brief>
                      {item.content}
                    </Item.Brief>
                </Item>
              )
            })
          }
        </List>
      </div>
  )
  }
}

export default connect(
  (state: AppState) => ({user: state.user, chat: state.messages}),
  {readMessage}
)(Message)