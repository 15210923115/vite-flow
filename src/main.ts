import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import "uno.css"
import "@iconify-json/ep"

createApp(App).use(router).mount("#app")

const a = 1

if (a) {
  console.log(a)
}
