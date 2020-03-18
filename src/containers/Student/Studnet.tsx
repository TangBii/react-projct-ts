import React from 'react'
import {connect} from 'react-redux'
import {AppState, IUser} from '../../redux/reducers'
import {getList} from '../../redux/actions'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
const {Header, Body} = Card

interface IProps{
  getList: (type: string) => any
  list: Array<IUser>
}

class Student extends React.Component<IProps,{}>{
  componentWillMount() {
    if (this.props.list.length === 0) {
      this.props.getList('hr')
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
              招聘岗位:{item.post} <br/>
              <WhiteSpace/>
              公司: {item.company}<br/>
              <WhiteSpace/>
              薪资待遇: {item.salary}<br/>
              <WhiteSpace/>
              岗位需求: {item.info}<br/>
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
)(Student)