import http from "@/utils/http"

// 封装接口路径
const enum USERAPI_LIST {
  login = "/login" // 请求路径
}

// 封装用户的信息
export interface IUserData {
  username: string
  password: string
}

// 后续方法可以继续扩展  用户调用的接口
export async function login<T>(data: IUserData) {
  return http.post<T>(USERAPI_LIST.login, data)
}

// 调用示例
// login<{ username: string; token: string }>({
//   username: "hello",
//   password: "jw"
// }).then((res) => {
//   res.data?.username
// })
