const path = require('path');
const copyTemplate = require('lc-util/copyTemplate');

/* 
  @param {Object} [options]
  @param {string} options.basePath - doc dist path
  @param {string} options.libraryName
*/
function lcLibDocCopy(options) {
  options = options || {};
  const basePath = options.basePath || process.cwd();
  const libraryName = options.libraryName;

  copyTemplate(
    path.resolve(__dirname, './template/README.md'),
    path.resolve(basePath, './README.md'),
    { libraryName: libraryName }
  );
  copyTemplate(
    path.resolve(__dirname, './template/doc/api.md'),
    path.resolve(basePath, './doc/api.md'),
    { libraryName: libraryName }
  );
  copyTemplate(
    path.resolve(__dirname, './template/CHANGELOG.md'),
    path.resolve(basePath, './CHANGELOG.md')
  );
  copyTemplate(
    path.resolve(__dirname, './template/package.json'),
    path.resolve(basePath, './package.json'),
    { libraryName: libraryName }
  );
}

module.exports = lcLibDocCopy;
