# lc-util

This is a util lib. Part of command tool for [lib-candy](https://github.com/sixwinds/lib-candy).

## Usage
```javascript
const copyTemplate = require('../copyTemplate');

const dataObjInTemplate = { libraryName: 'my-lib' };
copyTemplate(srcFilePath, distFilePath, dataObjInTemplate);
```
