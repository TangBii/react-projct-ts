import React from 'react'
import {connect} from 'react-redux'
import {AppState} from '../../redux/reducers'
import {IUser} from '../../redux/action-types'
import {getList} from '../../redux/actions'
import {RouteComponentProps} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
const {Header, Body} = Card


interface IProps extends RouteComponentProps{
  user: IUser
  list: Array<IUser>
  getList: (type: string) => any
}

class HR extends React.Component<IProps,{}>{
  componentWillMount() {
      this.props.getList('student')
  }

  handleClick = (index: number) => {
    this.props.history.push('/chat/' + this.props.list[index]._id!)
  }


  render() {
    if (this.props.list.length === 0) {
      return null
    }
    return(
      <div>
        <WingBlank size="lg" className="userList">
          <WhiteSpace/>
          <QueueAnim>
            {
            this.props.list.map((item: IUser, index: number) => (
              <Card
              onClick={() => this.handleClick(index)}
              key={item._id}
              >
              <Header
                thumb={item.avatar!}
                extra={item.username}
              />
              <Body>
                求职岗位:{item.post} <br/>
                <WhiteSpace/>
                个人介绍: {item.info}
              </Body>
            </Card>
            ))
            }
          </QueueAnim>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
 (state: AppState) => ({
   list:state.list,
   user: state.user
}),
 {getList}
)(HR)