const lcLibDocCopy = require('../index');
const fse = require('fs-extra');
const path = require('path');

const basePath = __dirname;
const dist = {
  readmeFile: path.resolve(basePath, './README.md'),
  changelogFile: path.resolve(basePath, './CHANGELOG.md'),
  docDir: path.resolve(basePath, './doc')
}

describe('lc-lib-doc-copy', function() {
  beforeEach(function() {
    fse.removeSync(dist.readmeFile);
    fse.removeSync(dist.changelogFile);
    fse.removeSync(dist.docDir);
  });
  afterEach(function() {
    fse.removeSync(dist.readmeFile);
    fse.removeSync(dist.changelogFile);
    fse.removeSync(dist.docDir);
  });
  test('copy without data', function() {
    lcLibDocCopy({
      basePath: basePath
    })
    const content = fse.pathExistsSync(dist.readmeFile)
    expect(content).toBe(true)
  });
});