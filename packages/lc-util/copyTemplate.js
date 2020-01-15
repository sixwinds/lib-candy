const fs = require('fs');
const fse = require('fs-extra');
const ejs = require('ejs');

/* 
  @param {string} from - template source path
  @param {string} to - dest path
  @param {Object} [options] - options
  @param {Object} [options.data={}] - template date
  @param {string} [options.overwritten=true] - wether is dest file to be overwrittem if it exists 
*/
function copyTemplate(from, to, options) {
  options = options || {};
  data = options.data || {};

  if (options.overwritten === false && fse.pathExistsSync(to)) {
    return;
  }
  const tmpl = fs.readFileSync(from, 'utf8');
  const distContent = ejs.render(tmpl, data);
  fse.outputFileSync(to, distContent);
}

module.exports = copyTemplate;
