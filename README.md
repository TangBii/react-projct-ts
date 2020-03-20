## 1. 项目介绍

此项目为一个**前后台分离**的单页招聘应用，包括:**注册登陆**、**用户信息完善**、**用户列表**、**实时聊天**、**个人中心等界面**, 可以根据用户类型动态地展示界面。

使用的主要技术有: **ES6 + TypeScript + React全家桶 + redux + and-mobile** （前端）
							   **Express + Mongodb + socketIO** (后台)

采用**模块化、组件化、工程化**的模式开发

## 2. 项目注意点

### 1. 初始化阶段

#### 1.1 使用脚手架搭建项目

```shell
# 使用 --template typescript 可以创建 ts 版本脚手架
create-react-app react-project-ts --template typescript
```

#### 1.2 目录结构

<pre>src
│  index.tsx		# 入口文件
│
├─ajax               # ajxa请求相关文件文件夹
├─assets			# 公共资源文件夹
├─components		# UI 组件模块文件夹
├─containers		# 容器组件模块文件夹
├─redux             # redux 相关模块文件夹
└─utils             # 工具模块文件夹
</pre>

#### 1.3 antd-mobile 按需加载

**配置 index.html**

```js
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
if(!window.Promise) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
}
</script>
```

**实现按需加载**

安装 `react-app-rewired` 和  `customize-cra` 和 `babel-plugin-import`

```shell
npm install react-app-rewired customize-cra babel-plugin-import --save-dev
```

配置 `package.json`

```json
"scripts": {
    "start": "react-app-rewired start",
     "build": "react-app-rewired build",
     "test": "react-scripts-rewired test",
     "eject": "react-scripts eject"
},
```

在项目根目录创建 `config-overrides.js`

```js
const { override, fixBabelImports } = require('customize-cra')
module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
);
```

**更改主题色**

安装 `less` 和 `less-loader`

```shell
npm insatll --save-dev less less-loader
```

更该 `config-override.js` 的配置

```js
const {override, fixBabelImports, addLessLoader} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
        // 自定义主题
      "@brand-primary": "#F1A200",
      "@brand-primary-tap": "#CC8800"
  },
  }),
)
```

所有默认主题变量可以在[这里](https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less)查看

#### 1.4 引入 react-router-dom

用到的主要组件有: `<HashRouter>、<Redirect>、<Switch>、<Route>、<RouteComponentProps>`

页面路由结构如下:

![router](D:/workspace/blog/source/_posts/router.png)

#### 1.5 引入 redux

**安装**

```shell
# 安装 redux react插件 redux异步中间件
npm insatll --save redux react-redux redux-thunk

# 安装 react-redux 声明文件
npm install --save @types/react-redux

# 安装 redux 调试插件
npm install --save-dev redux-devtools-extension
```

**初始化 redux 目录**

<pre>
    redux
	|-- store.ts
	|-- reducers.ts
	|-- actions.ts
	|-- action-types.ts
</pre>

**搭建模板**

*store.ts*

```ts
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

```

*reducers.ts*

```ts
import {combineReducers} from 'redux'

export default combineReducers({

})

```

*index.tsx*

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './containers/App'
import store from './redux/store'
ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('root')) 

```

#### 1.6 创建后台应用

**安装 Express 和 Express 脚手架**

```shell
npm install -g express
npm install -g express-generator

```

**创建项目并安装相关依赖**

```shell
express --ejs react-project-ts-server
cd react-project-ts-server
npm install

```

**修改默认端口为4300**

*/bin/www*

```js
var port = normalizePort(process.env.PORT || '4300');

```

**配置自动更新**

安装 nodemon

```shell
npm install --save-dev nodemon

```

配置 package.json

```json
"scripts": {
  "start": "nodemon ./bin/www"
}

```


#### 1.7  配置数据库

**mongodb基本操作**

- `show dbs` 查看所有数据库
- `db.dropDatabase()`  删除数据库 (需要切换到待删除的数据库)
- `db.<collection>.drop()` 删除集合,`collection` 是待删除的集合名
- `db.createCollection(name[, option])` 创建名为`name` 的集合
- `db.<collection>.insert(document)`增
- `db.<collection>.remove(query)` 删
- `db.<collection>.update(query, select)` 改
- `db.<collection>.find(query)` 查

**连接数据库**

```shell
npm install --save mongoose md5-node

```

*/db/connection.js*

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/react-project-ts', { useNewUrlParser: true, useUnifiedTopology: true})
const conn = mongoose.connection
conn.on('connected', () =>{
  console.log("connection succeeded!")
})

module.exports = mongoose

```

*db/models.js*

```js
const mongoose = require('./connection')

let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  avatar: {type: String},
  post: {type: String},
  info: {type: String},
  company: {type: String},
  salary: {type: String}
})

let UserModel = mongoose.model('user', userSchema)

let chatSchema = mongoose.Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  chat_id: {type: String, required: true},
  content: {type: String, required: true},
  read: {type: Boolean, default: false},
  create_time:{type: Number}
})

const ChatModel = mongoose.model('chat', chatSchema)

module.exports = {UserModel, ChatModel}

```

**配置代理服务器**

*/package.json*

```js
"proxy": "http://127.0.0.1:4300"

```

### 2. 登陆页面

redux 管理的与用户信息相关的状态:

```ts
export interface IUser {
  _id: string
  username: string
  type: string
  avatar?: string,
  post?: string,
  info?: string,
  company?: string,
  salary?: string
  message?: string,		// 错误提示信息
  redirectTo?: string	// 重定向地址信息
}

```

#### 2.1 页面展示

从登陆页面和注册页面可以提取一个公共组件 **Logo**, 引入图片和 css 可使用以下语法

```ts
import './logo.css'
import logo from './logo.png'

// 引用图片
<img src={log}/>

```

另外用到的 UI 库组件有: `NavBar、List、List.item、InputItem、Radio、Button、WhiteSpace、WingBlank、Modal`

Modal 用法如下:

```ts
Modal.alert('标题 ', '内容')

```

#### 2.2 相关逻辑

**状态和属性**

```ts
interface IProps extends RouteComponentProps {
  user: IUser
  login: (username: string, password: string, autoLogin: boolean)=>any,
}

interface IState {
  username: string,
  password: string,
  autoLogin: boolean
}

```

**收集表单输入**

`InputItem` 的 `onChange` 事件会传入一个参数，值为当前输入框的值，可以用这个参数处理表单输入

```ts
<InputItem
onChange={(value) => this.handleChange('username', value)}
>
// 收集表单输入    
handleChange = (name: keyof IState, value: string | boolean) => {
  this.setState({
    [name]: value
  }as Pick<IState, keyof IState>)
}

```

**跳转到注册界面**

使用 `this.props.history.replace('/login')` 即可

**表单验证**

注意登陆action是异步的，所以也要异步表单验证，等待一下 `message`,但是异步的时间不好确定 。不能放在生命周期函数中，因为每输入一个值都会重新渲染，对话框就会不断弹出。

#### 2.3 主业务流程

- 如果存在 `cookie-userid` 和 `redirectTo`，重定向到 `redirectTo`, 否则:
- 从表单收集数据 `username、password、autoLogin` 传给 `login[ActionCreator]`
- `login[ActionCreator]` 基于收到的数据向服务器发送请求 `reqLogin()`
  - 服务器验证用户信息，验证成功返回用户相关信息 `userInfo` 并设置 Cookie
- 更新 redux 管理的用户状态, 尤其是 `message` (登陆失败) 和 `redirectTo`（登陆成功）

注：工具函数 `getRedirectPath` 根据 `head` 和 `type` 决定重定向的地址是主界面还是信息完善界面

### 3. 注册页面

#### 3.1 页面展示

与登陆页面基本相同

#### 3.2 相关逻辑

注意 `Radio` 信息的收集与其他表单项的不同，`Radio` 没有被注入的参数。根据组件状态中的 `type` 值显示是否被选中

```jsx
<Radio
  name="type"
  checked={this.state.type === "student"}
  onChange={() => this.handleChange("type", "student")}
>

```

可以通过加边框和圆角自定义一个较好看的样式

#### 3.3 主业务流程

- 如果存在 `cookie-userid` 和 `redirectTo`，重定向到 `redirectTo`, 否则:
- 从表单收集数据 `username、password、password2` 传给 `register[ActionCraetor]`
- `register[ActionCreator]` 基于收到的数据 (过滤 password2) 向服务器发送请求 `reqRegister()`
- 服务器查询用户是否已存在，如果不存在向数据库中添加一条新纪录并设置 Cookie
- 更新 redux 管理的用户状态

### 4.信息完善页面

包括 `/hrinfo` 和 `/studentinfo`

#### 4.1 页面展示

由自定义组件 `AvatarList` 和 `List、InputItem、Button、TextareaItem、WhiteSpace、WingBlank、Modal` 组成

#### 4.2 相关逻辑

**状态**

```ts
interface IState{
  selected: string	// 根据这个属性决定列表标题显示的图片
}

```

**属性**

```ts
interface IProps{
  handleChange: IChange	// 父组件传过来可以更新其 avatar 状态的函数
}

```

另外注意以下几点:

- List 可以在标签中使用 `renderHead={() => str}` 渲染一个标题（str 可以是字符串也可以是标签）

  ```jsx
  const headStr = this.state.selected?
                  <p>选择的头像是<img src={this.state.selected} alt=""/></p>:
                   `请选择头像`
  <List renderHeader={() => headStr}>
  
  ```

- Grid 接收三个属性:

  - `data` 值为一个数组,数组中每个元素接收两个属性，`icon` 和 `text`

    ```jsx
        const headers:header[] = []
        for (let i = 1; i < 21; i++) {
          headers.push({
            icon: require(`./headers/头像${i}.png`),
            text: `头像${i}`
          })
        }
    
    ```

  - `columnNum` 值为一个数字，表示有几列

  - `onClick` 当被点击时修改 `this.state.selected` 同时调用`this.props.handleChange()` 更新父组件的 `avatar` 属性

#### 4.3  主业务流程

- 如果存在 `redirectTo`，重定向到 `redirectTo`, 否则:
- 收集表单数据传给 `update[ActionCreator]` 向服务器发送请求 `reqUpdate()`
- 服务器处理请求返回数据
- 更新 redux 管理的用户状态, 尤其是 `redirectTo`

### 5. 主页面

#### 5.1 页面展示

由 `NavBar[可选]` 、`一些路由组件`、`TabBar` 组成。

#### 5.2 相关逻辑

有一个路由组件数组:

```ts
const tabBarList: ITabBarListItem[] = [
    {
        title: '求职者列表',
        icon: 'graduate',
        selectedIcon: 'graduate-selected',
        path: '/hr',
        component: HR,
        hide: false
    },
    {
        title: 'HR列表',
        icon: 'hr',
        selectedIcon: 'hr-selected',
        path: '/student',
        component: Student,
        hide: false
    },
    {
        title: '消息',
        icon: 'message',
        selectedIcon: 'message-selected',
        path: '/message',
        component: Message,
        hide: false
    },
    {
        title: '个人中心',
        icon: 'personal',
        selectedIcon: 'personal-selected',
        path: '/presonal',
        component: Personal,
        hide: false
    }
]

```

用于 TabBar 时要根据用户类型隐藏一个

```ts
if (type === 'student') {
    tabBarList[0].hide = true
} else {
    tabBarList[1].hide = true
}

```

NavBar 和 TabBar 如果是用户信息完善界面则不显示

```jsx
const currentTab = tabBarList.find(item => item.path === pathname)
{currentTab && <NavBar className="stick-top">{currentTab.title}</NavBar>}
// NavBar 同理

```

**TabBar**

有 4 个 Item: `学生列表、求职者列表、消息列表、个人中心` 

```jsx
<TabBar>
    {
        TabBarList.filter(item => !item.hide).map(item => (
        	<TabBar.Item
             	title={item.title}
                 key={item.title}
                 icon={{uri: require(`./nav/${item.icon}.png`)}}
                 selectedIcon={{uri: require(`./nav/${item.selectedIcon}.png`)}}
                 selected={this.props.location.pathname===item.path}
                 onPress={() => this.props.history.push(item.path)}
                 badge={item.path==='/message'?this.props.message.count: 0}
             />
        ))
    }
</TabBar>

```

 **路由组件**

```jsx
<Switch>
	<Route path="/studenteinfo" component={StuInfo}/>
    <Route path="/hrinfo" component={HRInfo}/>
    <Route path="/chat:userid" component={Chat}/>
    {
        TabBarList.map(item => (
        	<Route
                path={item.path}
                component={item.component}
                key={item.path}
             />
        )
    }

</Switch>

```

#### 5.3 主业务流程

**登陆流程**

- 如果不存在 `userid` 的 cookie，重定向到登陆页面
- 如果存在 `userid` 的 cookie但不存在 `user._id` ，请求用户信息，在收到用户信息前返回 null，等请求有响应后跳转到 `redirectTo`
- 如果存在 `userid`的 cookie 和  `user._id` (说明有用户信息), 跳转到 `redirectTo`

**请求流程**

- 存在 `userid` 但不存在 `user._id` 时调用 `getUser[ActionCreator]`
- `getUser` 向服务器发送请求 `reqUser()` 获取用户信息

### 6. 个人中心页面

#### 6.1 页面展示

主要使用 `Result、List、Modal` 组件

```jsx
<Result
    img={<img src={avatar} alt=""/>}
    title={username}
    message={type==='hr' && company}
/>

```

#### 6.2 相关逻辑

当退出按钮被点击时 `Modal` 发出警告，如果确认则清除 cookie，重定向到登陆页面

```ts
handleClick = () => {
    Modal.alert('退出','确认退出吗?',[
        {
            text: '取消',
            onPress: () => {}
        },
        {
            text: '确认',
            onPress: () => {
                // 记得清除 cookie
                Cookies.remove('userid')
                this.props.logOut()
                return <Redirect to='/login'/>
            }
         }
    ])
}

```

#### 6.3 主业务流程

- 调用 `logOut[ActionCretor]`, 删除 Cookie，把状态重新初始化

### 7. 主列表页面

redux管理的与用户列表相关的状态

```ts
const initialList: Array<IUser> = []

```

#### 7.1 页面展示

主要使用 `Card` 组件

```jsx
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

```

#### 7.2 相关逻辑

当点击 `Card` 时根据 `index 和 List` 得到 `userid`， 然后跳转到 `/chat: ${userid}` 聊天页面

```ts
handleClick = (index: number) => {
   this.props.history.push('/chat/' + this.props.list[index]._id!)
}

```

#### 7.3  主业务流程

- 调用 `reqList[ActionCreator]`
- `reqList[ActionCreator]`  向服务器发送请求 `reqList()`
- 根据返回的 list 渲染页面 

### 8.  聊天页面

redux 管理的与聊天信息有关的状态

```ts
export interface IChatUser{
  [userid: string]: {   // 以 userid 作为属性名，便于查找
    username: string,
    avatar: string
  }
}

export interface IChatMessage {
  from: string,
  to: string,
  content: string,
  belongTo?: string,  // [from,to].sort().join('_')
  isRead?: boolean,
  unreadCount?: number, // 到目前消息为止的未读消息数量
  date?: string,
}

export interface IChat{
  users: IChatUser,
  chatList: Array<IChatMessage>,
  count: number,
}

```

#### 8.1 页面展示

主要使用 `NavBar, List, InputItem, Button, Grid, Icon`

```jsx
// 导航
<NavBar 
    className="chat-nav"  
    icon={<Icon type="left"/>}	// 向左的返回图标
    onLeftClick = {() => this.handleBack(this.props.user._id, target)}
    >
    {users[target]?.username}	// 根据 chat.users 获得 username
</NavBar>

// 聊天消息
{
    (chatList as []).map((item: IChatMessage, index: number) => (
        // 如果是自己发送的显示在右边，反之显示在左边
        item.from === this.props.user._id?
        (
            <Item
                extra={<img src={users[item.from]?.avatar} alt=""/>}
                className='chat-item-me'
                key={index}
            >
                {item.content}
            </Item>
        ):
        (
            <Item
                thumb={<img src={users[item.from!]?.avatar} alt=""/>}
                key={index}
            >
                {item.content}
            </Item>
        )
    ))
}

// 表情框
{
    this.state.showEmoji &&
        <Grid
            data={this.state.emojis}
            columnNum={3}
            isCarousel={true}
            carouselMaxRow={2}
            onClick={(emoji) => this.handleAddEmoji(emoji)}
         />
}

```

#### 8.2 相关逻辑

**过滤信息**

```ts
// 过滤出与对话对象有关的信息
chatList = chatList.filter(item => 
	item.belongTo === [this.props.user._id, target].sort().join('_')
)

```

**唤出和输入表情**

```ts
interface IState {
  showEmoji: boolean	// 是否显示表情
  emojis: Array<{text:string}>	// 表情数据
  inputStr: string	// 输入框内容
}

// 点击表情框时切换 this.state.showEmoji 
handleToggleEmoji = () => {
    this.setState(state => ({showEmoji: !state.showEmoji}))

    // 解决 bug
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
    }, 0);
}

// 输入框作为受控组件
<InputItem
    placeholder='请输入聊天内容'
    value={this.state.inputStr}
    onChange={(value) => this.handleInput(value)}
>

// 把选择的表情添加到输入框
handleAddEmoji = (emoji: any) => {
    this.setState(state => ({inputStr: state.inputStr + emoji.text}))
}

```

**发送消息并在发送后清空输入框**

```ts
  // 发送信息
  handleSendMessage = () => {
    const {_id} = this.props.user,
          to = (this.props.match.params as {userid: string}).userid,
          content = this.state.inputStr
    if (content) {
      this.props.sendAMessage({from: _id, to, content})
    }
    // 清空输入框
    this.setState({inputStr:'', showEmoji: false})
  }

```

**初始进入时页面滑动到底部，发送新消息后页面也滑动到底部**

```ts
componentDidMount() {
   // 初始滑动到底部
   window.scrollTo(0, document.body.scrollHeight)
}

componentDidUpdate() {
   // 发送消息后滑动到底部
   window.scrollTo(0, document.body.scrollHeight)
}

```

#### 8.3 主业务逻辑

**发送消息逻辑**

- 初始化 IO

  ```ts
  // 初始化 IO（单例模式） 连接服务器 + 绑定监听监听服务器返回的信息
  let socket:any = null
  function initIO(dispatch: Dispatch, userid: string) {
    if (!socket) {
      socket = io('ws://127.0.0.1:4300')
      console.log('已连接服务器')
        
      // 监听服务器返回的信息，如过有信息返回调用 receiveMessage
      socket.on('ServerToClient', (message: IChatMessage) => {
        if (message.from === userid || message.to === userid) {
          dispatch(receiveMessage(message, userid))
        }
     })
    }
  }
  
  ```

  在 `receiveMessageList` 中调用该函数初始化 IO

- 使用 `socket.emit('ClientToServer', message)`  发送消息即可

**接收消息逻辑**

- 服务器接收消息并把消息存储在数据库中,注意字段 `belongTo` 的生成方式。然后把消息转发给所有连接的客户端

  ```js
  module.exports = function (server) {
    const io = require('socket.io')(server)
    const ChatModel = require('../db/models').ChatModel
    io.on('connection', (socket) => {
      socket.on('ClientToServer', ({from, to, content}) => {
          
        // 使用 belongTo 给消息分组  
        const belongTo = [from, to].sort().join('_'),
              date = Date.now().toString()
        
        // 把消息存储在数据库
        new ChatModel({from, to, content, belongTo, date, isRead: false})
        .save((err, message) => {
          if (err) {
            console.log('socketIO 出错' + err.message)
          }
          
         // 向所有连接的客户端发送消息
         io.emit('ServerToClient', message)
        })
      })
    })
  }
  
  ```

- 当服务器有消息发过来时，`socketIO` 会监听到然后调用 `receiveMessage[ActionCreator]` 更新 redux 管理的消息

**渲染消息逻辑**

- 当用户到达 `/main` 并且有相关信息时调用 `receiveMessageList[ActionCreator]`
- `receiveMessageList[ActionCreator]` 向服务器发送 `reqMessageList()` 请求，根据用户 id 获取所有与该用户相关的聊天信息和所有用户的名称和头像信息
- 在 `/chat:userid` 渲染时对上一步获取的消息列表过滤，得到只包含和对话对象有关的信息然后渲染

### 9. 消息列表页面

#### 9.1 页面展示

主要使用 `List、Badge 组件`

```jsx
<Item
    key={target}
    thumb={
        <img 
            src={chat.users[target]?.avatar}
            style={{width:"100%", height: "100%"}}
            alt=""
    	/>
    }
    extra={<Badge text={item.unreadCount}/>}	// 显示未读消息数量
    arrow="horizontal"
    onClick={() => this.handleClick(target)}
    >
    {chat.users[target]?.username}
    <Item.Brief>
        {item.content}
    </Item.Brief>
</Item>

// TabBar 显示未读消息数量
<TabBar>
    {
        tabBarList.filter(item => !item.hide).map(item => (
        <Item
            // 只在消息列表标签右上角显示
            badge={item.path==='/message'? this.props.messages.count: 0}
        />
    ))}
</TabBar>

```

#### 9.2 相关逻辑

**获取每组消息(belongTo 相同的消息)的最后一条消息并记录未读消息数**

```ts
interface IGroups {
    [belongTo: string]: IChatMessage,
}
function getLastMessages(messages: Array<IChatMessage>, userid: string) {
  // 以 [belongTo] 为属性, IChatMessage 为值的对象，表示每组消息的最后一条
  const messageGroups: IGroups = {}
  
  messages.forEach(message => {
    const {belongTo, date} = message
    
    if (!messageGroups[belongTo!]) {
      messageGroups[belongTo!] = message
        // 把未读消息数记录在最后一条消息上
      message.unreadCount = (!message.isRead && message.to === userid)? 1: 0
    } else {
      const preMessage = messageGroups[belongTo!]
      message.unreadCount = 0
        
       // 如果消息产生日期更迟，则覆盖原来的记录 
      if (date! > preMessage.date!) {
        message.unreadCount = preMessage.unreadCount
        messageGroups[belongTo!] = message
      }
      message.unreadCount = message.unreadCount! + 
                            ((!message.isRead && message.to === userid)? 1: 0)
    }
  })
    
  // 整理一个由最后一条消息组成的数组
  return Object.values(messageGroups)
         .sort((message1: IChatMessage, message2: IChatMessage) =>(
            Number(message2.date) - Number(message1.date)
         ))
}

```

**统计未读消息数量**

```ts
function messages(state = initialChat, action: ChatAction) {
  switch(action.type) {
    case GET_A_MESSAGE: 
      const {message, _id} = action.data as any
      return {
        ...state,
        chatList: [...state.chatList, message],
          
        // 收到一条消息时判断消息是否已读和目标 id 是否是自己，如果是则未读消息加一
        count: (!message.isRead && message.to === _id)? ++state.count: 					   state.count
      }
    case GET_MESSAGE_LIST:
      const {chats, userid} = action.data as any
      
      // 获取消息列表时统计未读消息数量
      let count = (state.chatList as [])
      .reduce((sum: number, curr: IChatMessage) => {
        return (!curr.isRead && userid === curr.to)? sum + 1: sum
      }, 0)
      return {...state, ...chats, count: count}
    case READ_MESSAGE:
      return {...state, count: state.count - (action.data as any)}
    case LOG_OUT:
      return initialChat
    default: 
      return state
  }
}

```

**获取聊天列表应该显示的用户的 id**

```ts
// 如果最后一条消息是自己发的，应该显示的用户的 id 为 item.to
// 如果最后一条消息是别人发的，应该显示的用户的 id 为 item.from
const target = item.from === user._id? item.to: item.from

```

**点击一个列表项跳转到对应聊天页面同时标记与之相关消息为已读**

```ts
handleClick = (target: string) => {
  this.props.readMessage(target)
  this.props.history.push(`/chat/${target}`)
}

```

#### 9.3 主业务逻辑

**更新未读消息数量**

- 点击一个列表项时调用 `readMessage[ActionCreator]` 

- `reqMessage` 向服务器发送请求 `reqReadMessage(from)`  把来自`from` 的消息的 `isRead` 改为 false

- 根据服务器返回值 (被读的消息数) 更新未读消息数量

  ```ts
  case READ_MESSAGE:
     return {...state, count: state.count - (action.data as any)}
  
  ```

## 3. TypeSctipt 相关

### 3.1 类组件声明方式

可以两个接口，传递给类作为 props 和 state 的类型

```ts
interface IProps {}
interface IState {}
export default class MyComponent<IProps, IState>{}

```

### 3.2 使 history 等属性可访问

属性接口继承自 `RouteComponentProps ` 后就可以访问 `history,match,location` 等属性了

```ts
import {RouteComponentProps} from 'react-roter-dom'
interface IProps extends RouteComponentProps

```

### 3.3  connect 中的 state 属性

从 `reducer.ts` 中可以提取

```ts
const rootReducer = combineReducers({})
export Appstate = ReturnType<typeof rootReducer>

```

### 3.4 收集表单输入时的属性定义

```ts
handleChange = (name: keyof IState, value: string | boolean) => {
  this.setState({
    [name]: value
  }as Pick<IState, keyof IState>)
}

```

## 4. 后台服务器相关

### 4.1 获取数据

```js
// 获取 get 参数
const {type} = req.query

// 获取 post 参数
const {username} = req.body

```

### 4.2 过滤敏感数据

```js
// 第二个参数可以传入一个对象表示过滤这个属性
const filter = {password: 0}
UserModel.find({type}, filter, (err, users) => {
})

```

### 4.3 Cookie 相关

```js
// 设置 cookie
res.cookie('userid', user._id, {maxAge})

// 读取 cookie
res.cookies.userid

// 清除 cookie
res.clearCookie('userid')

```

### 4.4 根据旧的 User 和 req.body 可以拼出新的 Uesr

```js
UserModel.findByIdAndUpdate({_id: userid}, req.body, (error, oldUser) => {
    // 根据 oldUser 和 req.body 拼出 newUser
    const {_id, username, type} = oldUser
    const user = Object.assign({_id, username, type}, req.body)
    res.send({status: 1, data: user})
})

```

### 4.5 模糊查找

```js
// from 或 to 等于 userid 都会被找到
ChatModel.find({'$or':[{from:userid}, {to: userid}]}, filter, (err, chatList) => {}
)

```

### 4.6 更新

```ts
// 第一个参数为待更新对象的条件
// 第二个参数为要更新的属性
// 第三个参数表示更新多个
ChatModel.update(
    {from, to, isRead: false},
    {isRead: true},
    {multi: true},
    (err, doc) => {
        if (err) {
            return res.send({status: 0, message: '发生未知错误8'})
        }
        res.send({status: 1, data: doc.nModified})
})

```

