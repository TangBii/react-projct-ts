import React from 'react'
import {connect} from 'react-redux'
import {AppState, IUser} from '../../redux/reducers'
import {getList} from '../../redux/actions'
import {RouteComponentProps} from 'react-router-dom'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
const {Header, Body} = Card

interface IProps extends RouteComponentProps{
  getList: (type: string) => any
  user: IUser
  list: Array<IUser>
}

class HR extends React.Component<IProps,{}>{
  componentWillMount() {
    // if (this.props.list.length === 0) {
      this.props.getList('student')
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