import React, {Component} from 'react'
import {Grid, List} from 'antd-mobile'
import { DataItem } from 'antd-mobile/lib/grid/PropsType'

import {IChange} from '../../containers/StuInfo/StuInfo'
 
interface IState{
  selected: string
}

interface IProps{
  handleChange: IChange
}

interface header{
  icon: string,
  text: string
}

export default class AvatarList extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  handleClick = (header: DataItem) => {
    this.setState({selected: header.icon})
    this.props.handleChange('avatar', header.icon)
  }

  render() {

    // 初始化列表数据
    const headers:header[] = []
    for (let i = 1; i < 21; i++) {
      headers.push({
        icon: require(`./headers/头像${i}.png`),
        text: `头像${i}`
      })
    }

    // 渲染标题
    const headStr = this.state.selected?
                    <p>选择的头像是<img src={this.state.selected} alt=""/></p>:
                    `请选择头像`
    return (
      <List renderHeader={() => headStr}>
      <Grid
          data= {headers}
          columnNum={5}
          onClick={(header) => this.handleClick(header!)}
        />
      </List>
    )
  }
}