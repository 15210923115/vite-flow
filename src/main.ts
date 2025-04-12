import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import "uno.css"
import "@iconify-json/ep"

import { login } from "./api/user"

// 自动导入插件 默认支持使用
createApp(App).use(router).use(createPinia()).mount("#app")

// acion 这里写到这 是为了表示页面加载的时候会调用
login<{ username: string; token: string }>({
  username: "hello 123",
  password: "jw"
}).then((res) => {
  console.log(res.data?.username)
})
