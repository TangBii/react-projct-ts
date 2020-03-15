import React from 'react'

import {NavBar} from 'antd-mobile'

interface IProps {
  title: string
}

export default function MyNavBar(props: IProps) {
  return (
  <NavBar>{props.title}</NavBar>
  )
}