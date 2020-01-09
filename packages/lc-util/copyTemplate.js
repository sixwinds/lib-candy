const fs = require('fs');
const fse = require('fs-extra');
const ejs = require('ejs');

function copyTemplate(from, to, data) {
  data = data || {};
  const tmpl = fs.readFileSync(from, 'utf8');
  const distContent = ejs.render(tmpl, data);
  fse.outputFileSync(to, distContent);
}

module.exports = copyTemplate;
