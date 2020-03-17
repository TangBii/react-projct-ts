import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'


import {AppState} from '../../redux/reducers'
import StuInfo from '../StuInfo/StuInfo'
import HRInfo from '../HRInfo/HRInfo'


class Main extends Component {
  render() {
    return (
      <>
      {!Cookies.get('userid') && <Redirect to='/login'/>}
      <Switch>
        <Route path='/studentinfo' component={StuInfo}/>
        <Route path='/hrInfo' component={HRInfo}/>
      </Switch>
      </>
    )
  }
}

export default connect(
  (state: AppState) => state.user,
  {}
)(Main)
