/// <reference types="vitest" />

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import jsx from "@vitejs/plugin-vue-jsx" // 支持vue中的tsx语法
import path from "path"
// import { viteMockServe } from "vite-plugin-mock"

import Unocss from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"

// vite 默认只会编译ts 不会检测ts
export default defineConfig({
  plugins: [
    // viteMockServe(),
    vue(),
    jsx(),
    Unocss({
      /* options */
      presets: [
        // presetUno 默认预设 支持windicss
        presetUno(),
        // 支持将类名用属性的方式表示
        presetAttributify(),
        // 支持css icon
        presetIcons({
          // 自定义icon的css属性
          extraProperties: {
            display: "inline-flex",
            width: "2em",
            height: "2em",
            "vertical-align": "middle"
          },
          collections: {
            zf: {
              circle: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><!-- Icon from Element Plus by Element Plus - https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/package.json --><path fill="currentColor" d="M736 800V160H160v640a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64m64-544h63.552a96 96 0 0 1 96 96v224a96 96 0 0 1-96 96H800v128a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V128a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32zm0 64v288h63.552a32 32 0 0 0 32-32V352a32 32 0 0 0-32-32z"/></svg>`
            }
          }
        })
      ]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        // 配置上该属性，会自动生成.eslintrc-auto-import.json文件，然后在.eslintrc.js中的extends扩展中引入该文件里的规则
        // 以便于让eslint识别里面的规则
        enabled: true
      }
    })
  ],
  resolve: {
    // 配置路径别名
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  // 要在这里书写test，必须在文件的头部引入vitest的类型声明文件，防止vite不识别test属性
  test: {
    globals: true,
    environment: "happy-dom",
    transformMode: { web: [/.tsx$/] }
  },
  server: {
    // 方向代理  不需要配置跨域  http://127.0.0.1:3000/login
    proxy: {
      // http-proxy 在中间做了个中间层  客户端->(中间层*透明的* -> 真实服务器)
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true, // 这里不加服务端无法拿到origin属性
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
