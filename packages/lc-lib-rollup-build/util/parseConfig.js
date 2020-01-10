const path = require('path');

function hasNodeEngines(pkg) {
  return !!(pkg.engines && pkg.engines.node);
}


/* 
  @typedef {Object} BuildConfiguration
  @property {string} input - input file path
  @property {string} cjsFile - output file path using Commonjs
  @property {string} esFile - output file path using ES Module
  @property {string} umdFile - output file path using umd
  @property {string} [umdName] - global variable name of umd format
  @property {string[]} [external] - external lib name list
  @property {boolean} regeneratorRuntime - whether or not generator functions are transformed to use a regenerator runtime that does not pollute the global scope
  @property {Object} [targets] - the environments you support/target for your library
  @property {string|string[]} targets.browsers
  @property {string} targets.node
*/
function parseConfig(basePath) {
  // default configs
  const configs = {
    input: path.resolve(basePath, './src/index.js'),
    cjsFile: path.resolve(basePath, './lib/index.js'),
    esFile: path.resolve(basePath, './es/index.js'),
    umdFile: path.resolve(basePath, './umd/index.js'),
    regeneratorRuntime: false
  };
  try {
    // override by fields in package.json
    const pkg = require(path.resolve(basePath, './package.json'));
    configs.cjsFile = pkg.main || configs.cjsFile;
    configs.esFile = pkg.module || configs.esFile;
    configs.umdFile = pkg.browser || configs.umdFile;
    if (pkg.dependencies || pkg.peerDependencies) {
      const allDependencies = Object.assign({}, pkg.dependencies, pkg.peerDependencies);
      configs.external = Object.keys(allDependencies);
    }
    if (pkg.umdName) {
      configs.umdName = pkg.umdName;
    }
    if (pkg.regeneratorRuntime === true) {
      configs.regeneratorRuntime = true;
    }
    if (pkg.browserslist) {
      configs.targets = {
        browsers: pkg.browserslist
      }
    }
    if (hasNodeEngines(pkg)) {
      if (configs.targets) {
        configs.targets.node = pkg.engines.node;
      } else {
        configs.targets = {
          node: pkg.engines.node
        };
      }
    }
  } catch (e) {

  }

  return configs;
}

module.exports = parseConfig;
