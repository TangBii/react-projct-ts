import React from 'react'

import './logo.less'
import logo from './logo.png'

export default function Logo() {
  return (
    <div className="logo-container">
      <img className="logo" src={logo} alt=""/>
    </div>
  )
}