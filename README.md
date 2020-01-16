# lib-candy
简体中文 | [English](./README.en.md)

命令行工具，一键生成第三方 npm 包项目骨架。
- 内置测试框架 jest。
- 内置 rollup 编译包源码。

## 使用方法
当你想新建一个 npm 包项目时，运行如下命令：
### npx
```
npx lib-candy new LIB-NAME
```

示例：
```
npx lib-candy new my-third-lib
```
LIB-NAME 会被用作项目的文件夹名，也会默认作为包名。项目创建完的目录结构如下：

```
my-third-lib
├── doc
|    └── api.md
├── CHANGELOG.md
├── README.md
├── node_modules
├── package-lock.json
├── package.json
└── src
    └── index.js
```

进入到项目目录：

```
cd my-third-lib
```

你可以运行内置命令：
### `npm run build`
此命令编译源码生成 CommonJS，ES module 和 UMD 格式的代码，对应约定配置如下：
- 源码入口文件必须是 `src/index.js`。
- 编译后符合 Commonjs 格式的目标文件名及目录可以通过 `package.json` 中的 `main` 字段指定，默认值是 `LIB-NAME/lib/index.js`。
- 编译后符合 ES module 格式的目标文件名及目录可以通过 `package.json` 中的 `module` 字段指定，默认值是 `LIB-NAME/es/index.js`。
- 编译后 UMD 格式的目标文件名及目录可以通过 `package.json` 中的 `browser` 字段指定，默认值是 `LIB-NAME/umd/index.js`。如果要生成 UMD 格式的文件，还必须在 `package.json` 中设置 `umdName` 字段，指定包挂载到全局下的变量名。

示例：
```json
{
  "name": "my-third-lib",
  "main": "./lib/index.js",
  "module": "./es/index.js",
  "browser": "./umd/index.js",
  "umdName": "MyThirdLib",
}
```
#### ES新语法
编译使用 babel 插件，支持编译 `@babel/env` 包含的 ES 新语法。默认会转换所有的新语法，但是如果你的包有特定的运行环境，可以通过在 `package.json` 中指定：
- `browserslist` 可以指定目标浏览器（值的格式请参考 [browserslist-compatible](https://github.com/browserslist/browserslist) query）。
- `engines.node` 可以指定 nodejs 版本。

示例：

```json
{
  "browserslist": "> 0.25%, not dead",
  "engines": {
    "node": ">= 0.12.0"
  }
}
```

#### Polyfill
编译不会打包任何 polyfill（除了 regenerator），以减少包的大小。可以通过在 `package.json` 指定 `regeneratorRuntime: true | false` 来决定编译是否会把 regenerator 的 polyfill 打入目标文件。如果不指定 `regeneratorRuntime` 字段，默认是不打入。

### `npm test`
此命令封装了 Jest，如何编写测试用例请参考 Jest [官方网站](https://jestjs.io/)。

## 文档
[配置](./doc/config.md)

## 运行环境
支持 Node8.10.0 及以上版本。

