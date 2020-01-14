#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');
const libDocCopy = require('lc-lib-doc-copy');

const devDependencies = [
  'lc-lib-rollup-build',
  'lc-jest-test'
];
const command = process.argv[2];
const libName = process.argv[3];

function printUsage() {
  console.log();
  console.log('Please specify the project directory by using new command')
  console.log('  Usage: lib-candy new [dirName]');
  console.log();
  console.log('For example:');
  console.log('  lib-candy new my-third-lib');
  console.log();
}

if (command === 'new' && libName) {
  const libRootDir = path.resolve(libName);
  
  libDocCopy({
    basePath: libRootDir,
    libraryName: libName
  });
  
  process.chdir(libRootDir);
  const installArgs = [
    'install',
    '--save-dev',
    '--loglevel',
    'error'
  ].concat(devDependencies);
  const command = 'npm'
  const child = spawn(command, installArgs, { stdio: 'inherit' });
  
  child.on('close', function(code, signal) {
    if (code !== 0) {
      console.log();
      console.log('Failed to run command: ' + command + ' ' + installArgs.join(' '))
      console.log('error: ' + code);
      console.log('signal: ' + signal)
      console.log()
    }
  });
} else {
  printUsage();
}
