import React from 'react'
import {connect} from 'react-redux'
import {AppState, IUser} from '../../redux/reducers'
import {getList} from '../../redux/actions'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {RouteComponentProps} from 'react-router-dom'
const {Header, Body} = Card

interface IProps extends RouteComponentProps{
  getList: (type: string) => any
  list: Array<IUser>
  user: IUser
}

class Student extends React.Component<IProps,{}>{
  componentWillMount() {
    // if (this.props.list.length === 0) {
      this.props.getList('hr')
    // }
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
          {
          this.props.list.map((item: IUser, index: number) => (
            <Card
             key={item._id}
             onClick={() => this.handleClick(index)}
             >
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
 (state: AppState) => ({
   list:state.list,
   user: state.user
  }),
 {getList}
)(Student)