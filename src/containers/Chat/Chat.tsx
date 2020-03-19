import React from 'react'
import {NavBar, List, InputItem, Button, Grid} from 'antd-mobile'
import {sendAMessage} from '../../redux/actions'
import {connect} from 'react-redux'
import {AppState} from '../../redux/reducers'
import {IUser, IChat, IMessageServer} from '../../redux/action-types'
import {RouteComponentProps} from 'react-router-dom'
const {Item} = List

interface IState {
  showEmoji: boolean
  emojis: Array<{text:string}>
  inputStr: string
}

interface IProps extends RouteComponentProps{
  user: IUser,
  chat: IChat,
  sendAMessage: ({}:{from: string, to: string, content: string}) => any
}


class Chat extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props)
    const emojis = [
      '😀', '😃', '😄','😁', '😆', '😅', '🤣', '😂', '🙂',
      '😀', '😃', '😄','😁', '😆', '😅', '🤣', '😂', '🙂',
      '😀', '😃', '😄','😁', '😆', '😅', '🤣', '😂', '🙂'
    ].map(item =>({text: item}) )
    this.state = {
      showEmoji: false,
      emojis,
      inputStr: ''
    }
  }

  // 切换表情
  handleToggleEmoji = () => {
    this.setState(state => ({showEmoji: !state.showEmoji}))

    // 解决 bug
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }

  // 处理输入
  handleInput = (inputStr: string) => {
    this.setState({inputStr})
  }

  // 点击表情
  handleAddEmoji = (emoji: any) => {
    this.setState(state => ({inputStr: state.inputStr + emoji.text}))
  }

  // 发送信息
  handleSendMessage = () => {
    const {_id} = this.props.user,
          to = (this.props.match.params as {userid: string}).userid,
          content = this.state.inputStr
    if (content) {
      this.props.sendAMessage({from: _id, to, content})
    }      
    // 清空输入框
    this.setState({inputStr:'', showEmoji: false})

  }

  componentDidMount() {
    // 初始滑动到底部
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate() {
    // 滚动到底部
    window.scrollTo(0, document.body.scrollHeight)
  }

  render() {
    let {user, chatList} = this.props.chat,
        target = (this.props.match.params as {userid: string}).userid
    chatList = chatList.filter(item => 
      item.belongTo === 
      [this.props.user._id, target].sort().join('_')
    )
    return (
      <div>
        <NavBar className="chat-nav">{user[target]?.username}</NavBar>
        <List>
          <div className="chat-item">
            {
              (chatList as []).map((item: IMessageServer, index: number) => (
                item.from === this.props.user._id?
                (
                    <Item
                    extra={<img src={user[item.from]?.avatar}/>}
                    className='chat-item-me'
                    key={index}
                  >
                    {item.content}
                    </Item>
                ):
                (
                  <Item
                    thumb={<img src={user[item.from]?.avatar}/>}
                    key={index}
                  >
                    {item.content}
                  </Item>
                )
              ))
            }
          </div>

          <div
            className='chatBox'
          >
            <InputItem
              placeholder='请输入聊天内容'
              style={{paddingRight: '90px'}}
              value={this.state.inputStr}
              onChange={(value) => this.handleInput(value)}
            >
            </InputItem>
            <Button 
              type="primary"
              className="sendMessageButton emoji"
              onClick = {this.handleToggleEmoji}
              >
            😀
            </Button>
            <Button 
              type="primary"
              className="sendMessageButton"
              onClick={this.handleSendMessage}
              >
            发送
            </Button>
            {
              this.state.showEmoji &&
              <Grid
                data={this.state.emojis}
                columnNum={3}
                isCarousel={true}
                carouselMaxRow={2}
                onClick={(emoji) => this.handleAddEmoji(emoji)}
             />
             }
          </div>

        </List>
      </div>
    )
  }
}

export default connect(
  (state: AppState) => ({user: state.user, chat: state.messages}),
  {sendAMessage}
)(Chat)