import React from 'react'
import {connect} from 'react-redux'
import {AppState, IUser} from '../../redux/reducers'
import {getList} from '../../redux/actions'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
const {Header, Body} = Card

interface IProps{
  getList: (type: string) => any
  user: IUser
  list: Array<IUser>
}

class HR extends React.Component<IProps,{}>{
  componentWillMount() {
    if (this.props.list.length === 0) {
      this.props.getList('student')
    }
  }

  render() {
    if (this.props.list.length === 0) {
      return null
    }
    return(
      <div>
        <WingBlank size="lg" className="userList">
          <WhiteSpace/>
          {
          this.props.list.map((item: IUser) => (
            <Card key={item._id}>
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

        </WingBlank>
      </div>
    )
  }
}

export default connect(
 (state: AppState) => ({list:state.list}),
 {getList}
)(HR)