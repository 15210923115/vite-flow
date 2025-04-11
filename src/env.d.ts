// 声明文件 告诉ts 引入.vue文件的类型是什么

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
