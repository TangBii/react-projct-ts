import axios from 'axios'

export default function ajax (url: string, data = {}, type = 'GET') {
  type = type.toUpperCase()
  if(type === 'GET') {

    // 使用 GET 方式请求时 url 参数格式为 ?key=value&key=value
    let dataStr = '?'
    for(const key in data) {
      dataStr += `${key}=${(data as any)[key]}&`
    }
    url += dataStr.slice(0, -1)
    
    return axios.get(url)
  }
  if (type === 'POST') {
     return axios.post(url, data)
  }
  throw new Error('不支持的请求方式')
}
