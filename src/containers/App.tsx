import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './Login/Login'
import Register from './Register/Register'
import Main from './Main/Main'

import '../assets/navStyle.less'
import '../assets/main.less'

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route component={Main}/>
        </Switch>
      </HashRouter>
    )
  }
}