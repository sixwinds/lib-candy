const babel = require('rollup-plugin-babel');

/* 
  @param {Object} [options]
  @param {Object} [options.targets]
  @param {string|string[]} options.targets.browsers
  @param {string} options.targets.node
  @param {boolean} [options.regeneratorRuntime]
*/
function babelPlgin(options) {
  options = options || {};
  const envOptions = { modules: false };
  if (options.targets) {
    envOptions.targets = options.targets;
  }
  const transformRuntimeOptions = { regenerator: false };
  if (options.regeneratorRuntime === true) {
    transformRuntimeOptions.regenerator = true;
  }
  
  return babel({
    babelrc: false,
    presets: [
      [
        '@babel/env',
        envOptions
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        transformRuntimeOptions
      ]
    ],
    runtimeHelpers: true,
    exclude: ['node_modules/**', /\/@babel\/runtime\//]
  });
}

module.exports = babelPlgin;
