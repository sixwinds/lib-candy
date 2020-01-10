const path = require('path');
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babelPlugin = require('./util/babelPlugin');
const parseConfig = require('./util/parseConfig');

function createCommonInputBundle(buildConfig) {
  const inputOptions = {
    input: buildConfig.input,
    plugins: [
      resolve(),
      commonjs(),
      babelPlugin({
        targets: buildConfig.targets,
        regeneratorRuntime: buildConfig.regeneratorRuntime
      })
    ]
  }
  if (buildConfig.external) inputOptions.external = buildConfig.external;
  return rollup.rollup(inputOptions);
}

function createUmdInputBundle(buildConfig) {
  const inputOptions = {
    input: buildConfig.input,
    plugins: [
      resolve(),
			commonjs(),
      babelPlugin({
        targets: buildConfig.targets,
        regeneratorRuntime: buildConfig.regeneratorRuntime
      })
    ]
  }
  return rollup.rollup(inputOptions);
}

function writeBundle(inputBundle, file, format, umdName) {
  const writeOptions = {
    file: file,
    format: format
  };
  if (umdName) writeOptions.name = umdName;

  return inputBundle.write(writeOptions);
}

function rollupLibBuild(basePath) {
  basePath = basePath || process.cwd();

  const buildConfig = parseConfig(basePath);
  // commonjs and es module
  createCommonInputBundle(buildConfig).then(
    function(inputBundle) {
      writeBundle(inputBundle, buildConfig.cjsFile, 'cjs').catch(function(error) {
        console.log('Build CommonJS bundle error: ');
        console.log(error);
      });;
      writeBundle(inputBundle, buildConfig.esFile, 'es').catch(function(error) {
        console.log('Build ES module bundle error: ');
        console.log(error);
      });
    }
  );
  // umd
  if (buildConfig.umdName) {
    createUmdInputBundle(buildConfig).then(
      function(inputBundle) {
        writeBundle(
          inputBundle,
          buildConfig.umdFile,
          'umd',
          buildConfig.umdName
        ).catch(function(error) {
          console.log('Build UMD bundle error: ');
          console.log(error);
        });
      }
    );
  }
}

module.exports = rollupLibBuild;
