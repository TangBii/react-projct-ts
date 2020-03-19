// 获取 RedirecTo
export function getRedirectPath(type: string, head: string  | undefined) {
  if (head) {
    return `/${type}`
  } else {
    return `/${type}info`
  }
}

