const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const copyFile = require('../copyTemplate');

const srcFilePath = path.resolve(__dirname, './template/example.md');
const distFilePath = path.resolve(__dirname, './projRoot/example.md');
const existedFilePath = path.resolve(__dirname, './projRoot/existedExample.md');

describe('copyTemplate', function() {
  beforeEach(function() {
    fse.removeSync(distFilePath);
  });
  afterEach(function() {
    fse.removeSync(distFilePath);
  });
  test('copy with data', function() {
    copyFile(srcFilePath, distFilePath, {
      data: {
        libraryName: 'my-third-lib'
      }
    });
    const content = fs.readFileSync(distFilePath, 'utf8');
    expect(content).toBe('This is an example of template: my-third-lib.')
  });

  test('not to be overwritten', function() {
    copyFile(srcFilePath, existedFilePath, {
      overwritten: false
    });
    const content = fs.readFileSync(existedFilePath, 'utf8');
    expect(content).toBe('existed example')
  });
});