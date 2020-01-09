const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const copyFile = require('../copyTemplate');

const srcFilePath = path.resolve(__dirname, './template/example.md');
const distFilePath = path.resolve(__dirname, './projRoot/example.md');

describe('copyTemplate', function() {
  beforeEach(function() {
    fse.removeSync(distFilePath);
  });
  afterEach(function() {
    fse.removeSync(distFilePath);
  });
  test('copy without data', function() {
    copyFile(srcFilePath, distFilePath, {
      libraryName: undefined
    });
    const content = fs.readFileSync(distFilePath, 'utf8');
    expect(content).toBe('This is an example of template: .')
  });
});