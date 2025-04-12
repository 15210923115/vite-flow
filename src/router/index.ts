import { createRouter, createWebHistory } from "vue-router"

/**
 * vite里使用import.meta.glob动态导入路由
 * webpack中使用require.context动态导入路由
 *
 * 项目比较小，可以采用约定式路由，前端直接按照一定的规范写死路由。
 * 项目比较大，建议采用配置。
 */
const getRoutes = () => {
  // import.meta是es语法自带的
  // import.meta.glob是vite里扩展的，需要再env.d.ts中引入声明文件/// <reference types="vite/client" />
  const files = import.meta.glob("../views/*.vue")

  return Object.entries(files).map(([file, module]) => {
    const name = file.match(/\.\.\/views\/([^/]+?)\.vue/i)?.[1]

    return {
      path: "/" + name,
      component: module
    }
  })

  return []
}

export default createRouter({
  history: createWebHistory(),
  routes: getRoutes()
})
