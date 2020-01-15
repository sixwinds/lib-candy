const lcLibDocCopy = require('../index');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const basePath = __dirname;
const dist = {
  readmeFile: path.resolve(basePath, './README.md'),
  changelogFile: path.resolve(basePath, './CHANGELOG.md'),
  docDir: path.resolve(basePath, './doc'),
  packageFile: path.resolve(basePath, './package.json'),
  srcIndexFile: path.resolve(basePath, './src/index.js'),
  srcDir: path.resolve(basePath, './src')
}

describe('lc-lib-doc-copy', function() {
  beforeEach(function() {
    fse.removeSync(dist.readmeFile);
    fse.removeSync(dist.docDir);
    fse.removeSync(dist.packageFile);
    fse.removeSync(dist.srcDir);
  });
  afterEach(function() {
    fse.removeSync(dist.readmeFile);
    fse.removeSync(dist.docDir);
    fse.removeSync(dist.packageFile);
    fse.removeSync(dist.srcDir);
  });
  test('copy without data', function() {
    lcLibDocCopy({
      basePath: basePath,
      libraryName: 'jslib',
      libraryVersion: '0.1.0'
    })
    const success = 
      fse.pathExistsSync(dist.readmeFile) &&
      fse.pathExistsSync(dist.changelogFile) &&
      fse.pathExistsSync(dist.docDir) &&
      fse.pathExistsSync(dist.packageFile) &&
      fse.pathExistsSync(dist.srcIndexFile);
    
    expect(success).toBe(true)
  });

  test('copy without data', function() {
    lcLibDocCopy({
      basePath: basePath,
      libraryName: 'jslib',
      libraryVersion: '0.1.0'
    })
    const content = fs.readFileSync(dist.changelogFile, 'utf8');
    
    expect(content).toBe('existed CHANGELOG')
  });
});