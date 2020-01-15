#!/usr/bin/env node
const path = require('path');
const fs = require('fs')
const spawn = require('cross-spawn');
const libDocCopy = require('lc-lib-doc-copy');

const devDependencies = [
  'lc-lib-rollup-build',
  'lc-jest-test'
];
const command = process.argv[2];
const libName = process.argv[3];
const libPath = path.resolve(libName);

function printUsage() {
  console.log();
  console.log('Please specify the project directory by using new command')
  console.log('  Usage: lib-candy new [dirName]');
  console.log();
  console.log('For example:');
  console.log('  lib-candy new my-third-lib');
  console.log();
}

function printSuccessTips() {
  console.log();
  console.log(`Success! Created ${libName} at ${libPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(' npm run build');
  console.log('   Bundles the library into static files for production.');
  console.log();
  console.log(' npm test');
  console.log('   Starts the test runner.');
  console.log();
  console.log('Happy coding!');
}

if (command === 'new' && libName) {
  // copy template
  libDocCopy({
    basePath: libPath,
    libraryName: libName
  });
  
  // cd to project dir and install npm packages
  process.chdir(libPath);
  const installArgs = [
    'install',
    '--save-dev',
    '--loglevel',
    'error'
  ].concat(devDependencies);
  const command = 'npm';
  console.log('Installing packages. This might take a couple of minutes.');
  console.log();
  const child = spawn(command, installArgs, { stdio: 'inherit' });
  
  child.on('close', function(code, signal) {
    if (code !== 0) {
      console.log();
      console.log('Aborting installation.')
      console.log('Failed to run command: ' + command + ' ' + installArgs.join(' '))
      console.log('error: ' + code);
      console.log('signal: ' + signal)
      console.log()
    } else {
// set npm scripts command
      const pkgJsonStr = fs.readFileSync('./package.json', 'utf8');
      const pkgJson = JSON.parse(pkgJsonStr);
      if (!pkgJson.scripts) {
        pkgJson.scripts = {};
      }
      pkgJson.scripts.test = 'lc-jest-test';
      pkgJson.scripts.build = 'lc-lib-rollup-build';
      fs.writeFileSync('./package.json', JSON.stringify(pkgJson, null, '  '));
      printSuccessTips();
    }
  });
} else {
  printUsage();
}
