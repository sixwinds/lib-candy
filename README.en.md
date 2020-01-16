# lib-candy
[简体中文](./README.md) | English

Set up an npm package project skeleton by running one command.
- Use jest as build-in test Framework。
- Building source code by rollup。

## Usage
Creating a lib project by run：
### npx
```
npx lib-candy new LIB-NAME
```

example：
```
npx lib-candy new my-third-lib
```
LIB-NAME is not only project folder name, but also package name as default. Once the creating process is done, directory structure will be：

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

you can open your project folder:

```
cd my-third-lib
```

Inside the newly created project, you can run some built-in commands:
### `npm run build`
Build the same code for CommonJS，ES module and UMD。see input/output convention：
- Input entry js must be `src/index.js`。
- Commonjs output can be specify with `main` property in `package.json`, if not specified, default value is `LIB-NAME/lib/index.js`.
- ES module output can be specify with `module` property in `package.json`, if not specified, default value is `LIB-NAME/es/index.js`.
- UMD output can be specify with `browser` property in `package.json`, if not specified, default value is `LIB-NAME/umd/index.js`. `umdName` property in `package.json` must be set, if UMD output is desired when building.

example:
```json
{
  "name": "my-third-lib",
  "main": "./lib/index.js",
  "module": "./es/index.js",
  "browser": "./umd/index.js",
  "umdName": "MyThirdLib",
}
```
#### ES Syntax
Use babel plugin to build lib source code. Supported syntax please refer `@babel/env`. You can also describe the environments you support/target for your lib：
- `browserslist` This can be a [browserslist-compatible](https://github.com/browserslist/browserslist) query.
- `engines.node` Node version your lib support.

example：

```json
{
  "browserslist": "> 0.25%, not dead",
  "engines": {
    "node": ">= 0.12.0"
  }
}
```

#### Polyfill
Build will not include any polyfill except regenerator in terms of lib size。`regeneratorRuntime: true | false` in `package.json` can determine whether regenerator polyfill will be include in output code(default is false).

### `npm test`
Underlying test framework is Jest，Please refer to [jestjs.io](https://jestjs.io/) about writing test case.

## Documentation
[Configuration](./doc/config.en.md)

## Support
You need Node8.10.0 or later vesion.

