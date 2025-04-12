module.exports = {
  // 环境 针对哪些环境的语法（你要使用哪些环境的语法）
  env: {
    // 浏览器环境语法: window、document.querySelectorAll
    browser: true,
    // es6及以后得语法：new Promise、Array.from
    es2021: true,
    // node环境语法：new Buffer
    node: true
  },
  // 哪些规则 别人写好的规则，直接拿来用（plugins和rules相加等于extends），它里面既包含插件，又包含规则
  extends: [
    // 默认包含eslint推荐的规则
    "eslint:recommended",
    // eslint-plugin-vue vue3的规则
    "plugin:vue/vue3-essential",
    // typescript的规则
    "plugin:@typescript-eslint/recommended",
    // @vue/eslint-config-prettier
    "@vue/prettier",
    // 该文件由vite.config.ts中的AutoImport生成
    "./.eslintrc-auto-import.json"
  ],
  // 解析器，默认typescript的解析器
  // "parser": "@typescript-eslint/parser",
  // 解析器，可以解析.vue文件
  parser: "vue-eslint-parser",
  // 解析器选项
  parserOptions: {
    // 解析ts文件的
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  // 插件
  plugins: ["vue", "@typescript-eslint"],
  // 自定义的规则
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 使用双引号
        semi: false, // 末尾不添加分号
        tabWidth: 2, // tab * 2
        trailingComma: "none", // 对象最后一个属性后面有没有,
        useTabs: false, // 是否使用tab
        endOfLine: "auto" // 换行符
      }
    ]
  }
}
