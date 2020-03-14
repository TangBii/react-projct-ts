import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Main from './Main'


export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>

          {/* 默认路由 */}
          <Route component={Main}/>
        </Switch>
      </HashRouter>
    )
  }
}