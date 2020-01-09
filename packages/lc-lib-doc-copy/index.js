const path = require('path');
const copyTemplate = require('lc-util/copyTemplate');

/* 
  @param {Object} [options]
  @param {string} options.basePath - doc dist path
  @param {string} options.libName
*/
function lcLibDocCopy(options) {
  options = options || {};
  const basePath = options.basePath || process.cwd();
  const libName = options.libName;

  copyTemplate(
    path.resolve(__dirname, './template/README.md'),
    path.resolve(basePath, './README.md'),
    { libraryName: libName }
  );
  copyTemplate(
    path.resolve(__dirname, './template/doc/api.md'),
    path.resolve(basePath, './doc/api.md'),
    { libraryName: libName }
  );
  copyTemplate(
    path.resolve(__dirname, './template/CHANGELOG.md'),
    path.resolve(basePath, './CHANGELOG.md')
  );
}

module.exports = lcLibDocCopy;
