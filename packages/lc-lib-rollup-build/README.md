# lc-lib-rollup-build

This is a cli of building lib by rollup. Part of command tool for [lib-candy](https://github.com/sixwinds/lib-candy).

## Usage
### Command Line
```
npx lc-lib-rollup-build
```

### Api
```javascript
const libRollupBuild = require('lc-lib-rollup-build');

libRollupBuild(projRootDir).then(function(){
  // do something
}).catch(function() {
  // do something
})
···
