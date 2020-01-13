#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');
const libDocCopy = require('lc-lib-doc-copy');

const devDependencies = [
  'lc-lib-rollup-build',
  'lc-jest-test'
];
const libName = process.argv[2];
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
    console.error('error: ' + code + ' ' + signal)
  }
});
