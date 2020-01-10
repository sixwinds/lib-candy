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

function lcLibRollupBuild(basePath) {
  basePath = basePath || process.cwd();

  const buildConfig = parseConfig(basePath);
  let inputPromiseArray;
  if (buildConfig.umdName) {
    inputPromiseArray = [
      createCommonInputBundle(buildConfig),
      createUmdInputBundle(buildConfig)
    ];
  } else {
    inputPromiseArray = [createCommonInputBundle(buildConfig)];
  }

  return Promise.all(inputPromiseArray).then(function(result) {
    const commonInputBundle = result[0];
    const umdInputBundle = result[1];
    const outputPromiseArray = [];

    outputPromiseArray.push(
      writeBundle(commonInputBundle, buildConfig.cjsFile, 'cjs').catch(function(error) {
        console.log('Build CommonJS bundle error: ');
        console.log(error);
      })
    );
    
    outputPromiseArray.push(
      writeBundle(commonInputBundle, buildConfig.esFile, 'es').catch(function(error) {
        console.log('Build ES module bundle error: ');
        console.log(error);
      })
    );

    if (umdInputBundle) {
      outputPromiseArray.push(
        writeBundle(
          umdInputBundle,
          buildConfig.umdFile,
          'umd',
          buildConfig.umdName
        ).catch(function(error) {
          console.log('Build UMD bundle error: ');
          console.log(error);
        })
      );
    }
    return Promise.all(outputPromiseArray);
  });
}

module.exports = lcLibRollupBuild;
