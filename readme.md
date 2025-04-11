# 一、pnpm 管理项目

- 快：pnpm 是同类工具速度的 2 倍
- 高效：node_modules 中的所有文件均链接自单一存储位置
- 支持单体仓库：monoreop，单个源码仓库中包含多个软件包的支持
- 权限严格：pnpm 创建的 node_modules 默认非扁平结构，因此代码无法对任意软件包进行访问（npm、yarn 存在幽灵依赖问题）

# 二、vite 介绍

- 极速的服务启动，使用原生 ESM 文件，按需加载，无需打包。（原来是整个项目的代码打包在一起，然后才能启动服务）
- 开发时使用的是 EsBuild，它是用 go 语言开发的，轻量快速的热重载，无论应用程序大小如何，都始终极快的默认热替换（HMR）
- 丰富的功能，对 ts、jsx、css 等支持开箱即用
- 优化的构建，可选多页应用或库模式的预配置，使用 rollup 构建
- 通用的插件，在开发和构建之间共享 rollup-superset 插件接口
- 完全类型化的 API、灵活的 API、完整的 ts 支持

> Vite3 修复了 400+issue，减少了体积，Vite 决定每年发布一个新的版本

# 三、项目初始化

### 3.1 项目初始化

```
pnpm init # 初始化package.json
pnpm install vite@3.1.0 -D # 安装vite
pnpm install vue@^3.2.39 # 安装vue
pnpm install @vitejs/plugin-vue@3.1.0 -D # 支持vite解析并编译.vue文件
pnpm install typescript vue-tsc -D # 安装ts和vue-tsc
pnpm dev # 启动开发服务
```

### 3.2 eslint

eslint 默认有三项：

1. 只校验语法。
2. 校验语法，找到哪里出问题了。
3. 校验语法，找到哪里出问题了，并且强制化代码样式（强制代码风格）。

通常，我们只使用第 2 种选项，eslint 只做规范检测，不涉及强制代码风格，代码风格的事情交给 prettier 去做。

```
npx eslint --init
```

> 需要在 vscode 中安装 `eslint`插件。

### 3.3 prettier

.prettierrc.js

```
module.exports = {
  singleQuote: false, // 使用双引号
  semi: false, // 末尾不添加分号
  tabWidth: 2, // tab * 2
  trailingComma: "none", // 对象最后一个属性后面有没有,
  useTabs: false, // 是否使用tab
  endOfLine: "auto" // 换行符
}

```

.prettierignore

```
node_modules
dist
```

> 需要在 vscode 中安装 `prettier`插件：prettier 只是用来格式化代码；
>
> 这里需要配置 `Format On  Save`为启用，保存时自动格式化；
>
> Default Formatter 选择 `Prettier - Code formatter`；

### 3.4 editorconfig

.editorconfig

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
```

> 需要安装 vscode 中的 `EditorConfig for VS Code`插件。

### 3.5 husk（git hook）

需要先安装 husky 包，它可以帮我们生成 git hook

```
pnpm i husky -D
```

然后在 package.json 中：

```
{
	"scripts": {
		"prepare": "husky install"
	}
}
```

执行 `pnpm i`的时候，默认会执行 prepare 命令。

在这里，我们需要手动执行一遍 pnpm prepare，因为依赖先前都已经安装完了：

```
$ pnpm prepare

> vite-flow@1.0.0 prepare G:\zfdemo\vue3-gongchenghua\vite-flow
> husky install

husky - Git hooks installed

```

以上命令会在项目根目录下生成：

```
.husky/_
  .gitignore
  husky.sh
```

然后执行：

```
git init
npx husky add .husky/pre-commit "pnpm lint"
```

以上命令的意思是在.husky 文件夹中添加 pre-commit 文件，并在其中添加 pnpm lint 命令，表示在 git commit 之前执行 pnpm lint 命令，做代码校验。

在 src/main.ts 中书写如下代码：

```
import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#app")

const a = 1

if (true) {
}

```

执行如下命令提交代码：

```
$ git commit -m 'ok'

> vite-flow@1.0.0 lint G:\zfdemo\vue3-gongchenghua\vite-flow
> eslint --fix --ext .ts,.tsx,.vue src --quiet


G:\zfdemo\vue3-gongchenghua\vite-flow\src\main.ts
  8:5   error  Unexpected constant condition  no-constant-condition
  8:11  error  Empty block statement          no-empty

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.
husky - pre-commit hook exited with code 1 (error)

```

发现 husky 触发了 pre-commit 钩子中的 pnpm lint 命令，修改代码完不规范的代码后，就可以正常提交代码了。

### 3.6 commitlint 提交时的 git 检测规范

类型

1. build：主要目的是修改项目构建系统，如 gulp、webpack、rollup 的配置等的提交。
2. chore：不属于以上类型时的其它类型。
3. ci：主要目的是修改项目集成流程，如 Travis、Jenkins、GitLab CI、Cifcle 等的提交。
4. docs：文档更新。
5. feat：新功能、新特性。
6. fix：修改 bug.
7. peft：更改代码，以提高性能。
8. refactor：代码重构（重构，在不影响代码内部行为、功能下的代码修改）。
9. revert： 恢复上一次提交。
10. style：不影响程序逻辑的代码修改（修改空白字符、格式缩进、不全缺失的分号等，没有改变代码逻辑）。
11. test：测试用例新增、修改。

> 代码提交检测

```
pnpm install @commitlint/cli @commitlint/config-conventional -D
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

> commitlint.config.js 配置

```
module.exports = {
	extends: ["@commitlint/config-conventional"]
}
```

> git commit -m "feat: 初始化工程"
