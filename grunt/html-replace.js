// Generated on 2016-11-27 using generator-angular 0.15.1
'use strict';

module.exports = function () {
  var fileToReplace = 'dist/index.html';
  console.log('replacing ' + fileToReplace);

  var fs = require('fs');

  var fileData = fs.readFileSync(fileToReplace, 'utf8');

  var prefixx = require('./../proxy-settings.json').build.staticsUrl;
  var result = fileData
    .replace(/src="/g, 'src="' + prefixx)
    .replace(/href="/g, 'href="' + prefixx)
    .replace(/<!-- COMMENT START -->/g, '<!--');

  fs.writeFileSync(fileToReplace, result, 'utf8');
};