const path = require('path');
const fse = require('fs-extra');
const execFileSync = require('child_process').execFileSync;
const libRollupBuild = require('../index');

const dist = {
  libDir: path.resolve(__dirname, './lib'),
  esDir: path.resolve(__dirname, './es'),
  umdDir: path.resolve(__dirname, './umd'),
  libIndexFile: path.resolve(__dirname, './lib/index.js'),
  esIndexFile: path.resolve(__dirname, './es/index.js'),
  umdIndexFile: path.resolve(__dirname, './umd/index.js'),
};

describe('lc-lib-rollup-build', function() {
  beforeEach(function() {
    fse.removeSync(dist.libDir);
    fse.removeSync(dist.esDir);
    fse.removeSync(dist.umdDir);
  });

  test('test api', async function() {
    await libRollupBuild(__dirname);
    expect(fse.pathExistsSync(dist.libIndexFile)).toBe(true);
  });
  
  test('cli test', function() {
    process.chdir('./test');
    console.log(
      execFileSync(
        'node',
        [path.resolve(__dirname, '../bin/lc-lib-rollup-build.js')],
        { encoding: 'utf8' }
      )
    );
    expect(fse.pathExistsSync(dist.libIndexFile)).toBe(true);
  });
});