const path = require('path');
const copyTemplate = require('lc-util/copyTemplate');

function copyNotOverwritten(from, to, data) {
  return copyTemplate(from, to, {
    data: data,
    overwritten: false
  });
}

/* 
  @param {Object} [options]
  @param {string} options.basePath - doc dist path
  @param {string} options.libraryName
*/
function lcLibDocCopy(options) {
  options = options || {};
  const basePath = options.basePath || process.cwd();
  const libraryName = options.libraryName;

  copyNotOverwritten(
    path.resolve(__dirname, './template/README.md'),
    path.resolve(basePath, './README.md'),
    { libraryName: libraryName }
  );
  copyNotOverwritten(
    path.resolve(__dirname, './template/doc/api.md'),
    path.resolve(basePath, './doc/api.md'),
    { libraryName: libraryName }
  );
  copyNotOverwritten(
    path.resolve(__dirname, './template/CHANGELOG.md'),
    path.resolve(basePath, './CHANGELOG.md')
  );
  copyNotOverwritten(
    path.resolve(__dirname, './template/package.json.tmpl'),
    path.resolve(basePath, './package.json'),
    { libraryName: libraryName }
  );
  copyNotOverwritten(
    path.resolve(__dirname, './template/src/index.js'),
    path.resolve(basePath, './src/index.js')
  );
}

module.exports = lcLibDocCopy;
