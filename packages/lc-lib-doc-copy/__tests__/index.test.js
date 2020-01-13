const lcLibDocCopy = require('../index');
const fse = require('fs-extra');
const path = require('path');

const basePath = __dirname;
const dist = {
  readmeFile: path.resolve(basePath, './README.md'),
  changelogFile: path.resolve(basePath, './CHANGELOG.md'),
  docDir: path.resolve(basePath, './doc'),
  packageFile: path.resolve(basePath, './package.json')
}

describe('lc-lib-doc-copy', function() {
  beforeEach(function() {
    fse.removeSync(dist.readmeFile);
    fse.removeSync(dist.changelogFile);
    fse.removeSync(dist.docDir);
    fse.removeSync(dist.packageFile);
  });
  afterEach(function() {
    fse.removeSync(dist.readmeFile);
    fse.removeSync(dist.changelogFile);
    fse.removeSync(dist.docDir);
    fse.removeSync(dist.packageFile);
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
      fse.pathExistsSync(dist.packageFile);
    
    expect(success).toBe(true)
  });
});